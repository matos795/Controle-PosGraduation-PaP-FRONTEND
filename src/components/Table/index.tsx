import './styles.css'
import Loading from '../Loading';
import type { Column } from '../../types/ColumnTable'

type Props<T> = {
    columns: Column<T>[];
    data: T[];
    isRowSelected?: (row: T) => boolean;
    loading: boolean;
};

export default function Table<T>({ columns, data, isRowSelected, loading }: Props<T>) {
    
    if (loading) {
        return <Loading />
    }

    return (
        <>
            <div className='cp-table-content'>
                <table className='cp-table'>
                    <thead>
                        <tr>
                            {columns.map(c => (
                                <th key={c.key}>
                                    {c.header ? c.header() : c.label}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {
                            data.map((row, i) => (
                                <tr key={i}
                                    className={isRowSelected && isRowSelected(row) ? "cp-table-row-selected" : ""}
                                >
                                    {columns.map(c => (
                                        <td key={c.key}>
                                            {c.render
                                                ? c.render(row)
                                                : String(row[c.key as keyof T])
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}