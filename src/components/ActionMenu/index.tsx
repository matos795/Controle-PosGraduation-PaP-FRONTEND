import './styles.css'
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

type Props = {
    id: number;
    onDelete?: () => void;
};

export default function ActionMenu({ id, onDelete }: Props) {

    const [open, setOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/students/${id}`);
    };

    const handleView = () => {
        navigate(`/students/${id}/view`);
    };

    const handleDelete = () => {
        setOpen(false);
        onDelete?.();
    };

    // fechar ao clicar fora
    useEffect(() => {

        function handleClickOutside(e: MouseEvent) {

            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };

    }, []);

    return (
        <>
            <div ref={ref} className="cp-actions">
                <button className='cp-actions-btn' onClick={() => setOpen(!open)}>...</button>

                {open && (
                    <div className="cp-actions-menu">

                        <div onClick={handleEdit}>
                            Edit
                        </div>
                        <div onClick={handleView}>
                            View
                        </div>
                        <div onClick={handleDelete}>
                            Delete
                        </div>

                    </div>
                )}

            </div>
        </>
    )
}