// Número publicado en el perfil de Instagram de @deco_fiesta2023.
export const WHATSAPP_NUMBER = '50488006800';
export const DISPLAY_WHATSAPP = '+504 8800-6800';

export const buildWhatsAppUrl = (message = '') => {
  const text = encodeURIComponent(message.trim());
  return `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${text}` : ''}`;
};
