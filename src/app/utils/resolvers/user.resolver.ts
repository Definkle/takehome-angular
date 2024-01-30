import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, switchMap, tap } from 'rxjs';
import { User } from '../../services/models/user.model';
import { initUsers } from '../../services/state/user/user.actions';
import { UserState } from '../../services/state/user/user.reducer';
import { selectAllUsers } from '../../services/state/user/user.selectors';
import { UserService } from '../../services/state/user/user.service';

export const userResolver: ResolveFn<Observable<User[]>> = (): Observable<
  User[]
> => {
  const store = inject(Store<UserState>);
  const userService = inject(UserService);
  return store.select(selectAllUsers).pipe(
    switchMap((users) => {
      if (!users.length) {
        return userService
          .getUsers()
          .pipe(tap((users) => store.dispatch(initUsers({ users }))));
      }
      return of(users);
    }),
  );
};
