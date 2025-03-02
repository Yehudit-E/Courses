import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button'; // עבור כפתורים
import { MatFormFieldModule } from '@angular/material/form-field'; // עבור שדות טופס
import { MatSelectModule } from '@angular/material/select'; // עבור בחירות
import { MatInputModule } from '@angular/material/input'; // עבור שדות קלט
import { Router } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { AuthService } from '../../service/auth/auth.service';
import { User } from '../../models/User';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule,MatFormFieldModule,MatSelectModule,MatInputModule,MatIconModule,MatCardModule,MatStepperModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userForm: FormGroup;
  passwordHide: boolean = true;

  constructor(private fb: FormBuilder,private authService: AuthService,private router:Router) {
    this.userForm = this.fb.group({
      name:['',Validators.required],
      role:['',Validators.required],
      email:['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      password:['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/)]],
    });
  }
  toggleForm = () => {
    this.router.navigate(['/']);
  }

  togglePasswordVisibility() {
    this.passwordHide = !this.passwordHide; // שינוי מצב הסיסמה
  }
  onSubmit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    let u = new User(0,
                  this.userForm.get('name')?.value,
                 this.userForm.get('email')?.value,
                 this.userForm.get('password')?.value,
                  this.userForm.get('role')?.value);
    this.authService.register(u);
    this.toggleForm();
  }
}
