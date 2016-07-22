/*
 *
 * AlertForm reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_LANGUAGE,
  CHANGE_NAME,
  CHANGE_ANY_KEYWORDS,
  CREATE_ALERT,
} from './constants';

const initialState = fromJS({
  language: '',
  name: '',
  anyKeywords: '',
});

function alertFormReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return state.set('language', action.lang);
    case CHANGE_NAME:
      return state.set('name', action.name);
    case CHANGE_ANY_KEYWORDS:
      return state.set('anyKeywords', action.anyKeywords);
    case CREATE_ALERT:
      return state;
    default:
      return state;
  }
}

export default alertFormReducer;
