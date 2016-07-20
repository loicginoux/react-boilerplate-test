import { take, call, put, select, fork} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_ALERTS } from 'containers/AlertsList/constants';

import { alertsLoaded, alertLoadingError } from './actions';
import request from 'utils/request';


const API_ROOT = 'http://api.alerti.local/v3'
const API_TOKEN = 'ca6270f1a1d1ff222a511c83b8b5fcf967ea70adcc39363c0f4c4dcdbd8d'

export function* getAlerts() {
  const requestURL = API_ROOT + `/alerts.json?token=${API_TOKEN}`;

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

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}



// All sagas to be loaded
export default [
  alertsData,
];

