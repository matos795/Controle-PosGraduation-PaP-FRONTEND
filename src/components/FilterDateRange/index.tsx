import type { ChangeEvent } from 'react';
import './styles.css'

type Props = {
    fromDate: string;
    toDate: string;
    onFromDateChange: (date: string) => void;
    onToDateChange: (date: string) => void;
}

export default function FilterDateRange({ fromDate, toDate, onFromDateChange, onToDateChange }: Props) {

    const handleFromChange = (e: ChangeEvent<HTMLInputElement>) => {
        onFromDateChange(e.target.value);
    };

    const handleToChange = (e: ChangeEvent<HTMLInputElement>) => {
        onToDateChange(e.target.value);
    };

    return (
        <div className="cp-filter-date-range">
            <input
                type="date"
                value={fromDate}
                onChange={handleFromChange}
                className="cp-filter-date-input"
                title="From date"
            />
            <span className="cp-filter-date-separator">→</span>
            <input
                type="date"
                value={toDate}
                onChange={handleToChange}
                className="cp-filter-date-input"
                title="To date"
            />
        </div>
    )
}
