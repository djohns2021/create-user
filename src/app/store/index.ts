import {
  Action,
  createReducer,
  MetaReducer,
  on
} from '@ngrx/store';
import * as CreateUserActions from './create-user.actions';

export interface RootState {
  occupations: string[];
  states: {
    name: string;
    abbreviation: string;
  }[];
  formInfoLoaded: boolean;
}

export const initializeRootState = (): RootState => ({
  occupations: [],
  states: [],
  formInfoLoaded: false
});

export const metaReducers: MetaReducer<RootState>[] = [];

const reducer = createReducer(
  initializeRootState(),
  on(CreateUserActions.LoadCreateUserFormInfoSuccess, (state, {occupations, states}) => ({
    ...state,
    occupations,
    states,
    formInfoLoaded: true
  }))
);

export const StoreReducer = (state: RootState | undefined, action: Action) =>
  reducer(state, action);
