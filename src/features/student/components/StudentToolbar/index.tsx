import ConfigButton from '../../../../components/ConfigButton'
import FilterButton from '../../../../components/FilterButton'
import FilterSelect from '../../../../components/FilterSelect'
import SearchBar from '../../../../components/SearchBar'
import ButtonPrimary from '../../../../components/SplitButtonPrimary'
import './styles.css'
import StudentFilterPainel from '../StudentFilterPanel'

type Props = {
    panel: "none" | "filter" | "config";
    setPanel: (p: "none" | "filter" | "config") => void;
    selected: number[];
}

export default function StudentToolbar({ panel, setPanel }: Props) {

    return (
        <>
            <div className='cp-toolbar cp-mb20'>
                <SearchBar />
                <FilterSelect />

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

                <ButtonPrimary text='Novo Aluno' />

            </div>

            {panel === "filter" && (
                <StudentFilterPainel />
            )}
        </>
    )
}