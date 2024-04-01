import { Component } from '@angular/core';
import { UsersTableComponent } from './users-table';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [UsersTableComponent],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss',
})
export class ListUsersComponent {}
