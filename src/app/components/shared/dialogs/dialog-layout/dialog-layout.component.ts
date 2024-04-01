import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-layout',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    MatButton,
    NgTemplateOutlet,
    NgClass,
  ],
  templateUrl: './dialog-layout.component.html',
  styleUrl: './dialog-layout.component.scss',
})
export class DialogLayoutComponent {
  @Input() dialogTitle = '';
  @Input() submitButtonLabel = '';
  @Input() submitButtonColor = 'primary';
  @Input() isForm = false;
}
