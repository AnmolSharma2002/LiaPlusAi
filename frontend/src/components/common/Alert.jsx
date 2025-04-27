import { useContext } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { AlertContext } from '../../contexts/AlertContext';

const AlertDisplay = () => {
  const { alerts } = useContext(AlertContext);

  if (!alerts.length) {
    return null;
  }

  return (
    <Stack sx={{ width: '100%', mb: 2 }} spacing={2}>
      {alerts.map((alert) => (
        <Alert key={alert.id} severity={alert.type}>
          {alert.msg}
        </Alert>
      ))}
    </Stack>
  );
};

export default AlertDisplay;