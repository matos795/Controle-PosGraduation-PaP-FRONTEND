import { useState } from 'react';
import StudentTable from '../../components/StudentTable'
import StudentToolbar from '../../components/StudentToolbar'
import StudentConfigPanel from '../../components/StudentConfigPanel';
import DeleteStudentsModal from '../../modals/DeleteStudentsModal';
import ExportStudentsModal from '../../modals/ExportStudentsModal';
import ImportStudentsModal from '../../modals/ImportStudentsModal';
import StatusBadge from '../../../../components/StatusBadge';
import ActionMenu from '../../../../components/ActionMenu';

export default function StudentPage() {

    const [panel, setPanel] = useState<"none" | "filter" | "config">("none");
    const [selected, setSelected] = useState<number[]>([]);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [exportOpen, setExportOpen] = useState(false);
    const [importOpen, setImportOpen] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState([
        "checkbox", "id", "name", "email", "status", "enrollments", "actions"
    ]);

    const students = [
        { id: 1, name: "João", email: "joao@mail.com", status: "ACTIVE", enrollments: 5 },
        { id: 2, name: "Maria", email: "maria@mail.com", status: "INACTIVE", enrollments: 7 },
    ];

    const columns = [
        {
            key: "checkbox", label: "",
            header: () => (
                <input type="checkbox" className='cp-pointer' checked={selected.length === students.length} onChange={toggleAll} />
            ),
            render: (row: Record<string, unknown>) => {
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
        { key: "status", label: "Status", render: (row: Record<string, unknown>) => <StatusBadge status={row.status as string} /> },
        { key: "enrollments", label: "Enrollments" },
        { key: "actions", label: "", render: (row: Record<string, unknown>) => <ActionMenu id={row.id as number} />, hideable: false }
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
        } else {
            setSelected(students.map(s => s.id));
            setPanel("config");
        }

    };

    return (
        <>
            <StudentToolbar panel={panel} setPanel={setPanel} selected={selected} />

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

            <StudentTable columns={columns} visibleColumns={visibleColumns} selected={selected} students={students} />

            <DeleteStudentsModal
                open={deleteOpen}
                count={selected.length}
                onClose={() => setDeleteOpen(false)}
                onConfirm={() => {
                    setDeleteOpen(false);
                    setSelected([]);
                }} />

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