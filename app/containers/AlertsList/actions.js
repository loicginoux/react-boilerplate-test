/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_ALERTS,
  LOAD_ALERTS_SUCCESS,
  LOAD_ALERTS_ERROR,
} from './constants';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_ALERTS
 */
export function loadAlerts() {
  return {
    type: LOAD_ALERTS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_ALERTS_SUCCESS passing the repos
 */
export function alertsLoaded(alerts) {
  return {
    type: LOAD_ALERTS_SUCCESS,
    alerts
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_ALERTS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_ALERTS_ERROR,
    error,
  };
}
