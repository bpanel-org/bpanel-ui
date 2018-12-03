import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Text from './Text';
import { connectTheme, makeRem } from '../utils';

/*
 * renders text on top of children components
 */
class Label extends PureComponent {
  static get propTypes() {
    return {
      text: PropTypes.string,
      children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
      ]),
      textClasses: PropTypes.string,
      stacked: PropTypes.bool,
      className: PropTypes.string,
      description: PropTypes.string,
      theme: PropTypes.object,
      style: PropTypes.object,
    };
  }

  static get defaultProps() {
    return {
      className: '',
      textClasses: '',
      stacked: true,
      theme: {},
      description: '',
      style: {},
    };
  }

  render() {
    const {
      text,
      children,
      className,
      theme: { label, themeVariables },
      style,
      textClasses,
      stacked,
      description,
    } = this.props;

    return (
      <div
        key={0}
        className={`${stacked
          ? 'flex-column'
          : 'row align-items-center'} ${className}`}
        style={Object.assign({ width: '100%' }, style)}
      >
        <Text className={`col-auto ${label.text} ${textClasses}`}>{text}</Text>
        <div className={`col ${label.content}`}>
          {children}
          {description.length ? (
            <Text
              type="p"
              className={label.description}
              style={{
                fontSize: makeRem(themeVariables.rawRem.fontSizeSmall),
              }}
            >
              {description}
            </Text>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

export default connectTheme(Label);
