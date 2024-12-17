import React from 'react';
import clsx from 'clsx';

interface ToastProps {
    message: string;
    type: 'approve' | 'reject';

}

const Toast: React.FC<ToastProps> = ({ message, type }) => {
    const toastClass = clsx(
        "flex items-center justify-between p-4 rounded-lg shadow-lg ",
        {
            'bg-blue-20  font-family text-16 text-white': type === 'approve',
            'bg-red-30 font-family text-16 text-white': type === 'reject',
        }
    );

    return (
        <div className={toastClass}>
            <span>{message}</span>
        </div>
    );
};

export default Toast;
