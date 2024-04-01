import { Routes } from '@angular/router';
import { userResolver } from './utils/resolvers/user.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components').then((m) => m.ShellComponent),
    resolve: { data: userResolver },
    children: [
      {
        path: '',
        loadChildren: () => import('./components').then((m) => m.UserModule),
      },

      {
        path: 'about',
        title: 'About',
        loadComponent: () =>
          import('./components').then((m) => m.AboutComponent),
      },
    ],
  },
  {
    path: '**',
    title: 'Page not found',
    loadComponent: () =>
      import('./components').then((m) => m.PageNotFoundComponent),
  },
];
