import './styles.css'
import { useEffect, useRef, useState } from 'react';

type Props = {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder?: string;
    sortDir: string;
    setSortDir: (sbd: string) => void;
}

export default function SortBySelect({ value, onChange, options, placeholder = "Select", sortDir, setSortDir }: Props) {

    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const toggle = () => {
        setOpen(!open);
    };

    const selectOption = (value: string) => {
        onChange(value);
        setOpen(false);
    };

    useEffect(() => {

        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };

    }, []);

    return (
        <>
            <div className="cp-sort" ref={ref}>
                <div className='cp-sort-container'>
                    <button type="button" className="cp-sort-btn" onClick={toggle}>
                        <p>{value || placeholder}</p>
                        <span className="cp-select-btn-arrow">▼</span>
                    </button>
                    <button type="button" className='cp-sort-direction-btn' onClick={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')}>
                        <span className="cp-direction-icon">{sortDir === 'asc' ? '↑' : '↓'}</span>
                    </button>
                </div>


                {open && (
                    <div className="cp-sort-menu">

                        {options.map(s => (
                            <div className="cp-sort-item" onClick={() => selectOption(s)} key={(s === "ALL" ? "" : s)}>
                                {s}
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </>
    )
}