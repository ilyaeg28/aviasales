import React, { useState, useEffect } from 'react';
import airlinesData from './airlines.json';

const FlightList = ({ searchParams, sortMethod, ascending }) => {
    const { origin, destination, departureDate, returnDate, stopFilter } = searchParams;
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFlights = async () => {
        setLoading(true);
        setError(null);

        try {
            let url = `http://localhost:5000/api/flights?origin=${origin}&destination=${destination}&departureDate=${departureDate}&returnDate=${returnDate}`; const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success && data.data.length > 0) {
                let filteredFlights = data.data;

                if (stopFilter === 'non-stop') {
                    filteredFlights = filteredFlights.filter(flight => flight.transfers === 0); // Только без пересадок
                } else if (stopFilter === 'with-stops') {
                    filteredFlights = filteredFlights.filter(flight => flight.transfers > 0); // Только с пересадками
                }

                setFlights(filteredFlights);
            } else {
                setFlights([]);
            }
        } catch (error) {
            setError('Ошибка при загрузке данных: ' + error.message);
        }

        setLoading(false);
    };

    useEffect(() => {
        if (origin && destination && departureDate) {
            fetchFlights();
        }
    }, [origin, destination, departureDate, returnDate, stopFilter]);

    // Сортировка на стороне клиента
    const sortedFlights = [...flights].sort((a, b) => {
        if (sortMethod === 'price') {
            return ascending ? a.price - b.price : b.price - a.price;
        } else if (sortMethod === 'duration') {
            const aDuration = new Date(a.departure_at).getTime();
            const bDuration = new Date(b.departure_at).getTime();
            return ascending ? aDuration - bDuration : bDuration - aDuration;
        }
        return 0;
    });

    const extractTime = (dateTime) => {
        if (!dateTime) return 'N/A';
        const time = new Date(dateTime).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        return time;
    };

    const getAirlineName = (airlineCode) => {
        const airline = airlinesData.find(a => a.code === airlineCode);
        return airline ? airline.name : airlineCode;
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (flights.length === 0) {
        return <div>Билеты не найдены</div>;
    }

    return (
        <div>
            <h2>Доступные билеты</h2>
            <ul>
                {sortedFlights.map((flight, index) => (
                    <li key={index} className="flight-card">
                        <div className="flight-info">
                            <p><strong>Авиакомпания:</strong> {getAirlineName(flight.airline)}</p>
                            <p><strong>Время отправления:</strong> {extractTime(flight.departure_at)}</p>
                            <p><strong>Время возвращения:</strong> {extractTime(flight.return_at)}</p>
                            <p><strong>Пересадки:</strong> {flight.transfers || '0'}</p>
                            <p><strong>Номер рейса:</strong> {flight.flight_number}</p>
                        </div>
                        <div className="flight-price">
                            <span>{flight.price} {flight.currency || 'RUB'}</span>
                        </div>
                        {flight.link && (
                            <div className="booking-link">
                                <a href={`https://www.aviasales.com${flight.link}`} target="_blank" rel="noopener noreferrer">
                                    Перейти к бронированию
                                </a>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
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
                    border: 1px solid rgba(0, 0, 0, 0.2);
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

export default FlightList;
