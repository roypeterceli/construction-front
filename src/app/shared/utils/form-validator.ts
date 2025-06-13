import { FormGroup } from '@angular/forms';

export class FormValidator {

  messages?: Record<string, Record<string, string>>;

  constructor(private form: FormGroup,
              messages?: Record<string, Record<string, string>>) {
    this.messages = messages;
  }

  hasError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  getErrorMessage(
    controlName: string
  ): string | null {
    const control = this.form.get(controlName);
    if (!control || !control.errors || (!control.touched && !control.dirty)) return null;

    const controlMessages = this.messages?.[controlName];

    if (control.hasError('required')) {
      return controlMessages?.['required'] || 'Este campo es obligatorio';
    }

    if (control.hasError('email')) {
      return controlMessages?.['email'] || 'Ingrese un email válido';
    }

    if (control.hasError('minlength')) {
      const requiredLength = control.getError('minlength').requiredLength;
      return controlMessages?.['minlength'] || `Debe tener mínimo ${ requiredLength } caracteres`;
    }

    if (control.hasError('maxlength')) {
      const requiredLength = control.getError('maxlength').requiredLength;
      return controlMessages?.['maxlength'] || `Debe tener máximo ${ requiredLength } caracteres`;
    }

    if (control.hasError('pattern')) {
      return controlMessages?.['pattern'] || 'Formato inválido';
    }

    return null;
  }

  enableControls(controls: string[]): void {
    this.toggleFormControls(controls, true);
  }

  disableControls(controls: string[]): void {
    this.toggleFormControls(controls, false);
  }

  toggleFormControls(
    controlNames: string[],
    enable: boolean
  ): void {
    controlNames.forEach(controlName => {
      const control = this.form.get(controlName);
      if (control) {
        enable ? control.enable() : control.disable();
      }
    });
  }

}
