import { useEffect, useState } from "react";
import SubjectToolBar from "../../subjectsComponents/SubjectToolBar";
import { useSearchParams } from "react-router-dom";
import Toast from "../../../../../../components/Toast";
import type { SubjectResponse } from "../../../../../../types/subject";
import ActionMenu from "../../../../../../components/ActionMenu";
import SubjectConfigPanel from "../../subjectsComponents/SubjectConfigPanel";
import SubjectTable from "../../subjectsComponents/SubjectTable";
import { deleteSelectedSubjects, deleteSubject, getSubjects } from "../../../../../../services/subject-service";
import ModalDelete from "../../../../../../components/ModalDelete";
import ModalExport from "../../../../../../components/ModalExport";
import ModalImport from "../../../../../../components/ModalImport";
import SubjectFormModal from "../../subjectsComponents/SubjectFormModal";

export default function SubjectPage() {

    const [params, setParams] = useSearchParams();
    const [loading, setLoading] = useState(true);

    const [panel, setPanel] = useState<"none" | "filter" | "config">("none");

    const [search, setSearch] = useState(params.get("search") || "");
    const [debouncedSearch, setDebouncedSearch] = useState(params.get("search") || "");

    const [sort, setSort] = useState(params.get("sort")?.split(",")[0] || "Id");
    const [sortDir, setSortDir] = useState<"asc" | "desc">((params.get("sort")?.split(",")[1] as "desc" | "asc") || "desc");
    const subjectSort = ["Id", "Name", "Sessions"];

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
    const [exportOpen, setExportOpen] = useState(false);
    const [importOpen, setImportOpen] = useState(false);
    const [modalFormOpen, setModalFormOpen] = useState(false);

    const [editingSubject, setEditingSubject] = useState<SubjectResponse | null>(null);

    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    const [subjects, setSubjects] = useState<SubjectResponse[]>([]);
    const [selected, setSelected] = useState<number[]>([]);

    const columns = [
        {
            key: "checkbox", label: "",
            header: () => (
                <input type="checkbox" className='cp-pointer' checked={subjects.length > 0 && selected.length === subjects.length} onChange={toggleAll} />
            ),
            render: (row: SubjectResponse) => {
                const id = row.id as number;
                return (
                    <input type="checkbox" className='cp-pointer' checked={selected.includes(id)} onChange={() => toggleOne(id)} />
                );
            },
            hideable: false,
        },
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "description", label: "Description" },
        { key: "classSessionCount", label: "Class Sessions" },
        { key: "actions", label: "", render: (row: SubjectResponse) => <ActionMenu onEdit={() => {setModalFormOpen(true); setEditingSubject(row)}} onDelete={() => handleRowDelete(row.id as number)} />, hideable: false }
    ];
    const [visibleColumns, setVisibleColumns] = useState(["checkbox", "id", "name", "description", "classSessionCount", "actions"]);

    const clearFilters = () => {
        setSearch("");
        setSort("Id");
        setSortDir("desc");
        setPanel("none");
    }

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

        if (selected.length === subjects.length) {
            setSelected([]);
            setPanel("none");
        } else {
            setSelected(subjects.map(s => Number(s.id)));
            setPanel("config");
        }
    };

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
                await deleteSubject(deleteTargetId);
            } else {
                await deleteSelectedSubjects(idsToDelete);
            }

            setSubjects(prev => prev.filter(subject => !idsToDelete.includes(subject.id as number)));
            setSelected(prev => prev.filter(selectedId => !idsToDelete.includes(selectedId)));
            setToastMessage("Subject deleted successfully.");
            setToastType('success');
            setToastOpen(true);
        } catch (err) {
            console.error(err);
            setToastMessage("Error deleting subject. Please try again.");
            setToastType('error');
            setToastOpen(true);
        } finally {
            setDeleteTargetId(null);
        }
    };

    useEffect(() => {
        async function fetchData() {
            const newParams: Record<string, string> = {};

            if (debouncedSearch) newParams.search = debouncedSearch;
            if (sort) newParams.sort = `${sort},${sortDir}`;
            setParams(newParams);

            try {
                setLoading(true);
                const data = await getSubjects({
                    name: debouncedSearch || undefined,
                    sortBy: sort || undefined,
                    sortDir: sortDir || undefined
                });

                setSubjects(data);

            } catch (err) {
                console.error(err);
                setToastMessage("Error loading subjects. Please try again.");
                setToastType('error');
                setToastOpen(true);
            } finally {
                setLoading(false)
            }
        }

        fetchData();
    }, [debouncedSearch, sort, sortDir, setParams])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timeout);
    }, [search]);

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

            <SubjectToolBar
                panel={panel}
                setPanel={setPanel}
                search={search}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
                sortDir={sortDir}
                setSortDir={(dir: string) => setSortDir(dir as "desc" | "asc")}
                subjectSort={subjectSort}
                onClearFilters={clearFilters}
                onCreate={() => setModalFormOpen(true)}
            />

            {panel === "config" && (
                <SubjectConfigPanel
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

            <SubjectTable
                columns={columns}
                visibleColumns={visibleColumns}
                selected={selected}
                subjects={subjects}
                loading={loading}
            />

            <ModalDelete
                feature="subjects"
                open={deleteOpen}
                count={deleteTargetId !== null ? 1 : selected.length}
                onClose={() => {
                    setDeleteOpen(false);
                    setDeleteTargetId(null);
                }}
                onConfirm={handleDeleteConfirm} />

             <ModalExport
                title='Export Subjects'
                open={exportOpen}
                onClose={() => setExportOpen(false)}
                onExport={() => {
                    setExportOpen(false);
                }} />

            <ModalImport
                title="Import Subjects"
                open={importOpen}
                onClose={() => setImportOpen(false)}
                onImport={() => {
                    setImportOpen(false);
                }} /> 

            <SubjectFormModal
                title='Editar Matéria'
                open={modalFormOpen}
                subject={editingSubject}
                onClose={() => {setModalFormOpen(false); setEditingSubject(null);}}
                setToastMessage={setToastMessage}
                setToastType={setToastType}
                setShowToast={setToastOpen}
            />
        </>
    )
}