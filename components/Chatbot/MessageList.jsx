"use client";

// components/Chatbot/MessageList.jsx
import { useEffect, useRef } from 'react';
import styles from './Chatbot.module.css';
import Message from './Message';
import QuickReply from './QuickReply';


export default function MessageList({ messages, onQuickReplyClick }) {
  const messagesEndRef = useRef(null);

  if (!Array.isArray(messages)) {
  console.error('[MessageList] FATAL: messages is not an array:', messages);
  return <div className={styles.messageListError}>Error: los mensajes no se pudieron cargar correctamente.</div>;
}

  // DEBUG: Imprime la prop messages cuando el componente se renderiza
  console.log('[MessageList] Received messages:', messages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const shouldShowAvatar = (currentMsg, index, allMessages) => {
    if (currentMsg.sender === 'bot') {
      const nextMsg = allMessages[index + 1];
      return !nextMsg || nextMsg.sender === 'user';
    }
    return false;
  };

  // AGREGAR UNA GUARDA AQUÍ COMO MEDIDA DEFENSIVA
  if (!messages) {
    console.error('[MessageList] FATAL: messages prop is undefined or null!');
    // Puedes retornar algo para indicar el error o simplemente null para no renderizar nada
    return <div className={styles.messageListError}>Error: No se pudieron cargar los mensajes.</div>;
  }

  return (
    <div className={styles.messageList}>
      <div className={styles.dateSeparator}>Today</div>
      {messages.map((msg, index) => {
        // Es buena idea también verificar si 'msg' es válido, aunque el error principal es que 'messages' es undefined
        if (!msg || typeof msg.id === 'undefined') {
          console.warn(`[MessageList] Message at index ${index} is invalid or missing id:`, msg);
          return null; // O un placeholder de error para este mensaje específico
        }
        return (
          <Message
            key={msg.id} // Asegúrate que msg.id siempre exista
            message={msg}
            showAvatar={shouldShowAvatar(msg, index, messages)}
          />
        );
      })}
      {messages.length > 0 && // Esta comprobación ya es buena
        messages[messages.length - 1].sender === 'bot' &&
        messages[messages.length - 1].quickReplies && (
          <QuickReply
            replies={messages[messages.length - 1].quickReplies}
            onQuickReplyClick={onQuickReplyClick}
          />
        )}
      <div ref={messagesEndRef} />
    </div>
  );
}