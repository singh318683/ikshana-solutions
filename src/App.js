import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
                <div className="founder__photo-placeholder">NS</div>
              </div>
              <div className="founder__credentials">
                <div className="founder__credential">
                  <span className="founder__credential-icon">◈</span>
                  <span>Bayer — Director, Clinical Strategy</span>
                </div>
                <div className="founder__credential">
                  <span className="founder__credential-icon">◈</span>
                  <span>Dr. Babasaheb Ambedkar Marathwada University</span>
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
                Neetu Singh brings over a decade of strategic leadership in clinical research and life sciences to Ikshana Solutions. As Director of Clinical Strategy at Bayer, she has led complex, multi-stakeholder projects at the intersection of technology and healthcare — developing a deep understanding of how operational inefficiencies in regulated industries demand purpose-built solutions.
              </p>
              <p className="founder__bio">
                Her experience navigating the rigorous demands of clinical trials, combined with a broader lens across telecommunications and education, forms the foundation of Ikshana's problem-first philosophy. Neetu founded Ikshana Solutions with a singular conviction: that real-world problems deserve solutions engineered with precision, domain expertise, and genuine understanding.
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
          </div>
          <div className="contact__form-wrap">
            <div className="contact__form">
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="Jane Smith" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="jane@company.com" />
                </div>
              </div>
              <div className="form-group">
                <label>Industry</label>
                <select>
                  <option>Select your industry</option>
                  <option>Telecommunication</option>
                  <option>Clinical Trials</option>
                  <option>Education</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Describe your problem</label>
                <textarea rows="5" placeholder="Tell us what challenge you're facing..." />
              </div>
              <button className="btn btn--primary btn--full">Send Message</button>
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
          </div>
        </div>
        <div className="footer__bottom">
          <p>© 2026 Ikshana Solutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
