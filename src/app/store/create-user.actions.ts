import { createAction, props } from '@ngrx/store';


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


