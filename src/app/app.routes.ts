import { Routes } from '@angular/router';
import { userResolver } from './utils/resolvers/user.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    title: 'List Users',
    loadComponent: () =>
      import('./components/user/list-users/list-users.component').then(
        (m) => m.ListUsersComponent,
      ),
    resolve: { data: userResolver },
  },
  {
    path: 'add',
    title: 'Add User',
    loadComponent: () =>
      import('./components/user/add-user/add-user.component').then(
        (m) => m.AddUserComponent,
      ),
    resolve: { data: userResolver },
  },
  {
    path: 'about',
    title: 'About',
    loadComponent: () =>
      import('./components/about/about.component').then(
        (m) => m.AboutComponent,
      ),
    resolve: { data: userResolver },
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
