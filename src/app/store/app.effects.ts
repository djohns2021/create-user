import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RegistrationService } from '../registration.service';
import * as CreateUserActions from './create-user.actions';

import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AppEffects {
  loadCreateUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateUserActions.LoadCreateUserFormInfo),
      mergeMap(() =>
        this.registrationService.getFormRegistrationInfo().pipe(
          map(({ states, occupations }) => {
            return CreateUserActions.LoadCreateUserFormInfoSuccess({
              states,
              occupations,
            });
          }),
          catchError((error) =>
            of(CreateUserActions.LoadCreateUserFormInfoError({ error }))
          )
        )
      )
    )
  );

  submitUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateUserActions.submitUserInfo),
      mergeMap((action) =>
        this.registrationService.saveRegistrationInfo(action.userForm).pipe(
          map(() => {
            this.snackBar.open(
              'Your user was created successfully!',
              undefined,
              { duration: 10, verticalPosition: 'top' }
            );
            return CreateUserActions.submitUserInfoSuccess();
          }),
          catchError((error) => {
            this.snackBar.open(
              'There was an error creating your user, please try again later.',
              undefined,
              { duration: 10, verticalPosition: 'top' }
            );
            return of(CreateUserActions.submitUserInfoError({ error }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private registrationService: RegistrationService,
    private snackBar: MatSnackBar
  ) {}
}
