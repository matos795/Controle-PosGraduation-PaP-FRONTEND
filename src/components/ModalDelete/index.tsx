import Modal from "../Modal";
import './styles.css';

type Props = {
    feature: string;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    count: number;
};

export default function ModalDelete({ feature, open, onClose, onConfirm, count }: Props) {
    return (
            <Modal open={open} onClose={onClose}>

                <div className="cp-modal-header">
                    Delete {feature}
                </div>

                <div className="cp-modal-body">
                    Are you sure you want to delete {count} {feature}?
                </div>

                <div className="cp-modal-footer">

                    <button className="cp-btn cp-btn-modal" onClick={onClose}>
                        Cancel
                    </button>

                    <button className="cp-btn cp-btn-danger" onClick={onConfirm}>
                        Delete
                    </button>

                </div>
                </Modal>
            )
}