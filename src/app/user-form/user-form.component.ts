import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getErrorMessage } from '../models/error-messages.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      occupation: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  }

  getErrorMessage(formControl: AbstractControl | null): string {
    return getErrorMessage(formControl);
  }

  showError(formControl: AbstractControl | null): boolean {
    return !!formControl?.invalid && formControl.touched;
  }

}
