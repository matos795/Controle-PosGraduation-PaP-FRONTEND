import { useEffect, useState } from "react";
import ModalDelete from "../../../../../../components/ModalDelete";
import ModalExport from "../../../../../../components/ModalExport";
import ModalImport from "../../../../../../components/ModalImport";
import Toast from "../../../../../../components/Toast";
import TeacherConfigPanel from "../../teacherComponents/TeacherConfigPanel";
import TeacherTable from "../../teacherComponents/TeacherTable";
import TeacherToolbar from "../../teacherComponents/TeacherToolBar";
import type { TeacherResponse } from "../../../../../../types/teachers";
import { deleteSelectedTeachers, deleteTeacher, getTeachers } from "../../../../../../services/teacher-service";
import { useNavigate, useSearchParams } from "react-router-dom";
import ActionMenu from "../../../../../../components/ActionMenu";

export default function TeachersPage() {

    const navigate = useNavigate();

    const [params, setParams] = useSearchParams();
    const [debouncedSearch, setDebouncedSearch] = useState(params.get("search") || "");

    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    const [panel, setPanel] = useState<"none" | "filter" | "config">("none");
    const [selected, setSelected] = useState<number[]>([]);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
    const [exportOpen, setExportOpen] = useState(false);
    const [importOpen, setImportOpen] = useState(false);

    const [visibleColumns, setVisibleColumns] = useState([
        "checkbox", "id", "name", "email", "classSessionCount", "actions"
    ]);

    const [page, setPage] = useState(Number(params.get("page") || 0));
    const [size, setSize] = useState(Number(params.get("size") || 5));
    const [search, setSearch] = useState(params.get("search") || "");

    const [sort, setSort] = useState(params.get("sort")?.split(",")[0] || "Id");
    const [sortDir, setSortDir] = useState<"asc" | "desc">((params.get("sort")?.split(",")[1] as "desc" | "asc") || "desc");
    const teacherSort = ["Id", "Name", "Email"];

    const [teachers, setTeachers] = useState<TeacherResponse[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(true);

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
                    await deleteTeacher(deleteTargetId);
                } else {
                    await deleteSelectedTeachers(idsToDelete);
                }
    
                setTeachers(prev => prev.filter(teacher => !idsToDelete.includes(teacher.id as number)));
                setSelected(prev => prev.filter(selectedId => !idsToDelete.includes(selectedId)));
                setToastMessage("Teacher deleted successfully.");
                setToastType('success');
                setToastOpen(true);
            } catch (err) {
                console.error(err);
                setToastMessage("Error deleting teacher. Please try again.");
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
                    <input type="checkbox" className='cp-pointer' checked={teachers.length > 0 && selected.length === teachers.length} onChange={toggleAll} />
                ),
                render: (row: TeacherResponse) => {
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
            { key: "classSessionCount", label: "Class Sessions" },
            { key: "actions", label: "", render: (row: TeacherResponse) => <ActionMenu onEdit={() => navigate(`/teachers/${row.id}`)} onDelete={() => handleRowDelete(row.id as number)} />, hideable: false }
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
    
            if (selected.length === teachers.length) {
                setSelected([]);
                setPanel("none");
            } else {
                setSelected(teachers.map(s => Number(s.id)));
                setPanel("config");
            }
        };
    
        const clearFilters = () => {
            setSearch("");
            setSort("Id");
            setSortDir("desc");
            setPage(0);
            setSelected([]);
            setPanel("none");
            setSize(5);
        }

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
                if (sort) newParams.sort = `${sort},${sortDir}`;
                newParams.page = page.toString();
                newParams.size = size.toString();
                setParams(newParams);
    
                try {
                    setLoading(true);
                    const data = await getTeachers({
                        page,
                        size,
                        name: debouncedSearch || undefined,
                        sortBy: sort || undefined,
                        sortDir: sortDir || undefined
                    });
    
                    setTeachers(data.content);
                    setTotalElements(data.totalElements);
    
                } catch (err) {
                    console.error(err);
                    setToastMessage("Error loading teachers. Please try again.");
                    setToastType('error');
                    setToastOpen(true);
                } finally {
                    setLoading(false)
                }
            }
    
            fetchData();
    
        }, [page, size, debouncedSearch, sort, sortDir, setParams]);

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

            <TeacherToolbar
                panel={panel}
                setPanel={setPanel}
                search={search}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
                teacherSort={teacherSort}
                sortDir={sortDir}
                setSortDir={(dir: string) => setSortDir(dir as "desc" | "asc")}
                size={size}
                setSize={setSize}
                setPage={setPage}
                onClearFilters={clearFilters} />

            {panel === "config" && (
                <TeacherConfigPanel
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

            <TeacherTable
                columns={columns}
                visibleColumns={visibleColumns}
                selected={selected}
                teachers={teachers}
                loading={loading}
                page={page}
                totalElements={totalElements}
                pageSize={size}
                onPageChange={setPage}
            />

            <ModalDelete
                feature='teachers'
                open={deleteOpen}
                count={deleteTargetId !== null ? 1 : selected.length}
                onClose={() => {
                    setDeleteOpen(false);
                    setDeleteTargetId(null);
                }}
                onConfirm={handleDeleteConfirm} />

            <ModalExport
                title='Export Teachers'
                open={exportOpen}
                onClose={() => setExportOpen(false)}
                onExport={() => {
                    setExportOpen(false);
                }} />

            <ModalImport
                title='Import Teachers'
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={() => {
                    setImportOpen(false);
                }} />
        </>
    )
}