import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUsers(): Observable<User[]> {
    return of(this._getUsersFromStorage());
  }

  addUser(newUser: User): void {
    console.log(newUser);
    const users = this._getUsersFromStorage();
    const newUsers = [...users, newUser];

    this._updateUsersInStorage(newUsers);
  }

  updateUser(updatedUser: User): User {
    const users = this._getUsersFromStorage();

    const updatedUsers = users.map((user) => {
      if (user.idNumber === updatedUser.idNumber) {
        return updatedUser;
      }
      return user;
    });

    this._updateUsersInStorage(updatedUsers);

    return updatedUser;
  }

  deleteUser({ firstName, lastName }: User): void {
    const users = this._getUsersFromStorage();
    const updatedUsers = users.filter(
      (user) => user.firstName !== firstName && user.lastName !== lastName,
    );
    this._updateUsersInStorage(updatedUsers);
  }

  private _getUsersFromStorage(): User[] {
    return JSON.parse(localStorage.getItem('users') ?? '[]');
  }

  private _updateUsersInStorage(updatedUsers: User[]): void {
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  }
}
