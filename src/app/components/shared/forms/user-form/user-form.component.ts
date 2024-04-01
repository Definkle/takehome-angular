import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FORM_ERROR_MESSAGES } from '../../../../utils/constants/form-error-messages.constant';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatLabel,
    MatButton,
    MatInput,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  @Input() userForm!: FormGroup;
  @Input() submitButtonLabel!: string;
  @Output() triggerCrudOperation = new EventEmitter();
  protected readonly FORM_ERROR_MESSAGES = FORM_ERROR_MESSAGES;
}
