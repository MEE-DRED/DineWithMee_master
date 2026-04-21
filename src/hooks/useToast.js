import { useDispatch } from 'react-redux';
import {
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  showInfoToast,
  removeToast,
  clearToasts,
} from '../redux/slices/uiSlice';

export const useToast = () => {
  const dispatch = useDispatch();

  const success = (message, options = {}) => {
    dispatch(showSuccessToast({ message, ...options }));
  };

  const error = (message, options = {}) => {
    dispatch(showErrorToast({ message, ...options }));
  };

  const warning = (message, options = {}) => {
    dispatch(showWarningToast({ message, ...options }));
  };

  const info = (message, options = {}) => {
    dispatch(showInfoToast({ message, ...options }));
  };

  const remove = (id) => {
    dispatch(removeToast(id));
  };

  const clear = () => {
    dispatch(clearToasts());
  };

  return {
    success,
    error,
    warning,
    info,
    remove,
    clear,
  };
};

export default useToast;
