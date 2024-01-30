import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, of } from 'rxjs';
import { User } from '../../models/user.model';
import {
  addUser,
  addUserSuccess,
  deleteUser,
  deleteUserSuccess,
  loadUsers,
  loadUsersSuccess,
  updateUser,
  updateUserSuccess,
} from './user.actions';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UserEffects {
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      exhaustMap(() => {
        const users = this.userService.getUsers();
        const lastUser: User | undefined = [...users].pop();
        const previousId = lastUser?.idNumber ?? 0;
        return of(loadUsersSuccess({ users, previousId }));
      }),
    ),
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUser),
      exhaustMap(({ user }) => {
        this.userService.addUser(user);
        return of(addUserSuccess({ user }));
      }),
    ),
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      exhaustMap(({ updatedUser }) => {
        this.userService.updateUser(updatedUser);
        return of(updateUserSuccess({ updatedUser }));
      }),
    ),
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      exhaustMap(({ idNumber }) => {
        this.userService.deleteUser(idNumber);
        return of(deleteUserSuccess({ idNumber }));
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {}
}
