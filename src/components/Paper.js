import React from 'react';
import PropTypes from 'prop-types';

import { connectTheme } from '../utils';

function Paper({ theme, style, customClassNames, header, children, type }) {
  let classNames = `${customClassNames ? `${customClassNames} ` : ''} ${theme
    .paper.default}`;
  if (type === 'error') classNames = `${classNames} ${theme.paper.error}`;
  return (
    <div className={classNames} style={style}>
      {header.length ? <Text type="h6">{header}</Text> : ''}
      {children}
    </div>
  );
}

Paper.propTypes = {
  sytle: PropTypes.object,
  type: PropTypes.oneOf(['error']),
  customClassNames: PropTypes.string,
  header: PropTypes.string,
  children: React.PropTypes.element,
};

export default connectTheme(Paper);
