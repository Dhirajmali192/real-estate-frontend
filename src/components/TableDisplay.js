import React from 'react';

const TableDisplay = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="table-container">
      <div className="table-responsive">
        <table className="modern-table">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key} className="table-header">
                  <span className="header-content">
                    {key}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                {Object.values(row).map((value, idx) => (
                  <td key={idx} className="table-cell">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDisplay;