import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connectTheme } from '../../../utils';

const isLimPrim = function(input) {
  return { string: '', number: '' }.hasOwnProperty(typeof input);
};

const optTypeCheck = function(option) {
  if (Array.isArray(option)) return isLimPrim(option[0]) ? 'array' : false;
  else return isLimPrim(option) ? 'lim-prim' : false;
};

const radioPropCheck = function(options, idx) {
  if (!optTypeCheck(options[idx])) {
    throw new Error(
      `Invalid type [ ${typeof options[idx]} ] of option
      Label in Radio. Validation failed.`
    );
  }
};

class Radio extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { checked: this.props.checked || 0 };
    this.handleChecked = this.handleChecked.bind(this);
  }

  handleChecked(i) {
    this.setState({ checked: i });
  }

  static get propTypes() {
    return {
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.arrayOf((children, key) => radioPropCheck(children, key)),
      ]),
      name: PropTypes.string.isRequired,
      onChange: PropTypes.func,
      placeholder: PropTypes.string,
      style: PropTypes.object,
      theme: PropTypes.object,
      type: PropTypes.string,
      value: PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      onChange: function() {},
      type: 'text',
    };
  }

  render() {
    const {
      children,
      className,
      name,
      onChange,
      placeholder,
      style,
      theme,
      type,
      value,
      ...otherProps
    } = this.props;

    return children.map((option, idx) => {
      const radioType = optTypeCheck(option);
      const optLabel = radioType === 'lim-prim' ? option : option[0];
      const optValue = radioType === 'lim-prim' ? option : option[1];

      return (
        <div key={`${optLabel}-${idx}`} className={className}>
          <label className={`form-label ${theme.input.capitalize}`}>
            <input
              checked={idx === this.state.checked}
              className={theme.input[type]}
              name={`${name}`}
              onChange={e => {
                this.handleChecked(idx);
                onChange(e);
              }}
              placeholder={placeholder}
              style={style}
              type={type}
              value={optValue}
              {...otherProps}
            />
            {optLabel}
          </label>
        </div>
      );
    });
  }
}

export default connectTheme(Radio);
