import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogClose } from '@angular/material/dialog';
import { MatLabel } from '@angular/material/form-field';
import { MatError, MatFormField, MatInput } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { addUser } from '../../../services/state/user/user.actions';
import { UserState } from '../../../services/state/user/user.reducer';
import { FormValidator } from '../../../utils/validators/form-validators';
import { UserFormComponent } from '../../shared/forms/user-form/user-form.component';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInput,
    MatFormField,
    MatError,
    MatLabel,
    MatButton,
    MatDialogClose,
    UserFormComponent,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
  @Input() submitButtonLabel = 'Add';
  @Output() addedAUser = new EventEmitter();
  userForm!: FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private formValidators: FormValidator,
    private store: Store<UserState>,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group(
      {
        firstName: this.formBuilder.control<string>('', Validators.required),
        lastName: this.formBuilder.control<string>('', Validators.required),
      },
      {
        asyncValidators: [this.formValidators.checkIfUserAlreadyExists()],
      },
    );
  }

  addUser(): void {
    this.store.dispatch(addUser({ user: this.userForm.getRawValue() }));
    this.userForm.reset();

    // Emits only when inside a dialog
    if (!this.route.snapshot.routeConfig) {
      this.addedAUser.emit();
    }
  }
}
