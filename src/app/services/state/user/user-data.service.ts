import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { getUsersFromStorage, updateUsersInStorage } from './user-data.store';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor() {}

  listUsers(): User[] {
    return getUsersFromStorage();
  }

  addUser(newUser: Partial<User>): void {
    const users = getUsersFromStorage();
    const lastUser = [...users].pop();
    const newUsers = [
      ...users,
      { ...newUser, idNumber: (lastUser?.idNumber ?? 0) + 1 },
    ] as User[];

    updateUsersInStorage(newUsers);
  }

  updateUser(updatedUser: User): User {
    const users = getUsersFromStorage();

    const updatedUsers = users.map((user) => {
      if (user.idNumber === updatedUser.idNumber) {
        return updatedUser;
      }
      return user;
    });

    updateUsersInStorage(updatedUsers);

    return updatedUser;
  }

  deleteUser(idNumber: number): void {
    const users = getUsersFromStorage();
    const updatedUsers = users.filter((user) => user.idNumber !== idNumber);
    updateUsersInStorage(updatedUsers);
  }
}
