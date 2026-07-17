import React, { useState } from 'react';
import FlightSearchForm from './components/FlightSearchForm';
import FlightList from './components/FlightList';
import Sort from './components/Sort';

const HomePage = () => {
  const [searchParams, setSearchParams] = useState(null);
  const [sortOption, setSortOption] = useState('price');

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  const handleSort = (option) => {
    setSortOption(option);
  };

  return (
    <div>
      <FlightSearchForm onSearch={handleSearch} />
      <Sort onSort={handleSort} />
      {searchParams && <FlightList searchParams={searchParams} sortOption={sortOption} />}
    </div>
  );
};

export default HomePage;
