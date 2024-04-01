import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { User } from '../../../../services/models/user.model';
import { updateUser } from '../../../../services/state/user/user.actions';
import { UserState } from '../../../../services/state/user/user.reducer';
import { FormValidator } from '../../../../utils/validators/form-validators';
import { UserFormComponent } from '../../forms/user-form/user-form.component';
import { DialogLayoutComponent } from '../dialog-layout/dialog-layout.component';

@Component({
  selector: 'app-update-user-dialog',
  standalone: true,
  imports: [
    DialogLayoutComponent,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    UserFormComponent,
  ],
  templateUrl: './update-user-dialog.component.html',
  styleUrl: './update-user-dialog.component.scss',
})
export class UpdateUserDialogComponent implements OnInit {
  readonly dialogTitle = 'Update User';
  readonly isForm = true;
  submitButtonLabel = 'Update';
  userForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { userToUpdate: User },
    public dialog: MatDialogRef<UpdateUserDialogComponent>,
    private formBuilder: NonNullableFormBuilder,
    private formValidators: FormValidator,
    private store: Store<UserState>,
  ) {}

  ngOnInit(): void {
    const { idNumber, firstName, lastName } = this.data.userToUpdate;

    this.userForm = this.formBuilder.group(
      {
        idNumber: this.formBuilder.control<number>(idNumber),
        firstName: this.formBuilder.control<string>(
          firstName,
          Validators.required,
        ),
        lastName: this.formBuilder.control<string>(
          lastName,
          Validators.required,
        ),
      },
      {
        asyncValidators: [
          this.formValidators.checkIfUserAlreadyExists(idNumber),
        ],
      },
    );
  }

  updateUser(): void {
    this.store.dispatch(
      updateUser({ updatedUser: this.userForm.getRawValue() }),
    );
    this.dialog.close(this.userForm.getRawValue());
  }
}
