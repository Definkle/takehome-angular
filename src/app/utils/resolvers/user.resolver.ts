import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUsers } from '../../services/state/user/user.actions';
import { UserState } from '../../services/state/user/user.reducer';

export const userResolver: ResolveFn<void> = (): void =>
  inject(Store<UserState>).dispatch(loadUsers());
