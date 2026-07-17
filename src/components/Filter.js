import React from 'react';

const Filter = ({ onFilter }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    onFilter(value); 
  };

  return (
    <div className="filter-container">
      <div className="title"></div>
      <div className="filter-list">
        <label className="filter-item">
          <div className="filter-item-layout">
            <input type="radio" name="stops" value="non-stop" onChange={handleChange} />
            <span>Без пересадок</span>
          </div>
        </label>
        <label className="filter-item">
          <div className="filter-item-layout">
            <input type="radio" name="stops" value="with-stop" onChange={handleChange} />
            <span>С пересадками</span>
          </div>
        </label>
      </div>
      <style>{`
        .filter-container {
          padding: 10px;
          border: 1px solid #ffffff;
          border-radius: 10px;
          margin-top: 20px;
        }

        .title {
          font-family: Open Sans;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          line-height: 12px;
          text-transform: uppercase;
          padding-bottom: 10px;
          user-select: none;
        }

        .filter-list {
          padding-bottom: 10px;
        }

        .filter-item {
          transition: background-color 0.1s;
          will-change: background-color;
          user-select: none;
          cursor: pointer;
        }

        .filter-item:hover {
          background-color: #F1FCFF;
        }

        .filter-item:active {
          background-color: #e0f6ff;
        }

        .filter-item-layout {
          display: flex;
          flex-direction: row;
          margin-left: -5px;
          margin-right: -5px;
          white-space: nowrap;
          align-items: center;
          height: 40px;
        }

        .filter-item-layout > * {
          padding: 5px;
        }

        input[type="radio"] {
          margin-right: 10px;
        }
      `}</style>
    </div>
  );
};

export default Filter;
