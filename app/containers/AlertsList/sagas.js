import { take, call, put, cancel, fork} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_ALERTS, DELETE_ALERT} from 'containers/AlertsList/constants';

import { 
  alertsLoaded, 
  alertLoadingError,
  alertDeletedSuccess,
  alertDeletedError
} from './actions';

import request from 'utils/request';


const API_ROOT = 'http://api.alerti.local/v3'
const API_TOKEN = '422bcf1e76d6b06c2dd24fafcae0d62efc2927c93355f893c18be53111b9'

export function* getAlerts(action) {
  const requestURL = API_ROOT + `/alerts.json?token=${API_TOKEN}&per_page=10`;

  // Call our request helper (see 'utils/request')
  const resp = yield call(request, requestURL);
  if (!resp.err) {
    yield put(alertsLoaded(resp.data.alerts));
  } else {
    yield put(alertLoadingError(resp.err));
  }
}

export function* delAlert(payload) {
  const id = payload.alert.id 
  const requestURL = API_ROOT + `/alerts/${id}?token=${API_TOKEN}`;
  const requestOptions = {
    'method': 'DELETE',
    // 'mode': 'no-cors',
    // 'headers': {
    //   'Accept': 'application/json',
    //   'Content-Type': 'application/json'
    // }
  };

  // // Call our request helper (see 'utils/request')
  const resp = yield call(request, requestURL, requestOptions);
  // if (!resp.err) {
  //   yield put(alertDeletedSuccess(payload.alert));
  // } else {
  //   yield put(alertDeletedError(payload.alert));
  // }
}

export function* getAlertsWatcher() {
  while (yield take(LOAD_ALERTS)) {
    yield call(getAlerts);
  }
}

export function* getDelAlertsWatcher() {
  while (true) {
    const action = yield take(DELETE_ALERT);
    yield call(delAlert, action)
  }
}

export function* alertsData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getAlertsWatcher);
  const watcherDelete = yield fork(getDelAlertsWatcher);

  // // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  // yield cancel(watcherDelete);
}


// All sagas to be loaded
export default [
  alertsData,
];

