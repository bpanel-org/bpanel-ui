import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  AutoSizer,
  Table as VirtualizedTable,
  Column,
} from 'react-virtualized';

import HeaderRow from './HeaderRow';
import rowRenderer from './rowRenderer';
import Text from '../Text';
import { connectTheme } from '../../utils';

import 'react-virtualized/styles.css';

class Table extends PureComponent {
  constructor() {
    super();
    this.state = {
      /**
       * selectedIndex tracks the row in the table that is selected
       * Its value is the index of the row in the table
       * hoverIndex is similar, for mouseOver state
       */
      selectedIndex: undefined,
      hoverIndex: null,
    };
    this.selectRow = this.selectRow.bind(this);
  }

  static get propTypes() {
    return {
      ExpandedComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      colProps: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          dataKey: PropTypes.string,
          width: PropTypes.number,
        })
      ),
      colHeaders: PropTypes.arrayOf(PropTypes.string),
    };
  }

  static get defaultProps() {
    return {
      ExpandedComponent: () => {},
      headerHeight: 30,
      rowHeight: 30,
      style: {
        bodyStyle: {},
        containerStyle: {},
        headerStyle: {},
      },
    };
  }

  /*
   * getDerivedStateFromProps is invoked right before calling the render method
   * we use it here to force-change the selected index of this table,
   * from a prop setSelectedIndex that can be set by some other object
   * a value of -1 means no change
   */

  static getDerivedStateFromProps(props, state) {
    if (props.setSelectedIndex >= 0) {
      return {
        ...state,
        selectedIndex: props.setSelectedIndex,
      };
    }

    return null;
  }

  /**
   * getColProps sets the header(top row) data for the table.
   */

  getColProps() {
    const { colProps, tableData, colHeaders } = this.props;
    if (colProps) return colProps;

    const headers = Array.isArray(colHeaders)
      ? colHeaders
      : Object.entries(tableData[0]).map(
          header => (Array.isArray(header) ? header[0] : header)
        );

    return headers.map(header => ({
      label: header,
      dataKey: header,
      width: 400,
      flexGrow: 1,
      cellRenderer: ({ cellData = '' }) => {
        // wrap strings in text components
        if (typeof cellData === 'string') return <Text>{cellData}</Text>;
        // allow for custom react components to be returned
        return cellData;
      },
      headerRenderer: ({ label }) => <Text>{label && label.toString()}</Text>,
    }));
  }

  /**
   * getTableHeight gets height of the table. Calculates the height of the table
   * if a row is expanded.
   */

  getTableHeight(tableData, selectedIndex, openHeight) {
    openHeight = openHeight ? openHeight : 0; // selectable but not expandable
    return (
      (tableData.length + 1) * 30 +
      (selectedIndex || selectedIndex === 0 ? openHeight : 0)
    );
  }

  /**
   * selectRow updates selectedIndex when a row is clicked.
   */

  selectRow({ index }) {
    const { expandedHeight } = this.props;
    const { selectedIndex, hoverIndex } = this.state;
    const unselect = expandedHeight ? undefined : index;
    const updateIndex = index === selectedIndex ? unselect : index;
    this.setState({ selectedIndex: updateIndex });
  }

  render() {
    const {
      tableData,
      ExpandedComponent,
      expandedHeight,
      expandedData,
      onRowClick,
      headerHeight,
      rowHeight,
      rowStyle,
      style: { containerStyle, innerContainerStyle, headerStyle, bodyStyle },
      theme,
      selectable,
      ...tableProps
    } = this.props;

    const {
      table: {
        container: containerCss,
        header: headerCss,
        body: bodyCss,
        hoverExpandableRow,
        hoverRow,
        selectedRow,
      },
      tableRowStyle,
      expandedRow: expandedRowStyles,
    } = theme;

    const { selectedIndex, hoverIndex } = this.state;
    const _colProps = this.getColProps();
    const tableHeight = this.getTableHeight(
      tableData,
      selectedIndex,
      expandedHeight
    );
    const rowRendererOptions = {
      selectedIndex,
      ExpandedComponent,
      expandedHeight,
      expandedData,
      rowHeight,
      hoverExpandableRow,
      hoverRow,
      selectedRow,
      hoverIndex,
      expandedRowStyles,
      tableData,
      theme,
      selectable,
    };

    // custom click actions for certain table formats
    const rowOnClick = e => {
      if (expandedHeight || selectable) {
        this.selectRow(e);
      }

      // custom function has been passed as a property
      if (onRowClick) {
        onRowClick(e);
      }

      // default: do nothing
      return;
    };

    // mouse hover actions
    const rowOnMouseOver = e => {
      this.setState({ hoverIndex: e.index });
    };
    const rowOnMouseOut = e => {
      this.setState({ hoverIndex: null });
    };

    return (
      <div className={containerCss} style={containerStyle}>
        <AutoSizer disableHeight>
          {({ width }) => (
            <VirtualizedTable
              className={bodyCss}
              height={tableHeight}
              containerStyle={innerContainerStyle || { overflow: 'visible' }}
              headerClassName={headerCss}
              headerHeight={headerHeight}
              headerRowRenderer={props => <HeaderRow {...props} />}
              headerStyle={headerStyle}
              onRowClick={rowOnClick}
              onRowMouseOver={rowOnMouseOver}
              onRowMouseOut={rowOnMouseOut}
              rowCount={tableData.length}
              rowGetter={({ index }) => tableData[index]}
              rowHeight={rowHeight}
              rowRenderer={options => rowRenderer(options, rowRendererOptions)}
              rowStyle={rowStyle || tableRowStyle}
              width={width}
              {...tableProps}
            >
              {_colProps.map(colProp => (
                <Column key={`table-${colProp.dataKey}`} {...colProp} />
              ))}
            </VirtualizedTable>
          )}
        </AutoSizer>
      </div>
    );
  }
}

export default connectTheme(Table);
