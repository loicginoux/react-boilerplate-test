/*
 *
 * AlertsList
 *
 */

import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import {
  selectAlerts,
  selectLoading,
  selectError,
} from './selectors';

import { loadAlerts } from './actions';

import styles from './styles.css';

import LoadingIndicator from 'components/LoadingIndicator';
import List from 'components/List';
import ListItem from 'components/ListItem';
import AlertListItem from 'containers/AlertListItem';

export class AlertsList extends React.Component { // eslint-disable-line react/prefer-stateless-function
  openCreateAlertsPage = () =>
    this.props.changeRoute("/alerts/new");

  render() {
    console.log("this.props", this.props)
    let mainContent = null;
    // Show a loading indicator when we're loading
    if (this.props.loading) {
      mainContent = (<List component={LoadingIndicator} />);

    // Show an error if there is one
    } else if (this.props.error !== false) {
      const ErrorComponent = () => (
        <ListItem item={'Something went wrong, please try again!'} />
      );
      mainContent = (<List component={ErrorComponent} />);

    // If we're not loading, don't have an error and there are alerts, show the alerts
    } else if (this.props.alerts !== false) {
      mainContent = (<List items={this.props.alerts} component={AlertListItem} />);
    }

    return (
      <div className={styles.alertsList}>
        <h1>This is Alerts List page</h1>
        <p>
          <a className={styles.link} onClick={this.openCreateAlertsPage}>Create new keyword alerts</a>
        </p>
        <p>
          <button onClick={this.props.onLoadAlerts}>Click to load alerts</button>
        </p>
        {mainContent}
      </div>
    );
  }
}

AlertsList.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  alerts: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onLoadAlerts: React.PropTypes.func,
};


function mapDispatchToProps(dispatch) {
  return {
    onLoadAlerts: () => dispatch(loadAlerts()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  alerts: selectAlerts(),
  loading: selectLoading(),
  error: selectError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertsList);
