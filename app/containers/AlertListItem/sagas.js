import { take, call, put, cancel, fork} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_ALERTS } from 'containers/AlertsList/constants';

import { alertsLoaded, alertLoadingError } from './actions';
import request from 'utils/request';


const API_ROOT = 'http://api.alerti.local/v3'
const API_TOKEN = '422bcf1e76d6b06c2dd24fafcae0d62efc2927c93355f893c18be53111b9'

export function* getAlerts(action) {
  console.log("action", action)
  const requestURL = API_ROOT + `/alerts.json?token=${API_TOKEN}&per_page=50`;

  // Call our request helper (see 'utils/request')
  const resp = yield call(request, requestURL);
  if (!resp.err) {
    yield put(alertsLoaded(resp.data.alerts));
  } else {
    yield put(alertLoadingError(resp.err));
  }
}


export function* getAlertsWatcher() {
  while (yield take(LOAD_ALERTS)) {
    yield call(getAlerts);
  }
}


export function* alertsData() {
  // Fork watcher so we can continue execution
  const watcher = yield fork(getAlertsWatcher);

  // // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}



// All sagas to be loaded
export default [
  alertsData,
];

