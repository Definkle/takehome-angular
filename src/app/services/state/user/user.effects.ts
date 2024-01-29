import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { exhaustMap, map, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { addUser, deleteUser, updateUser } from './user.actions';
import { UserState } from './user.reducer';
import { selectPreviousId } from './user.selectors';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UserEffects {
  addUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addUser),
        exhaustMap(({ user }) =>
          this.store
            .select(selectPreviousId)
            .pipe(map((previousId) => [previousId, user])),
        ),
        tap(([previousId, user]) =>
          this.userService.addUser({
            ...(user as User),
            idNumber: +previousId,
          }),
        ),
      ),
    { dispatch: false },
  );

  updateUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateUser),
        tap(({ updatedUser }) => this.userService.updateUser(updatedUser)),
      ),
    { dispatch: false },
  );

  deleteUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteUser),
        tap(({ userToDelete }) => this.userService.deleteUser(userToDelete)),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private store: Store<UserState>,
    private userService: UserService,
  ) {}
}
