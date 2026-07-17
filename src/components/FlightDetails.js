import React from 'react';

const FlightDetails = ({ flight }) => {
  return (
    <div>
      <p>Авиакомпания: {flight.airline}</p>
      <p>Цена: {flight.price}</p>
      <p>Пересадки: {flight.transfers}</p>
      <p>Класс: {flight.class}</p>
      <p>Багаж: {flight.baggage}</p>
      <button onClick={() => window.history.back()}>Назад</button>
    </div>
  );
};

export default FlightDetails;
