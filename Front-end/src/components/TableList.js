import React from "react";
import "./css/tableList.css";
const TableList = (props) => {
  const propKeys = Object.keys(props);

  
  const tableCells = propKeys.map((propName) => (
    <td key={propName}>{props[propName]}</td>
  ));

  const buttons = (
    <td>
      <button key="delete" type="button">
        Sil
      </button>{" "}
      <button key="update" type="button">
        Güncelle
      </button>
    </td>
  );


  return (

          <tbody>
            <tr>
              {tableCells}{buttons}
            </tr>
          </tbody>
       
   
  );
};

export default TableList;
