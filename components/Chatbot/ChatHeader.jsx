"use client"

import styles from './Chatbot.module.css';
import { FiRefreshCw, FiX } from 'react-icons/fi'; // Necesitarás instalar react-icons: npm install react-icons
import Image from 'next/image'


export default function ChatHeader({ onRefresh, onClose }) {
  return (
<div className={styles.chatHeader}>
  <div className={styles.headerLeft}>
    <Image 
        src="/assets/avatar-bot.jpg" 
        alt="Dada-jr" 
        width={40} 
        height={40} 
        className={styles.headerAvatar} 
    />
    <div>
      <h3>Dada-jr</h3>
      <p>¡Tu asistente personal que resolverá tus dudas!</p>
    </div>
  </div>
  <div className={styles.headerRight}>
    <button onClick={onRefresh} title="Refrescar chat" aria-label="Refrescar chat">
      <FiRefreshCw />
    </button>
    <button onClick={onClose} title="Cerrar chat" aria-label="Cerrar chat">
      <FiX />
    </button>
  </div>
</div>

  );
}