import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService, TOKEN_LOCAL_STORAGE_KEY } from '@wow/core/services';
import { AlertDialogService } from '@wow/shared/components/alert';
import { fadeInUp400ms } from '@wow/shared/animations';
import { MatSelectModule } from '@angular/material/select';
import { FormValidator } from '@wow/shared/utils';

@Component({
  selector: 'wow-login-page',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule
  ],
  animations: [fadeInUp400ms],
  templateUrl: './login.page.html',
  host: {
    class: 'w-full'
  }
})
export class LoginPage implements OnInit {

  loginForm = new FormGroup<any>({});
  formValidator!: FormValidator;
  hidden = signal<boolean>(true);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alertService = inject(AlertDialogService);
  private authService = inject(AuthService);



  ngOnInit(): void {
    this.initLoginForm();
  }

  // login(): void {
  //   this.router.navigate(['/construccion'])
  // }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // const { email, password } = this.loginForm.value;

    this.authService.login(TOKEN_LOCAL_STORAGE_KEY).subscribe(res => {
     
        this.router.navigate(['/construccion']).then();

    })
  }

  private unauthorizedMessage(): void {
    this.alertService.error({
      title: 'Acceso restringido',
      message: '¡Uy! No tienes acceso. Si crees que es un error, comunícate con tu administrador.',
    })
  }

  toggleVisibility(): void {
    this.hidden.set(!this.hidden());
  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.formValidator = new FormValidator(this.loginForm);
  }

}
