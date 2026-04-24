import ModalExport from "../../../../../../components/ModalExport";
import ModalImport from "../../../../../../components/ModalImport";
import Toast from "../../../../../../components/Toast";
import ModalDelete from "../../../../../../components/ModalDelete";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteClassSession, deleteSelectedClassSessions, getClassSessions } from "../../../../../../services/classSession-service";
import type { ClassSessionResponse } from "../../../../../../types/classSession";
import type { SubjectResponse } from "../../../../../../types/subject";
import ActionMenu from "../../../../../../components/ActionMenu";
import ClassSessionToolbar from "../../classSessionsComponents/ClassSessionToolbar";
import ClassSessionConfigPanel from "../../classSessionsComponents/ClassSessionConfigPanel";
import ClassSessionTable from "../../classSessionsComponents/ClassSessionTable";
import { getSubjects } from "../../../../../../services/subject-service";

export default function ClassSessionPage() {

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
        "checkbox", "id", "title", "teacher", "initialDate", "enrollmentsCount", "actions"
    ]);

    const [page, setPage] = useState(Number(params.get("page") || 0));
    const [size, setSize] = useState(Number(params.get("size") || 5));
    const [search, setSearch] = useState(params.get("search") || "");

    const [sort, setSort] = useState(params.get("sort")?.split(",")[0] || "Id");
    const [sortDir, setSortDir] = useState<"asc" | "desc">((params.get("sort")?.split(",")[1] as "desc" | "asc") || "desc");
    const classSessionSort = ["Id", "Title", "Subject", "Teacher", "InitialDate", "FinalDate", "EnrollmentsCount"];

    const [classSessions, setClassSessions] = useState<ClassSessionResponse[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(true);

    const [subjects, setSubjects] = useState<SubjectResponse[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<number | string>("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

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
            setLoading(true);
            
            if (deleteTargetId !== null) {
                await deleteClassSession(deleteTargetId);
            } else {
                await deleteSelectedClassSessions(idsToDelete);
            }

            setLoading(false);
            setClassSessions(prev => prev.filter(classSession => !idsToDelete.includes(classSession.id as number)));
            setSelected(prev => prev.filter(selectedId => !idsToDelete.includes(selectedId)));
            setToastMessage("ClassSession deleted successfully.");
            setToastType('success');
            setToastOpen(true);
        } catch (err) {
            console.error(err);
            setToastMessage("Error deleting classSession. Please try again.");
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
                <input type="checkbox" className='cp-pointer' checked={classSessions.length > 0 && selected.length === classSessions.length} onChange={toggleAll} />
            ),
            render: (row: ClassSessionResponse) => {
                const id = row.id as number;
                return (
                    <input type="checkbox" className='cp-pointer' checked={selected.includes(id)} onChange={() => toggleOne(id)} />
                );
            },
            hideable: false,
        },
        { key: "id", label: "ID" },
        { key: "title", label: "Title" },
        { key: "subject", label: "Subject", render: (row: ClassSessionResponse) => row.subject.name },
        { key: "initialDate", label: "Initial Date" },
        { key: "finalDate", label: "Final Date" },
        { key: "teacher", label: "Teacher", render: (row: ClassSessionResponse) => row.teacher.name },
        { key: "enrollmentsCount", label: "Enrollments" },
        { key: "actions", label: "", render: (row: ClassSessionResponse) => <ActionMenu onEdit={() => navigate(`/class-sessions/${row.id}`)} onDelete={() => handleRowDelete(row.id as number)} />, hideable: false }
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

        if (selected.length === classSessions.length) {
            setSelected([]);
            setPanel("none");
        } else {
            setSelected(classSessions.map(s => Number(s.id)));
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
        setSelectedSubject("");
        setFromDate("");
        setToDate("");
        setSelectedYear("");
    };

    useEffect(() => {
        async function fetchSubjects() {
            try {
                const data = await getSubjects({});
                setSubjects(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchSubjects();
    }, []);

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
            if (selectedSubject) newParams.subjectId = selectedSubject.toString();
            if (fromDate) newParams.fromDate = fromDate;
            if (toDate) newParams.toDate = toDate;
            if (selectedYear) newParams.year = selectedYear;

            newParams.page = page.toString();
            newParams.size = size.toString();
            setParams(newParams);

            try {

                setLoading(true);

                const data = await getClassSessions({
                    page,
                    size,
                    name: debouncedSearch || undefined,
                    sortBy: sort || undefined,
                    sortDir: sortDir || undefined,
                    subjectId: selectedSubject || undefined, 
                    startDate: fromDate || undefined,        
                    endDate: toDate || undefined,
                    year: selectedYear || undefined      
                });

                setClassSessions(data.content);
                setTotalElements(data.totalElements);

            } catch (err) {
                console.error(err);
                setToastMessage("Error loading class sessions. Please try again.");
                setToastType('error');
                setToastOpen(true);
            } finally {
                setLoading(false)
            }
        }

        fetchData();

    }, [page, size, debouncedSearch, sort, sortDir, selectedSubject, fromDate, toDate, selectedYear, setParams]);

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

            <ClassSessionToolbar
                panel={panel}
                setPanel={setPanel}
                search={search}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
                classSessionSort={classSessionSort}
                sortDir={sortDir}
                setSortDir={(dir: string) => setSortDir(dir as "desc" | "asc")}
                size={size}
                setSize={setSize}
                setPage={setPage}
                onClearFilters={clearFilters}
                subjects={subjects}
                selectedSubject={selectedSubject}
                onSubjectChange={setSelectedSubject}
                fromDate={fromDate}
                toDate={toDate}
                onFromDateChange={setFromDate}
                onToDateChange={setToDate}
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
            />

            {panel === "config" && (
                <ClassSessionConfigPanel
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

            <ClassSessionTable
                columns={columns}
                visibleColumns={visibleColumns}
                selected={selected}
                classSessions={classSessions}
                loading={loading}
                page={page}
                totalElements={totalElements}
                pageSize={size}
                onPageChange={setPage}
            />

            <ModalDelete
                feature='classSessions'
                open={deleteOpen}
                count={deleteTargetId !== null ? 1 : selected.length}
                onClose={() => {
                    setDeleteOpen(false);
                    setDeleteTargetId(null);
                }}
                onConfirm={handleDeleteConfirm} />

            <ModalExport
                title='Export ClassSessions'
                open={exportOpen}
                onClose={() => setExportOpen(false)}
                onExport={() => {
                    setExportOpen(false);
                }} />

            <ModalImport
                title='Import ClassSessions'
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={() => {
                    setImportOpen(false);
                }} />
        </>
    );
}