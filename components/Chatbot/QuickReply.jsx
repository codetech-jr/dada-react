"use client";

import styles from './Chatbot.module.css';
import { FiMessageSquare, FiCalendar, FiPhone } from 'react-icons/fi'; // Ejemplos de iconos

const iconMap = {
  'Resolver dudas.': <FiMessageSquare />,
  'Agendar una cita.': <FiCalendar />,
  'Contactar a Andrés.': <FiPhone />,
};

export default function QuickReply({ replies, onQuickReplyClick }) {
  if (!replies || replies.length === 0) {
    return null;
  }

  return (
    <div className={styles.quickReplyContainer}>
      {replies.map((reply) => (
        <button
          key={reply.payload}
          className={styles.quickReplyButton}
          onClick={() => onQuickReplyClick(reply.text, reply.payload)}
        >
          {iconMap[reply.text] /* Muestra icono si existe */}
          {reply.text}
        </button>
      ))}
    </div>
  );
}