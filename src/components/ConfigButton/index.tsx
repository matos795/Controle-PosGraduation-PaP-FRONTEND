import './styles.css'
import configImg from '../../assets/filterSelect/config.svg'
import type { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean; };

export default function ConfigButton({ active, ...props }: Props) {
    return(
        <>
            <div className="cp-configbutton">
                <button className={`${active ? "cp-configbutton-active" : "cp-configbutton-btn"}`} { ... props }>
                    <img src={configImg} alt="configButton" />
                </button>
        </div >
        </>
    )
}