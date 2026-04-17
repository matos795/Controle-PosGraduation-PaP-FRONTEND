import ConfigButton from '../../../../../../components/ConfigButton'
import FilterButton from '../../../../../../components/FilterButton'
import SearchBar from '../../../../../../components/SearchBar'
import ButtonPrimary from '../../../../../../components/SplitButtonPrimary'
import './styles.css'
import { NavLink } from 'react-router-dom'
import PageSizeSelect from '../../../../../../components/PageSizeSelect'
import TeacherFilterPanel from '../TeacherFilterPanel'

type Props = {
    panel: "none" | "filter" | "config";
    setPanel: (p: "none" | "filter" | "config") => void;
    search: string;
    setSearch: (v: string) => void;
    sort: string;
    setSort: (sb: string) => void;
    teacherSort: string[];
    sortDir: string;
    setSortDir: (sbd: string) => void;
    setPage: (p: number) => void;
    size: number;
    setSize: (s: number) => void;
    onClearFilters: () => void;
}

export default function TeacherToolbar({ panel, setPanel, search, setSearch, sort, setSort, teacherSort, sortDir, setSortDir, setPage, size, setSize, onClearFilters }: Props) {

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

                <NavLink to='/teachers/new'>
                    <ButtonPrimary text='Novo Professor' />
                </NavLink>

            </div>

            {panel === "filter" && (
                <TeacherFilterPanel
                    sort={sort} setSort={setSort}
                    sortDir={sortDir} setSortDir={setSortDir}
                    sortByOptions={teacherSort}
                    setPage={setPage}
                    onClearFilters={onClearFilters}
                />
            )}
        </>
    )
}