import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connectTheme } from '../utils';

class Spinner extends PureComponent {
  static get propTypes() {
    return {
      className: PropTypes.string,
      style: PropTypes.object,
      theme: PropTypes.object,
      size: PropTypes.string,
    };
  }

  render() {
    const {
      className = '',
      style: _style,
      // fontawesome size suffixes https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons
      size = '2x',
      theme: { themeVariables: { themeColors } },
      ...otherProps
    } = this.props;

    const style = { color: themeColors.primary, ..._style };
    return (
      <div
        className={`${className} fa fa-spinner fa-spin fa-${size}`}
        style={style}
        {...otherProps}
      />
    );
  }
}

export default connectTheme(Spinner);
