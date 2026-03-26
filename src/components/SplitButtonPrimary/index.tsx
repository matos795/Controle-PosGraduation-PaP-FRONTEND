import './styles.css'

type Props = {
    text: string;
}

export default function ButtonPrimary({ text }: Props) {
    return (
        <>
            <div className="cp-btn cp-btn-blue">
                {text} ▼
            </div>
        </>
    )
}