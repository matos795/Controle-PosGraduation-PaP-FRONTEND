import Table from '../../../../../../components/Table';
import type { Column } from '../../../../../../types/ColumnTable';
import type { SubjectResponse } from '../../../../../../types/subject';
import './styles.css';

type Props = {
    columns: Column<SubjectResponse>[];
    visibleColumns: string[];
    selected: number[];
    subjects: SubjectResponse[];
    loading: boolean;
}

export default function SubjectTable({ columns, visibleColumns, selected, subjects, loading }: Props) {

    const filteredColumns = columns.filter(c => visibleColumns.includes(c.key));

    return (
        <>
            <div className='cp-container-table'>
                <Table columns={filteredColumns} data={subjects} isRowSelected={(row) => selected.includes(row.id as number)} loading={loading} />
            </div>
        </>
    )
}