import './styles.css'
import filterImg from '../../assets/filterSelect/filter.svg'
import { useEffect, useRef, useState } from 'react';

type Props = {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder?: string;
}

export default function FilterSelect({ value, onChange, options, placeholder = "Select" }: Props) {

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
            <div className="cp-filter" ref={ref}>
                <button className="cp-filter-btn" onClick={toggle}>
                    <img src={filterImg} alt="filter" />
                    <p>{value || placeholder}</p>
                    <span className="cp-filter-btn-arrow">▼</span>
                </button>

                {open && (
                    <div className="cp-filter-menu">

                        {options.map(s => (
                            <div className="cp-filter-item" onClick={() => selectOption(s)} key={(s === "ALL" ? "" : s)}>
                                {s}
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </>
    )
}