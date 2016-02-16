import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';

import filterLabelAttributes from './filter-input-attributes';

/**
 * The input field
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */
class Label extends React.Component {

  /**
   * Render the view
   * @return {Function} The React element to render
   */
  render() {
    return <label htmlFor={this.props.inputId}>{this.props.labelValue}</label>;
  }
}

/**
 * Default values for the properties
 * @type {Object}
 */
Label.defaultProps = {
  inputId: '',
  labelValue: ''
};

export default Label;
