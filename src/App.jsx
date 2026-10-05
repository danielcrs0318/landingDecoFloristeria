import { useState } from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiGift,
  FiHeart,
  FiMapPin,
  FiMenu,
  FiMessageCircle,
  FiX,
} from 'react-icons/fi';
import { buildWhatsAppUrl, DISPLAY_WHATSAPP } from './utils/whatsapp';
import './App.css';

const instagramUrl = 'https://www.instagram.com/deco_fiesta2023/';
const asset = (name) => `/images/instagram/${name}.webp`;

const featured = [
  {
    title: 'Rosas para sorprender',
    description: 'Un detalle lleno de color para celebrar a alguien especial.',
    image: asset('rosas-rosadas'),
    post: 'https://www.instagram.com/deco_fiesta2023/p/C7NWW4hvZQW/',
    message: 'Hola Deco Fiesta, quisiera cotizar un arreglo con rosas.',
  },
  {
    title: 'Rosas y dulces',
    description: 'Una combinación deliciosa para regalar con cariño.',
    image: asset('rosas-y-dulces'),
    post: 'https://www.instagram.com/deco_fiesta2023/p/DGEw-hAvUqR/',
    message: 'Hola Deco Fiesta, quisiera cotizar un arreglo con rosas y dulces.',
  },
  {
    title: 'Flores y globos',
    description: 'Alegría y flores en una sorpresa que se hace notar.',
    image: asset('arreglo-con-globo'),
    post: 'https://www.instagram.com/deco_fiesta2023/p/CxodASGP6Cy/',
    message: 'Hola Deco Fiesta, quisiera cotizar un arreglo con globos.',
  },
];

const collection = [
  { title: 'Ramos con rosas', image: asset('rosas-amarillas'), post: 'https://www.instagram.com/deco_fiesta2023/p/CxodLIQP2j7/' },
  { title: 'Flores con girasoles', image: asset('ramo-girasoles'), post: 'https://www.instagram.com/deco_fiesta2023/p/Cy8xcDiruov/' },
  { title: 'Canastas especiales', image: asset('canasta-rosas-rojas'), post: 'https://www.instagram.com/deco_fiesta2023/p/Cxocq7fvnD8/' },
  { title: 'Detalles con peluches', image: asset('oso-y-rosas'), post: 'https://www.instagram.com/deco_fiesta2023/p/CxodTNHvxko/' },
];

const steps = [
  { number: '01', title: 'Cuéntanos tu idea', text: 'Comparte la ocasión, la fecha y el estilo que tienes en mente.' },
  { number: '02', title: 'Elige los detalles', text: 'Consulta colores, opciones y disponibilidad por WhatsApp.' },
  { number: '03', title: 'Confirma tu pedido', text: 'Acuerda el precio y la entrega directamente con Deco Fiesta.' },
];

const faqs = [
  { question: '¿Puedo personalizar un arreglo?', answer: 'Cuéntanos los colores, la ocasión y tu presupuesto para consultar las opciones disponibles.' },
  { question: '¿Con cuánto tiempo debo hacer mi pedido?', answer: 'Escríbenos lo antes posible e indica la fecha deseada. La disponibilidad se confirma por WhatsApp.' },
  { question: '¿Pueden entregar fuera de Taulabé?', answer: 'Comparte la dirección y la fecha por WhatsApp para consultar cobertura y costo de entrega.' },
];

function WhatsAppLink({ children, message, className = '', ...props }) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}

function Brand({ onClick, footer = false }) {
  return (
    <a className={`brand${footer ? ' brand-footer' : ''}`} href="#inicio" onClick={onClick} aria-label="Deco Fiesta, volver al inicio">
      <img src={asset('perfil-deco-fiesta')} alt="Logo de Deco Fiesta Floristería" width="54" height="54" />
      <span><strong>deco fiesta</strong><small>FLORISTERÍA · TAULABÉ</small></span>
    </a>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ occasion: '', date: '', details: '' });
  const closeMenu = () => setMenuOpen(false);
  const orderMessage = [
    'Hola Deco Fiesta, me gustaría cotizar un detalle.',
    form.occasion && `Ocasión: ${form.occasion}`,
    form.date && `Fecha deseada: ${form.date}`,
    form.details && `Mi idea: ${form.details}`,
  ].filter(Boolean).join('\n');

  return (
    <>
      <header className="site-header">
        <div className="container nav-shell">
          <Brand onClick={closeMenu} />
          <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Navegación principal">
            <a href="#inicio" onClick={closeMenu}>Inicio</a>
            <a href="#detalles" onClick={closeMenu}>Detalles</a>
            <a href="#coleccion" onClick={closeMenu}>Colección</a>
            <a href="#nosotros" onClick={closeMenu}>Nosotros</a>
            <a href="#contacto" onClick={closeMenu}>Contacto</a>
            <WhatsAppLink className="button button-primary nav-button" message="Hola Deco Fiesta, quiero cotizar un detalle." onClick={closeMenu}>
              Cotizar <FiArrowUpRight />
            </WhatsAppLink>
          </nav>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow"><span className="eyebrow-stem" /> DECO FIESTA FLORISTERÍA</span>
              <h1>Flores y detalles <em>para momentos</em> inolvidables.</h1>
              <p>Arreglos con rosas, dulces y globos para hacer sentir especial a quien más quieres. Hechos a tu gusto en Taulabé, Comayagua.</p>
              <div className="hero-actions">
                <WhatsAppLink className="button button-primary" message="Hola Deco Fiesta, quiero cotizar un detalle.">Pedir un detalle <FiArrowUpRight /></WhatsAppLink>
                <a className="text-link" href="#detalles">Ver detalles <FiArrowRight /></a>
              </div>
              <div className="hero-follow"><span>Síguenos</span><a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Deco Fiesta"><FaInstagram /></a><span className="hero-follow-line" /> <span>@deco_fiesta2023</span></div>
            </div>
            <div className="hero-visual">
              <div className="hero-halo" />
              <span className="sparkle sparkle-one" aria-hidden="true">✳</span>
              <span className="sparkle sparkle-two" aria-hidden="true">✳</span>
              <span className="sparkle sparkle-three" aria-hidden="true">✦</span>
              <a href={featured[0].post} target="_blank" rel="noopener noreferrer" aria-label="Ver arreglo de rosas de Deco Fiesta en Instagram">
                <img src={featured[0].image} alt="Arreglo real de rosas rosadas de Deco Fiesta" fetchPriority="high" />
              </a>
              <div className="hero-photo-tag"><span className="tag-star">✦</span><span>Flores que hablan<br /><strong>por ti</strong></span></div>
              <small>Foto real de Deco Fiesta · Instagram</small>
            </div>
          </div>
          <div className="hero-arc hero-arc-left" aria-hidden="true" />
          <div className="hero-arc hero-arc-right" aria-hidden="true" />
        </section>

        <div className="container benefits" aria-label="Información para tu pedido">
          <div><span className="benefit-icon"><FiGift /></span><span><strong>Detalles para regalar</strong><small>Rosas, dulces y más</small></span></div>
          <div><span className="benefit-icon"><FiHeart /></span><span><strong>A tu estilo</strong><small>Pregunta por opciones personalizadas</small></span></div>
          <div><span className="benefit-icon"><FiMessageCircle /></span><span><strong>WhatsApp directo</strong><small>Consulta precio y disponibilidad</small></span></div>
        </div>

        <section className="section featured-section" id="detalles">
          <div className="container">
            <div className="section-heading centered"><span className="section-kicker">DETALLES</span><h2>Encuentra tu <em>favorito</em></h2><p>Ideas reales del Instagram de Deco Fiesta para inspirar tu próximo regalo.</p></div>
            <div className="featured-grid">
              {featured.map((item, index) => (
                <article className="featured-card" key={item.title}>
                  <a className={`featured-image featured-image-${index + 1}`} href={item.post} target="_blank" rel="noopener noreferrer" aria-label={`Ver ${item.title} en Instagram`}>
                    <img src={item.image} alt={item.title} loading="lazy" />
                    <span className="image-link-icon"><FiArrowUpRight /></span>
                  </a>
                  <div className="featured-content"><span>0{index + 1} / DETALLE</span><h3>{item.title}</h3><p>{item.description}</p><WhatsAppLink message={item.message}>Consultar este estilo <FiArrowRight /></WhatsAppLink></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="occasion-section">
          <div className="container occasion-grid">
            <div className="occasion-image"><img src={asset('canasta-rosas-rojas')} alt="Canasta real de rosas rojas y dulces de Deco Fiesta" loading="lazy" /><span>FOTO REAL · DECO FIESTA</span></div>
            <div className="occasion-copy"><span className="section-kicker">UNA IDEA PARA CADA OCASIÓN</span><h2>Haz que la sorpresa se sienta <em>muy tuya.</em></h2><p>Un ramo, una canasta o un detalle con dulces puede decir mucho. Cuéntanos a quién quieres sorprender y consulta las opciones disponibles.</p><WhatsAppLink className="button button-primary" message="Hola Deco Fiesta, quiero crear un detalle para una ocasión especial.">Hablemos de tu idea <FiArrowUpRight /></WhatsAppLink><span className="occasion-flower" aria-hidden="true">✳</span></div>
          </div>
        </section>

        <section className="section reasons-section" id="nosotros">
          <div className="container"><div className="section-heading centered"><span className="section-kicker">POR QUÉ DECO FIESTA</span><h2>Detalles hechos para <em>emocionar</em></h2><p>Desde un ramo de rosas hasta una sorpresa con globos, encuentra una idea para cada celebración.</p></div>
            <div className="reasons-grid">
              <div className="reason-column"><div className="reason-card peach"><span>01</span><h3>Muchas formas de regalar</h3><p>Rosas, dulces, globos, peluches y desayunos sorpresa.</p></div><div className="reason-card blush"><span>02</span><h3>Colores a tu gusto</h3><p>Cuéntanos el estilo que imaginas para tu detalle.</p></div></div>
              <div className="reason-photo"><img src={asset('rosas-y-dulces')} alt="Arreglo real de rosas, girasoles y chocolates de Deco Fiesta" loading="lazy" /><span className="reason-photo-star" aria-hidden="true">✳</span></div>
              <div className="reason-column"><div className="reason-card butter"><span>03</span><h3>Atención directa</h3><p>Consulta por WhatsApp la fecha, disponibilidad y precio.</p></div><div className="reason-card coral"><span>04</span><h3>Ocasiones especiales</h3><p>Una sorpresa para cumpleaños, aniversarios o simplemente porque sí.</p></div></div>
            </div>
          </div>
        </section>

        <section className="section collection-section" id="coleccion">
          <div className="container"><div className="section-heading collection-heading"><div><span className="section-kicker">NUESTRA COLECCIÓN</span><h2>Más inspiración <em>real</em></h2></div><a className="text-link" href={instagramUrl} target="_blank" rel="noopener noreferrer">Ver Instagram <FiArrowUpRight /></a></div>
            <div className="collection-grid">{collection.map((item) => <a className="collection-card" href={item.post} target="_blank" rel="noopener noreferrer" key={item.title}><div><img src={item.image} alt={`Trabajo real de Deco Fiesta: ${item.title}`} loading="lazy" /><span><FiArrowUpRight /></span></div><h3>{item.title}</h3><small>Ver publicación</small></a>)}</div>
          </div>
        </section>

        <section className="process-section"><div className="container"><div className="section-heading centered"><span className="section-kicker">ASÍ DE FÁCIL</span><h2>De tu idea a <em>un gran detalle</em></h2></div><div className="steps-grid">{steps.map((step) => <div className="step" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></div>)}</div></div></section>

        <section className="section faq-section"><div className="container faq-grid"><div><span className="section-kicker">PREGUNTAS FRECUENTES</span><h2>¿Tienes alguna <em>duda?</em></h2><p>Estamos a un mensaje de ayudarte a elegir un detalle.</p></div><div className="faq-list">{faqs.map((item) => <details key={item.question}><summary>{item.question}<span>+</span></summary><p>{item.answer}</p></details>)}</div></div></section>

        <section className="contact-section" id="contacto"><div className="container contact-grid"><div className="contact-copy"><span className="section-kicker">HABLEMOS DE TU IDEA</span><h2>Hagamos ese momento <em>inolvidable.</em></h2><p>Comparte los detalles para preparar una consulta por WhatsApp. Deco Fiesta confirmará disponibilidad, precio y entrega.</p><div className="contact-details"><span><FiMapPin /> Taulabé, Comayagua</span><span><FaWhatsapp /> {DISPLAY_WHATSAPP}</span><a href={instagramUrl} target="_blank" rel="noopener noreferrer"><FaInstagram /> @deco_fiesta2023 <FiArrowUpRight /></a></div></div><div className="contact-card"><div className="contact-card-title"><span>✳</span><div><small>EMPECEMOS</small><h3>Cuéntanos qué imaginas</h3></div></div><div className="field-grid"><label>¿Qué celebras?<select value={form.occasion} onChange={(event) => setForm({ ...form, occasion: event.target.value })}><option value="">Selecciona una ocasión</option><option>Cumpleaños</option><option>Aniversario</option><option>Desayuno sorpresa</option><option>Otra ocasión</option></select></label><label>¿Para cuándo?<input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} /></label><label className="field-full">Tu idea<textarea rows="3" placeholder="Por ejemplo, rosas rosadas con dulces..." value={form.details} onChange={(event) => setForm({ ...form, details: event.target.value })} /></label></div><WhatsAppLink className="button button-primary contact-submit" message={orderMessage}><FaWhatsapp /> Enviar consulta <FiArrowUpRight /></WhatsAppLink><p>WhatsApp se abrirá con tu mensaje listo. El pedido queda sujeto a confirmación.</p></div></div></section>
      </main>

      <footer className="site-footer"><div className="container footer-grid"><div><Brand footer /><p>Flores y detalles para celebrar, agradecer y sorprender en Taulabé, Comayagua.</p></div><div><strong>Explora</strong><a href="#detalles">Detalles</a><a href="#coleccion">Colección</a><a href="#nosotros">Nosotros</a><a href="#contacto">Contacto</a></div><div><strong>Encuéntranos</strong><a href={instagramUrl} target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a><WhatsAppLink message="Hola Deco Fiesta, quisiera hacer una consulta."><FaWhatsapp /> WhatsApp</WhatsAppLink><span>Taulabé, Comayagua</span></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Deco Fiesta Floristería</span><span>Fotografías de <a href={instagramUrl} target="_blank" rel="noopener noreferrer">@deco_fiesta2023</a></span></div></footer>
      <WhatsAppLink className="floating-whatsapp" message="Hola Deco Fiesta, quisiera cotizar un detalle." aria-label="Consultar por WhatsApp"><FaWhatsapp /></WhatsAppLink>
    </>
  );
}

export default App;
