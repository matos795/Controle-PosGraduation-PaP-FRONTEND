import ConfigButton from '../../../../components/ConfigButton'
import FilterButton from '../../../../components/FilterButton'
import SearchBar from '../../../../components/SearchBar'
import ButtonPrimary from '../../../../components/SplitButtonPrimary'
import './styles.css'
import StudentFilterPainel from '../StudentFilterPanel'
import { NavLink } from 'react-router-dom'
import PageSizeSelect from '../../../../components/PageSizeSelect'

type Props = {
    panel: "none" | "filter" | "config";
    setPanel: (p: "none" | "filter" | "config") => void;
    search: string;
    setSearch: (v: string) => void;
    status: string;
    setStatus: (s: string) => void;
    studentStatus: string[];
    sort: string;
    setSort: (sb: string) => void;
    studentSort: string[];
    sortDir: string;
    setSortDir: (sbd: string) => void;
    setPage: (p: number) => void;
    size: number;
    setSize: (s: number) => void;
    onClearFilters: () => void;
}

export default function StudentToolbar({ panel, setPanel, search, setSearch, status, setStatus, studentStatus, sort, setSort, studentSort, sortDir, setSortDir, setPage, size, setSize, onClearFilters }: Props) {

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

                <NavLink to='/students/new'>
                    <ButtonPrimary text='Novo Aluno' />
                </NavLink>

            </div>

            {panel === "filter" && (
                <StudentFilterPainel
                    status={status}
                    setStatus={setStatus}
                    statusOptions={studentStatus}
                    sort={sort} setSort={setSort}
                    sortDir={sortDir} setSortDir={setSortDir}
                    sortByOptions={studentSort}
                    setPage={setPage}
                    onClearFilters={onClearFilters}
                />
            )}
        </>
    )
}