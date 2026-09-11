# MeghDarshan — Weather Forecast Application

A responsive weather application built with React.js that provides weather information for a searched location using the Open-Meteo weather API.

The project focuses on working with real-time API data, presenting current conditions and forecast information, and transforming weather data into a user-friendly responsive interface.

## 🚀 Live Demo

[View Live Demo](https://meghadarshan.netlify.app/)

## 📂 Source Code

[GitHub Repository](https://github.com/Aryankarmur/meghadarshan)

---

## 📸 Preview

_Add a real screenshot of the application here._

Example:

![MeghDarshan Preview](./public/preview.png)

> Replace the path with the actual location of your screenshot.

---

## 📌 About the Project

MeghDarshan is a React-based weather application that allows users to search for a location and view weather information for that area.

The application retrieves weather data from the Open-Meteo API and presents the information through dedicated weather sections and forecast components.

The project was built to practice API integration, asynchronous data handling, conditional rendering, weather-code mapping, reusable React components, and responsive frontend development.

---

## ✨ Features

- Search weather by location
- Display current weather information
- Display forecast information
- Dedicated one-day forecast section
- Multi-day forecast data
- Weather condition icons
- Weather-code to condition mapping
- Responsive layout
- Reusable React components
- API-driven weather data
- Dynamic weather information based on the searched location

---

## 🛠️ Technologies Used

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3

### Libraries & Tools
- React Icons
- Vite
- ESLint

### API
- Open-Meteo Weather API

---

## 🧩 Main Components

The application is organized around several focused React components:

- `Navbar.jsx` — application navigation
- `Todayweather.jsx` — current weather information
- `OneDayForcast.jsx` — one-day forecast information
- `FivedayData.jsx` — multi-day forecast information
- `App.jsx` — main application structure

Weather icon assets are mapped to weather conditions so the UI can display an appropriate visual representation for different weather codes.

---

## 🗂️ Project Structure

```text
src/
├── assets/
│   └── weather-icons/
│
├── App.jsx
├── FivedayData.jsx
├── Navbar.jsx
├── OneDayForcast.jsx
├── Todayweather.jsx
├── index.css
└── main.jsx
