"use client"

import styles from './Chatbot.module.css';
import Image from 'next/image'


export default function Message({ message, showAvatar }) {
  const isUser = message.sender === 'user';



  // Si es un mensaje del bot y debe mostrar avatar
  const botAvatarElement = !isUser && showAvatar ? (
        <Image 
            src="/assets/avatar-bot.jpg" 
            alt="Dada-jr" 
            width={40} 
            height={40} 
            className={styles.headerAvatar} 
        />
  ) : null;

  // Contenedor para agrupar mensajes del bot
  if (!isUser && Array.isArray(message.text)) {
    return (
      <div className={`${styles.messageWrapper} ${styles[message.sender]}`}>
        {botAvatarElement}
        <div className={styles.botMessageGroup}>
          {message.text.map((txt, index) => (
            <div key={index} className={`${styles.messageBubble} ${styles[message.sender]}`}>
              {txt}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Mensaje simple
  return (
    <div className={`${styles.messageWrapper} ${styles[message.sender]}`}>
      {botAvatarElement}
      <div className={`${styles.messageBubble} ${styles[message.sender]}`}>
        {message.text}
      </div>
    </div>
  );
}