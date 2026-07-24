export const WHATSAPP_NUMBER = '50499990000';
export const DISPLAY_WHATSAPP = '+504 9999-0000';

export const buildWhatsAppUrl = (message) => {
  const text = encodeURIComponent(message.trim());
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
};

export const openWhatsApp = (message) => {
  window.open(buildWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
};
