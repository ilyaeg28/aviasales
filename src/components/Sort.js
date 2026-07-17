import React from 'react';

const Sort = ({ onSort, ascending }) => {
  return (
    <div className="sort-container">
      <button className="sort-button" onClick={() => onSort('price')}>
        Самые дешевые {ascending}
      </button>
      <button className="sort-button" onClick={() => onSort('duration')}>
        Самые ранние {ascending}
      </button>

      <style>{`
        .sort-container {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .sort-button {
          padding: 10px 20px;
          background-color: #007bff;
          color: #ffffff;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s, box-shadow 0.3s;
          font-family: 'Open Sans', sans-serif;
        }

        .sort-button:hover {
          background-color: #0056b3;
        }

        .sort-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
        }

        .sort-button:active {
          background-color: #003f7f;
        }
      `}</style>
    </div>
  );
};

export default Sort;
