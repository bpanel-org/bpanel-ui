import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connectTheme } from '../../../utils';

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
      children: PropTypes.arrayOf(PropTypes.string).isRequired,
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
      onChange: this.handleChange,
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

    return children.map((option, idx) => (
      <div key={option} className={className}>
        <label className={`form-label ${theme.input.capitalize}`}>
          <input
            checked={idx === this.state.checked}
            className={theme.input[type]}
            name={name}
            onChange={e => {
              this.handleChecked(idx);
              onChange(e);
            }}
            placeholder={placeholder}
            style={style}
            type={type}
            value={option}
            {...otherProps}
          />
          {option}
        </label>
      </div>
    ));
  }
}

export default connectTheme(Radio);
