import { createSelector } from 'reselect';
import { initialState } from './reducer';
const selectHome = state => state.get('home', initialState);
const makeSelectDevice = () =>
  createSelector(selectHome, homeState => homeState.get('device'));

export { makeSelectDevice };
