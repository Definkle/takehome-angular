import { Component, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { User } from '../../../../services/models/user.model';
import { DialogLayoutComponent } from '../dialog-layout/dialog-layout.component';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    DialogLayoutComponent,
  ],
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.scss',
})
export class DeleteConfirmationComponent {
  readonly dialogTitle = 'Delete User';
  readonly submitButtonLabel = 'Delete';
  readonly submitButtonColor = 'warn';
  constructor(@Inject(MAT_DIALOG_DATA) public data: { userToDelete: User }) {}
}
