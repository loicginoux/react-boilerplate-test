/**
 * AlertListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import { connect } from 'react-redux';

import { deleteAlert } from 'containers/AlertsList/actions';

import ListItem from 'components/ListItem';
import RaisedButton from 'material-ui/RaisedButton';

import styles from './styles.css';

export class AlertListItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  onDelete = () => {
    this.props.onDelete(this.props.item);
  };

  render() {
    // Put together the content of the repository
    let mainContent = null;
    if (this.props.item) {
      const content = (
        <div>
          <RaisedButton label="Delete" onClick={this.onDelete} className={styles.delButton} />
          <p>{this.props.item.name}</p>
        </div>
      );
      mainContent = (<ListItem key={`alert-list-item-${this.props.item.id}`} item={content} />);
    } else {
      mainContent = (<ListItem item={'deleted!'} />);
    }
    // Render the content into a list item
    return (
      <div>{mainContent}</div>
    );
  }
}

AlertListItem.propTypes = {
  item: React.PropTypes.object,
  onDelete: React.PropTypes.func,
};


function mapDispatchToProps(dispatch) {
  return {
    onDelete: (alert) => dispatch(deleteAlert(alert)),
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(AlertListItem);
