import React from 'react';

export default function Table({ rows, columns, id, className }) {
  const renderHead = (columnsData) => {
    return columnsData.reduce((acc, el, idx, arr) => {
      acc.push(
        <th key={`${el}-${idx}`} className="dataTableClass__th">
          {el}
        </th>
      );
      if (idx === arr.length - 1) {
        return <tr>{acc}</tr>;
      }
      return acc;
    }, []);
  };

  const renderBody = (rowsData) => {
    return rowsData.reduce((acc, el, idx, arr) => {
      const rowCells = Object.keys(el);
      const cells = rowCells.map((cell, idx, arr) => (
        <td key={`${el[cell]}-${idx}`} className="dataTableClass__td">
          {el[cell]}
        </td>
      ));
      acc.push(<tr key={`${el}-${idx}`}>{cells}</tr>);
      return acc;
    }, []);
  };

  return (
    <table id={id} className={className}>
      <thead>{renderHead(columns)}</thead>
      <tbody>{renderBody(rows)}</tbody>
    </table>
  );
}
