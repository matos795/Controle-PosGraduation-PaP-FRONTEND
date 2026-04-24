import SortBySelect from '../../../../../../components/SortBySelect';
import FilterSelect from '../../../../../../components/FilterSelect';
import FilterDateRange from '../../../../../../components/FilterDateRange';
import './styles.css'
import type { SubjectResponse } from '../../../../../../types/subject';

type Props = {
    setPage: (p: number) => void;
    sort: string;
    setSort: (sb: string) => void;
    sortDir: string;
    setSortDir: (sbd: string) => void;
    sortByOptions: string[];
    onClearFilters: () => void;
    subjects: SubjectResponse[];
    selectedSubject: number | string;
    onSubjectChange: (subjectId: number | string) => void;
    fromDate: string;
    toDate: string;
    onFromDateChange: (date: string) => void;
    onToDateChange: (date: string) => void;
    selectedYear: string;
    onYearChange: (year: string) => void;
}

export default function ClassSessionFilterPainel({
    sort,
    setSort,
    sortDir,
    setSortDir,
    sortByOptions,
    setPage,
    onClearFilters,
    subjects,
    selectedSubject,
    onSubjectChange,
    fromDate,
    toDate,
    onFromDateChange,
    onToDateChange,
    selectedYear,
    onYearChange
}: Props) {

    const subjectOptions = ["All", ...subjects.map(s => s.name)];
    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

    return (
        <>
            <div className="cp-filter-painel cp-mb20">

                <div className='cp-filter-painel-item'>
                    <label>Matéria:</label>
                    <FilterSelect
                        value={selectedSubject === "" ? "All" : subjects.find(s => s.id === selectedSubject)?.name || "All"}
                        onChange={(s) => {
                            const subject = subjects.find(sub => sub.name === s);
                            onSubjectChange(s === "All" ? "" : (subject?.id || ""));
                            setPage(0);
                        }}
                        options={subjectOptions}
                        placeholder="All Subjects"
                    />
                </div>

                <div className='cp-filter-painel-item'>
                    <label>Data:</label>
                    <FilterDateRange
                        fromDate={fromDate}
                        toDate={toDate}
                        onFromDateChange={(date) => {
                            onFromDateChange(date);
                            setPage(0);
                        }}
                        onToDateChange={(date) => {
                            onToDateChange(date);
                            setPage(0);
                        }}
                    />
                </div>

                <div className='cp-filter-painel-item'>
                    <label>Ano:</label>
                    <FilterSelect
                        value={selectedYear || "All"}
                        onChange={(year) => {
                            onYearChange(year === "All" ? "" : year);
                            setPage(0);
                        }}
                        options={["All", ...yearOptions]}
                        placeholder="All Years"
                    />
                </div>

                <div className='cp-filter-painel-item'>
                    <label>Ordenar por:</label>
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