import ConfigButton from '../../../../../../components/ConfigButton'
import FilterButton from '../../../../../../components/FilterButton'
import SearchBar from '../../../../../../components/SearchBar'
import ButtonPrimary from '../../../../../../components/SplitButtonPrimary'
import './styles.css'
import { NavLink } from 'react-router-dom'
import PageSizeSelect from '../../../../../../components/PageSizeSelect'
import ClassSessionFilterPainel from '../ClassSessionFilterPainel'
import type { SubjectResponse } from '../../../../../../types/subject'

type Props = {
    panel: "none" | "filter" | "config";
    setPanel: (p: "none" | "filter" | "config") => void;
    search: string;
    setSearch: (v: string) => void;
    sort: string;
    setSort: (sb: string) => void;
    classSessionSort: string[];
    sortDir: string;
    setSortDir: (sbd: string) => void;
    setPage: (p: number) => void;
    size: number;
    setSize: (s: number) => void;
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

export default function ClassSessionToolbar({ 
    panel, 
    setPanel, 
    search, 
    setSearch, 
    sort, 
    setSort, 
    classSessionSort, 
    sortDir, 
    setSortDir, 
    setPage, 
    size, 
    setSize, 
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

    return (
        <>
            <div className='cp-toolbar cp-mb20'>
                <SearchBar value={search} onChange={(v) => {
                    setSearch(v);
                    setPage(0);
                }} />

                <PageSizeSelect value={size} onChange={(s) => {
                    setSize(s);
                    setPage(0);
                }} />

                <div className='cp-toolbar-buttons'>
                    <FilterButton
                        active={panel === "filter"}
                        onClick={() =>
                            setPanel(panel === "filter" ? "none" : "filter")
                        } />
                    <ConfigButton
                        active={panel === "config"}
                        onClick={() =>
                            setPanel(panel === "config" ? "none" : "config")
                        } />
                </div>

                <NavLink to='/class-sessions/new'>
                    <ButtonPrimary text='Novo Módulo' />
                </NavLink>

            </div>

            {panel === "filter" && (
                <ClassSessionFilterPainel
                    sort={sort}
                    setSort={setSort}
                    sortDir={sortDir}
                    setSortDir={setSortDir}
                    sortByOptions={classSessionSort}
                    setPage={setPage}
                    onClearFilters={onClearFilters}
                    subjects={subjects}
                    selectedSubject={selectedSubject}
                    onSubjectChange={onSubjectChange}
                    fromDate={fromDate}
                    toDate={toDate}
                    onFromDateChange={onFromDateChange}
                    onToDateChange={onToDateChange}
                    selectedYear={selectedYear}
                    onYearChange={onYearChange}
                />
            )}
        </>
    )
}