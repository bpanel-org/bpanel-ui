import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connectTheme } from '../../utils';
import Radio from './Type/Radio';

class Input extends PureComponent {
  static get propTypes() {
    return {
      children: PropTypes.node,
      defaultValue: PropTypes.string,
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
      onChange: () => {},
      type: 'text',
    };
  }

  render() {
    const {
      children,
      name,
      onChange,
      placeholder,
      style,
      theme,
      type,
      value,
      ...otherProps
    } = this.props;

    switch (type) {
      case 'radio':
        return <Radio {...this.props}>{children}</Radio>;

      default:
        return (
          <input
            className={theme.input[type]}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            style={style}
            type={type}
            value={value}
            {...otherProps}
          />
        );
    }
  }
}

export default connectTheme(Input);
