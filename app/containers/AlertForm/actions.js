/*
 *
 * AlertForm actions
 *
 */

import {
  CHANGE_LANGUAGE,
  CHANGE_NAME,
  CHANGE_ANY_KEYWORDS,
  CREATE_ALERT,
  ALERT_CREATED_SUCCESS,
  ALERT_CREATED_ERROR,
} from './constants';

export function changeLanguage(lang) {
  return {
    type: CHANGE_LANGUAGE,
    lang,
  };
}

export function changeName(name) {
  return {
    type: CHANGE_NAME,
    name,
  };
}

export function changeKeywords(anyKeywords) {
  return {
    type: CHANGE_ANY_KEYWORDS,
    anyKeywords,
  };
}

export function createAlert(alert) {
  return {
    type: CREATE_ALERT,
    alert,
  };
}

export function alertsCreated(alert) {
  return {
    type: ALERT_CREATED_SUCCESS,
    alert,
  };
}

export function alertCreatedError(error) {
  return {
    type: ALERT_CREATED_ERROR,
    error,
  };
}
