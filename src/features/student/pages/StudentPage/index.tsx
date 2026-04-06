import { useEffect, useState } from 'react';
import StudentTable from '../../components/StudentTable'
import StudentToolbar from '../../components/StudentToolbar'
import StudentConfigPanel from '../../components/StudentConfigPanel';
import DeleteStudentsModal from '../../modals/DeleteStudentsModal';
import ExportStudentsModal from '../../modals/ExportStudentsModal';
import ImportStudentsModal from '../../modals/ImportStudentsModal';
import StatusBadge from '../../../../components/StatusBadge';
import ActionMenu from '../../../../components/ActionMenu';

import { getStudents } from '../../services/student-service.ts'
import type { StudentResponse } from '../../types/student';
import Pagination from '../../../../components/Pagination/index.tsx';

export default function StudentPage() {

    const [panel, setPanel] = useState<"none" | "filter" | "config">("none");
    const [selected, setSelected] = useState<number[]>([]);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [exportOpen, setExportOpen] = useState(false);
    const [importOpen, setImportOpen] = useState(false);

    const [visibleColumns, setVisibleColumns] = useState([
        "checkbox", "id", "name", "email", "status", "enrollmentsCount", "actions"
    ]);

    const [ page, setPage ] = useState(0);
    const [ size, setSize ] = useState(5);
    const [ search, setSearch ] = useState("");
    const [ status, setStatus ] = useState("");
    const studentStatus = [ "ALL", "IN_PROGRESS", "COMPLETED" ];
    const [ students, setStudents ] = useState<StudentResponse[]>([]);
    const [ totalElements, setTotalElements ] = useState(0);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        async function fetchData() {
            
            try{
                setLoading(true);
                const data = await getStudents({
                    page, 
                    size, 
                    name: search || undefined,
                    status: status || undefined 
                });

                setStudents(data.content);
                setTotalElements(data.totalElements);

            } catch (err) {
                console.error(err);
            } finally { 
                setLoading(false) 
            }
        }
        
        fetchData();

    }, [page, size, search, status]);

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
        { key: "actions", label: "", render: (row: StudentResponse) => <ActionMenu id={row.id as number} />, hideable: false }
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

    return (
        <>
            <StudentToolbar 
            panel={panel} 
            setPanel={setPanel} 
            search={search} 
            setSearch={setSearch}
            status={status}
            setStatus={setStatus}
            studentStatus={studentStatus}
            size={size}
            setSize={setSize}
            setPage={setPage} />

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

            <StudentTable columns={columns} visibleColumns={visibleColumns} selected={selected} students={students} loading={loading} />
            <Pagination page={page + 1} totalElements={totalElements} pageSize={size} onChange={(p: number) => setPage(p-1)} />


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