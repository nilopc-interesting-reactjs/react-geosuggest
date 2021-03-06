'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// eslint-disable-line no-unused-vars

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _filterInputAttributes = require('./filter-input-attributes');

var _filterInputAttributes2 = _interopRequireDefault(_filterInputAttributes);

/**
 * The input field
 * @param {Object} props The component's props
 * @return {JSX} The icon component.
 */

var Input = (function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input() {
    _classCallCheck(this, Input);

    _get(Object.getPrototypeOf(Input.prototype), 'constructor', this).apply(this, arguments);
  }

  /**
   * Default values for the properties
   * @type {Object}
   */

  _createClass(Input, [{
    key: 'onChange',

    /**
     * When the input got changed
     */
    value: function onChange() {
      this.props.onChange(this.refs.input.value);
    }

    /**
     * When a key gets pressed in the input
     * @param  {Event} event The keypress event
     */
  }, {
    key: 'onInputKeyDown',
    value: function onInputKeyDown(event) {
      switch (event.which) {
        case 40:
          // DOWN
          event.preventDefault();
          this.props.onNext();
          break;
        case 38:
          // UP
          event.preventDefault();
          this.props.onPrev();
          break;
        case 13:
          // ENTER
          event.preventDefault();
          this.props.onSelect();
          break;
        case 27:
          // ESC
          this.props.onEscape();
          break;
        default:
          break;
      }
    }

    /**
     * Focus the input
     */
  }, {
    key: 'focus',
    value: function focus() {
      this.refs.input.focus();
    }

    /**
     * Render the view
     * @return {Function} The React element to render
     */
  }, {
    key: 'render',
    value: function render() {
      var attributes = (0, _filterInputAttributes2['default'])(this.props),
          classes = (0, _classnames2['default'])('geosuggest__input', this.props.className);

      return _react2['default'].createElement('input', _extends({ className: classes,
        ref: 'input',
        type: 'text',
        id: this.props.inputId
      }, attributes, {
        value: this.props.value,
        onKeyDown: this.onInputKeyDown.bind(this),
        onChange: this.onChange.bind(this),
        onFocus: this.props.onFocus.bind(this),
        onBlur: this.props.onBlur.bind(this) }));
    }
  }]);

  return Input;
})(_react2['default'].Component);

Input.defaultProps = {
  className: '',
  value: '',
  inputId: '',
  labelValue: '',
  onChange: function onChange() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  onNext: function onNext() {},
  onPrev: function onPrev() {},
  onSelect: function onSelect() {},
  onEscape: function onEscape() {}
};

exports['default'] = Input;
module.exports = exports['default'];