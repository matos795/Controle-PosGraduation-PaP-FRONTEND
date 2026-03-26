import './styles.css'

type Props = {
    status: string;
}

export default function StatusBadge({ status }: Props) {
    return(
        <>
            <span className={`cp-status cp-status-${status.toLowerCase()}`}>
                {status}
            </span>
        </>
    )
}