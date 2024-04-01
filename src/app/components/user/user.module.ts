import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      {
        path: 'list',
        title: 'List Users',
        loadComponent: () =>
          import('./list-users').then((m) => m.ListUsersComponent),
      },
      {
        path: 'add',
        title: 'Add User',
        loadComponent: () =>
          import('./add-user').then((m) => m.AddUserComponent),
      },
    ]),
  ],
})
export class UserModule {}
