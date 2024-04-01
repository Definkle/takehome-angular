import { createReducer, on } from '@ngrx/store';
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

export interface UserState {
  users: User[];
  previousId: number;
}
export const initialState: UserState = {
  users: [],
  previousId: 0,
};

export const userReducer = createReducer(
  initialState,
  on(loadUsers, (state) => state),
  on(loadUsersSuccess, (state, userState) => {
    return { ...state, ...userState };
  }),
  on(addUser, (state) => state),
  on(addUserSuccess, (state, { user }) => {
    return {
      ...state,
      users: [...state.users, user],
      previousId: user.idNumber,
    };
  }),
  on(updateUser, (state) => state),
  on(updateUserSuccess, (state, { updatedUser }) => {
    const users = state.users.map((user) => {
      if (user.idNumber === updatedUser.idNumber) return updatedUser;
      return user;
    });
    return {
      ...state,
      users,
      previousId: updatedUser.idNumber,
    };
  }),
  on(deleteUser, (state) => state),
  on(deleteUserSuccess, (state, { idNumber }) => {
    const users = state.users.filter((user) => user.idNumber !== idNumber);
    return { ...state, users };
  }),
);
