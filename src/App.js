import React, { useEffect, useState } from 'react';
import './App.css';

const DEFAULT_APPS = [
  {
    id: 'vedic-math',
    icon: '🕉️',
    name: 'Vedic Math: Learn & Quiz',
    tagline: 'Ancient math, modern speed',
    desc: 'Learn all 16 Vedic Math sutras with step-by-step visualizations, then put them to the test with quizzes, XP, and badges — a fun way to build lightning-fast mental math skills.',
    tags: ['16 Sutras', 'Interactive Quizzes', 'XP & Badges'],
    appStoreLink: 'https://apps.apple.com/us/app/vedic-math-learn-quiz/id6783467135',
    playStoreLink: '',
  },
];

const ADMIN_PASSWORD = 'Anshu@123';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ from_name: '', from_email: '', industry: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');

  const [apps, setApps] = useState(() => {
    try {
      const saved = localStorage.getItem('ikshana_apps');
      return saved ? JSON.parse(saved) : DEFAULT_APPS;
    } catch {
      return DEFAULT_APPS;
    }
  });
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminError, setAdminError] = useState('');
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('ikshana_apps', JSON.stringify(apps));
    } catch {}
  }, [apps]);

  const handleAdminLogin = () => {
    if (adminPasswordInput === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setShowAdminPanel(true);
      setAdminPasswordInput('');
      setAdminError('');
    } else {
      setAdminError('Incorrect password');
    }
  };

  const openAdmin = () => {
    if (isAdmin) {
      setShowAdminPanel(true);
    } else {
      setShowAdminLogin(true);
    }
  };

  const addNewApp = () => {
    setApps([
      ...apps,
      {
        id: `app-${Date.now()}`,
        icon: '📱',
        name: 'New App',
        tagline: '',
        desc: '',
        tags: [],
        appStoreLink: '',
        playStoreLink: '',
      },
    ]);
  };

  const updateApp = (id, field, value) => {
    setApps(apps.map(a => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const updateAppTags = (id, value) => {
    const tags = value.split(',').map(t => t.trim()).filter(Boolean);
    updateApp(id, 'tags', tags);
  };

  const removeApp = (id) => {
    if (window.confirm('Remove this app from the site?')) {
      setApps(apps.filter(a => a.id !== id));
    }
  };

  const handleSubmit = async () => {
    if (!formData.from_name || !formData.from_email || !formData.message) {
      alert('Please fill in your name, email and message.');
      return;
    }
    setFormStatus('sending');
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: 'service_hvnu8oz',
          template_id: 'template_alt0iic',
          user_id: 'DLCDgUFK4TFzICItv',
          template_params: {
            from_name: formData.from_name,
            from_email: formData.from_email,
            industry: formData.industry,
            message: formData.message
          }
        })
      });
      if (response.ok) {
        setFormStatus('sent');
        setFormData({ from_name: '', from_email: '', industry: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (err) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="site">
      {/* NAV */}
      <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <div className="nav__inner">
          <div className="nav__logo">
            <span className="logo-mark">I</span>
            <span className="logo-text">kshana</span>
          </div>
          <ul className={`nav__links ${menuOpen ? 'nav__links--open' : ''}`}>
            <li><a href="#services" onClick={() => setMenuOpen(false)}>Services</a></li>
            <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
            <li><a href="#industries" onClick={() => setMenuOpen(false)}>Industries</a></li>
            <li><a href="#apps" onClick={() => setMenuOpen(false)}>Apps</a></li>
            <li><a href="#farmsense" onClick={() => setMenuOpen(false)}>FarmSense</a></li>
            <li><a href="#founder" onClick={() => setMenuOpen(false)}>Leadership</a></li>
            <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          </ul>
          <button className="nav__cta" href="#contact">Get in Touch</button>
          <button className="nav__hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero__bg">
          <div className="hero__grid" />
          <div className="hero__glow" />
        </div>
        <div className="hero__content">
          <div className="hero__badge">Technology Solutions</div>
          <h1 className="hero__title">
            See the problem.<br />
            <span className="hero__title--accent">Solve it right.</span>
          </h1>
          <p className="hero__sub">
            Ikshana Solutions bridges the gap between complex real-world challenges
            and intelligent technology — across telecom, clinical trials, and education.
          </p>
          <div className="hero__actions">
            <a href="#services" className="btn btn--primary">Explore Services</a>
            <a href="#contact" className="btn btn--ghost">Talk to Us</a>
          </div>
        </div>
        <div className="hero__scroll-hint">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="container stats__grid">
          {[
            { number: '3+', label: 'Core Industries' },
            { number: '100%', label: 'Problem-First Approach' },
            { number: '∞', label: 'Scalable Solutions' },
            { number: '24/7', label: 'Support Commitment' },
          ].map((s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-card__number">{s.number}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="services section" id="services">
        <div className="container">
          <div className="section__header">
            <div className="section__tag">What We Do</div>
            <h2 className="section__title">Our Services</h2>
            <p className="section__sub">We don't just deliver software — we deliver solutions engineered to your real-world context.</p>
          </div>
          <div className="services__grid">
            {[
              {
                icon: '◈',
                title: 'Custom Software Development',
                desc: 'Tailored applications built from the ground up to address your specific operational challenges.',
              },
              {
                icon: '◎',
                title: 'Systems Integration',
                desc: 'Connecting disparate systems and data sources into a unified, seamless technology ecosystem.',
              },
              {
                icon: '◉',
                title: 'Data & Analytics',
                desc: 'Transform raw data into actionable insights with intelligent dashboards and reporting tools.',
              },
              {
                icon: '◆',
                title: 'Process Automation',
                desc: 'Eliminate repetitive workflows with smart automation that saves time and reduces errors.',
              },
              {
                icon: '◇',
                title: 'Technical Consulting',
                desc: 'Strategic guidance on architecture, technology selection, and digital transformation roadmaps.',
              },
              {
                icon: '▣',
                title: 'Cloud & Infrastructure',
                desc: 'Scalable, secure cloud deployments designed for reliability and performance at any scale.',
              },
            ].map((s, i) => (
              <div className="service-card" key={i}>
                <div className="service-card__icon">{s.icon}</div>
                <h3 className="service-card__title">{s.title}</h3>
                <p className="service-card__desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="industries section" id="industries">
        <div className="container">
          <div className="section__header">
            <div className="section__tag">Where We Work</div>
            <h2 className="section__title">Industries We Serve</h2>
            <p className="section__sub">Deep domain expertise means we understand your problems before we write a single line of code.</p>
          </div>
          <div className="industries__grid">
            {[
              {
                title: 'Telecommunication',
                desc: 'Network management, OSS/BSS systems, subscriber analytics, infrastructure optimization, and real-time monitoring solutions for modern telecom operators.',
                tags: ['Network Ops', 'OSS/BSS', 'Analytics', 'Automation'],
                accent: '#0ea5e9',
              },
              {
                title: 'Clinical Trials',
                desc: 'Regulatory-compliant data management, trial workflow automation, patient tracking, and reporting tools that accelerate research timelines.',
                tags: ['EDC Systems', 'Compliance', 'Data Management', 'Reporting'],
                accent: '#10b981',
              },
              {
                title: 'Education',
                desc: 'Learning management platforms, student analytics, adaptive content delivery, and administrative tools for institutions of all sizes.',
                tags: ['LMS', 'Student Analytics', 'EdTech', 'Administration'],
                accent: '#f59e0b',
              },
            ].map((ind, i) => (
              <div className="industry-card" key={i} style={{ '--accent': ind.accent }}>
                <div className="industry-card__accent-bar" />
                <h3 className="industry-card__title">{ind.title}</h3>
                <p className="industry-card__desc">{ind.desc}</p>
                <div className="industry-card__tags">
                  {ind.tags.map((tag, j) => (
                    <span className="tag" key={j}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about section" id="about">
        <div className="container about__inner">
          <div className="about__text">
            <div className="section__tag">Who We Are</div>
            <h2 className="section__title">Built on a simple idea</h2>
            <p>
              Ikshana — meaning <em>"to see"</em> in Sanskrit — reflects our philosophy.
              We look deeply at the problems our clients face before proposing any solution.
            </p>
            <p>
              Too many technology companies sell products. We sell outcomes. Our team works
              alongside yours to understand the root cause, design the right solution, and
              deliver it with precision.
            </p>
            <div className="about__values">
              {['Problem-first thinking', 'Domain expertise', 'Transparent delivery', 'Long-term partnership'].map((v, i) => (
                <div className="about__value" key={i}>
                  <span className="about__value-dot" />
                  {v}
                </div>
              ))}
            </div>
          </div>
          <div className="about__visual">
            <div className="about__card">
              <div className="about__card-line">"We don't just ask what you need built — we ask why it needs to exist."</div>
              <div className="about__card-attr">— Ikshana Solutions</div>
            </div>
          </div>
        </div>
      </section>

      {/* APPS */}
      <section className="apps section" id="apps">
        <div className="container">
          <div className="section__header">
            <div className="section__tag">Our Apps</div>
            <h2 className="section__title">Mobile Apps We've Built</h2>
            <p className="section__sub">Consumer apps designed and shipped by Ikshana Solutions, blending education with intelligent, easy-to-use design.</p>
          </div>
          <div className="apps__grid">
            {apps.map((app) => (
              <div className="app-card" key={app.id}>
                <div className="app-card__icon">{app.icon}</div>
                <h3 className="app-card__name">{app.name}</h3>
                <div className="app-card__tagline">{app.tagline}</div>
                <p className="app-card__desc">{app.desc}</p>
                <div className="app-card__tags">
                  {app.tags.map((t, j) => <span className="tag" key={j}>{t}</span>)}
                </div>
                <div className="app-card__platforms">
                  {app.appStoreLink ? (
                    <a href={app.appStoreLink} target="_blank" rel="noopener noreferrer" className="app-platform-badge app-platform-badge--live">
                      Download on App Store
                    </a>
                  ) : (
                    <span className="app-platform-badge app-platform-badge--soon">App Store — Coming Soon</span>
                  )}
                  {app.playStoreLink ? (
                    <a href={app.playStoreLink} target="_blank" rel="noopener noreferrer" className="app-platform-badge app-platform-badge--live">
                      Download on Google Play
                    </a>
                  ) : (
                    <span className="app-platform-badge app-platform-badge--soon">Google Play — Coming Soon</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FARMSENSE PRODUCT */}
      <section className="farmsense section" id="farmsense">
        <div className="container">
          <div className="section__header">
            <div className="section__tag">Our Product</div>
            <h2 className="section__title">Introducing FarmSense</h2>
            <p className="section__sub">LoRa-powered environmental monitoring for farms, greenhouses and rural enterprises — real-time insights, zero cellular dependency.</p>
          </div>
          <div className="farmsense__hero">
            <div className="farmsense__badge">🌱 Now Available</div>
            <div className="farmsense__tagline">Know your farm. <span style={{color: 'var(--blue-light)'}}>Before it's too late.</span></div>
            <p className="farmsense__desc">
              A single FarmSense gateway covers up to 10 miles of open terrain using LoRa wireless technology —
              connecting soil sensors, weather stations, and air quality monitors to a cloud dashboard you can
              access from anywhere.
            </p>
          </div>
          <div className="farmsense__features">
            {[
              { icon: '🌡️', title: 'Soil & Weather Monitoring', desc: 'Real-time soil moisture, temperature, humidity, rainfall and wind — all in one dashboard.' },
              { icon: '📡', title: 'LoRa Long Range', desc: 'One gateway covers up to 10 miles. No WiFi, no cellular needed. Works where others fail.' },
              { icon: '🔔', title: 'Smart Alerts', desc: 'Custom SMS and email alerts when conditions cross your thresholds — frost warnings, drought alerts and more.' },
              { icon: '📊', title: 'Historical Analytics', desc: 'Track trends over time. Make data-driven decisions on irrigation, planting, and harvesting.' },
              { icon: '🔋', title: '5-Year Battery Life', desc: 'Solar and battery-powered sensors. Deploy once and forget — no wiring, no maintenance.' },
              { icon: '💧', title: 'Irrigation Recommendations', desc: 'Automated watering recommendations based on real soil moisture data — save water and increase yield.' },
            ].map((f, i) => (
              <div className="farmsense__feature-card" key={i}>
                <div className="farmsense__feature-icon">{f.icon}</div>
                <h3 className="farmsense__feature-title">{f.title}</h3>
                <p className="farmsense__feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="farmsense__pricing">
            <h3 className="farmsense__pricing-title">Simple, Transparent Pricing</h3>
            <div className="farmsense__plans">
              {[
                { name: 'Starter', price: '$99', period: '/month', devices: 'Up to 10 devices', features: ['Real-time dashboard', 'Email alerts', '90-day data history', 'Basic analytics'], highlight: false },
                { name: 'Professional', price: '$299', period: '/month', devices: 'Up to 50 devices', features: ['Everything in Starter', 'SMS alerts', '1-year data history', 'API access', 'Irrigation recommendations'], highlight: true },
                { name: 'Enterprise', price: 'Custom', period: '', devices: 'Unlimited devices', features: ['Everything in Pro', 'Custom integrations', 'Dedicated support', 'SLA guarantee', 'On-site installation'], highlight: false },
              ].map((plan, i) => (
                <div className={`farmsense__plan ${plan.highlight ? 'farmsense__plan--highlight' : ''}`} key={i}>
                  {plan.highlight && <div className="farmsense__plan-badge">Most Popular</div>}
                  <div className="farmsense__plan-name">{plan.name}</div>
                  <div className="farmsense__plan-price">{plan.price}<span>{plan.period}</span></div>
                  <div className="farmsense__plan-devices">{plan.devices}</div>
                  <ul className="farmsense__plan-features">
                    {plan.features.map((f, j) => <li key={j}>✓ {f}</li>)}
                  </ul>
                  <a href="#contact" className={`btn ${plan.highlight ? 'btn--primary' : 'btn--ghost'}`}>Get Started</a>
                </div>
              ))}
            </div>
          </div>
          <div className="farmsense__hardware">
            <h3 className="farmsense__pricing-title">Hardware Kits</h3>
            <div className="farmsense__hw-cards">
              <div className="farmsense__hw-card">
                <div className="farmsense__hw-icon">📦</div>
                <div className="farmsense__hw-name">Starter Kit</div>
                <div className="farmsense__hw-price">$499</div>
                <div className="farmsense__hw-includes">1 Gateway + 5 Sensor Nodes</div>
                <a href="#contact" className="btn btn--ghost">Order Now</a>
              </div>
              <div className="farmsense__hw-card farmsense__hw-card--featured">
                <div className="farmsense__hw-icon">🚀</div>
                <div className="farmsense__hw-name">Pro Kit</div>
                <div className="farmsense__hw-price">$1,499</div>
                <div className="farmsense__hw-includes">1 Gateway + 20 Sensor Nodes</div>
                <a href="#contact" className="btn btn--primary">Order Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="founder section" id="founder">
        <div className="container">
          <div className="section__header">
            <div className="section__tag">Leadership</div>
            <h2 className="section__title">Meet the Founder</h2>
          </div>
          <div className="founder__inner">
            <div className="founder__photo-wrap">
              <div className="founder__photo-ring">
                <img src="/neetu.jpg" alt="Neetu Singh" className="founder__photo-img" />
              </div>
              <div className="founder__credentials">
                <div className="founder__credential">
                  <span className="founder__credential-icon">◈</span>
                  <span>Clinical Strategy & Innovation Leader</span>
                </div>

                <div className="founder__credential">
                  <span className="founder__credential-icon">◈</span>
                  <span>New York, New York</span>
                </div>
              </div>
            </div>
            <div className="founder__content">
              <h3 className="founder__name">Neetu Singh</h3>
              <div className="founder__title-badge">Founder & CEO</div>
              <p className="founder__bio">
                Neetu Singh is a technology innovator, strategist, and natural connector of people — driven by a lifelong belief that the most complex problems yield to the right combination of clarity, creativity, and human collaboration. With expertise spanning clinical research, telecommunications, and education, she has spent her career transforming operational challenges into opportunities for meaningful, lasting change.
              </p>
              <p className="founder__bio">
                What sets Neetu apart is her rare ability to speak the language of both technology and people. She builds trust quickly, galvanizes diverse teams, and brings out the best in everyone she works with. It is this combination of innovative thinking and genuine warmth that led her to found Ikshana Solutions — a company built on the conviction that great technology must be rooted in deep human understanding.
              </p>
              <div className="founder__personal">
                <div className="founder__personal-label">Beyond the boardroom</div>
                <div className="founder__hobbies">
                  <span className="founder__hobby">🏃 Marathon Runner</span>
                  <span className="founder__hobby">🥾 Hiker</span>
                  <span className="founder__hobby">🍳 Culinary Enthusiast</span>
                </div>
              </div>
              <a
                href="https://www.linkedin.com/in/singh318683"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost founder__linkedin"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact section" id="contact">
        <div className="container contact__inner">
          <div className="section__header">
            <div className="section__tag">Get Started</div>
            <h2 className="section__title">Let's solve it together</h2>
            <p className="section__sub">Tell us about your challenge. We'll respond within 24 hours.</p>
            <p className="section__sub" style={{marginTop: '0.5rem'}}>Or email us directly at <a href="mailto:ikshanasolution123@gmail.com" style={{color: 'var(--blue-light)'}}>ikshanasolution123@gmail.com</a></p>
          </div>
          <div className="contact__form-wrap">
            <div className="contact__form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="Jane Smith" value={formData.from_name} onChange={e => setFormData({...formData, from_name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="jane@company.com" value={formData.from_email} onChange={e => setFormData({...formData, from_email: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Industry</label>
                <select value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})}>
                  <option>Select your industry</option>
                  <option>Telecommunication</option>
                  <option>Clinical Trials</option>
                  <option>Education</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Describe your problem</label>
                <textarea rows="5" placeholder="Tell us what challenge you're facing..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
              </div>
              <button className="btn btn--primary btn--full" onClick={handleSubmit} disabled={formStatus === 'sending'}>
                {formStatus === 'sending' ? 'Sending...' : formStatus === 'sent' ? '✅ Message Sent!' : formStatus === 'error' ? 'Error - Try Again' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <div className="nav__logo">
              <span className="logo-mark">I</span>
              <span className="logo-text">kshana</span>
            </div>
            <p>See the problem. Solve it right.</p>
          </div>
          <div className="footer__links">
            <a href="#services">Services</a>
            <a href="#industries">Industries</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href="mailto:ikshanasolution123@gmail.com">ikshanasolution123@gmail.com</a>
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2026 Ikshana Solutions. All rights reserved. <button className="admin-trigger" onClick={openAdmin} title="Admin">⚙</button></p>
        </div>
      </footer>

      {/* ADMIN LOGIN MODAL */}
      {showAdminLogin && (
        <div className="modal-overlay" onClick={() => setShowAdminLogin(false)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h3 className="modal-card__title">Admin Login</h3>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                autoFocus
                value={adminPasswordInput}
                onChange={e => setAdminPasswordInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAdminLogin()}
                placeholder="Enter admin password"
              />
            </div>
            {adminError && <p className="admin-error">{adminError}</p>}
            <div className="modal-card__actions">
              <button className="btn btn--ghost" onClick={() => { setShowAdminLogin(false); setAdminPasswordInput(''); setAdminError(''); }}>Cancel</button>
              <button className="btn btn--primary" onClick={handleAdminLogin}>Login</button>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN PANEL MODAL */}
      {showAdminPanel && (
        <div className="modal-overlay" onClick={() => setShowAdminPanel(false)}>
          <div className="modal-card modal-card--wide" onClick={e => e.stopPropagation()}>
            <div className="modal-card__header">
              <h3 className="modal-card__title">Manage Apps</h3>
              <button className="modal-close" onClick={() => setShowAdminPanel(false)}>✕</button>
            </div>
            <div className="admin-apps-list">
              {apps.map((app) => (
                <div className="admin-app-row" key={app.id}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Icon (emoji)</label>
                      <input type="text" value={app.icon} onChange={e => updateApp(app.id, 'icon', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label>App Name</label>
                      <input type="text" value={app.name} onChange={e => updateApp(app.id, 'name', e.target.value)} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Tagline</label>
                    <input type="text" value={app.tagline} onChange={e => updateApp(app.id, 'tagline', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea rows="3" value={app.desc} onChange={e => updateApp(app.id, 'desc', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label>Feature Tags (comma-separated)</label>
                    <input type="text" value={app.tags.join(', ')} onChange={e => updateAppTags(app.id, e.target.value)} />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>App Store Link (blank = Coming Soon)</label>
                      <input type="text" value={app.appStoreLink} onChange={e => updateApp(app.id, 'appStoreLink', e.target.value)} placeholder="https://apps.apple.com/..." />
                    </div>
                    <div className="form-group">
                      <label>Google Play Link (blank = Coming Soon)</label>
                      <input type="text" value={app.playStoreLink} onChange={e => updateApp(app.id, 'playStoreLink', e.target.value)} placeholder="https://play.google.com/..." />
                    </div>
                  </div>
                  <button className="btn btn--ghost admin-app-row__delete" onClick={() => removeApp(app.id)}>Delete This App</button>
                </div>
              ))}
            </div>
            <div className="modal-card__actions">
              <button className="btn btn--ghost" onClick={addNewApp}>+ Add New App</button>
              <button className="btn btn--primary" onClick={() => setShowAdminPanel(false)}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
