import FilterSelect from '../../../../components/FilterSelect';
import SortBySelect from '../../../../components/SortBySelect';
import './styles.css'

type Props = {
    status: string;
    setStatus: (s: string) => void;
    setPage: (p: number) => void;
    statusOptions: string[];
    sort: string;
    setSort: (sb: string) => void;
    sortDir: string;
    setSortDir: (sbd: string) => void;
    sortByOptions: string[];
}

export default function StudentFilterPanel({ status, setStatus, statusOptions, sort, setSort, sortDir, setSortDir, sortByOptions, setPage  }: Props) {
    return (
        <>
            <div className="cp-filter-painel cp-mb20">

                <div className='cp-filter-painel-item'>
                    <label>Status:</label>
                    <FilterSelect value={status || "All"} onChange={(s) => {
                        setStatus(s === "All" ? "" : s);
                        setPage(0);
                    }} options={statusOptions} placeholder="Status" />
                </div>

                <div className='cp-filter-painel-item'>
                    <label>Sort by:</label>
                    <SortBySelect value={sort || "Select Sorting"} onChange={(sb) => {
                        setSort(sb === "Select Sorting" ? "" : sb);
                        setPage(0);
                    }} options={sortByOptions} placeholder="Sort By"
                    sortDir={sortDir}
                    setSortDir={setSortDir} />
                </div>
            </div>
        </>
    )
}