import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { User } from '../../services/models/user.model';
import { getUsersFromStorage } from '../../services/state/user/user-data.store';

interface MatchingUserPayload {
  existingUsers: User[];
  firstName: string;
  lastName: string;
  idNumber?: number;
}

export class FormValidator {
  static checkIfUserAlreadyExists(idNumber?: number): ValidatorFn {
    return ({ value }: AbstractControl): ValidationErrors | null => {
      const { firstName, lastName } = value;
      if (!firstName.length || !lastName.length) {
        return null;
      }
      const existingUsers: User[] = getUsersFromStorage();

      let matchingUser = FormValidator._getMatchingUser({
        existingUsers,
        firstName,
        lastName,
        idNumber,
      });

      return matchingUser ? { userAlreadyExists: true } : null;
    };
  }

  private static _getMatchingUser({
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
