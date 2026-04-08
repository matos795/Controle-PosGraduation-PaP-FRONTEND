import './styles.css';

type Props = {
    message?: string;
};

export default function Loading({ message = "Loading..." }: Props) {
    return (
        <div className="cp-loading-container">
            <div className="cp-loading-spinner"></div>
            <p className="cp-loading-message">{message}</p>
        </div>
    );
}
