const express = require('express');
const cors = require('cors');
const weatherRoute = require('./routes/weather');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;


app.use(cors({
  origin: ['https://real-time-weather-dashboard-dun.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.use('/weather', weatherRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
