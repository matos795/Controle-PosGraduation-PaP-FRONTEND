import { useEffect, useState } from 'react';
import './styles.css';

type ToastType = 'success' | 'error' | 'warning' | 'info';

type Props = {
    message: string;
    type?: ToastType;
    duration?: number;
    onClose?: () => void;
};

export default function Toast({ message, type = 'success', duration = 3000, onClose }: Props) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    return (
        <div className={`cp-toast cp-toast-${type}`}>
            <div className="cp-toast-content">
                <span className="cp-toast-icon">
                    {type === 'success' && '✓'}
                    {type === 'error' && '✕'}
                    {type === 'warning' && '⚠'}
                    {type === 'info' && 'ℹ'}
                </span>
                <p className="cp-toast-message">{message}</p>
            </div>
        </div>
    );
}
