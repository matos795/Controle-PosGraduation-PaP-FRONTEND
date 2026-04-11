import './styles.css'

type Props = {
    text: string;
    onCreate?: () => void;
}

export default function ButtonPrimary({ text, onCreate }: Props) {
    return (
        <>
            <div className="cp-btn cp-btn-blue" onClick={onCreate}>
                {text} ▼
            </div>
        </>
    )
}