import Table from '../../../../components/Table'
import './styles.css'
import type { Column } from '../../../../types/ColumnTable';
import type { StudentResponse } from '../../types/student'

type Props = {
    columns: Column<StudentResponse>[];
    visibleColumns: string[];
    selected: number[];
    students: StudentResponse[];
}

export default function StudentTable({ columns, visibleColumns, selected, students }: Props) {

    const filteredColumns = columns.filter(c => visibleColumns.includes(c.key));

    return (
        <>
            <div className='cp-container-table'>
                <Table columns={filteredColumns} data={students} isRowSelected={(row) => selected.includes(row.id as number)} />
            </div>
        </>
    )
}