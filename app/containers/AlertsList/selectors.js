import { createSelector } from 'reselect';

const selectGlobalAlerts = () => (state) => state.get('alerts');

const selectLoading = () => createSelector(
  selectGlobalAlerts(),
  (alertsPageState) => alertsPageState.get('loading')
);

const selectError = () => createSelector(
  selectGlobalAlerts(),
  (alertsPageState) => alertsPageState.get('error')
);

const selectAlerts = () => createSelector(
  selectGlobalAlerts(),
  (alertsPageState) => alertsPageState.getIn(['userData', 'alerts'])
);

export {
  selectGlobalAlerts,
  selectLoading,
  selectError,
  selectAlerts,
};
