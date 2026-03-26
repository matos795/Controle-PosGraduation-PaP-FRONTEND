import './styles.css'
import filterImg from '../../assets/filterSelect/filter.svg'
import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean; };

export default function FilterButton({ active, ...props }: Props) {
    return (
        <>
            <div className="cp-filterbutton">
                <button className={`${active ? "cp-filterbutton-active" : "cp-filterbutton-btn"}`} {...props}>
                <img src={filterImg} alt="filterButton" />
            </button>
        </div >
        </>
    )
}