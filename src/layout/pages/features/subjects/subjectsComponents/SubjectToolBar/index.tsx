import ConfigButton from '../../../../../../components/ConfigButton';
import FilterButton from '../../../../../../components/FilterButton';
import SearchBar from '../../../../../../components/SearchBar';
import ButtonPrimary from '../../../../../../components/SplitButtonPrimary';
import SubjectFilterPanel from '../SubjectFilterPanel';
import './styles.css'

type Props = {
    panel: "none" | "filter" | "config";
    setPanel: (p: "none" | "filter" | "config") => void;
    search: string;
    setSearch: (v: string) => void;
    sort: string;
    setSort: (sb: string) => void;
    subjectSort: string[];
    sortDir: string;
    setSortDir: (sbd: string) => void;
    onClearFilters: () => void;
    onCreate: () => void;
}

export default function SubjectToolBar({ panel, setPanel, search, setSearch, sort, setSort, subjectSort, sortDir, setSortDir, onClearFilters, onCreate }: Props) {
    return (
        <>
            <div className='cp-toolbar cp-mb20'>
                <SearchBar value={search} onChange={(v) => {
                    setSearch(v);
                }} />

                <div className='cp-toolbar-buttons'>
                    <FilterButton
                        active={panel === "filter"}
                        onClick={() =>
                            setPanel(panel === "filter" ? "none" : "filter")
                        }
                    />
                    <ConfigButton
                        active={panel === "config"}
                        onClick={() =>
                            setPanel(panel === "config" ? "none" : "config")
                        }
                    />
                </div>

                <ButtonPrimary text='Nova Matéria' onCreate={onCreate} />
            </div>

            {panel === "filter" && (
                <SubjectFilterPanel
                    sort={sort} 
                    setSort={setSort}
                    sortDir={sortDir} 
                    setSortDir={setSortDir}
                    sortByOptions={subjectSort}
                    onClearFilters={onClearFilters}
                />
            )}
        </>
    );
}