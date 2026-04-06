import './styles.css';

type Props = {
    value: number;
    onChange: (size: number) => void;
};

export default function PageSizeSelect({ value, onChange }: Props) {

    const options = [ 5, 10, 20, 50 ];

    return (
        <select className='cp-pageSize-select' value={value} onChange={(e) => onChange(Number(e.target.value))}>
            {options.map((o) => (
                <option key={o} value={o}>
                    {o}
                </option>
            ))}
        </select>
    )
}