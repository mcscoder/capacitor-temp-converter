import React, { useState } from "react";
import "./App.css";
// Modern Capacitor imports
import { LocalNotifications } from "@capacitor/local-notifications";
import { Share } from "@capacitor/share";
import { Geolocation } from "@capacitor/geolocation";

function App() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");
  const [location, setLocation] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  // Convert Celsius to Fahrenheit
  const convertToFahrenheit = () => {
    if (celsius === "") return;

    const tempC = parseFloat(celsius);
    const tempF = (tempC * 9) / 5 + 32;
    setFahrenheit(tempF.toFixed(2));

    // Show notification
    displayNotification(tempC, tempF.toFixed(2));
  };

  // Display local notification
  const displayNotification = async (tempC, tempF) => {
    try {
      await LocalNotifications.requestPermissions();
      await LocalNotifications.schedule({
        notifications: [
          {
            title: "Temperature Converted",
            body: `${tempC}°C = ${tempF}°F`,
            id: Math.floor(Math.random() * 100),
            schedule: { at: new Date(Date.now() + 1000) },
          },
        ],
      });

      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.error("Notification error:", error);
      alert("Notification feature might not be available: " + error.message);
    }
  };

  // Share functionality
  const shareResult = async () => {
    try {
      await Share.share({
        title: "Temperature Conversion",
        text: `${celsius}°C = ${fahrenheit}°F`,
        dialogTitle: "Share your temperature conversion",
      });
    } catch (error) {
      console.error("Share error:", error);
      alert("Share feature might not be available: " + error.message);
    }
  };

  // Get current location
  const getLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (error) {
      console.error("Geolocation error:", error);
      alert("Location services might not be available: " + error.message);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>Temperature Converter</h1>
      </header>

      <main>
        <div className="input-group">
          <label htmlFor="celsius">Enter Temperature (°C):</label>
          <input
            type="number"
            id="celsius"
            value={celsius}
            onChange={(e) => setCelsius(e.target.value)}
            placeholder="Enter Celsius"
          />
        </div>

        <button className="convert-btn" onClick={convertToFahrenheit}>
          Convert to Fahrenheit
        </button>

        {fahrenheit && (
          <div className="result">
            <h2>Result:</h2>
            <p>
              {celsius}°C = {fahrenheit}°F
            </p>

            <div className="action-buttons">
              <button onClick={shareResult}>Share Result</button>
              <button onClick={getLocation}>Get My Location</button>
            </div>
          </div>
        )}

        {showNotification && (
          <div className="notification">
            Conversion Complete! Check your notifications.
          </div>
        )}

        {location && (
          <div className="location">
            <h3>Your Current Location:</h3>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
