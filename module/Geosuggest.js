/* global window */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _filterInputAttributes = require('./filter-input-attributes');

var _filterInputAttributes2 = _interopRequireDefault(_filterInputAttributes);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _label = require('./label');

var _label2 = _interopRequireDefault(_label);

var _suggestList = require('./suggest-list');

var _suggestList2 = _interopRequireDefault(_suggestList);

// Escapes special characters in user input for regex
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

/**
 * Entry point for the Geosuggest component
 */

var Geosuggest = (function (_React$Component) {
  _inherits(Geosuggest, _React$Component);

  /**
   * The constructor. Sets the initial state.
   * @param  {Object} props The properties object.
   */

  function Geosuggest(props) {
    _classCallCheck(this, Geosuggest);

    _get(Object.getPrototypeOf(Geosuggest.prototype), 'constructor', this).call(this, props);
    this.state = {
      isMounted: false,
      isSuggestsHidden: true,
      userInput: this.props.initialValue,
      activeSuggest: null,
      suggests: []
    };
  }

  /**
   * Default values for the properties
   * @type {Object}
   */

  /**
   * Change inputValue if prop changes
   * @param {Object} props The new props
   */

  _createClass(Geosuggest, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.props.initialValue !== props.initialValue) {
        this.setState({ userInput: props.initialValue });
      }
    }

    /**
     * Called on the client side after component is mounted.
     * Google api sdk object will be obtained and cached as a instance property.
     * Necessary objects of google api will also be determined and saved.
     */
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ userInput: this.props.initialValue });

      var googleMaps = this.props.googleMaps || window.google && // eslint-disable-line no-extra-parens
      window.google.maps || this.googleMaps;

      if (!googleMaps) {
        console.error( // eslint-disable-line no-console
        'Google map api was not found in the page.');
        return;
      }
      this.googleMaps = googleMaps;

      this.autocompleteService = new googleMaps.places.AutocompleteService();
      this.geocoder = new googleMaps.Geocoder();

      this.setState({ isMounted: true });
    }

    /**
     * When the component will unmount
     */
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.setState({ isMounted: false });
    }

    /**
     * When the input got changed
     * @param {String} userInput The input value of the user
     */
  }, {
    key: 'onInputChange',
    value: function onInputChange(userInput) {
      var _this = this;

      this.setState({ userInput: userInput }, function () {
        _this.showSuggests();
        _this.props.onChange(userInput);
      });
    }

    /**
     * When the input gets focused
     */
  }, {
    key: 'onInputFocus',
    value: function onInputFocus() {
      this.props.onFocus();
      this.showSuggests();
    }

    /**
     * When the input gets blurred
     */
  }, {
    key: 'onInputBlur',
    value: function onInputBlur() {
      if (!this.state.ignoreBlur) {
        this.hideSuggests();
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
     * Update the value of the user input
     * @param {String} userInput the new value of the user input
     */
  }, {
    key: 'update',
    value: function update(userInput) {
      this.setState({ userInput: userInput });
      this.props.onChange(userInput);
    }

    /*
     * Clear the input and close the suggestion pane
     */
  }, {
    key: 'clear',
    value: function clear() {
      var _this2 = this;

      this.setState({ userInput: '' }, function () {
        return _this2.hideSuggests();
      });
    }

    /**
     * Search for new suggests
     */
  }, {
    key: 'searchSuggests',
    value: function searchSuggests() {
      var _this3 = this;

      if (!this.state.userInput) {
        this.updateSuggests();
        return;
      }

      var options = {
        input: this.state.userInput
      };

      ['location', 'radius', 'bounds', 'types'].forEach(function (option) {
        if (_this3.props[option]) {
          options[option] = _this3.props[option];
        }
      });

      if (this.props.country) {
        options.componentRestrictions = {
          country: this.props.country
        };
      }

      this.autocompleteService.getPlacePredictions(options, function (suggestsGoogle) {
        _this3.updateSuggests(suggestsGoogle || []); // can be null

        if (_this3.props.autoActivateFirstSuggest) {
          _this3.activateSuggest('next');
        }
      });
    }

    /**
     * Update the suggests
     * @param  {Array} suggestsGoogle The new google suggests
     */
  }, {
    key: 'updateSuggests',
    value: function updateSuggests() {
      var _this4 = this;

      var suggestsGoogle = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      var suggests = [],
          regex = new RegExp(escapeRegExp(this.state.userInput), 'gim'),
          skipSuggest = this.props.skipSuggest;

      this.props.fixtures.forEach(function (suggest) {
        if (!skipSuggest(suggest) && suggest.label.match(regex)) {
          suggest.placeId = suggest.label;
          suggests.push(suggest);
        }
      });

      suggestsGoogle.forEach(function (suggest) {
        if (!skipSuggest(suggest)) {
          suggests.push({
            label: _this4.props.getSuggestLabel(suggest),
            placeId: suggest.place_id
          });
        }
      });

      this.setState({ suggests: suggests });
    }

    /**
     * Show the suggestions
     */
  }, {
    key: 'showSuggests',
    value: function showSuggests() {
      this.searchSuggests();
      this.setState({ isSuggestsHidden: false });
    }

    /**
     * Hide the suggestions
     */
  }, {
    key: 'hideSuggests',
    value: function hideSuggests() {
      var _this5 = this;

      this.props.onBlur();
      setTimeout(function () {
        if (_this5.state && _this5.state.isMounted) {
          _this5.setState({ isSuggestsHidden: true });
        }
      }, 100);
    }

    /**
     * Activate a new suggest
     * @param {String} direction The direction in which to activate new suggest
     */
  }, {
    key: 'activateSuggest',
    value: function activateSuggest(direction) {
      // eslint-disable-line complexity
      if (this.state.isSuggestsHidden) {
        this.showSuggests();
        return;
      }

      var suggestsCount = this.state.suggests.length - 1,
          next = direction === 'next';
      var newActiveSuggest = null,
          newIndex = 0,
          i = 0;

      for (i; i <= suggestsCount; i++) {
        if (this.state.suggests[i] === this.state.activeSuggest) {
          newIndex = next ? i + 1 : i - 1;
        }
      }

      if (!this.state.activeSuggest) {
        newIndex = next ? 0 : suggestsCount;
      }

      if (newIndex >= 0 && newIndex <= suggestsCount) {
        newActiveSuggest = this.state.suggests[newIndex];
      }

      this.setState({ activeSuggest: newActiveSuggest });
    }

    /**
     * When an item got selected
     * @param {GeosuggestItem} suggest The selected suggest item
     */
  }, {
    key: 'selectSuggest',
    value: function selectSuggest(suggest) {
      if (!suggest) {
        suggest = {
          label: this.state.userInput
        };
      }

      this.setState({
        isSuggestsHidden: true,
        userInput: suggest.label
      });

      if (suggest.location) {
        this.setState({ ignoreBlur: false });
        this.props.onSuggestSelect(suggest);
        return;
      }

      this.geocodeSuggest(suggest);
    }

    /**
     * Geocode a suggest
     * @param  {Object} suggest The suggest
     */
  }, {
    key: 'geocodeSuggest',
    value: function geocodeSuggest(suggest) {
      var _this6 = this;

      this.geocoder.geocode(suggest.placeId ? { placeId: suggest.placeId } : { address: suggest.label }, function (results, status) {
        if (status !== _this6.googleMaps.GeocoderStatus.OK) {
          return;
        }

        var gmaps = results[0],
            location = gmaps.geometry.location;

        suggest.gmaps = gmaps;
        suggest.location = {
          lat: location.lat(),
          lng: location.lng()
        };

        _this6.props.onSuggestSelect(suggest);
      });
    }

    /**
     * Render the view
     * @return {Function} The React element to render
     */
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var attributes = (0, _filterInputAttributes2['default'])(this.props),
          classes = (0, _classnames2['default'])('geosuggest', this.props.className);

      return _react2['default'].createElement(
        'div',
        { className: classes },
        _react2['default'].createElement(_input2['default'], _extends({ className: this.props.inputClassName,
          ref: 'input',
          value: this.state.userInput,
          inputId: this.props.inputId,
          onChange: this.onInputChange.bind(this),
          onFocus: this.onInputFocus.bind(this),
          onBlur: this.onInputBlur.bind(this),
          onNext: function () {
            return _this7.activateSuggest('next');
          },
          onPrev: function () {
            return _this7.activateSuggest('prev');
          },
          onSelect: function () {
            return _this7.selectSuggest(_this7.state.activeSuggest);
          },
          onEscape: this.hideSuggests.bind(this)
        }, attributes)),
        _react2['default'].createElement(_label2['default'], { inputId: this.props.inputId, labelValue: this.props.labelValue }),
        _react2['default'].createElement(_suggestList2['default'], {
          isHidden: this.state.isSuggestsHidden,
          suggests: this.state.suggests,
          activeSuggest: this.state.activeSuggest,
          onSuggestMouseDown: function () {
            return _this7.setState({ ignoreBlur: true });
          },
          onSuggestMouseOut: function () {
            return _this7.setState({ ignoreBlur: false });
          },
          onSuggestSelect: this.selectSuggest.bind(this) })
      );
    }
  }]);

  return Geosuggest;
})(_react2['default'].Component);

Geosuggest.defaultProps = _defaults2['default'];

exports['default'] = Geosuggest;
module.exports = exports['default'];