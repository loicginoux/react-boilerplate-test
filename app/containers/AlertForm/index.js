/*
 *
 * AlertForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectAlertForm from './selectors';
import styles from './styles.css';

export class AlertForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.alertForm}>
        This is AlertForm container !
      </div>
    );
  }
}

const mapStateToProps = selectAlertForm();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertForm);
