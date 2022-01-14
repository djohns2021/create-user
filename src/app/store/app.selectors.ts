import { createSelector } from '@ngrx/store';

export const selectRootState = (state: any) => state.root;

export const selectOccupations = createSelector(
  selectRootState,
  state => state.occupations
);

export const selectStates = createSelector(
  selectRootState,
  state => state.states
);

export const selectFormInfoLoaded = createSelector(
  selectRootState,
  state => state.formInfoLoaded
);
