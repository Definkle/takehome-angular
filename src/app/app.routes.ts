import { Routes } from '@angular/router';
import { userResolver } from './utils/resolvers/user.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/shell/shell.component').then(
        (m) => m.ShellComponent,
      ),
    resolve: { data: userResolver },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/user').then((m) => m.UserModule),
      },

      {
        path: 'about',
        title: 'About',
        loadComponent: () =>
          import('./components/about').then((m) => m.AboutComponent),
      },
    ],
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
