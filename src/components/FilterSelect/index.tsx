import './styles.css'
import filterImg from '../../assets/filterSelect/filter.svg'
import { useEffect, useRef, useState } from 'react';

export default function FilterSelect() {

    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const toggle = () => {
        setOpen(!open);
    };

    const selectOption = (value: string) => {
        console.log(value);
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
                    <p>Filter</p>
                    <span className="cp-filter-btn-arrow">▼</span>
                </button>

                {open && (
                <div className="cp-filter-menu">

                    <div className="cp-filter-item" onClick={() => selectOption("status")}>
                        Status
                    </div>

                    <div className="cp-filter-item" onClick={() => selectOption("name")}>
                        Name
                    </div>

                    <div className="cp-filter-item" onClick={() => selectOption("email")}>
                        Email
                    </div>

                </div>
            )}
        </div >
        </>
    )
}