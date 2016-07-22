/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import {
  LOAD_ALERTS_SUCCESS,
  LOAD_ALERTS,
  LOAD_ALERTS_ERROR,
  DELETE_ALERT,
} from './constants';

import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: fromJS({
    alerts: false,
  }),
});

function alertsListReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ALERTS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'alerts'], false);
    case LOAD_ALERTS_SUCCESS:
      return state
        .setIn(['userData', 'alerts'], action.alerts)
        .set('loading', false);
    case LOAD_ALERTS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case DELETE_ALERT:
      filter = (alert) => {
        return (alert.id !== action.alert.id);
      };
      const filteredAlerts = state.getIn(['userData', 'alerts']).filter(filter);
      return state.setIn(['userData', 'alerts'], filteredAlerts);
    default:
      return state;
  }
}

export default alertsListReducer;
