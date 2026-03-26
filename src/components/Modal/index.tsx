import './styles.css'

type Props = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: Props) {

    if (!open) return null;

    return (
        <div className="cp-modal-overlay">
            <div className="cp-modal">
                <button className="cp-modal-close" onClick={onClose}>✕</button>
                {children}
            </div>
        </div>
    )
}