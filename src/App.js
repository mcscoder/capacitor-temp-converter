// App.js - Updated imports for newer Capacitor versions

import React, { useState } from "react";
import { LocalNotifications } from "@capacitor/local-notifications";
import { Share } from "@capacitor/share";
import { Geolocation } from "@capacitor/geolocation";
import "./App.css";

function App() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");
  const [location, setLocation] = useState(null);
  const [showLocation, setShowLocation] = useState(false);

  // Convert Celsius to Fahrenheit
  const convertToFahrenheit = () => {
    if (celsius === "" || isNaN(celsius)) {
      alert("Please enter a valid temperature in Celsius");
      return;
    }

    const celsiusValue = parseFloat(celsius);
    const fahrenheitValue = (celsiusValue * 9) / 5 + 32;
    setFahrenheit(fahrenheitValue.toFixed(2));

    // Show local notification after conversion
    showNotification(celsiusValue, fahrenheitValue);
  };

  // Show local notification
  const showNotification = async (celsiusValue, fahrenheitValue) => {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Temperature Conversion Complete",
          body: `${celsiusValue}°C = ${fahrenheitValue.toFixed(2)}°F`,
          id: new Date().getTime(),
          sound: null,
          attachments: null,
          actionTypeId: "",
          extra: null,
        },
      ],
    });
  };

  // Share conversion result
  const shareResult = async () => {
    if (fahrenheit === "") {
      alert("Please convert a temperature first");
      return;
    }

    await Share.share({
      title: "Temperature Conversion",
      text: `${celsius}°C = ${fahrenheit}°F`,
      dialogTitle: "Share your temperature conversion",
    });
  };

  // Get current location (bonus feature)
  const getCurrentLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setShowLocation(true);
    } catch (error) {
      alert("Error getting location: " + error.message);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Temperature Converter</h1>

      <div className="input-container">
        <label htmlFor="celsius">Enter Temperature (°C)</label>
        <input
          type="number"
          id="celsius"
          value={celsius}
          onChange={(e) => setCelsius(e.target.value)}
          placeholder="Enter temperature in Celsius"
        />
      </div>

      <button className="convert-button" onClick={convertToFahrenheit}>
        Convert to Fahrenheit
      </button>

      {fahrenheit && (
        <div className="result-container">
          <h2>Result:</h2>
          <p className="result">
            {celsius}°C = {fahrenheit}°F
          </p>

          <div className="action-buttons">
            <button onClick={shareResult} className="share-button">
              Share Result
            </button>

            <button onClick={getCurrentLocation} className="location-button">
              Get Location
            </button>
          </div>
        </div>
      )}

      {showLocation && location && (
        <div className="location-container">
          <h3>Your Current Location:</h3>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}
    </div>
  );
}

export default App;
