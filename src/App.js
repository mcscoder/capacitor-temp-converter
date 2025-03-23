import React, { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Share } from '@capacitor/share';
import { Camera, CameraResultType } from '@capacitor/camera';
import './App.css';

function App() {
  const [birthYear, setBirthYear] = useState('');
  const [age, setAge] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);

  // Calculate age based on birth year
  const calculateAge = () => {
    if (!birthYear) {
      alert('Please enter your birth year!');
      return;
    }

    const currentYear = new Date().getFullYear();
    const calculatedAge = currentYear - parseInt(birthYear);

    setAge(calculatedAge);

    // Show local notification
    showNotification(calculatedAge);
  };

  // Show notification with the calculated age
  const showNotification = async (calculatedAge) => {
    if (Capacitor.isNativePlatform()) {
      await LocalNotifications.requestPermissions();

      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Age Calculation Complete',
            body: `Your age is ${calculatedAge} years old.`,
            id: 1,
            schedule: { at: new Date(Date.now() + 1000) }
          }
        ]
      });
    } else {
      console.log('Local notifications are only available on native platforms');
    }
  };

  // Share age result
  const shareResult = async () => {
    if (!age) {
      alert('Please calculate your age first!');
      return;
    }

    if (Capacitor.isNativePlatform()) {
      await Share.share({
        title: 'My Age Calculation',
        text: `I calculated my age using the Age Calculator app. I am ${age} years old!`,
        dialogTitle: 'Share your age with friends'
      });
    } else {
      console.log('Share API is only available on native platforms');
    }
  };

  // Take a photo using the camera
  const takePhoto = async () => {
    if (Capacitor.isNativePlatform()) {
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.Uri
        });

        setUserPhoto(image.webPath);
      } catch (error) {
        console.error('Error taking photo:', error);
      }
    } else {
      console.log('Camera API is only available on native platforms');
    }
  };

  return (
    <div className="app-container">
      <h1>Age Calculator</h1>

      {userPhoto && (
        <div className="photo-container">
          <img src={userPhoto} alt="User" className="user-photo" />
        </div>
      )}

      <div className="input-container">
        <label htmlFor="birthYear">Enter your birth year:</label>
        <input
          type="number"
          id="birthYear"
          value={birthYear}
          onChange={(e) => setBirthYear(e.target.value)}
          placeholder="e.g., 1990"
        />
      </div>

      <div className="button-container">
        <button className="calculate-btn" onClick={calculateAge}>
          Calculate Age
        </button>

        <button className="share-btn" onClick={shareResult} disabled={!age}>
          Share Result
        </button>

        <button className="camera-btn" onClick={takePhoto}>
          Take Photo
        </button>
      </div>

      {age !== null && (
        <div className="result-container">
          <h2>Your age is: {age} years</h2>
        </div>
      )}
    </div>
  );
}

export default App;