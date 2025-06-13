export type AlertState = 'success' | 'error' | 'warning' | 'info';

export interface AlertDialogConfig {
  type: AlertState;
  title?: string;
  message?: string;
  showCloseButton?: boolean;
  actionButtonsAlign?: 'start' | 'center' | 'end' | undefined;
  confirmButton?: AlertButton;
  cancelButton?: AlertButton;
}

export interface AlertButton {
  text: string;
  style?: 'basic' | 'stroked' | 'flat';
  visible?: boolean;
}

export interface AlertResponse {
  isConfirmed: boolean;
}
