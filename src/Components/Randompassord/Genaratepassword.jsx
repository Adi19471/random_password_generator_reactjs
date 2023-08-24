import React, { useState, useEffect } from 'react';
import './Genarate-Style.css';

const App = () => {
  const [password, setPassword] = useState('');
  const [passwordHistory, setPasswordHistory] = useState([]);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeAlphabets, setIncludeAlphabets] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('passwordHistory'));
    if (storedHistory) {
      setPasswordHistory(storedHistory);
    }
  }, []);

  const generatePassword = () => {
    const length = 8; // Set desired password length

    const numbers = '0123456789';
    const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characters = '';

    if (includeNumbers) characters += numbers;
    if (includeAlphabets) characters += alphabets;
    if (includeSpecialChars) characters += specialChars;

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }

    setPassword(newPassword);
    addToHistory(newPassword);
  };

  const addToHistory = (newPassword) => {
    const updatedHistory = [newPassword, ...passwordHistory.slice(0, 4)];
    setPasswordHistory(updatedHistory);
    localStorage.setItem('passwordHistory', JSON.stringify(updatedHistory));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    // alert("You copyed ur password ")
    // Add a user notification that the password has been copied
  };

  return (
    <div className="app-container">
    <h1 className='random'>Random Password Generator..</h1>
    <hr />
      <h2>Password Generator</h2>
      <div className="options">
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.value)}
          />
          Include Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeAlphabets}
            onChange={() => setIncludeAlphabets(!includeAlphabets)}
          />
          Include Alphabets
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSpecialChars}
            onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
          />
          Include Special Characters
        </label>
      </div>
      <button className="button" onClick={generatePassword}>
        Generate Password
      </button>
      <button className="button" onClick={copyToClipboard}>
        Copy to Clipboard
      </button>
      <div className="generated-password">
        <strong>Generated Password:</strong> {password}
      </div>
      <h3 className="history-heading">Password History</h3>
      <ul className="history-list">
        {passwordHistory.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
