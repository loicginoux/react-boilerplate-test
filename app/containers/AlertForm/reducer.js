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
  any_keywords: ''
});

function alertFormReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return state
              .set('language', action.lang);
    case CHANGE_NAME:
      return state
              .set('name', action.name);
    case CHANGE_ANY_KEYWORDS:
      return state
              .set('any_keywords', action.any_keywords);
    case CREATE_ALERT:
      console.log("state", state.toJS())
      return state
    default:
      return state;
  }
}

export default alertFormReducer;
