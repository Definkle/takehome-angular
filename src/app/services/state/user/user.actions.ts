import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const loadUsers = createAction('[User] Load Users');

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[]; previousId: number }>(),
);

export const addUser = createAction('[User] Add User', props<{ user: User }>());
export const addUserSuccess = createAction(
  '[User] Add User Success',
  props<{ user: User }>(),
);
export const updateUser = createAction(
  '[User] Update User',
  props<{ updatedUser: User }>(),
);
export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ updatedUser: User }>(),
);
export const deleteUser = createAction(
  '[User] Delete User',
  props<{ idNumber: number }>(),
);
export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ idNumber: number }>(),
);
