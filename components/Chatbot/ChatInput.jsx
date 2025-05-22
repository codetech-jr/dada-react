"use client"

import { useState } from 'react';
import styles from './Chatbot.module.css';
import { FiSend } from 'react-icons/fi'; // O un icono de micrófono si lo prefieres

export default function ChatInput({ onSendMessage }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevenir nueva línea en algunos inputs
      handleSubmit();
    }
  };

  return (
    <div className={styles.chatInputContainer}>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Escribe a nuestro bot"
      />
      <button onClick={handleSubmit} className={styles.sendButton} aria-label="Enviar mensaje">
        <FiSend />
      </button>
    </div>
  );
}