import { createAction, props } from '@ngrx/store';
import { UserForm } from '../models/user-form.model';


export const LoadCreateUserFormInfo = createAction(
  '[Create User] - Load Create User Form Info',
);

export const LoadCreateUserFormInfoSuccess = createAction(
  '[Create User] - Load Create User Form Info Success',
  props<{occupations: string[], states: any[]}>()
);

export const LoadCreateUserFormInfoError = createAction(
  '[Create User] - Load Create User Form Info Error',
  props<{error: Error}>()
);

export const submitUserInfo = createAction(
  '[Create User] - Submit User Info',
  props<{userForm: UserForm}>()
);

export const submitUserInfoSuccess = createAction(
  '[Create User] - Submit User Info Success',
);

export const submitUserInfoError = createAction(
  '[Create User] - Submit User Info Error',
  props<{error: Error}>()
);


