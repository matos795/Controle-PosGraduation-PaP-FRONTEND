import Table from '../../../../../../components/Table'
import Pagination from '../../../../../../components/Pagination'
import './styles.css'
import type { Column } from '../../../../../../types/ColumnTable';
import type { StudentResponse } from '../../../../../../types/student'

type Props = {
    columns: Column<StudentResponse>[];
    visibleColumns: string[];
    selected: number[];
    students: StudentResponse[];
    loading: boolean;
    page: number;
    totalElements: number;
    pageSize: number;
    onPageChange: (page: number) => void;
}

export default function StudentTable({ columns, visibleColumns, selected, students, loading, page, totalElements, pageSize, onPageChange }: Props) {

    const filteredColumns = columns.filter(c => visibleColumns.includes(c.key));

    return (
        <>
            <div className='cp-container-table'>
                <Table columns={filteredColumns} data={students} isRowSelected={(row) => selected.includes(row.id as number)} loading={loading} />
                <Pagination page={page + 1} totalElements={totalElements} pageSize={pageSize} onChange={(p: number) => onPageChange(p-1)} />
            </div>
        </>
    )
}