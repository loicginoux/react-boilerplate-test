import { take, call, put, select } from 'redux-saga/effects';
import selectAlertForm from './selectors';
import { CREATE_ALERT } from './constants';
import { alertsCreated, alertCreatedError } from './actions';


import request from 'utils/request';


const API_ROOT = 'http://api.alerti.local/v3'
const API_TOKEN = '422bcf1e76d6b06c2dd24fafcae0d62efc2927c93355f893c18be53111b9'

export function* submitForm() {
  const requestURL = API_ROOT + `/alerts.json?token=${API_TOKEN}`;

  const formData = yield select(selectAlertForm());
  const requestOptions = {
    method: "POST",
    mode: 'no-cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "alert":{
          "name": formData.name,
          "alert_type":"keywords",
          "any_keywords": formData.any_keywords,
          "lang": formData.lang
      },
      "alert_retrieving":{
          "retrieve_blogs":true
      },
      "sharing": {
          "mail_alert":"none"
      }
    })
  }
  // Call our request helper (see 'utils/request')
  const resp = yield call(request, requestURL, requestOptions);
  if (!resp.err) {
    yield put(alertsCreated(resp.data));
  } else {
    yield put(alertCreatedError(resp.err));
  }
}


// Individual exports for testing
export function* defaultSaga() {
  while (yield take(CREATE_ALERT)) {
    yield call(submitForm);
  }
}

// All sagas to be loaded
export default [
  defaultSaga,
];