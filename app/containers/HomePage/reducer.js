import { fromJS } from 'immutable';

import { ADD_DEVICE } from './constants';

// The initial state of the App
export const initialState = fromJS({
  device: null,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_DEVICE:
      return state.set('device', action.device);
    default:
      return state;
  }
}

export default homeReducer;
