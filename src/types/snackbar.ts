// MATERIAL - UI
import { AlertProps } from '@mui/material/Alert';
import { SnackbarOrigin } from '@mui/material/Snackbar';

// ==============================|| TYPES - SNACKBAR  ||============================== //

export type SnackbarActionProps = {
  payload?: SnackbarProps;
};

export interface SnackbarProps {
  action: boolean;
  open: boolean;
  message: string;
  anchorOrigin: SnackbarOrigin;
  variant: string;
  alert: AlertProps;
  transition: string;
  close: boolean;
  actionButton: boolean;
  dense: boolean;
  maxStack: number;
  iconVariant: string;
}
