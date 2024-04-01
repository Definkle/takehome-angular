import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map, of, take } from 'rxjs';
import { User } from '../../services/models/user.model';
import { UserState } from '../../services/state/user/user.reducer';
import { selectAllUsers } from '../../services/state/user/user.selectors';

interface MatchingUserPayload {
  existingUsers: User[];
  firstName: string;
  lastName: string;
  idNumber?: number;
}

@Injectable({
  providedIn: 'root',
})
export class FormValidator {
  constructor(private store: Store<UserState>) {}
  checkIfUserAlreadyExists(idNumber?: number): AsyncValidatorFn {
    return ({ value }: AbstractControl) => {
      const { firstName, lastName } = value;
      if (!firstName.length || !lastName.length) {
        return of(null);
      }
      return this.store.pipe(
        select(selectAllUsers),
        map((existingUsers) => {
          let matchingUser = this._getMatchingUser({
            existingUsers,
            firstName,
            lastName,
            idNumber,
          });
          return matchingUser ? { userAlreadyExists: true } : null;
        }),
        take(1),
      );
    };
  }

  private _getMatchingUser({
    existingUsers,
    firstName,
    lastName,
    idNumber,
  }: MatchingUserPayload): User | undefined {
    if (idNumber !== undefined) {
      return existingUsers.find(
        (user) =>
          user.firstName === firstName &&
          user.lastName === lastName &&
          user.idNumber !== idNumber,
      );
    }

    return existingUsers.find(
      (user) => user.firstName === firstName && user.lastName === lastName,
    );
  }
}
