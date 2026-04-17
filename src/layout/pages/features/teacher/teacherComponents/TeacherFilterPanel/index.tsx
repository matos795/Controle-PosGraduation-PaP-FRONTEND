import SortBySelect from '../../../../../../components/SortBySelect';
import './styles.css'

type Props = {
    setPage: (p: number) => void;
    sort: string;
    setSort: (sb: string) => void;
    sortDir: string;
    setSortDir: (sbd: string) => void;
    sortByOptions: string[];
    onClearFilters: () => void;
}

export default function TeacherFilterPanel({ sort, setSort, sortDir, setSortDir, sortByOptions, setPage, onClearFilters  }: Props) {
    return (
        <>
            <div className="cp-filter-painel cp-mb20">

                <div className='cp-filter-painel-item'>
                    <label>Sort by:</label>
                    <SortBySelect value={sort || "Sort By"} onChange={(sb) => {
                        setSort(sb === "Sort By" ? "" : sb);
                        setPage(0);
                    }} options={sortByOptions} placeholder="Sort By"
                    sortDir={sortDir}
                    setSortDir={setSortDir} />
                </div>

                <button className='cp-btn-clear' onClick={onClearFilters}>
                    Clear Filters
                </button>
            </div>
        </>
    )
}