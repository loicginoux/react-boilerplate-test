/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */


import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import styles from './styles.css';
import RaisedButton from 'material-ui/RaisedButton';
import Footer from 'components/Footer';


export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  openAlertsPage = () => {
    this.openRoute('/alerts');
  };

  render() {
    return (
      <div>
        <h1>This is the Homepage!</h1>
        <ul>
          <li>
            <RaisedButton label="Alerts" primary onClick={this.openAlertsPage} /></li>
          <li>
            <RaisedButton label="home" secondary />
          </li>
        </ul>
        <Footer />
      </div>

    );
  }
}


HomePage.propTypes = {
  changeRoute: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(null, mapDispatchToProps)(HomePage);
