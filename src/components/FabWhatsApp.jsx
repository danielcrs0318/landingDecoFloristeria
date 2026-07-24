import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Fab,
  IconButton,
  InputBase,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FaWhatsapp } from 'react-icons/fa';
import { FiChevronLeft, FiMoreVertical, FiPaperclip, FiSend, FiSmile, FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { DISPLAY_WHATSAPP, openWhatsApp } from '../utils/whatsapp';
import { useWhatsAppChat } from '../context/WhatsAppChatContext';
import { heroImage } from '../data/images';

const formatTime = (date = new Date()) =>
  date.toLocaleTimeString('es-HN', { hour: '2-digit', minute: '2-digit', hour12: true });

const initialMessages = () => [
  {
    id: 'welcome-1',
    from: 'business',
    text: '¡Hola! 👋 Bienvenido/a a Deco Floristería.',
    time: formatTime(),
  },
  {
    id: 'welcome-2',
    from: 'business',
    text: '¿En qué podemos ayudarte hoy? Puedes pedirnos un ramo, centro de mesa, decoración o cotización.',
    time: formatTime(),
  },
];

const quickReplies = [
  'Quiero un ramo',
  'Cotizar evento',
  'Horarios de entrega',
  'Ver catálogo',
];

const Bubble = ({ message }) => {
  const isUser = message.from === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 0.75,
        px: 1.25,
      }}
    >
      <Box
        sx={{
          maxWidth: '82%',
          bgcolor: isUser ? '#DCF8C6' : '#FFF',
          color: '#111B21',
          px: 1.25,
          pt: 0.85,
          pb: 0.5,
          borderRadius: isUser ? '10px 10px 2px 10px' : '10px 10px 10px 2px',
          boxShadow: '0 1px 0.5px rgba(11, 20, 26, 0.13)',
          position: 'relative',
        }}
      >
        <Typography
          sx={{
            fontSize: '0.9rem',
            lineHeight: 1.4,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {message.text}
        </Typography>
        <Typography
          component="span"
          sx={{
            display: 'block',
            textAlign: 'right',
            fontSize: '0.68rem',
            color: 'rgba(17, 27, 33, 0.55)',
            mt: 0.35,
            ml: 2,
            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {message.time}
        </Typography>
      </Box>
    </Box>
  );
};

const FabWhatsApp = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { open, draft, openChat, closeChat, clearDraft } = useWhatsAppChat();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const replyTimer = useRef(null);

  useEffect(() => {
    if (open && draft) {
      const text = draft;
      clearDraft();
      // Prellenar y enviar como burbuja de usuario
      const userMsg = {
        id: `u-${Date.now()}`,
        from: 'user',
        text,
        time: formatTime(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setTyping(true);
      if (replyTimer.current) clearTimeout(replyTimer.current);
      replyTimer.current = setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `b-${Date.now()}`,
            from: 'business',
            text: '¡Recibimos tu mensaje! En un momento te confirmamos disponibilidad y detalles. Si prefieres, también puedes continuar en la app de WhatsApp.',
            time: formatTime(),
          },
        ]);
      }, 1000);
    }
  }, [open, draft, clearDraft]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 280);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    if (!open || !isMobile) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open, isMobile]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  useEffect(() => () => {
    if (replyTimer.current) clearTimeout(replyTimer.current);
  }, []);

  const getAutoReply = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('horario') || lower.includes('hora')) {
      return 'Atendemos de lunes a sábado, 8:00 am – 6:00 pm. ¿Quieres agendar una entrega?';
    }
    if (lower.includes('catálogo') || lower.includes('catalogo') || lower.includes('precio')) {
      return 'Puedes ver el catálogo recomendado en la página. Dime qué estilo buscas (ramo, caja, centro) y te cotizamos.';
    }
    if (lower.includes('evento') || lower.includes('boda') || lower.includes('cumple')) {
      return '¡Claro! Para eventos necesitamos fecha, lugar y estilo. Cuéntanos los detalles y armamos una propuesta.';
    }
    if (lower.includes('ramo') || lower.includes('bouquet') || lower.includes('flores')) {
      return 'Perfecto. ¿Para qué ocasión es y qué colores prefieres? También dime si necesitas entrega a domicilio.';
    }
    return 'Gracias por escribirnos. Un asesor te atenderá en breve. Si quieres, deja tu nombre, teléfono y tipo de pedido.';
  };

  const pushUserMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      from: 'user',
      text: trimmed,
      time: formatTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    if (replyTimer.current) clearTimeout(replyTimer.current);
    replyTimer.current = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `b-${Date.now()}`,
          from: 'business',
          text: getAutoReply(trimmed),
          time: formatTime(),
        },
      ]);
    }, 900 + Math.random() * 500);
  };

  const handleSend = (e) => {
    e?.preventDefault?.();
    pushUserMessage(input);
  };

  const handleContinueWhatsApp = () => {
    const userTexts = messages.filter((m) => m.from === 'user').map((m) => m.text);
    const payload = userTexts.length
      ? `Hola Deco Floristería,\n\n${userTexts.join('\n')}`
      : input.trim() || 'Hola, quiero hacer un pedido en Deco Floristería.';
    openWhatsApp(payload);
  };

  const chatPanel = (
    <Box
      component={motion.div}
      initial={isMobile ? { opacity: 0, y: 40 } : { opacity: 0, scale: 0.92, y: 16 }}
      animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
      exit={isMobile ? { opacity: 0, y: 40 } : { opacity: 0, scale: 0.92, y: 16 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      sx={{
        position: 'fixed',
        zIndex: 1300,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: '#EFEAE2',
        boxShadow: '0 12px 40px rgba(0,0,0,0.28)',
        ...(isMobile
          ? {
              inset: 0,
              width: '100%',
              height: '100%',
              borderRadius: 0,
              pb: 'env(safe-area-inset-bottom)',
            }
          : {
              bottom: 100,
              right: 28,
              width: 380,
              maxWidth: 'calc(100vw - 32px)',
              height: 560,
              maxHeight: 'min(560px, calc(100vh - 120px))',
              borderRadius: '16px',
            }),
      }}
      role="dialog"
      aria-label="Chat de WhatsApp Deco Floristería"
    >
      {/* Header estilo WhatsApp */}
      <Box
        sx={{
          bgcolor: '#075E54',
          color: '#FFF',
          px: 1,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          flexShrink: 0,
        }}
      >
        <IconButton
          size="small"
          onClick={closeChat}
          aria-label="Cerrar chat"
          sx={{ color: '#FFF' }}
        >
          {isMobile ? <FiChevronLeft size={24} /> : <FiX size={20} />}
        </IconButton>
        <Avatar
          src={heroImage}
          alt="Deco Floristería"
          sx={{ width: 40, height: 40, border: '1px solid rgba(255,255,255,0.25)' }}
        />
        <Box sx={{ flex: 1, minWidth: 0, ml: 1 }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '1rem',
              lineHeight: 1.2,
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
            }}
          >
            Deco Floristería
          </Typography>
          <Typography
            sx={{
              fontSize: '0.75rem',
              opacity: 0.9,
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {typing ? 'escribiendo…' : `en línea · ${DISPLAY_WHATSAPP}`}
          </Typography>
        </Box>
        <IconButton size="small" sx={{ color: '#FFF' }} aria-label="Más opciones">
          <FiMoreVertical />
        </IconButton>
      </Box>

      {/* Área de mensajes */}
      <Box
        ref={listRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          py: 1.5,
          backgroundImage: `
            linear-gradient(rgba(229, 221, 213, 0.92), rgba(229, 221, 213, 0.92)),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c4b0' fill-opacity='0.35'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          `,
          backgroundSize: 'auto, 60px 60px',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1.5 }}>
          <Box
            sx={{
              bgcolor: '#FFF3C7',
              color: '#54656F',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontSize: '0.72rem',
              boxShadow: '0 1px 1px rgba(0,0,0,0.08)',
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
            }}
          >
            Hoy · Chat seguro en la web
          </Box>
        </Box>

        {messages.map((msg) => (
          <Bubble key={msg.id} message={msg} />
        ))}

        {typing && (
          <Box sx={{ px: 1.25, mb: 0.75 }}>
            <Box
              sx={{
                display: 'inline-flex',
                gap: 0.5,
                bgcolor: '#FFF',
                px: 1.5,
                py: 1.1,
                borderRadius: '10px 10px 10px 2px',
                boxShadow: '0 1px 0.5px rgba(11, 20, 26, 0.13)',
              }}
            >
              {[0, 1, 2].map((i) => (
                <Box
                  key={i}
                  component={motion.span}
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                  transition={{ repeat: Infinity, duration: 1, delay: i * 0.15 }}
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    bgcolor: '#667781',
                    display: 'inline-block',
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {messages.length <= 2 && (
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ px: 1.5, mt: 1 }}>
            {quickReplies.map((reply) => (
              <Box
                key={reply}
                component="button"
                type="button"
                onClick={() => pushUserMessage(reply)}
                sx={{
                  border: '1px solid #25D366',
                  bgcolor: 'rgba(255,255,255,0.85)',
                  color: '#075E54',
                  borderRadius: 999,
                  px: 1.5,
                  py: 0.6,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
                  '&:hover': { bgcolor: '#E7F8EF' },
                }}
              >
                {reply}
              </Box>
            ))}
          </Stack>
        )}
      </Box>

      {/* Acciones */}
      <Box sx={{ bgcolor: '#F0F2F5', px: 1.5, pt: 1, pb: 0.5, flexShrink: 0 }}>
        <Box
          component="button"
          type="button"
          onClick={handleContinueWhatsApp}
          sx={{
            width: '100%',
            border: 'none',
            bgcolor: 'transparent',
            color: '#027EB5',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            py: 0.5,
            mb: 0.5,
            fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Continuar en la app de WhatsApp →
        </Box>
      </Box>

      {/* Input bar */}
      <Box
        component="form"
        onSubmit={handleSend}
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 0.75,
          px: 1,
          pb: 1.25,
          pt: 0.5,
          bgcolor: '#F0F2F5',
          flexShrink: 0,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#FFF',
            borderRadius: 999,
            px: 1,
            minHeight: 44,
          }}
        >
          <IconButton size="small" tabIndex={-1} sx={{ color: '#54656F' }} aria-hidden>
            <FiSmile size={20} />
          </IconButton>
          <InputBase
            inputRef={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe un mensaje"
            multiline
            maxRows={4}
            sx={{
              flex: 1,
              px: 0.5,
              py: 0.75,
              fontSize: '0.95rem',
              fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
            }}
          />
          <IconButton size="small" tabIndex={-1} sx={{ color: '#54656F' }} aria-hidden>
            <FiPaperclip size={18} />
          </IconButton>
        </Box>
        <IconButton
          type="submit"
          aria-label="Enviar mensaje"
          sx={{
            bgcolor: '#00A884',
            color: '#FFF',
            width: 48,
            height: 48,
            flexShrink: 0,
            '&:hover': { bgcolor: '#008F72' },
          }}
        >
          <FiSend size={20} />
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {isMobile && (
              <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeChat}
                sx={{
                  position: 'fixed',
                  inset: 0,
                  bgcolor: 'rgba(0,0,0,0.35)',
                  zIndex: 1290,
                }}
              />
            )}
            {chatPanel}
          </>
        )}
      </AnimatePresence>

      {!open && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 200 }}
          style={{
            position: 'fixed',
            bottom: isMobile ? 'max(16px, env(safe-area-inset-bottom))' : 28,
            right: isMobile ? 16 : 28,
            zIndex: 1000,
          }}
        >
          <motion.div
            animate={{
              boxShadow: ['0 0 0 0 rgba(37, 211, 102, 0.7)', '0 0 0 14px rgba(37, 211, 102, 0)'],
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{ borderRadius: '50%' }}
          >
            <Fab
              aria-label="Abrir chat de WhatsApp"
              onClick={() => openChat()}
              sx={{
                bgcolor: '#25D366',
                color: '#FFF',
                width: { xs: 56, sm: 60 },
                height: { xs: 56, sm: 60 },
                '&:hover': { bgcolor: '#128C7E' },
              }}
            >
              <FaWhatsapp size={isMobile ? 28 : 32} />
            </Fab>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default FabWhatsApp;
