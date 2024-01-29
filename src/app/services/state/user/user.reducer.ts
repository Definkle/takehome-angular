import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { addUser, deleteUser, updateUser } from './user.actions';

export interface UserState {
  users: User[];
}
export const initialState: UserState = {
  users: [],
};

export const userReducer = createReducer(
  initialState,
  on(addUser, (state, { user }) => {
    const lastUser: User | undefined = [...state.users].pop();
    const users = [
      ...state.users,
      {
        ...user,
        idNumber: (lastUser?.idNumber ?? 0) + 1,
      },
    ];
    return { ...state, users };
  }),
  on(updateUser, (state, { updatedUser }) => {
    const updatedUsers = [...state.users].map((user) => {
      if (user.idNumber === user.idNumber) {
        return updatedUser;
      }
      return user;
    });
    const users = [...updatedUsers];
    return { ...state, users };
  }),
  on(deleteUser, (state, { idNumber }) => {
    const updatedUsers = [...state.users].filter(
      (user) => user.idNumber !== idNumber,
    );
    const users = [...updatedUsers];
    return { ...state, users };
  }),
);
