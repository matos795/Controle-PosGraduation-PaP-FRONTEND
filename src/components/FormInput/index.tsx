import { type ChangeEvent, useState } from 'react';
import './styles.css'

type Props = {
    label?: string;
    type: string;
    placeholder?: string;
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

export default function FormInput({ label, type, placeholder, name, value, onChange, error }: Props) {

    const [inputType, setInputType] = useState(type === "date" ? "text" : type);

    return (
        <div className="cp-input">
            <div className="cp-input-label">
                {label}
            </div>
            <div  className="cp-input-place">
                <input type={inputType}
                    placeholder={placeholder}
                    onFocus={() => {
                        if (type === "date") setInputType("date");
                    }}
                    onBlur={(e) => {
                        if (type === "date" && !e.target.value) {
                            setInputType("text");
                        }
                    }}
                    name={name}
                    value={value}
                    onChange={onChange} />
            </div>
            {error && <span className='cp-error'>{error}</span>}
        </div>
    )
}