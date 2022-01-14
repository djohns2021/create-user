import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RegistrationService } from '../registration.service';
import * as CreateUserActions from './create-user.actions';

import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable()
export class AppEffects {

  loadCreateUserInfo$ = createEffect(() =>
  this.actions$.pipe(
    ofType(CreateUserActions.LoadCreateUserFormInfo),
    mergeMap(() => this.registrationService.getFormRegistrationInfo().pipe(
      map(({states, occupations}) => {
        return CreateUserActions.LoadCreateUserFormInfoSuccess({states, occupations});
      }),
      catchError(error => of(CreateUserActions.LoadCreateUserFormInfoError({error})))
    ))
  ));


  constructor(private actions$: Actions, private registrationService: RegistrationService) {}

}
