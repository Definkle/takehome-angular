import { User } from '../../models/user.model';

export const getUsersFromStorage = (): User[] => {
  return JSON.parse(localStorage.getItem('users') ?? '[]');
};

export const updateUsersInStorage = (updatedUsers: User[]): void => {
  localStorage.setItem('users', JSON.stringify(updatedUsers));
};
