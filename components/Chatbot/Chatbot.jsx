"use client"

// components/Chatbot/Chatbot.js
import { useState, useEffect } from 'react';
import styles from './Chatbot.module.css'; // Asegúrate que este archivo existe y los nombres de clase coinciden
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import { FiMessageSquare, FiX } from 'react-icons/fi'; // Iconos para el botón de toggle

// --- INICIO DE DEFINICIONES DEL BOT ---
// Estas deben estar FUERA y ANTES de la definición del componente Chatbot

const initialBotMessage = {
  id: 'bot-intro-' + Date.now(), // ID único para la primera carga
  text: [
    "¡Hola! Soy tu asistente virtual Dadá jr.",
    "¿En qué puedo ayudarte hoy?"
  ],
  sender: 'bot',
  quickReplies: [
    { text: "Resolver dudas.", payload: "RESOLVE_DOUBTS" },
    { text: "Agendar una cita.", payload: "SCHEDULE_APPOINTMENT" },
    { text: "Contactar a Andrés.", payload: "CONTACT_ANDRES" },
  ],
};

const botResponses = {
  RESOLVE_DOUBTS: {
    text: "Claro, estoy aquí para resolver tus dudas. ¿Sobre qué tema te gustaría preguntar?",
    sender: 'bot',
    quickReplies: [
      { text: "Precios", payload: "PRICING_INFO" },
      { text: "Servicios", payload: "SERVICES_INFO" },
      { text: "Volver", payload: "GOTO_INITIAL" },
    ]
  },
  SCHEDULE_APPOINTMENT: {
    text: "Entendido. Para agendar una cita, por favor, indícame una fecha y hora tentativas o contáctanos directamente.",
    sender: 'bot',
    quickReplies: [ { text: "Volver", payload: "GOTO_INITIAL" } ]
  },
  CONTACT_ANDRES: {
    text: "Puedes contactar a Andrés llamando al +XX XXX XXXX o escribiendo a andres@ejemplo.com.",
    sender: 'bot',
    quickReplies: [ { text: "Volver", payload: "GOTO_INITIAL" } ]
  },
  PRICING_INFO: {
    text: "Nuestros precios varían. ¿Podrías especificar el servicio que te interesa o prefieres ver una lista general?",
    sender: 'bot',
    quickReplies: [
      { text: "Diseño de Logos", payload: "PRICE_WEBDEV" },
      { text: "Consultoría", payload: "PRICE_CONSULT" },
      { text: "Volver a dudas", payload: "RESOLVE_DOUBTS" }
    ]
  },
  SERVICES_INFO: {
    text: "Ofrecemos diseño de logos, consultoría de marca y diseño gráfico. ¿Sobre cuál te gustaría saber más?",
    sender: 'bot',
    quickReplies: [
      { text: "Diseño de Logos", payload: "SERVICE_WEBDEV" },
      { text: "Consultoría de Marca", payload: "SERVICE_BRANDING" },
      { text: "Volver a dudas", payload: "RESOLVE_DOUBTS" }
    ]
  },
  // Añade más respuestas para PRICE_WEBDEV, PRICE_CONSULT, SERVICE_WEBDEV, SERVICE_BRANDING si es necesario
  GOTO_INITIAL: initialBotMessage, // Referencia directa
  DEFAULT: {
    text: "No he entendido eso. ¿Podrías intentarlo de otra manera o elegir una de las opciones?",
    sender: 'bot',
    quickReplies: initialBotMessage ? initialBotMessage.quickReplies : [] // Fallback por si acaso
  }
};

function getBotResponse(userInput, payload) {
  console.log('[getBotResponse] Received userInput:', userInput, 'payload:', payload);

  if (payload && botResponses[payload]) {
    if (payload === "GOTO_INITIAL") {
      console.log('[getBotResponse] Responding with initialBotMessage for GOTO_INITIAL');
      return { ...initialBotMessage, id: 'bot-gti-' + Date.now() }; // Nuevo ID para evitar conflictos de key
    }
    console.log('[getBotResponse] Responding with botResponses[payload]:', botResponses[payload]);
    return { ...botResponses[payload], id: 'bot-payload-' + Date.now() }; // Nuevo ID
  }

  const input = userInput ? userInput.toLowerCase().trim() : "";

  if (input.includes("hola") || input.includes("buenos dias") || input.includes("hey")) {
    console.log('[getBotResponse] Responding with initialBotMessage for greeting');
    return { ...initialBotMessage, id: 'bot-greeting-' + Date.now() }; // Nuevo ID
  }
  if (input.includes("precio")) {
    console.log('[getBotResponse] Responding with PRICING_INFO for "precio"');
    return { ...botResponses.PRICING_INFO, id: 'bot-price-' + Date.now() }; // Nuevo ID
  }
  if (input.includes("adios") || input.includes("gracias")) {
    return { text: "¡De nada! Espero haberte ayudado. ¡Hasta pronto!", sender: 'bot', id: 'bot-bye-' + Date.now() };
  }

  console.log('[getBotResponse] Responding with DEFAULT');
  const defaultResponse = { ...botResponses.DEFAULT };
  if (initialBotMessage && initialBotMessage.quickReplies) {
    defaultResponse.quickReplies = [...initialBotMessage.quickReplies];
  } else {
    defaultResponse.quickReplies = [
        { text: "Resolver dudas.", payload: "RESOLVE_DOUBTS" },
        { text: "Agendar una cita.", payload: "SCHEDULE_APPOINTMENT" },
        { text: "Contactar a Andrés.", payload: "CONTACT_ANDRES" },
    ];
  }
  defaultResponse.id = 'bot-default-' + Date.now(); // Nuevo ID
  return defaultResponse;
}

// --- FIN DE DEFINICIONES DEL BOT ---


export default function Chatbot() {
  const [messages, setMessages] = useState(() => {
    if (initialBotMessage && typeof initialBotMessage === 'object') {
      // Asegurarse de que el mensaje inicial tenga un ID único si se reutiliza el objeto
      return [{ ...initialBotMessage, id: 'bot-initial-' + Date.now() }];
    }
    console.error("[Chatbot] initialBotMessage no está definido o no es un objeto al inicializar el estado messages.");
    return [{ id: 'error-init-' + Date.now(), text: 'Error al cargar el chat.', sender: 'bot' }];
  });
  const [isOpen, setIsOpen] = useState(false); // El chat comienza cerrado por defecto

  const addMessage = (text, sender, quickReplies = null) => { // Cambiado quickRepliesPayload a quickReplies
    const newMessage = {
      id: sender + '-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9), // ID más robusto
      text,
      sender,
      quickReplies: quickReplies || null // Asegura que sea null si no se provee
    };
    console.log('[Chatbot] Adding message:', newMessage);
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const handleSendMessage = (userInput) => {
    if (!userInput || userInput.trim() === "") return;
    addMessage(userInput, 'user');
    console.log('[Chatbot] User sent (text):', userInput);

    setTimeout(() => {
      const botReply = getBotResponse(userInput, null);
      console.log('[Chatbot] Bot response for text input:', botReply);
      if (botReply && typeof botReply.text !== 'undefined') {
        addMessage(botReply.text, 'bot', botReply.quickReplies);
      } else {
        console.error("Error: getBotResponse no devolvió una respuesta válida para el input del usuario:", userInput, botReply);
        addMessage("Lo siento, no pude procesar tu solicitud en este momento.", 'bot');
      }
    }, 500 + Math.random() * 500);
  };

  const handleQuickReplyClick = (replyText, payload) => { // El primer argumento es el texto del botón
    addMessage(replyText, 'user'); // El usuario "dijo" el texto del botón
    console.log('[Chatbot] User clicked quick reply:', replyText, 'Payload:', payload);

    setTimeout(() => {
      const botReply = getBotResponse(null, payload);
      console.log('[Chatbot] Bot response for quick reply payload:', payload, botReply);
      if (botReply && typeof botReply.text !== 'undefined') {
        addMessage(botReply.text, 'bot', botReply.quickReplies);
      } else {
        console.error("Error: getBotResponse no devolvió una respuesta válida para el payload:", payload, botReply);
        addMessage("Lo siento, no pude procesar esa opción en este momento.", 'bot');
      }
    }, 500 + Math.random() * 500);
  };

  const handleRefresh = () => {
    console.log('[Chatbot] Refreshing chat.');
    if (initialBotMessage) {
      setMessages([{ ...initialBotMessage, id: 'bot-refreshed-' + Date.now() }]); // Nuevo ID al refrescar
    } else {
      setMessages([{ id: 'error-refresh-' + Date.now(), text: 'No se pudo reiniciar el chat.', sender: 'bot' }]);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    console.log('[Chatbot] Toggled chat, isOpen:', !isOpen);
  };

  const handleCloseChatWindow = () => {
    setIsOpen(false);
    console.log('[Chatbot] Closed chat window via header X.');
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className={`${styles.chatToggleButton} ${isOpen ? styles.chatToggleButtonOpen : ''}`}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        {isOpen ? <FiX size={28} /> : <FiMessageSquare size={28} />}
      </button>

      {isOpen && (
        <div className={styles.chatbotOuterContainer}>
          <div className={styles.chatbotContainer}>
            <ChatHeader onRefresh={handleRefresh} onClose={handleCloseChatWindow} />
            <MessageList messages={messages} onQuickReplyClick={handleQuickReplyClick} />
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      )}
    </>
  );
}