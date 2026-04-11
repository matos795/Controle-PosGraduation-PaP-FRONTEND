import './styles.css'
import { useEffect, useRef, useState } from "react";

type Props = {
    onEdit?: () => void;
    onDelete?: () => void;
    onView?: () => void;
};

export default function ActionMenu({ onEdit, onDelete, onView }: Props) {

    const [open, setOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

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

                        {onEdit &&
                            <div onClick={onEdit}>
                                Edit
                            </div>
                        }
                        {onView &&
                            <div onClick={onView}>
                                View
                            </div>
                        }
                        {onDelete &&
                            <div onClick={onDelete}>
                                Delete
                            </div>
                        }

                    </div>
                )}

            </div>
        </>
    )
}