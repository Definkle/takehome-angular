import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');
export const selectAllUsers = createSelector(
  selectUserState,
  (user) => user.users,
);
