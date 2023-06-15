import React from "react";
import "./css/tableList.css";
const TableList = (props) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {props.columnNames.map((columnName) => {
              if (columnName === "id") {
                return null;
              }

              return <th key={columnName}>{columnName}</th>;
            })}
            <th className="islemler-stun">Operation</th>
          </tr>
        </thead>
        {props.rowValues.map((row, index) => {
          return (
            <tbody key={index}>
              <tr>
                {props.columnNames.map((value, index) => {
                  if (value === "id") {
                    return null;
                  }
                  return <td key={index}>{row[value]}</td>;
                })}
                <td className="table-buttons">
                  {props.onDelete !== undefined && (
                    <button
                      className="delete"
                      onClick={() => {
                        props.onDelete(row);
                      }}
                      key="delete"
                      type="button"
                    >
                      Delete
                    </button>
                  )}
                  {props.onUpdate !== undefined && (
                    <button
                      onClick={() => {
                        props.onUpdate(row);
                      }}
                      key="update"
                      type="button"
                    >
                      Update
                    </button>
                  )}
                  {props.onAbout !== undefined && (
                    <button
                      className="about"
                      onClick={() => {
                        props.onAbout(row);
                      }}
                      key="about"
                      type="button"
                    >
                      About
                    </button>
                    )}
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default TableList;
