import { useState } from 'react';
import './styles.css'
import Modal from '../Modal';

type Props = {
    title: string;
    open: boolean;
    onClose: () => void;
    onExport: (scope: string, format: string) => void;
};

export default function ModalExport({ title, open, onClose, onExport }: Props) {

    const [scope, setScope] = useState("ALL");

    const [format, setFormat] = useState("CSV");

    return (

        <Modal open={open} onClose={onClose}>
            <div className="cp-modal-header">
                {title}
            </div>

            <div className="cp-modal-body">
                <div className='cp-form-group'>
                    <label>Scope</label>

                    <select value={scope} onChange={e => setScope(e.target.value)}>
                        <option value="ALL">ALL</option>
                        <option value="Filtered">Filtered</option>
                        <option value="Selected">Selected</option>
                    </select>
                </div>

                <div className='cp-form-group'>
                    <label>Format</label>

                    <select value={format} onChange={e => setFormat(e.target.value)}>
                        <option value="CSV">CSV</option>
                        <option value="EXCELL">Excell</option>
                        <option value="PDF">PDF</option>
                    </select>
                </div>
            </div>

            <div className="cp-modal-footer">

                <button className="cp-btn cp-btn-modal" onClick={onClose}>
                    Cancel
                </button>

                <button className="cp-btn cp-btn-modal cp-btn-primary" onClick={() => onExport(scope, format)}>
                    Export
                </button>
            </div>
        </Modal>
    )
}