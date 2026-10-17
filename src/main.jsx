import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

// WhatsApp international configuration (Dubai default)
const WHATSAPP_NUMBER = '971563641168';

const buildWhatsAppUrl = (message) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

// SVG Icons
const Icons = {
  Phone: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  MapPin: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  WhatsApp: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.78 14.15c-.24.68-1.39 1.3-1.92 1.38-.5.08-1.15.11-3.7-0.95-2.18-.9-3.59-3.14-3.7-3.29-.11-.15-.89-1.18-.89-2.26 0-1.07.56-1.6 1.1-1.6.19 0 .37.01.53.02.17.01.4-.06.63.48.24.57.81 1.98.88 2.13.07.15.12.33.02.53-.1.19-.15.31-.3.49-.15.17-.31.39-.45.52-.15.15-.31.31-.13.62.18.3 1.22 2.01 2.62 3.25 1.8 1.6 3.32 2.1 3.79 2.33.48.24.76.2 1.05-.13.29-.33 1.24-1.45 1.57-1.95.33-.5.66-.42 1.11-.25.45.17 2.87 1.35 3.36 1.6.49.24.82.36.94.57.12.21.12 1.22-.12 1.9z" />
    </svg>
  ),
  Check: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  ),
  Close: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  ),
  Star: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  Compass: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  Layers: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Award: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  Sparkles: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    </svg>
  )
};

// Data Collections
const SERVICES = [
  {
    id: 'residences',
    num: '01',
    title: 'Private Villa & Penthouse Architecture',
    desc: 'Complete architectural interior transformations for elite residences across Palm Jumeirah, Emirates Hills, and Downtown Dubai.',
    features: ['Spatial planning & acoustic engineering', 'Bespoke marble & natural stone curation', 'Italian lighting schemes & automation']
  },
  {
    id: 'commercial',
    num: '02',
    title: 'Boutique Commercial & Lounges',
    desc: 'High-concept experiential environments for luxury flagship boutiques, executive suites, private family offices, and upscale hospitality.',
    features: ['Branded luxury interior narratives', 'Acoustic privacy & conference luxury', 'Durable, high-grade architectural finishes']
  },
  {
    id: 'joinery',
    num: '03',
    title: 'Bespoke Joinery & Millwork',
    desc: 'Artisan custom woodwork manufactured to German & Italian tolerances. Walk-in dressing rooms, book-matched veneer walls, and wine cellars.',
    features: ['Smoked oak & canaletto walnut finishes', 'Concealed hardware & soft ambient LED lighting', 'Precision climate-controlled showcases']
  },
  {
    id: 'turnkey',
    num: '04',
    title: 'Full Turnkey Project Management',
    desc: 'Flawless execution from Dubai Municipality / developer NOC approvals to site supervision, procurement, and white-glove handover.',
    features: ['Dubai developer authority approvals', 'On-site technical director supervision', 'Fixed-schedule and cost transparency']
  },
  {
    id: 'lighting',
    num: '05',
    title: 'Architectural Lighting & Smart Living',
    desc: 'Subtle, layered illumination systems integrated seamlessly into architecture with smart Lutron and KNX automated controls.',
    features: ['Circadian luxury lighting design', 'Discreet architectural fixtures', 'Intuitive mobile & touch panel integration']
  },
  {
    id: 'furniture',
    num: '06',
    title: 'Curated Sourcing & Art Advisory',
    desc: 'Direct access to Milan and Paris design houses, limited-edition collector pieces, sculptural marble tables, and fine art placement.',
    features: ['Direct factory sourcing from Milan & Paris', 'Custom upholstery in cashmere & nubuck', 'Curated investment art procurement']
  }
];

const PROJECTS = [
  {
    id: 1,
    category: 'penthouses',
    title: 'The Royal Penthouse',
    location: 'Downtown Dubai',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    area: '7,400 sq.ft',
    year: '2025',
    description: 'An expansive duplex penthouse featuring panoramic Burj Khalifa vistas, book-matched Arabescato marble, bronze shadow gaps, and a cantilevered floating staircase.',
    materials: ['Arabescato Corchia Marble', 'Smoked European Oak', 'Champagne PVD Brass', 'Custom Mohair Drapes']
  },
  {
    id: 2,
    category: 'villas',
    title: 'The Horizon Villa',
    location: 'Palm Jumeirah',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    area: '11,200 sq.ft',
    year: '2025',
    description: 'A beachfront sanctuary blending warm travertine stone, minimalist floor-to-ceiling glass, an indoor sunken courtyard, and open-plan sea-view entertaining lounges.',
    materials: ['Roman Silver Travertine', 'Brushed Bronze Joinery', 'Belgian Linen', 'Sub-Zero & Gaggenau Kitchens']
  },
  {
    id: 3,
    category: 'villas',
    title: 'The Solstice Sanctuary',
    location: 'Emirates Hills',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    area: '14,800 sq.ft',
    year: '2024',
    description: 'A classical-contemporary mansion featuring double-height coffered ceilings, an underground tasting lounge, private wellness spa, and lush golf-course vistas.',
    materials: ['Calacatta Viola', 'Smoked Canaletto Walnut', 'Hand-stitched Saddle Leather', 'Flos Architectural Lighting']
  },
  {
    id: 4,
    category: 'commercial',
    title: 'Haute Horlogerie Private Salon',
    location: 'DIFC, Dubai',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    area: '3,800 sq.ft',
    year: '2024',
    description: 'An exclusive private VIP lounge for luxury collectors. Ultra-secure acoustic meeting rooms, curved velvet banquettes, and backlit onyx reception counters.',
    materials: ['Honey Backlit Onyx', 'Acoustic Alcantara Panels', 'Antiqued Brass Trims', 'Minotti Bespoke Furniture']
  },
  {
    id: 5,
    category: 'joinery',
    title: 'The Master Dressing Suite',
    location: 'Dubai Hills Estate',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    area: '1,200 sq.ft',
    year: '2025',
    description: 'A walk-in dressing pavilion designed with Italian fluted glass, leather-wrapped accessory drawers, motion-sensor indirect illumination, and jewelry safes.',
    materials: ['Fluted Low-Iron Glass', 'Full Grain Nubuck Leather', 'Dark Smoked Oak', 'Integrated Biometric Safes']
  },
  {
    id: 6,
    category: 'penthouses',
    title: 'The Sky Oasis Duplex',
    location: 'Dubai Marina',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    area: '6,200 sq.ft',
    year: '2025',
    description: 'Sublime minimalist penthouse over Dubai Marina. Monolithic micro-cement floors, floating island breakfast counter, and wrap-around sunset terrace.',
    materials: ['Continuous Microcement', 'Matte Black Anodized Aluminium', 'Nero Marquina Marble', 'Lutron Homeworks QS']
  }
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Consultation & Site Discovery',
    desc: 'We conduct in-depth spatial assessments and align on your functional aspirations, lifestyle requirements, and aesthetic vision.'
  },
  {
    step: '02',
    title: 'Spatial 3D Photorealism',
    desc: 'Experience your future residence through hyper-realistic 3D walkthroughs, custom mood boards, and verified material samples.'
  },
  {
    step: '03',
    title: 'Procurement & Artisan Fit-Out',
    desc: 'From custom Italian millwork to authority approvals (Emaar, Nakheel, Dubai Municipality), our dedicated site team manages every detail.'
  },
  {
    step: '04',
    title: 'White-Glove Handover',
    desc: 'A seamless, deep-cleaned handover including art installation, scent curation, automation onboarding, and complete warranty packages.'
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    quote: 'DAD Home transformed our Palm Jumeirah villa into an architectural masterpiece. Their attention to marble detailing and flawless execution exceeded our highest expectations.',
    name: 'Tariq Al-Mansoor',
    residence: 'Palm Jumeirah Signature Villa',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 2,
    quote: 'Working with their team on our Downtown penthouse was an absolute pleasure. From the initial 3D renders to the final handover, every milestone was delivered on time and with supreme craftsmanship.',
    name: 'Elena Rostova',
    residence: 'Downtown Dubai Duplex',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 3,
    quote: 'Their bespoke joinery and lighting design turned our Emirates Hills home into an oasis of calm. Truly Dubai’s most refined interior design studio.',
    name: 'Marcus & Sophia Sterling',
    residence: 'Emirates Hills Residence',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  }
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Palm Villa / Private Villa',
    budget: 'AED 1,000,000 – 3,000,000',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const whatsappMsg = `*New Interior Design Inquiry - DAD Home*\n` +
      `• *Client Name:* ${formData.name}\n` +
      `• *Phone:* ${formData.phone}\n` +
      `• *Email:* ${formData.email}\n` +
      `• *Project Type:* ${formData.projectType}\n` +
      `• *Estimated Budget:* ${formData.budget}\n` +
      `• *Message:* ${formData.message || 'I would like to schedule a private consultation.'}`;

    const url = buildWhatsAppUrl(whatsappMsg);
    setFormSubmitted(true);
    window.open(url, '_blank');
  };

  return (
    <div className="site-wrapper">
      {/* Top Navbar */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            <a href="#" className="brand-logo">
              <span className="brand-title">DAD<span>HOME</span></span>
              <span className="brand-sub">Dubai • Interiors</span>
            </a>

            <nav className="nav-links">
              <a href="#services" className="nav-link">Services</a>
              <a href="#portfolio" className="nav-link">Portfolio</a>
              <a href="#about" className="nav-link">Philosophy</a>
              <a href="#process" className="nav-link">Process</a>
              <a href="#testimonials" className="nav-link">Testimonials</a>
              <a href="#contact" className="nav-link">Contact</a>
            </nav>

            <div className="nav-actions">
              <a
                href={buildWhatsAppUrl("Hello DAD Home, I would like to book a private interior design consultation.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
                style={{ padding: '0.65rem 1.25rem', fontSize: '0.82rem' }}
              >
                <Icons.WhatsApp />
                <span>WhatsApp Us</span>
              </a>

              <button
                className="menu-toggle-btn"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open Navigation Menu"
              >
                <Icons.Menu />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-nav-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-header">
          <div className="brand-logo">
            <span className="brand-title">DAD<span>HOME</span></span>
            <span className="brand-sub">Dubai • Interiors</span>
          </div>
          <button className="modal-close-btn" onClick={() => setMobileMenuOpen(false)} style={{ position: 'static' }}>
            <Icons.Close />
          </button>
        </div>

        <ul className="mobile-nav-list">
          <li><a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a></li>
          <li><a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>Portfolio</a></li>
          <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>Philosophy</a></li>
          <li><a href="#process" onClick={() => setMobileMenuOpen(false)}>Our Process</a></li>
          <li><a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</a></li>
          <li><a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</a></li>
        </ul>

        <div className="mobile-nav-footer">
          <a
            href={buildWhatsAppUrl("Hello DAD Home, I am inquiring about an interior project in Dubai.")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <Icons.WhatsApp />
            <span>Chat on WhatsApp</span>
          </a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline-gold">
            Book Consultation
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85"
            alt="Luxury Interior Living Room"
            className="hero-bg-img"
          />
          <div className="hero-overlay-gradient" />
        </div>

        <div className="container hero-content">
          <div className="eyebrow">
            <span className="eyebrow-line"></span>
            <span>Bespoke Living • Dubai UAE</span>
          </div>

          <h1 className="hero-title">
            Crafting Timeless <br />
            <span className="gold-gradient-text">Sanctuaries</span> in Dubai.
          </h1>

          <p className="hero-description">
            Architectural interior design, custom Italian millwork, and full turnkey execution for discerning homeowners and premier developers across the United Arab Emirates.
          </p>

          <div className="hero-cta-group">
            <a
              href={buildWhatsAppUrl("Hello DAD Home, I'm interested in discussing an interior design project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <Icons.WhatsApp />
              <span>Connect on WhatsApp</span>
            </a>

            <a href="#portfolio" className="btn btn-outline-gold">
              <span>View Portfolio</span>
              <Icons.ArrowRight />
            </a>
          </div>

          <div className="hero-stats-row">
            <div className="hero-stat-item">
              <span className="hero-stat-number">150+</span>
              <span className="hero-stat-label">Luxury Projects Handed Over</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number">12+</span>
              <span className="hero-stat-label">Years of Dubai Excellence</span>
            </div>
            <div className="hero-stat-item">
              <span className="hero-stat-number">100%</span>
              <span className="hero-stat-label">Turnkey Delivery Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Strip */}
      <section className="services-strip">
        <div className="container">
          <div className="services-strip-grid">
            <div className="strip-item">
              <div className="strip-icon"><Icons.Layers /></div>
              <span className="strip-text">Full Turnkey Fit-Out</span>
            </div>
            <div className="strip-item">
              <div className="strip-icon"><Icons.Sparkles /></div>
              <span className="strip-text">Italian Custom Joinery</span>
            </div>
            <div className="strip-item">
              <div className="strip-icon"><Icons.Compass /></div>
              <span className="strip-text">Architectural Precision</span>
            </div>
            <div className="strip-item">
              <div className="strip-icon"><Icons.Award /></div>
              <span className="strip-text">Authority Approvals (NOC)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services Section */}
      <section id="services" className="section-padding">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">
              <span className="eyebrow-line"></span>
              <span>Our Capabilities</span>
              <span className="eyebrow-line"></span>
            </div>
            <h2 className="section-title">Comprehensive Interior Excellence</h2>
            <p className="section-subtitle">
              From conceptual sketches to the final placement of collector artwork, we deliver end-to-end luxury environments crafted without compromise.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((s) => (
              <div key={s.id} className="service-card">
                <div className="service-card-header">
                  <div className="service-card-icon"><Icons.Sparkles /></div>
                  <span className="service-card-num">{s.num}</span>
                </div>
                <h3 className="service-card-title">{s.title}</h3>
                <p className="service-card-desc">{s.desc}</p>
                <ul className="service-card-features">
                  {s.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filterable Portfolio */}
      <section id="portfolio" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">
              <span className="eyebrow-line"></span>
              <span>Curated Portfolio</span>
              <span className="eyebrow-line"></span>
            </div>
            <h2 className="section-title">Selected Residences & Spaces</h2>
            <p className="section-subtitle">
              Explore our portfolio of penthouses, private villas, and high-concept spaces across Dubai's most prestigious enclaves.
            </p>
          </div>

          <div className="portfolio-filters">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'penthouses', label: 'Penthouses' },
              { id: 'villas', label: 'Private Villas' },
              { id: 'commercial', label: 'Commercial & Salons' },
              { id: 'joinery', label: 'Bespoke Joinery' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`filter-btn ${activeFilter === tab.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="project-card"
                onClick={() => setSelectedProject(p)}
              >
                <div className="project-image-wrapper">
                  <img src={p.image} alt={p.title} className="project-img" loading="lazy" />
                  <div className="project-overlay">
                    <span className="project-badge">{p.area}</span>
                    <span className="project-location">
                      <Icons.MapPin />
                      <span>{p.location}</span>
                    </span>
                    <h3 className="project-title">{p.title}</h3>
                    <div className="project-meta">
                      <span>{p.year}</span>
                      <span className="project-view-link">
                        <span>View Project</span>
                        <Icons.ArrowRight />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
              aria-label="Close Project Modal"
            >
              <Icons.Close />
            </button>
            <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />
            <div className="modal-body">
              <div className="eyebrow">
                <span className="eyebrow-line"></span>
                <span>{selectedProject.location} • {selectedProject.year} • {selectedProject.area}</span>
              </div>
              <h2 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>
                {selectedProject.title}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                {selectedProject.description}
              </p>

              <h4 style={{ color: 'var(--gold-light)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
                Materials & Architectural Finishes:
              </h4>
              <div className="modal-tags">
                {selectedProject.materials.map((mat, i) => (
                  <span key={i} className="modal-tag">{mat}</span>
                ))}
              </div>

              <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href={buildWhatsAppUrl(`Hello DAD Home, I saw your project '${selectedProject.title}' in ${selectedProject.location} and would like to discuss something similar.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <Icons.WhatsApp />
                  <span>Inquire About This Design</span>
                </a>
                <button className="btn btn-outline-gold" onClick={() => setSelectedProject(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About & Dubai Philosophy */}
      <section id="about" className="section-padding about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-image-stack">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80"
                alt="Luxury Dining & Living Space"
                className="about-main-img"
              />
              <div className="about-floating-card">
                <span style={{ color: 'var(--gold-primary)', fontWeight: '700', fontSize: '1.5rem', display: 'block', marginBottom: '0.25rem' }}>
                  150+ Estates
                </span>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Curated across Palm Jumeirah, Emirates Hills, Dubai Hills, and Downtown.
                </p>
              </div>
            </div>

            <div className="about-text-content">
              <div className="eyebrow">
                <span className="eyebrow-line"></span>
                <span>The DAD Home Philosophy</span>
              </div>
              <h2 className="section-title">
                Quiet Luxury, <br />
                <span className="gold-gradient-text">Absolute Perfection.</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                At DAD Home, interior architecture is more than decoration. It is an elevated celebration of light, noble materials, proportion, and effortless Dubai living.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                Every residence we craft balances timeless Italian craftsmanship with high-precision Swiss site engineering, creating environments that radiate serene confidence and enduring value.
              </p>

              <div className="about-pillars">
                <div className="pillar-item">
                  <div className="pillar-bullet">1</div>
                  <div>
                    <h4 className="pillar-title">Uncompromising Materials</h4>
                    <p className="pillar-desc">Hand-quarried Carrara & Arabescato marbles, FSC-certified European hardwoods, and brushed champagne metals.</p>
                  </div>
                </div>
                <div className="pillar-item">
                  <div className="pillar-bullet">2</div>
                  <div>
                    <h4 className="pillar-title">Complete Discretion</h4>
                    <p className="pillar-desc">Trusted by private family offices, entrepreneurs, and prominent Dubai residents with strict confidentiality.</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '2.5rem' }}>
                <a href="#contact" className="btn btn-gold">
                  <span>Schedule Private Discovery</span>
                  <Icons.ArrowRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4-Step Process */}
      <section id="process" className="section-padding">
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">
              <span className="eyebrow-line"></span>
              <span>Our Methodology</span>
              <span className="eyebrow-line"></span>
            </div>
            <h2 className="section-title">The 4-Step Turnkey Journey</h2>
            <p className="section-subtitle">
              A transparent, meticulously structured process designed to eliminate stress and deliver flawless results on time.
            </p>
          </div>

          <div className="process-grid">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="process-card">
                <div className="process-step-num">{step.step}</div>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <div className="eyebrow">
              <span className="eyebrow-line"></span>
              <span>Client Voices</span>
              <span className="eyebrow-line"></span>
            </div>
            <h2 className="section-title">Distinguished Accolades</h2>
            <p className="section-subtitle">
              Words from discerning homeowners who entrusted their private sanctuaries to DAD Home.
            </p>
          </div>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div>
                  <div className="testimonial-stars">
                    {[...Array(5)].map((_, i) => (
                      <Icons.Star key={i} />
                    ))}
                  </div>
                  <p className="testimonial-quote">"{t.quote}"</p>
                </div>
                <div className="testimonial-client">
                  <img src={t.avatar} alt={t.name} className="testimonial-avatar" />
                  <div>
                    <h5 className="testimonial-name">{t.name}</h5>
                    <span className="testimonial-residence">{t.residence}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Consultation Section */}
      <section id="contact" className="section-padding contact-section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-line"></span>
                <span>Direct Consultation</span>
              </div>
              <h2 className="section-title">Initiate Your Interior Vision</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
                Whether you have acquired a new villa in Palm Jumeirah or seek a full interior transformation in Downtown Dubai, our principal designers are ready to advise you.
              </p>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-info-icon"><Icons.MapPin /></div>
                  <div>
                    <div className="contact-info-label">Dubai Studio</div>
                    <div className="contact-info-val">Level 28, Boulevard Plaza Tower 1, Downtown Dubai, UAE</div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon"><Icons.Phone /></div>
                  <div>
                    <div className="contact-info-label">Direct Studio Phone</div>
                    <div className="contact-info-val">+971 4 456 7890 / +971 50 123 4567</div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon"><Icons.Mail /></div>
                  <div>
                    <div className="contact-info-label">Electronic Mail</div>
                    <div className="contact-info-val">concierge@dadhome-interiors.ae</div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon"><Icons.WhatsApp /></div>
                  <div>
                    <div className="contact-info-label">Instant WhatsApp Concierge</div>
                    <div className="contact-info-val">Available 7 days / week (9:00 AM – 8:00 PM GST)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form with WhatsApp bridge */}
            <div className="contact-form-card">
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', marginBottom: '0.5rem', color: '#fff' }}>
                Request Private Consultation
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
                Submitting this form prepares your details and opens a dedicated WhatsApp conversation with our Senior Architectural Lead.
              </p>

              <form onSubmit={handleFormSubmit}>
                <div className="form-group-row">
                  <div className="form-field">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Al-Mansoor"
                      className="form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+971 50 000 0000"
                      className="form-input"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-field">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      className="form-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Project Type</label>
                    <select
                      className="form-select"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    >
                      <option>Palm Villa / Private Villa</option>
                      <option>Luxury Penthouse / Duplex</option>
                      <option>Full Residence Renovation</option>
                      <option>Boutique Commercial / Office</option>
                      <option>Custom Joinery & Millwork</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">Estimated Budget (AED)</label>
                  <select
                    className="form-select"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  >
                    <option>AED 250,000 – 500,000</option>
                    <option>AED 500,000 – 1,000,000</option>
                    <option>AED 1,000,000 – 3,000,000</option>
                    <option>AED 3,000,000+</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="form-label">Project Location & Details</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about the property, timeline, or specific requirements..."
                    className="form-textarea"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn-whatsapp" style={{ width: '100%', padding: '1rem' }}>
                  <Icons.WhatsApp />
                  <span>Send Enquiry via WhatsApp</span>
                </button>

                {formSubmitted && (
                  <div className="form-toast">
                    <Icons.Check />
                    <span>Your inquiry has been prepared! Opening WhatsApp chat now...</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Action Button */}
      <div className="floating-whatsapp">
        <span className="floating-whatsapp-tooltip">Chat with Principal Designer</span>
        <a
          href={buildWhatsAppUrl("Hello DAD Home, I'm browsing your interior design portfolio and would like to speak with a designer.")}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-pulse-btn"
          aria-label="Direct WhatsApp Consultation"
        >
          <div className="whatsapp-pulse-ring" />
          <Icons.WhatsApp />
        </a>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="brand-logo" style={{ marginBottom: '1.25rem' }}>
                <span className="brand-title">DAD<span>HOME</span></span>
                <span className="brand-sub">Dubai • Interiors</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.65', maxWidth: '340px' }}>
                DAD Home is an architectural interior design and turnkey fit-out practice based in Downtown Dubai, crafting prestigious private residences across the GCC.
              </p>
            </div>

            <div>
              <h4 className="footer-col-title">Navigation</h4>
              <ul className="footer-links-list">
                <li><a href="#services">Services</a></li>
                <li><a href="#portfolio">Curated Portfolio</a></li>
                <li><a href="#about">The Philosophy</a></li>
                <li><a href="#process">Turnkey Process</a></li>
                <li><a href="#testimonials">Accolades</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Locations</h4>
              <ul className="footer-links-list">
                <li><a href="#portfolio">Palm Jumeirah</a></li>
                <li><a href="#portfolio">Emirates Hills</a></li>
                <li><a href="#portfolio">Downtown Dubai</a></li>
                <li><a href="#portfolio">Dubai Hills Estate</a></li>
                <li><a href="#portfolio">Jumeirah Bay Island</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-col-title">Direct Studio</h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                Level 28, Boulevard Plaza Tower 1<br />
                Downtown Dubai, United Arab Emirates
              </p>
              <p style={{ fontSize: '0.88rem', color: 'var(--gold-primary)', fontWeight: '600', marginBottom: '0.5rem' }}>
                +971 4 456 7890
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                concierge@dadhome-interiors.ae
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} DAD Home Interiors LLC. All Rights Reserved.</span>
            <span>Registered with Dubai Economy & Tourism (DET) & Dubai Municipality.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// React 18 Root Mounting
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
