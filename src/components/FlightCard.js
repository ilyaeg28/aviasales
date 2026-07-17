import React from 'react';

const FlightCard = ({ flight }) => {
  return (
    <div className="flight-card">
      <div className="flight-price">
        <span>{flight.price} {flight.currency || 'RUB'}</span>
      </div>
      <div className="flight-info">
        <div>
          <p><strong></strong> {flight.airline || 'N/A'}</p>
          <p><strong>Время вылета:</strong> {flight.departure_at}</p>
          <p><strong>Дата возвращения:</strong> {flight.return_at}</p>
          <p><strong>Пересадки:</strong> {flight.transfers || '0'}</p>
          <p><strong>Номер рейса:</strong> {flight.flight_number}</p>
        </div>
        <div className="booking-link">
          {flight.link && (
            <a href={`https://www.aviasales.com${flight.link}`} target="_blank" rel="noopener noreferrer">
              Перейти к бронированию
            </a>
          )}
        </div>
      </div>
      <style>{`
        .flight-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          margin-bottom: 15px;
          background-color: #ffffff;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .flight-price {
          font-size: 24px;
          font-weight: bold;
          color: #007bff;
        }

        .flight-info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          max-width: 600px;
        }

        .flight-info p {
          margin: 5px 0;
        }

        .booking-link a {
          color: #007bff;
          text-decoration: none;
          font-weight: bold;
          border: 1px solid #007bff;
          padding: 10px 20px;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .booking-link a:hover {
          background-color: #007bff;
          color: #ffffff;
        }
      `}</style>
    </div>
  );
};

export default FlightCard;
