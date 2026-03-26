import './styles.css'

type Column = {
    key: string;
    label: string;
    header?: () => React.ReactNode;
    render?: (row: Record<string, unknown>) => React.ReactNode;
};

type Props = {
    columns: Column[];
    data: Record<string, unknown>[];
    isRowSelected?: (row: Record<string, unknown>) => boolean;
};

export default function Table({ columns, data, isRowSelected }: Props) {
    return (
        <>
            <div className='cp-table-content cp-mb20'>
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
                        {data.map((row, i) => (
                            <tr key={i}
                                className={isRowSelected && isRowSelected(row) ? "cp-table-row-selected" : ""}
                            >
                                {columns.map(c => (
                                    <td key={c.key}>
                                        {c.render
                                            ? c.render(row)
                                            : String(row[c.key])
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