import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        title: 'List Users',
        loadChildren: () =>
          import('./list-users').then((m) => m.ListUsersComponent),
      },
      {
        path: 'add',
        title: 'Add User',
        loadChildren: () =>
          import('./add-user').then((m) => m.AddUserComponent),
      },
    ]),
  ],
  exports: [RouterModule],
})
export class UserRoutingModule {}
