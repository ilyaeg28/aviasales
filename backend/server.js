const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

const PORT = 5000;

const API_TOKEN = '50a8a808409bc3c5029a2147ec427a04';

app.get('/api/flights', async (req, res) => {
    try {
        const {
            origin,
            destination,
            departureDate,
            returnDate
        } = req.query;

        const url = `https://api.travelpayouts.com/aviasales/v3/prices_for_dates`;

        const response = await axios.get(url, {
            params: {
                origin,
                destination,
                departure_at: departureDate,
                return_at: returnDate,
                unique: false,
                cy: 'usd',
                limit: 30,
                page: 1,
                one_way: false,
                token: API_TOKEN
            }
        });

        res.json(response.data);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});