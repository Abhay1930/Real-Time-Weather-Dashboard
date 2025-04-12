# Real-Time Weather Dashboard 🌦️

A modern weather dashboard built with the MERN stack (MongoDB, Express, React, Node.js) that provides real-time weather information for any city. Uses OpenWeatherMap API for weather data.

## ✨ Features

- 🔍 Search weather by city name
- 🌡️ Real-time weather updates
- 📊 Detailed weather information (temperature, humidity, wind speed)
- 🌙 Dark/Light theme toggle
- 📱 Responsive design for all devices
- 🔄 Auto-loads last searched city
- 🎯 Error handling and loading states

## 🚀 Live Demo

- Frontend: [https://real-time-weather-dashboard-dun.vercel.app/](https://real-time-weather-dashboard-six.vercel.app/)
- Backend: [https://real-time-weather-dashboard.onrender.com](https://real-time-weather-dashboard.onrender.com/)

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key ([Get it here](https://openweathermap.org/api))

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory:
```env
PORT=5000
WEATHER_API_KEY=your_openweathermap_api_key
```

4. Start the server:
```bash
npm start
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the client directory:
```env
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
weather-dashboard/
├── client/                 # Frontend React application
│   ├── public/            # Public assets
│   └── src/
│       ├── components/    # React components
│       ├── App.js         # Main application component
│       └── App.css        # Main styles
└── server/                # Backend Node.js application
    ├── routes/            # API routes
    └── server.js          # Server configuration
```

## 🔌 API Endpoints

- `GET /weather?city={cityName}` - Get current weather
- `GET /weather/forecast?city={cityName}` - Get 5-day forecast

## 🎨 Technologies Used

### Frontend
- React.js
- Axios for API requests
- CSS3 for styling
- React Hooks for state management

### Backend
- Node.js
- Express.js
- Axios for OpenWeatherMap API calls
- CORS for cross-origin requests


## 🙏 Acknowledgments

- OpenWeatherMap API for weather data
- Icons from [Weather Icons](https://openweathermap.org/weather-conditions)
- Deployed using Vercel (frontend) and Render (backend)


📸 Preview





![Screenshot 2025-04-12 151424](https://github.com/user-attachments/assets/2b46957c-bed6-4da2-9b40-149add9e7f5b)
