import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connectTheme } from '../utils';
import { Header } from '.';

class Modal extends PureComponent {
  static get propTypes() {
    return {
      styles: PropTypes.object,
      type: PropTypes.oneOf(['error']),
      theme: PropTypes.object,
      closeModal: PropTypes.func,
      customClassNames: PropTypes.string,
      show: PropTypes.bool,
      header: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      footer: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
      children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
        PropTypes.string,
      ]),
    };
  }

  static get defaultProps() {
    return {
      styles: {
        container: {},
        dialog: {},
        content: {},
        header: {},
        body: {},
        footer: {},
      },
      header: '',
    };
  }

  render() {
    const {
      styles,
      header,
      footer,
      theme: { modal },
      show = false,
      children,
      closeModal,
    } = this.props;
    const modalStyles = {
      ...styles.container,
      display: `${show ? 'block' : 'none'}`,
    };
    const modalClassNames = `modal  ${modal.container} fade ${show
      ? 'show'
      : 'hide'}`;
    const dialogClassNames = `${modal.dialog || modal.dialoge}`;

    const modalHeader = (
      <div className={`modal-header ${modal.header}`} style={styles.header}>
        {header}
        {closeModal ? (
          <button
            type="button"
            className={`close`}
            aria-label="Close"
            onClick={closeModal}
          >
            <span aria-hidden="true">×</span>
          </button>
        ) : (
          ''
        )}
      </div>
    );
    const modalFooter = footer ? (
      <div className={`modal-footer ${modal.footer}`} style={styles.footer}>
        {footer}
      </div>
    ) : (
      ''
    );
    return (
      <div className={modalClassNames} style={modalStyles}>
        <div className={dialogClassNames} style={styles.dialog}>
          <div
            className={`${modal.content} modal-content`}
            style={styles.content}
          >
            {modalHeader}
            <div className="modal-body" style={styles.body}>
              {children}
            </div>
            {modalFooter}
          </div>
        </div>
      </div>
    );
  }
}

export default connectTheme(Modal);
