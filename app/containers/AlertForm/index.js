/*
 *
 * AlertForm
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import selectAlertForm from './selectors';
import { createStructuredSelector } from 'reselect';

import { 
  changeLanguage,
  changeName,
  changeKeywords,
  createAlert
} from './actions'

import styles from './styles.css';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Router, RouterContext, Link, browserHistory } from 'react-router';

const items = [
  <MenuItem key={'fr'} value={'fr'} primaryText="French" />,
  <MenuItem key={'en'} value={'en'} primaryText="English" />
];

export class AlertForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor (props) {
    super(props);
    this.state = {
      nameErrorText: ""
    };
  }
  
  validateName = () =>{
    this.setState({
      nameErrorText: "This field is required"
    })
  }
  onSubmit = () => {
    this.props.changeRoute("/alerts");
    this.props.submitForm();
  }

  render() {
    return (
      <div className={styles.alertForm}>
        <h2>Create a new keyword alert</h2>
        <TextField 
          floatingLabelText="Alert Name" 
          onChange={this.props.onChangeName}
          onBlur={this.validateName}
          errorText={this.state.nameErrorText}
        />
        <br />
        <br />
        <TextField hintText="separate by a comma" 
                  floatingLabelText="At least one of these keywords"
                  onChange={this.props.onChangeKeywords}
        />
        <br />
        <br />
        <SelectField
          onChange={this.props.onChangeLangage}
          floatingLabelText="Language"
        >
          {items}
        </SelectField>
        <br />
        <br />
        <RaisedButton label="Create" primary={true} onClick={this.onSubmit}/>
        <br />
        <br />
        <RaisedButton label="Back" onClick={this.context.router.goBack}/>
      </div>
    );
  }
}

AlertForm.contextTypes = {
  router: React.PropTypes.object
};

AlertForm.propTypes = {
  onChangeLangage: React.PropTypes.func,
  onChangeName: React.PropTypes.func,
  onChangeKeywords: React.PropTypes.func
};


const mapStateToProps = selectAlertForm()

function mapDispatchToProps(dispatch) {
  return {
    onChangeLangage: (event, index, value) => dispatch(changeLanguage(value)),
    onChangeName: (event) => dispatch(changeName(event.target.value)),
    onChangeKeywords: (event) => dispatch(changeKeywords(event.target.value)),
    submitForm: () => dispatch(createAlert()),
    changeRoute: (url) => dispatch(push(url)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertForm);
