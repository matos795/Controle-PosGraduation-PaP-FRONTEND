import { useState } from 'react';
import Pagination from '../../../../components/Pagination';
import Table from '../../../../components/Table'
import './styles.css'
import type { Column } from '../../types/StudentTable';

type Student = {
    id: number;
    name: string;
    email: string;
    status: string;
    enrollments: number;
}

type Props = {
    columns: Column[];
    visibleColumns: string[];
    selected: number[];
    students: Student[];
}

export default function StudentTable({ columns, visibleColumns, selected, students }: Props) {

    const [page, setPage] = useState(1);

    const pageSize = 10;

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const paginatedStudents = students.slice(start, end);

    const filteredColumns = columns.filter(c => visibleColumns.includes(c.key));

    return (
        <>
            <div className='cp-container-table'>
                <Table columns={filteredColumns} data={paginatedStudents} isRowSelected={(row) => selected.includes(row.id as number)} />
                <Pagination page={page} total={students.length} pageSize={pageSize} onChange={setPage} />
            </div>
        </>
    )
}