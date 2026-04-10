import { useEffect, useState } from 'react';
import StudentTable from '../../components/StudentTable'
import StudentToolbar from '../../components/StudentToolbar'
import StudentConfigPanel from '../../components/StudentConfigPanel';
import DeleteStudentsModal from '../../modals/DeleteStudentsModal';
import ExportStudentsModal from '../../modals/ExportStudentsModal';
import ImportStudentsModal from '../../modals/ImportStudentsModal';
import StatusBadge from '../../../../../../components/StatusBadge';
import ActionMenu from '../../../../../../components/ActionMenu';

import { getStudents, deleteStudent, deleteSelectedStudents } from '../../../../../../services/student-service.ts'
import type { StudentResponse } from '../../../../../../types/student.ts';
import { useSearchParams } from 'react-router-dom';
import Toast from '../../../../../../components/Toast/index.tsx';

export default function StudentPage() {

    const [params, setParams] = useSearchParams();
    const [debouncedSearch, setDebouncedSearch] = useState(params.get("search") || "");

    const [panel, setPanel] = useState<"none" | "filter" | "config">("none");
    const [selected, setSelected] = useState<number[]>([]);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
    const [exportOpen, setExportOpen] = useState(false);
    const [importOpen, setImportOpen] = useState(false);

    const [visibleColumns, setVisibleColumns] = useState([
        "checkbox", "id", "name", "email", "status", "enrollmentsCount", "actions"
    ]);

    const [page, setPage] = useState(Number(params.get("page") || 0));
    const [size, setSize] = useState(Number(params.get("size") || 5));
    const [search, setSearch] = useState(params.get("search") || "");

    const [status, setStatus] = useState(params.get("status") || "");
    const studentStatus = ["All", "In_Progress", "Completed"];

    const [sort, setSort] = useState(params.get("sort")?.split(",")[0] || "Id");
    const [sortDir, setSortDir] = useState<"asc" | "desc">((params.get("sort")?.split(",")[1] as "desc" | "asc") || "desc");
    const studentSort = ["Id", "Name", "Email", "Enrollments"];

    const [students, setStudents] = useState<StudentResponse[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(true);

    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timeout);
    }, [search]);

    useEffect(() => {
        async function fetchData() {

            const newParams: Record<string, string> = {};

            if (debouncedSearch) newParams.search = debouncedSearch;
            if (status) newParams.status = status;
            if (sort) newParams.sort = `${sort},${sortDir}`;
            newParams.page = page.toString();
            newParams.size = size.toString();
            setParams(newParams);

            try {
                setLoading(true);
                const data = await getStudents({
                    page,
                    size,
                    name: debouncedSearch || undefined,
                    status: status || undefined,
                    sortBy: sort || undefined,
                    sortDir: sortDir || undefined
                });

                setStudents(data.content);
                setTotalElements(data.totalElements);

            } catch (err) {
                console.error(err);
                setToastMessage("Error loading students. Please try again.");
                setToastType('error');
                setToastOpen(true);
            } finally {
                setLoading(false)
            }
        }

        fetchData();

    }, [page, size, debouncedSearch, status, sort, sortDir, setParams]);

    const handleRowDelete = (id: number) => {
        setDeleteTargetId(id);
        setDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        setDeleteOpen(false);

        const idsToDelete = deleteTargetId !== null ? [deleteTargetId] : selected;
        if (idsToDelete.length === 0) {
            setDeleteTargetId(null);
            return;
        }

        try {
            if (deleteTargetId !== null) {
                await deleteStudent(deleteTargetId);
            } else {
                await deleteSelectedStudents(idsToDelete);
            }

            setStudents(prev => prev.filter(student => !idsToDelete.includes(student.id as number)));
            setSelected(prev => prev.filter(selectedId => !idsToDelete.includes(selectedId)));
            setToastMessage("Student deleted successfully.");
            setToastType('success');
            setToastOpen(true);
        } catch (err) {
            console.error(err);
            setToastMessage("Error deleting student. Please try again.");
            setToastType('error');
            setToastOpen(true);
        } finally {
            setDeleteTargetId(null);
        }
    };

    const columns = [
        {
            key: "checkbox", label: "",
            header: () => (
                <input type="checkbox" className='cp-pointer' checked={students.length > 0 && selected.length === students.length} onChange={toggleAll} />
            ),
            render: (row: StudentResponse) => {
                const id = row.id as number;
                return (
                    <input type="checkbox" className='cp-pointer' checked={selected.includes(id)} onChange={() => toggleOne(id)} />
                );
            },
            hideable: false,
        },
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "address", label: "Address" },
        { key: "status", label: "Status", render: (row: StudentResponse) => <StatusBadge status={row.status as string} /> },
        { key: "enrollmentsCount", label: "Enrollments" },
        { key: "actions", label: "", render: (row: StudentResponse) => <ActionMenu id={row.id as number} onDelete={() => handleRowDelete(row.id as number)} />, hideable: false }
    ];

    const toggleOne = (id: number) => {

        setSelected(prev => {
            const next = prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id];

            if (next.length > 0) {
                setPanel("config");
            }
            return next;
        });

    };

    const toggleAll = () => {

        if (selected.length === students.length) {
            setSelected([]);
            setPanel("none");
        } else {
            setSelected(students.map(s => Number(s.id)));
            setPanel("config");
        }
    };

    const clearFilters = () => {
        setSearch("");
        setStatus("");
        setSort("Id");
        setSortDir("desc");
        setPage(0);
        setSelected([]);
        setPanel("none");
        setSize(5);
    }

    return (
        <>
            {toastOpen && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    duration={3000}
                    onClose={() => setToastOpen(false)}
                />
            )}

            <StudentToolbar
                panel={panel}
                setPanel={setPanel}
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                studentStatus={studentStatus}
                sort={sort}
                setSort={setSort}
                studentSort={studentSort}
                sortDir={sortDir}
                setSortDir={(dir: string) => setSortDir(dir as "desc" | "asc")}
                size={size}
                setSize={setSize}
                setPage={setPage}
                onClearFilters={clearFilters} />

            {panel === "config" && (
                <StudentConfigPanel
                    selectedCount={selected.length}
                    clearSelection={() => setSelected([])}
                    onDelete={() => setDeleteOpen(true)}
                    onExport={() => setExportOpen(true)}
                    onImport={() => setImportOpen(true)}
                    columns={columns}
                    visibleColumns={visibleColumns}
                    setVisibleColumns={setVisibleColumns}
                />
            )}

            <StudentTable columns={columns} visibleColumns={visibleColumns} selected={selected} students={students} loading={loading} page={page} totalElements={totalElements} pageSize={size} onPageChange={setPage} />

            <DeleteStudentsModal
                open={deleteOpen}
                count={deleteTargetId !== null ? 1 : selected.length}
                onClose={() => {
                    setDeleteOpen(false);
                    setDeleteTargetId(null);
                }}
                onConfirm={handleDeleteConfirm} />

            <ExportStudentsModal
                open={exportOpen}
                onClose={() => setExportOpen(false)}
                onExport={() => {
                    setExportOpen(false);
                }} />

            <ImportStudentsModal
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={() => {
                    setImportOpen(false);
                }} />
        </>
    )
}