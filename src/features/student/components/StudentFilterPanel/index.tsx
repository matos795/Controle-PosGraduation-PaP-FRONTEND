import FilterSelect from '../../../../components/FilterSelect';
import './styles.css'

type Props = {
    status: string;
    setStatus: (s: string) => void;
    setPage: (p: number) => void;
    options: string[];
}

export default function StudentFilterPanel({ status, setStatus, setPage, options }: Props) {
    return (
        <>
            <div className="cp-filter-painel cp-mb20">

                <div className='cp-filter-painel-item'>
                    <label>Status:</label>
                    <FilterSelect value={status || "ALL"} onChange={(s) => {
                        setStatus(s === "ALL" ? "" : s);
                        setPage(0);
                    }} options={options} placeholder="Status" />
                </div>

                <div className='cp-filter-painel-item'>
                    <label>Sort by:</label>
                    <select>
                        <option>Name</option>
                        <option>Email</option>
                    </select>
                </div>



                <button className='cp-btn-clear'>
                    Clear Filters
                </button>
            </div>
        </>
    )
}