import { useEffect, useRef, useState } from 'react';
import './styles.css'
import type { Column } from '../../types/ColumnTable';
import type { StudentResponse } from '../../features/student/types/student';

type Props = {
    columns: Column<StudentResponse>[];
    visibleColumns: string[];
    setVisibleColumns: (cols: string[]) => void;
}

export default function ColumnsSelector({ columns, visibleColumns, setVisibleColumns }: Props) {

    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const toggle = () => {
        setOpen(!open);
    };

    const toggleColumn = (key: string) => {

        if(visibleColumns.includes(key)) {
            setVisibleColumns(visibleColumns.filter(c => c !== key));
        } else {
            setVisibleColumns([...visibleColumns, key]);
        }
    };

    // fechar ao clicar fora
        useEffect(() => {
    
            function handleClick(e: MouseEvent) {

                if (ref.current && !ref.current.contains(e.target as Node)) {
                    setOpen(false);
                }
            }
    
            document.addEventListener("click", handleClick);
    
            return () => {
                document.removeEventListener("click", handleClick);
            };
    
        }, []);

    return (
        <div className='cp-columns' ref={ref}>

            <button className='cp-btn cp-columns-btn' onClick={toggle}>
                Columns ▼
            </button>

            {open && (
                <div className='cp-columns-menu'>
                    {columns
                    .filter(c => c.hideable !== false)
                    .map(c => (
                        <label key={c.key}>
                            <input type="checkbox" 
                                   checked={visibleColumns.includes(c.key)}
                                   onChange={() => toggleColumn(c.key)} />
                            {c.label || c.key}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}