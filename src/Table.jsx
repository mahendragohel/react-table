import React from "react";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowId: -1
    };
    this.toggleChildTableData = this.toggleChildTableData.bind(this);
    this.getColumnCount = this.getColumnCount.bind(this);
  }

  getColumnData(key, data) {
    const { transform } = this.props.columns[key];
    if (typeof transform === "function" && transform.length) {
      return transform(data);
    }
    return data;
  }

  sortRow(row) {
    const { columns } = this.props;
    return Object.keys(row)
      .sort((a, b) => {
        return columns[a].order - columns[b].order;
      })
      .reduce((r, k) => ({ ...r, [k]: row[k] }), {});
  }

  sortColumns() {
    const { columns = {} } = this.props;

    return Object.entries(columns)
      .sort(([x, a], [, b]) => {
        return a.order - b.order;
      })
      .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  }

  toggleChildTableData(rowIndex) {
    console.log(rowIndex);
    if (this.state.activeRowId === rowIndex) {
      this.setState({
        activeRowId: -1
      });
    } else {
      this.setState({
        activeRowId: rowIndex
      });
    }
  }

  getColumnCount() {
    const { columns, child, actions } = this.props;
    let count = Object.keys(columns).length;
    if (typeof child === "function") {
      count += 1;
    }
    if (typeof actions === "function") {
      count += 1;
    }
    return count;
  }

  render() {
    const { columns = {}, rows = [], actions, child } = this.props;
    const sortedColumns = this.sortColumns();
    const columnCount = this.getColumnCount();
    return (
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            {Object.keys(sortedColumns)
              .filter((c) => {
                return !sortedColumns[c].isChild;
              })
              .map((column, index) => {
                return (
                  <th className="border-bottom-2 cell-padding" key={index}>
                    {columns[column].name}
                  </th>
                );
              })}

            {actions && <th className="border-bottom-2 cell-padding"></th>}
            {typeof child === "function" && (
              <th className="border-bottom-2 cell-padding"></th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            const sortedRow = this.sortRow(row);
            return (
              <>
                <tr key={`row-${rowIndex}`}>
                  {Object.keys(sortedRow)
                    .filter((r) => !columns[r].isChild)
                    .map((key, colIndex) => {
                      return (
                        <td
                          key={`column-${colIndex}`}
                          className="border-bottom cell-padding"
                        >
                          {this.getColumnData(key, row[key])}
                        </td>
                      );
                    })}
                  {actions && (
                    <td className="border-bottom cell-padding">
                      {actions(row)}
                    </td>
                  )}
                  {typeof child === "function" && (
                    <td className="border-bottom cell-padding">
                      <span
                        onClick={() => {
                          console.log("clicked", rowIndex);
                          this.toggleChildTableData(rowIndex);
                        }}
                        type="button"
                      >
                        {this.state.activeRowId === rowIndex ? "👇" : "👉"}
                      </span>
                    </td>
                  )}
                </tr>
                {typeof child === "function" && (
                  <tr>
                    <td
                      colSpan={columnCount}
                      className="cell-padding-left-right"
                    >
                      <Collapse in={this.state.activeRowId === rowIndex}>
                        <div id="example-collapse-text">{child(row)}</div>
                      </Collapse>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    );
  }
}
