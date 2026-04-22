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

  const success = (message) => {
    dispatch(showSuccessToast(message));
  };

  const error = (message) => {
    dispatch(showErrorToast(message));
  };

  const warning = (message) => {
    dispatch(showWarningToast(message));
  };

  const info = (message) => {
    dispatch(showInfoToast(message));
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
