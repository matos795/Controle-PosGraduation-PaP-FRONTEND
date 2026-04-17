import ColumnsSelector from '../../../../../../components/ColumnsSelector';
import type { Column } from '../../../../../../types/ColumnTable';
import type { TeacherResponse } from '../../../../../../types/teachers';
import './styles.css'

type Props = {
    selectedCount: number;
    clearSelection: () => void;
    onDelete: () => void;
    onExport: () => void;
    onImport: () => void;
    columns: Column<TeacherResponse>[];
    visibleColumns: string[];
    setVisibleColumns: (cols: string[]) => void;
};

export default function TeacherConfigPanel({ 
    selectedCount, 
    clearSelection, 
    onDelete, 
    onExport, 
    onImport,
    columns,
    visibleColumns,
    setVisibleColumns}: Props) {

    return (
        <>
            <div className="cp-config-painel cp-mb20">
                <div className='cp-config-left'>
                    <span className='cp-config-selected'>
                        selected teachers: {selectedCount} 
                    </span>
                </div>

                <div className='cp-config-actions'>
                    <button className='cp-btn cp-config-btn' onClick={onExport}>Export</button>
                    <button className='cp-btn cp-config-btn' onClick={onImport}>Import</button>
                    <button className='cp-btn cp-btn-danger' onClick={onDelete}>Delete</button>
                    <ColumnsSelector columns={columns} visibleColumns={visibleColumns} setVisibleColumns={setVisibleColumns} />
                    <button className='cp-btn cp-config-btn' onClick={clearSelection}>Clear</button>
                </div>
            </div>
        </>
    )
}