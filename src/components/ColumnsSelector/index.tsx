import { useEffect, useRef, useState } from 'react';
import './styles.css'
import type { Column } from '../../features/student/types/StudentTable';

type Props = {
    columns: Column[];
    visibleColumns: string[];
    setVisibleColumns: (cols: string[]) => void;
}

export default function ColumnsSelector({ columns, visibleColumns, setVisibleColumns }: Props) {

    const [open, setOpen] = useState(false);

    const toggleColumn = (key: string) => {

        if(visibleColumns.includes(key)) {
            setVisibleColumns(visibleColumns.filter(c => c !== key));
        } else {
            setVisibleColumns([...visibleColumns, key]);
        }
    };

    const ref = useRef<HTMLDivElement>(null);

    // fechar ao clicar fora
        useEffect(() => {
    
            function handleClickOutside(e: MouseEvent) {
    
                if (ref.current && !ref.current.contains(e.target as Node)) {
                    setOpen(false);
                }
            }
    
            document.addEventListener(
                "mousedown",
                handleClickOutside
            );
    
            return () => {
                document.removeEventListener(
                    "mousedown",
                    handleClickOutside
                );
            };
    
        }, []);

    return (
        <div className='cp-columns'>

            <button className='cp-btn cp-columns-btn' onClick={() => setOpen(!open)}>
                Columns ▼
            </button>

            {open && (
                <div ref={ref} className='cp-columns-menu'>
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