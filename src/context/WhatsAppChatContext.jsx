import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const WhatsAppChatContext = createContext(null);

export const WhatsAppChatProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');

  const openChat = useCallback((message = '') => {
    setDraft(typeof message === 'string' ? message : '');
    setOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setOpen(false);
  }, []);

  const clearDraft = useCallback(() => setDraft(''), []);

  const value = useMemo(
    () => ({ open, draft, openChat, closeChat, clearDraft, setOpen }),
    [open, draft, openChat, closeChat, clearDraft]
  );

  return (
    <WhatsAppChatContext.Provider value={value}>
      {children}
    </WhatsAppChatContext.Provider>
  );
};

export const useWhatsAppChat = () => {
  const ctx = useContext(WhatsAppChatContext);
  if (!ctx) {
    throw new Error('useWhatsAppChat must be used within WhatsAppChatProvider');
  }
  return ctx;
};
