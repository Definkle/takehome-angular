import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  {
    path: 'list',
    title: 'List Users',
    loadComponent: () =>
      import('./components/user/list-users/list-users.component').then(
        (m) => m.ListUsersComponent,
      ),
  },
  {
    path: 'add',
    title: 'Add User',
    loadComponent: () =>
      import('./components/user/add-user/add-user.component').then(
        (m) => m.AddUserComponent,
      ),
  },
  {
    path: '**',
    title: 'Page not found',
    loadComponent: () =>
      import('./components/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent,
      ),
  },
];
