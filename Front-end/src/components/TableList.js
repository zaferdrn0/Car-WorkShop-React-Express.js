import React from "react";
import "./css/tableList.css";
const TableList = (props) => {
  return (
    <table>
      <thead>
        <tr>
          {props.columnNames.map((columnName) => {
            return <th key={columnName}>{columnName}</th>;
          })}
          <th className="islemler-stun">Islemler</th>
        </tr>
      </thead>
      {props.rowValues.map((row, index) => {
        return (
          <tbody key={index}>
            <tr>
              {props.columnNames.map((value, index) => {
                return <td key={index}>{row[value]}</td>;
              })}
              <td>
                {props.onDelete !== undefined && (
                  <button onClick={() => {props.onDelete(row)}} key="delete" type="button">
                    Sil
                  </button>
                )}
                {props.onUpdate !== undefined && (
                  <button onClick={() => {props.onUpdate(row)}} key="update" type="button">
                    Güncelle
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        );
      })}
    </table>
  );
};

export default TableList;
