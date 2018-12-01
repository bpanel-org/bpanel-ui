import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connectTheme } from '../utils';
import { Header } from '.';

class Paper extends PureComponent {
  static get propTypes() {
    return {
      sytle: PropTypes.object,
      type: PropTypes.oneOf(['error']),
      theme: PropTypes.object,
      customClassNames: PropTypes.string,
      header: PropTypes.string,
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.string,
      ]),
    };
  }

  render() {
    const {
      customClassNames,
      theme,
      header,
      children,
      type,
      style,
    } = this.props;
    let classNames = `${customClassNames ? `${customClassNames} ` : ''} ${theme
      .paper.default}`;
    if (type === 'error') classNames = `${classNames} ${theme.paper.error}`;
    return (
      <div className={classNames} style={style}>
        {header ? <Header type="h6">{header}</Header> : ''}
        {children}
      </div>
    );
  }
}

export default connectTheme(Paper);
