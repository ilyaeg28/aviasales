import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import Sort from './Sort';
import FlightList from './FlightList';
import airportsData from './airports.json'; 

const FlightSearchForm = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [searchParams, setSearchParams] = useState(null);
  const [sortMethod, setSortMethod] = useState('price');
  const [ascending, setAscending] = useState(true);
  const [stopFilter, setStopFilter] = useState('all');
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    setAirports(airportsData);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({
      origin,
      destination,
      departureDate,
      returnDate,
      stopFilter
    });
  };

  const handleFilterChange = (filter) => {
    setStopFilter(filter);
  };

  const handleSort = (method) => {
    setSortMethod(method);
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          ✈️ <span>Авиапоиск</span>
        </div>
      </header>

      <form onSubmit={handleSearch} className="search-form">
        <div className="input-group">
          <label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="input-field"
              defaultValue=""
            >
              <option value="" disabled>Откуда</option>
              {airports.map((airport) => (
                <option key={airport.code} value={airport.code}>
                  {airport.name} ({airport.code})
                </option>
              ))}
            </select>
          </label>

          <div className="arrow-container">
            <div className="arrow-right">→</div>
            <div className="arrow-left">←</div>
          </div>

          <label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="input-field"
              defaultValue="" 
            >
              <option value="" disabled>Куда</option>
              {airports.map((airport) => (
                <option key={airport.code} value={airport.code}>
                  {airport.name} ({airport.code})
                </option>
              ))}
            </select>
          </label>

          <div className="date-picker">
            <label>
              <input
                id="departure-date"
                type="date"
                placeholder="Когда"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="input-field"
              />
            </label>
          </div>

          <div className="date-picker">
            <label>
              <input
                id="return-date"
                type="date"
                placeholder="Обратно"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="input-field"
              />
            </label>
          </div>

          <button type="submit" className="submit-button">Поиск</button>
        </div>

        <Filter onFilter={handleFilterChange} />
      </form>

      {searchParams && (
        <>
          <Sort onSort={handleSort} ascending={ascending} />
          <FlightList searchParams={searchParams} sortMethod={sortMethod} ascending={ascending} />
        </>
      )}

      <style>
        {`
          .header {
            display: flex;
            align-items: center;
            padding: 10px 20px;
            background-color: #f8f9fa;
            border-bottom: 1px solid #ddd;
          }

          .logo {
            display: flex;
            align-items: center;
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
          }

          .logo span {
            margin-left: 10px;
          }

          .search-form {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding-left: 20px;
            margin-top: 20px;
          }

          .input-group {
            display: flex;
            gap: 15px;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
          }

          .input-field {
            padding: 10px;
            border-radius: 20px;
            border: 1px solid #ddd;
            width: 150px;
          }

          .arrow-container {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .arrow-right,
          .arrow-left {
            font-size: 18px;
            color: #007bff;
            margin: -5px 0;
          }

          .submit-button {
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
            transition: background-color 0.3s;
          }

          .submit-button:hover {
            background-color: #0056b3;
          }
        `}
      </style>
    </div>
  );
};

export default FlightSearchForm;
