import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import { addUser, deleteUser, updateUser } from './user.actions';

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
  on(addUser, (state, { user }) => {
    const lastUser: User | undefined = [...state.users].pop();
    const newId = (lastUser?.idNumber ?? 0) + 1;
    const users = [
      ...state.users,
      {
        ...user,
        idNumber: newId,
      },
    ];
    return { ...state, users, previousId: newId };
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
  on(deleteUser, (state, { userToDelete }) => {
    const updatedUsers = [...state.users].filter(
      (user) => user.idNumber !== userToDelete.idNumber,
    );
    const users = [...updatedUsers];
    return { ...state, users };
  }),
);
