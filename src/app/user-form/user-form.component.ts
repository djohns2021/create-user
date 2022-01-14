import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { combineLatest, interval, Observable, of } from 'rxjs';
import { getErrorMessage } from '../models/error-messages.model';
import { UserForm } from '../models/user-form.model';
import { RegistrationService } from '../registration.service';
import { LoadCreateUserFormInfo } from '../store/create-user.actions';
import * as CreateInfoSelectors from '../store/app.selectors';
import { RootState } from '../store';
import { debounce, filter, map, startWith, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup = this.formBuilder.group({});
  states: { name: string; abbreviation: string }[] = [];
  occupations: string[] = [];

  public infoLoaded$: Observable<boolean>;
  // These typings could be improved
  states$: Observable<
    {
      name: string;
      abbreviation: string;
    }[]
  >;
  filteredStates$: Observable<
    {
      name: string;
      abbreviation: string;
    }[]
  >;

  occupations$: Observable<string[]>;
  filteredOccupations$: Observable<string[]>;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(LoadCreateUserFormInfo());
    this.infoLoaded$ = this.store.pipe(
      select(CreateInfoSelectors.selectFormInfoLoaded)
    );

    this.states$ = this.store.pipe(select(CreateInfoSelectors.selectStates));

    this.occupations$ = this.store.pipe(
      select(CreateInfoSelectors.selectOccupations)
    );

    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      occupation: ['', [Validators.required]],
      state: [undefined, [Validators.required]],
    });

    // Filters for the autocomplete
    this.filteredOccupations$ = combineLatest([
      this.occupations$,
      this.userForm
        .get('occupation')
        ?.valueChanges.pipe(startWith('')) as Observable<string>,
    ]).pipe(
      map(([occupations, filter]) =>
        occupations?.filter((o: string) =>
          o.toLowerCase().includes(filter?.toLowerCase())
        )
      )
    );

    this.filteredStates$ = combineLatest([
      this.states$,
      this.userForm
        .get('state')
        ?.valueChanges.pipe(startWith('')) as Observable<string>,
    ]).pipe(
      filter(([states, f]) => typeof f === 'string'),
      map(([states, f]) => {
        return states?.filter(
          (s) =>
            s.name.toLowerCase().includes(f?.toLowerCase()) ||
            s.abbreviation.toLowerCase().includes(f?.toLowerCase())
        )
      })
    );
  }

  getErrorMessage(formControl: AbstractControl | null): string {
    return getErrorMessage(formControl);
  }

  showError(formControl: AbstractControl | null): boolean {
    return !!formControl?.invalid && formControl.touched;
  }

  // tslint:disable-next-line: typedef
  displayState(state: { name: string; abbreviation: string }) {
    return state?.name ?? '';
  }

  submitForm(): void {
    const userData: UserForm = this.userForm.value;
    this.registrationService.saveRegistrationInfo(userData);
  }
}
