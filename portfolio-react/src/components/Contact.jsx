import { useState } from 'react';
import './Contact.css';

const contactLinks = [
  { icon: 'fas fa-envelope',       label: 'EMAIL',        value: 'birhanassefa2127@gmail.com', href: 'mailto:birhanassefa2127@gmail.com' },
  { icon: 'fas fa-envelope',       label: 'ANOTHER EMAIL',value: 'birshze19@gmail.com',     href: 'mailto:birshze19@gmail.com' },
  { icon: 'fas fa-phone',          label: 'PHONE NUMBER', value: '+251 914 023 246',            href: 'tel:+251 914 023 246' },
  { icon: 'fas fa-mobile-alt',     label: 'PHONE 2',      value: '+251 713 224 196',            href: 'tel:+251 711 992 127' },
  { icon: 'fab fa-github',         label: 'GITHUB',   value: 'github.com/birhan21457', href: 'https://github.com/birhan21457' },
  { icon: 'fab fa-telegram-plane', label: 'TELEGRAM', value: '@B1rhan27',              href: 'https://t.me/B1rhan27' },
  { icon: 'fas fa-map-marker-alt', label: 'LOCATION',     value: 'Bahir Dar, Ethiopia',         href: '#' },
];

export default function Contact() {
  const [form, setForm]     = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ msg: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = form;
    if (!name || !email || !subject || !message) {
      return setStatus({ msg: 'Please fill in all fields.', type: 'error' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setStatus({ msg: 'Please enter a valid email address.', type: 'error' });
    }
    setLoading(true);
    try {
      const res = await fetch('https://formspree.io/f/xnpjzyjo', {
        method: 'POST',
        body: JSON.stringify(form),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        setStatus({ msg: "Message sent! I'll get back to you soon. 🚀", type: 'success' });
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        const data = await res.json();
        const err = data?.errors?.map(e => e.message).join(', ') || 'Something went wrong.';
        setStatus({ msg: err, type: 'error' });
      }
    } catch {
      setStatus({ msg: 'Network error. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ msg: '', type: '' }), 6000);
    }
  };

  return (
    <section className="contact section" id="contact">
      <div className="container">
        <h2 className="section-title">Get In <span>Touch</span></h2>
        <div className="contact-grid">

          <div className="contact-info">
            <h3>Let's Work Together</h3>
            <p>I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>
            <div className="contact-links">
              {contactLinks.map(({ icon, label, value, href }) => (
                <a href={href} className="contact-link" key={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                  <div className="contact-link-icon"><i className={icon}></i></div>
                  <div className="contact-link-text">
                    <span className="contact-link-label">{label}</span>
                    <span className="contact-link-value">{value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <input type="hidden" name="_subject" value="New message from Portfolio" />
            {[
              { id: 'name',    type: 'text',  label: 'Your Name' },
              { id: 'email',   type: 'email', label: 'Your Email' },
              { id: 'subject', type: 'text',  label: 'Subject' },
            ].map(({ id, type, label }) => (
              <div className="form-group" key={id}>
                <input
                  type={type} id={id} name={id}
                  placeholder={label}
                  value={form[id]}
                  onChange={handleChange}
                  required
                />
                <label htmlFor={id}>{label}</label>
              </div>
            ))}
            <div className="form-group">
              <textarea
                id="message" name="message" rows="5"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
              <label htmlFor="message">Your Message</label>
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading
                ? <><i className="fas fa-spinner fa-spin"></i> Sending…</>
                : <><i className="fas fa-paper-plane"></i> Send Message</>}
            </button>
            {status.msg && (
              <p className={`form-status ${status.type}`}>{status.msg}</p>
            )}
          </form>

        </div>
      </div>
    </section>
  );
}
