import React from 'react';
import PropTypes from 'prop-types';

import keyMirror from 'keymirror';

const TEXT_TAGS = keyMirror({
  p: null,
  span: null,
  strong: null,
});

const TEXT_ELEMENTS = {
  [TEXT_TAGS.p]: ({ theme, ...props }) => <p {...props} />,
  [TEXT_TAGS.span]: ({ theme, ...props }) => <span {...props} />,
  [TEXT_TAGS.strong]: ({ theme, ...props }) => <strong {...props} />,
};

export default {
  TEXT_ELEMENTS,
  TEXT_TAGS,
};
