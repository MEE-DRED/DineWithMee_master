import React from 'react';
import { useSelector } from 'react-redux';
import { selectToasts } from '../../redux/slices/uiSlice';
import Toast from './Toast';

const ToastContainer = () => {
  const toasts = useSelector(selectToasts);

  return (
    <div className="fixed top-0 right-0 z-50 space-y-4 p-4">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
