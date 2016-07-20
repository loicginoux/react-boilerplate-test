import expect from 'expect';
import alertFormReducer from '../reducer';
import { fromJS } from 'immutable';

describe('alertFormReducer', () => {
  it('returns the initial state', () => {
    expect(alertFormReducer(undefined, {})).toEqual(fromJS({}));
  });
});
