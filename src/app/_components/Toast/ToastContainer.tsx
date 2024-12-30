import React, { useState, useImperativeHandle, forwardRef } from 'react';
import Toast from './Toast';

const ToastContainer = forwardRef((_, ref) => {
  const [toasts, setToasts] = useState<
    { id: number; message: string; type: 'approve' | 'reject' }[]
  >([]);

  const addToast = (message: string, type: 'approve' | 'reject') => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  // 외부에서 addToast 함수를 사용할 수 있도록 노출
  useImperativeHandle(ref, () => ({
    addToast,
  }));

  return (
    <div className='fixed bottom-4 right-4 space-y-2'>
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} />
      ))}
    </div>
  );
});

export default ToastContainer;
