import React, { useState } from 'react';

const BookingForm = ({ flight }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Заглушка для успешного бронирования
    alert(`Перелет ${flight.airline} успешно забронирован на имя ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Ваш email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Забронировать</button>
    </form>
  );
};

export default BookingForm;
