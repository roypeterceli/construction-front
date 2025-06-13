export type ConfirmState = 'success' | 'error' | 'warning' | 'info';

export interface ConfirmDialogConfig {
  type: ConfirmState;
  title?: string;
  message?: string;
  showCloseButton?: boolean;
  input?: string;
  actionButtonsAlign?: 'start' | 'center' | 'end' | undefined;
  confirmButton?: ConfirmButton;
  cancelButton?: ConfirmButton;
}

export interface ConfirmButton {
  text: string;
  style?: 'basic' | 'stroked' | 'flat';
  visible?: boolean;
}

export interface ConfirmResponse {
  isConfirmed: boolean;
}
