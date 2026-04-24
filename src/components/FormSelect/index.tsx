import { type ChangeEvent } from "react";
import "./styles.css";

type Props<T> = {
    label?: string;
    name: string;
    value: string | number;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    options: T[];

    getLabel: (item: T) => string;
    getValue: (item: T) => string | number;

    placeholder?: string;
    error?: string;
};

export default function FormSelect<T>({
    label,
    name,
    value,
    onChange,
    options,
    getLabel,
    getValue,
    placeholder,
    error
}: Props<T>) {
    return (
        <div className="cp-input">
            {label && <div className="cp-input-label">{label}</div>}

            <div className="cp-input-place">
                <select
                    name={name}
                    value={String(value)}
                    onChange={onChange}
                    className="cp-select"
                >
                    <option value="">
                        {placeholder || "Select..."}
                    </option>

                    {options.map((item) => {
                        const optionValue = String(getValue(item));
                        return (
                            <option key={optionValue} value={optionValue}>
                                {getLabel(item)}
                            </option>
                        );
                    })}
                </select>
            </div>

            {error && <span className="cp-error">{error}</span>}
        </div>
    );
}