/**
 * AlertListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import { connect } from 'react-redux';

import ListItem from 'components/ListItem';

export class AlertListItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    // Put together the content of the repository
    const content = (
      <div>
        <p>{this.props.item.name}</p>
      </div>
    );

    // Render the content into a list item
    return (
      <ListItem key={`alert-list-item-${this.props.item.id}`} item={content} />
    );
  }
}

AlertListItem.propTypes = {
  item: React.PropTypes.object
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(AlertListItem);