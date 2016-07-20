import { createSelector } from 'reselect';

/**
 * Direct selector to the alertForm state domain
 */
const selectAlertFormDomain = () => state => state.get('alertForm');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AlertForm
 */

const selectAlertForm = () => createSelector(
  selectAlertFormDomain(),
  (substate) => substate.toJS()
);

export default selectAlertForm;
export {
  selectAlertFormDomain,
};
