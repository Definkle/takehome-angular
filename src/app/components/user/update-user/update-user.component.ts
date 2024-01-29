import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { User } from '../../../services/models/user.model';
import { UserDataService } from '../../../services/state/user/user-data.service';
import { FORM_ERROR_MESSAGES } from '../../../utils/constants/form-error-messages.constant';
import { FormValidator } from '../../../utils/validators/form-validators';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatLabel,
    MatButton,
    MatInput,
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss',
})
export class UpdateUserComponent implements OnInit {
  @Input() submitButtonLabel = 'Update';
  @Input() userToUpdate!: User;
  @Output() updatedUser = new EventEmitter();
  readonly FORM_ERROR_MESSAGES = FORM_ERROR_MESSAGES;
  userForm!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private userDataService: UserDataService,
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group(
      {
        idNumber: this.formBuilder.control<number>(this.userToUpdate.idNumber),
        firstName: this.formBuilder.control<string>(
          this.userToUpdate.firstName,
          Validators.required,
        ),
        lastName: this.formBuilder.control<string>(
          this.userToUpdate.lastName,
          Validators.required,
        ),
      },
      {
        validators: [
          FormValidator.checkIfUserAlreadyExists(this.userToUpdate.idNumber),
        ],
      },
    );
  }

  updateUser(): void {
    const updatedUser = this.userForm.getRawValue();
    this.userDataService.updateUser(updatedUser);
    this.updatedUser.emit(updatedUser);
  }
}
