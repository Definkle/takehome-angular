import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from '../../../user/add-user/add-user.component';
import { DialogLayoutComponent } from '../dialog-layout/dialog-layout.component';

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [DialogLayoutComponent, AddUserComponent],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss',
})
export class AddUserDialogComponent {
  private dialog = inject(MatDialogRef);
  readonly dialogTitle = 'Add User';
  readonly submitButtonLabel = 'Add';
  readonly isForm = true;

  catchAddUserEvent(): void {
    this.dialog.close(true);
  }
}
