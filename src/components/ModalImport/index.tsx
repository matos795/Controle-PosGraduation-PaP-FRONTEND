import { useState } from 'react';
import './styles.css'
import Modal from '../Modal';

type Props = {
    title: string;
    open: boolean;
    onClose: () => void;
    onImport: (file: File | null) => void;
};

export default function ModalImport({ title, open, onClose, onImport }: Props) {

    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>

            <div className="cp-modal-header">
                {title}
            </div>

            <div className="cp-modal-body">
                <div className='cp-upload'>

                    <input type="file" accept='.csv,.xlsx' onChange={handleFileChange} />

                    {file && (
                        <p className='cp-file-name'>
                            {file.name}
                        </p>
                    )}
                </div>
            </div>

            <div className="cp-modal-footer">

                <button className="cp-btn cp-btn-modal" onClick={onClose}>
                    Cancel
                </button>

                <button className="cp-btn cp-btn-modal cp-btn-primary" onClick={() => onImport(file)} disabled={!file}>
                    Import
                </button>
            </div>
        </Modal>
    );
}