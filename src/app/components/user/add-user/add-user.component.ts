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
import { UserDataService } from '../../../services/state/user/user-data.service';
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
    private userDataService: UserDataService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group(
      {
        firstName: this.formBuilder.control<string>('', Validators.required),
        lastName: this.formBuilder.control<string>('', Validators.required),
      },
      {
        validators: [FormValidator.checkIfUserAlreadyExists()],
      },
    );
  }

  addUser(): void {
    this.userDataService.addUser(this.userForm.getRawValue());
    this.userForm.reset();

    // Emits only when inside a dialog
    if (!this.route.snapshot.routeConfig) {
      this.addedAUser.emit();
    }
  }
}
