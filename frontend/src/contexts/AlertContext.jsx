import { createContext, useState } from 'react';
import { toast } from 'react-toastify';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  // Set alert
  const setAlert = (msg, type, timeout = 5000) => {
    const id = Math.random().toString(36).substr(2, 9);
    
    setAlerts([...alerts, { id, msg, type }]);
    
    // Show toast notification
    switch (type) {
      case 'error':
        toast.error(msg);
        break;
      case 'success':
        toast.success(msg);
        break;
      case 'info':
        toast.info(msg);
        break;
      default:
        toast(msg);
    }
    
    setTimeout(() => removeAlert(id), timeout);
    return id;
  };

  // Remove alert
  const removeAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  // Success alert helper
  const success = (msg, timeout) => setAlert(msg, 'success', timeout);
  
  // Error alert helper
  const error = (msg, timeout) => setAlert(msg, 'error', timeout);
  
  // Info alert helper
  const info = (msg, timeout) => setAlert(msg, 'info', timeout);

  return (
    <AlertContext.Provider
      value={{
        alerts,
        setAlert,
        removeAlert,
        success,
        error,
        info
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};