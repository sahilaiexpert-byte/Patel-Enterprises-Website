import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Droplets, FileText, Gauge, HardHat, Layers3, MapPin, Menu, Phone, Pipette, ShieldCheck, Waves, X } from 'lucide-react';
import './site.css';
import './brand-projects.css';
import heroImage from './assets/dewatering-hero.jpg';
import siteOne from './assets/dewatering-site-1.jpg';
import siteTwo from './assets/dewatering-site-2.jpg';
import siteThree from './assets/dewatering-site-3.jpg';
import brandLogo from '../../../attached_assets/WhatsApp_Image_2026-10-07_at_5.26.14_PM_1791375104786.jpeg';

const phone = '+91-8685902932';
const email = 'patelmotor125@gmail.com';
const services = [
  { title: 'Construction Dewatering', text: 'Removal and control of accumulated water and groundwater from active construction areas.', icon: Droplets, code: '01 / WATER CONTROL' },
  { title: 'Borewell Dewatering', text: 'Borewell-based pumping arrangements for excavation, foundation and groundwater-control requirements.', icon: Waves, code: '02 / BOREWELL' },
  { title: 'Submersible Pump Solutions', text: 'Pump deployment and installation planned around site conditions, water depth and discharge needs.', icon: Gauge, code: '03 / PUMP SYSTEMS' },
  { title: 'Excavation & Basement Dewatering', text: 'Water-control support for pits, foundations, basements and deep excavation areas.', icon: Layers3, code: '04 / EXCAVATION' },
  { title: 'Discharge Pipeline Arrangement', text: 'Practical discharge routing and pipeline coordination for continuous water removal.', icon: Pipette, code: '05 / DISCHARGE' },
  { title: 'Site Operation & Monitoring', text: 'Operational support and routine monitoring to help maintain continuity during dewatering work.', icon: ShieldCheck, code: '06 / OPERATIONS' },
];
const capabilities = [
  { num: '01', label: 'Construction dewatering', icon: Droplets },
  { num: '02', label: 'Groundwater control', icon: Waves },
  { num: '03', label: 'Pumping solutions', icon: Gauge },
  { num: '04', label: 'Site operation support', icon: HardHat },
];
const applications = ['Foundation & excavation', 'Basement construction', 'Construction pits', 'Groundwater control', 'Site drainage', 'Discharge management', 'Continuous pumping support'];
const steps = [
  ['01', 'Site review', 'Understand excavation, water inflow and discharge conditions.'],
  ['02', 'System plan', 'Select practical pumping and discharge arrangements.'],
  ['03', 'Installation', 'Position pumps, hoses / pipelines and operating points.'],
  ['04', 'Operation', 'Monitor water levels and maintain continuity of service.'],
];
const gallery = [
  { src: siteOne, alt: 'Illustrative excavation dewatering scene with a pump hose beside a foundation pit', label: 'Excavation sites' },
  { src: siteTwo, alt: 'Illustrative basement excavation with groundwater collection and pipe runs', label: 'Basement projects' },
  { src: siteThree, alt: 'Illustrative pump and discharge arrangement beside foundation works', label: 'Foundation works' },
  { src: heroImage, alt: 'Illustrative deep construction excavation with groundwater pumping arrangements', label: 'Groundwater control' },
  { src: siteTwo, alt: 'Illustrative construction site with an excavation and foundation work area', label: 'Construction sites' },
];
const projects = [
  { name: 'Sarvam Signature Global Project', location: 'Sec 37D, Gurugram, Haryana', image: siteOne, alt: 'Project reference image: illustrative construction dewatering scene, not a photograph of this project' },
  { name: 'RPS Signature Global Project', location: 'Sec 37D, Gurugram, Haryana', image: siteTwo, alt: 'Project reference image: illustrative excavation scene, not a photograph of this project' },
  { name: 'Millennial 2', location: 'Sec 37D, Gurugram, Haryana', image: siteThree, alt: 'Project reference image: illustrative pump and discharge arrangement, not a photograph of this project' },
  { name: 'M2K Adani Realty', location: 'Sec 102A, Dwarka Expressway, Gurugram, Haryana', image: heroImage, alt: 'Project reference image: illustrative groundwater management scene, not a photograph of this project' },
];

function Brand({ inverse = false }: { inverse?: boolean }) {
  return <a href="#home" className={`brand ${inverse ? 'brand-inverse' : ''}`} aria-label="Patel Enterprises home" data-testid="link-brand">
    <img className="brand-logo" src={brandLogo} alt="Patel Enterprises" width="1454" height="1082" />
  </a>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [draftReady, setDraftReady] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [formError, setFormError] = useState('');
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (lightbox === null) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightbox(null);
      if (event.key === 'ArrowRight') setLightbox((value) => value === null ? null : (value + 1) % gallery.length);
      if (event.key === 'ArrowLeft') setLightbox((value) => value === null ? null : (value + gallery.length - 1) % gallery.length);
    };
    window.addEventListener('keydown', key);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', key); document.body.style.overflow = ''; };
  }, [lightbox]);
  const closeMenu = () => setMenuOpen(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const fields = ['Full Name', 'Company Name', 'Phone Number', 'Email', 'Project Location', 'Required Service', 'Project / Excavation Details', 'Message'];
    const body = fields.map(label => `${label}: ${String(data.get(label) || 'Not provided')}`).join('\n');
    const attachments = fileNames.length ? `\n\nSelected site photos (attach manually before sending): ${fileNames.join(', ')}` : '';
    const subject = `Site dewatering enquiry — ${String(data.get('Project Location'))}`;
    setFormError('');
    setDraftReady(true);
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${body}${attachments}\n\nPlease attach any selected site photos to this email before sending.`)}`;
    form.reset();
    setFileNames([]);
  };
  const navItems = [['Home', '#home'], ['About', '#about'], ['Services', '#services'], ['Applications', '#applications'], ['How we work', '#process'], ['Projects', '#projects'], ['Contact', '#contact']];
  return <div className="site-shell grain">
    <div className="topline"><div className="wrap top-line-inner"><span className="mono">Groundwater management / construction support</span><span className="top-location"><MapPin size={13} /> Haryana · Delhi · NCR · Pan India</span></div></div>
    <header className="header">
      <div className="wrap nav-wrap">
        <Brand />
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
          {navItems.map(([name, href]) => <a href={href} key={href} onClick={closeMenu} data-testid={`nav-${name.toLowerCase().replaceAll(' ', '-')}`}>{name}</a>)}
          <a className="nav-mobile-call" href={`tel:${phone}`}><Phone size={15} /> Call Patel Enterprises</a>
        </nav>
        <div className="nav-actions"><a className="call-link" href={`tel:${phone}`} data-testid="link-call-header"><Phone size={14} /> <span>+91 86859 02932</span></a><a className="btn btn-ink nav-quote" href="#contact" data-testid="button-quote-header">Get a quote <ArrowUpRight size={14} /></a></div>
        <button className="menu-toggle focus-ring" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>
    <main>
      <section id="home" className="hero">
        <img src={heroImage} alt="Illustrative construction excavation with groundwater pumping and discharge pipe arrangements" width="1536" height="1024" className="hero-photo" fetchPriority="high" />
        <div className="hero-shade"></div><div className="hero-grid"></div>
        <div className="wrap hero-content">
          <div className="hero-kicker mono"><span className="status-dot"></span> Site-focused water control</div>
          <h1 className="display">Dewatering &<br /><em>groundwater</em><br />management</h1>
          <div className="hero-bottom">
            <div><p className="hero-sub">Professional water-control solutions for construction, excavation and foundation works.</p>
              <div className="hero-buttons"><a className="btn btn-gold" href="#contact" data-testid="button-hero-assessment">Request site assessment <ArrowRight size={16} /></a><a className="hero-call" href={`tel:${phone}`} data-testid="link-hero-call">Call +91 86859 02932 <ArrowUpRight size={15} /></a></div>
            </div>
            <div className="hero-location"><span className="mono">Service area</span><b>Haryana · Delhi · NCR<br />Pan India</b></div>
          </div>
        </div>
        <div className="hero-index mono">01 — WATER CONTROL / INDIA</div><a className="scroll-cue mono" href="#about">Scroll to explore <ArrowDown size={13} /></a>
      </section>
      <section className="capability-bar" aria-label="Service highlights">
        <div className="wrap capability-inner">
          {capabilities.map(({ num, label, icon: Icon }) => <div className="capability" key={num}><Icon size={19} strokeWidth={1.6} /><span className="cap-num mono">{num}</span><b>{label}</b></div>)}
        </div>
      </section>
      <section id="about" className="about-section section-pad">
        <div className="wrap about-grid">
          <div className="about-visual reveal">
            <img src={siteTwo} alt="Illustrative construction excavation showing a water-managed basement foundation site" width="1200" height="800" loading="lazy" />
            <div className="image-stamp"><span className="mono">Practical on-site<br />coordination</span><ArrowUpRight size={20} /></div>
            <span className="photo-label mono">SITE CONDITIONS / FIELD VIEW</span>
          </div>
          <div className="about-copy reveal">
            <p className="eyebrow mono">01 / Patel Enterprises</p>
             <h2 className="display section-title">Keeping construction<br />sites dry & workable.</h2>
            <p className="body-lead">Water has a way of changing the plan. We help construction and excavation teams keep work moving with practical groundwater management built around the site.</p>
            <p className="body-copy">From site planning and suitable pumping arrangements to discharge management and operational support, Patel Enterprises works with the realities of your excavation, not a one-size-fits-all system.</p>
            <a href="#contact" className="text-link" data-testid="link-discuss-project">Discuss your project <ArrowRight size={16} /></a>
            <div className="about-note"><span className="mono">01</span><p>Site planning<br /><span>Ground conditions first</span></p><span className="note-divider"></span><span className="mono">02</span><p>Operational support<br /><span>Through the work</span></p></div>
          </div>
        </div>
      </section>
      <section id="services" className="services-section section-pad">
        <div className="wrap">
          <div className="section-heading reveal"><div><p className="eyebrow mono">02 / Capabilities</p><h2 className="display section-title">Our dewatering<br /><span>services.</span></h2></div><p className="heading-aside">A considered response to site conditions, water movement and the discharge path.</p></div>
          <div className="service-grid">
            {services.map(({ title, text, icon: Icon, code }, i) => <article className="service-card reveal" key={title} data-testid={`card-service-${i + 1}`}><div className="service-head"><span className="mono">{code}</span><Icon size={24} strokeWidth={1.55} /></div><h3>{title}</h3><p>{text}</p><a href="#contact" aria-label={`Enquire about ${title}`} data-testid={`link-service-${i + 1}`}><ArrowUpRight size={17} /></a></article>)}
          </div>
        </div>
      </section>
      <section className="visual-break">
        <img src={heroImage} alt="Illustrative site dewatering at a deep construction excavation with discharge hoses" width="1536" height="1024" loading="lazy" />
        <div className="visual-overlay"></div><div className="visual-content wrap">
          <div className="visual-caption mono"><span>FIELD NOTE  /  WATER IN MOTION</span><span>02—04</span></div>
          <p className="eyebrow mono">A workable site starts below grade</p><h2 className="display">Site<br />dewatering.</h2>
          <p>Practical groundwater and water-removal support for construction teams.</p>
          <div className="tag-list">{['Excavation', 'Groundwater', 'Pumping', 'Discharge'].map(tag => <span className="mono" key={tag}>{tag}</span>)}</div>
        </div>
        <div className="visual-corner mono">SITE CONDITIONS / ILLUSTRATIVE IMAGE</div>
      </section>
      <section id="applications" className="applications section-pad">
        <div className="wrap applications-layout">
          <div className="applications-intro reveal"><p className="eyebrow mono">03 / Applications</p><h2 className="display section-title">Where our solutions<br />are used.</h2><p className="body-copy">Support for the below-grade and site conditions where water management matters to the workability of the site.</p><a className="text-link" href="#contact">Talk through site conditions <ArrowRight size={16} /></a></div>
          <div className="application-list">{applications.map((item, i) => <div className="application-row reveal" key={item} data-testid={`application-${i + 1}`}><span className="mono">0{i + 1}</span><h3>{item}</h3><ArrowUpRight size={17} /></div>)}</div>
        </div>
      </section>
      <section id="process" className="process-section section-pad">
        <div className="wrap">
          <div className="section-heading reveal"><div><p className="eyebrow mono">04 / How we work</p><h2 className="display section-title">From ground conditions<br />to steady operation.</h2></div><p className="heading-aside">A clear sequence for coordinating practical dewatering support on site.</p></div>
          <div className="process-track">{steps.map(([num, title, text], index) => <article className="process-step reveal" key={num}><div className="process-number mono">{num}<span>{index < steps.length - 1 && <ArrowRight size={15} />}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div>
        </div>
      </section>
      <section className="why-section">
        <div className="why-image"><img src={siteThree} alt="Illustrative site pump and hose arrangement near an excavation" width="1200" height="800" loading="lazy" /></div>
        <div className="why-content"><div className="why-inner reveal"><p className="eyebrow mono">05 / The Patel approach</p><h2 className="display">Built around<br />the needs of<br />your site.</h2><p className="why-lead">The right arrangement starts with the conditions on the ground—and stays connected to the work as those conditions change.</p>
          <ul className="why-list">{['Site-focused execution', 'Flexible deployment', 'Complete dewatering coordination', 'Responsive operational support'].map((item, i) => <li key={item}><span className="mono">0{i + 1}</span><b>{item}</b><Check size={16} /></li>)}</ul></div></div>
      </section>
      <section id="projects" className="project-experience section-pad">
        <div className="wrap">
          <div className="section-heading reveal"><div><p className="eyebrow mono">Selected experience / Haryana</p><h2 className="display section-title">Selected project<br /><span>experience.</span></h2></div><p className="heading-aside">Selected construction projects where Patel Enterprises has provided dewatering and groundwater-management support.</p></div>
          <div className="project-grid">
            {projects.map((project, index) => <article className="project-card reveal" key={project.name} data-testid={`card-project-${index + 1}`}>
              <div className="project-media">
                <img src={project.image} alt={project.alt} width="1200" height="800" loading="lazy" />
                <span className="project-reference mono">Project reference</span>
              </div>
              <div className="project-copy">
                <span className="project-number mono">PROJECT 0{index + 1}</span>
                <h3>{project.name}</h3>
                <p><MapPin size={15} aria-hidden="true" />{project.location}</p>
              </div>
            </article>)}
          </div>
          <p className="project-note mono">Selected project experience. Project details are presented for portfolio reference.</p>
        </div>
      </section>
      <section id="gallery" className="gallery-section section-pad">
        <div className="wrap">
          <div className="section-heading reveal"><div><p className="eyebrow mono">06 / Site imagery</p><h2 className="display section-title">The work, in context.</h2></div><p className="heading-aside">Illustrative site imagery only. Images do not represent Patel Enterprises projects.</p></div>
          <div className="gallery-grid">
            {gallery.map((item, index) => <button className={`gallery-tile gallery-tile-${index + 1} reveal`} key={item.label} onClick={() => setLightbox(index)} aria-label={`View illustrative image: ${item.label}`} data-testid={`button-gallery-${index + 1}`}><img src={item.src} alt={item.alt} width="1200" height="800" loading="lazy" /><span className="gallery-shade"></span><span className="gallery-number mono">0{index + 1}</span><span className="gallery-label">{item.label}<ArrowUpRight size={17} /></span></button>)}
          </div>
          <p className="gallery-disclaimer mono">All gallery photographs are illustrative site imagery and are not Patel Enterprises project proof.</p>
        </div>
      </section>
      <section className="quote-section" id="contact">
        <div className="quote-aside"><div className="quote-aside-inner"><p className="eyebrow mono">07 / Start a conversation</p><h2 className="display">Need dewatering<br />support for<br /><em>your project?</em></h2><p>Share your project requirements and our team can understand your site conditions and dewatering needs.</p><div className="quote-detail"><span className="mono">Direct line</span><a href={`tel:${phone}`} data-testid="link-contact-phone">{phone}</a></div><div className="quote-detail"><span className="mono">Email</span><a href={`mailto:${email}`} data-testid="link-contact-email">{email}</a></div></div></div>
        <div className="quote-form-wrap"><form className="quote-form" onSubmit={handleSubmit} noValidate>
          <div className="form-intro"><span className="mono">PROJECT ENQUIRY FORM</span><p>Tell us what the site needs. Required fields are marked <i>*</i></p></div>
          <div className="form-grid">
            <label>Full name <i>*</i><input name="Full Name" type="text" autoComplete="name" placeholder="Your name" required minLength={2} data-testid="input-full-name" /></label>
            <label>Company name<input name="Company Name" type="text" autoComplete="organization" placeholder="Company / contractor" data-testid="input-company" /></label>
            <label>Phone number <i>*</i><input name="Phone Number" type="tel" autoComplete="tel" placeholder="+91" required pattern="[+0-9() -]{8,18}" title="Enter a valid phone number" data-testid="input-phone" /></label>
            <label>Email <i>*</i><input name="Email" type="email" autoComplete="email" placeholder="you@company.com" required data-testid="input-email" /></label>
            <label>Project location <i>*</i><input name="Project Location" type="text" placeholder="City, state" required data-testid="input-location" /></label>
            <label>Required service <i>*</i><select name="Required Service" defaultValue="" required data-testid="select-service"><option value="" disabled>Select a service</option>{services.map(service => <option key={service.title}>{service.title}</option>)}<option>Other</option></select></label>
            <label className="full-field">Project / excavation details <i>*</i><textarea name="Project / Excavation Details" rows={3} required placeholder="Excavation depth, water conditions, project stage…" data-testid="input-project-details"></textarea></label>
            <label className="full-field">Message<textarea name="Message" rows={3} placeholder="Anything else we should know?" data-testid="input-message"></textarea></label>
            <label className="full-field upload-field">Site photos <span className="optional">OPTIONAL</span><input type="file" accept="image/*" multiple onChange={(event) => setFileNames(Array.from(event.target.files || []).map(file => file.name))} data-testid="input-site-photos" /><span className="upload-caption"><FileText size={15} /> {fileNames.length ? fileNames.join(', ') : 'Choose images to reference — you will attach them manually to your email draft.'}</span></label>
          </div>
          {formError && <p className="form-error" role="alert" data-testid="status-form-error">{formError}</p>}
          <button type="submit" className="btn btn-gold form-submit" data-testid="button-submit-enquiry">Request site assessment <ArrowRight size={16} /></button>
          <p className="form-privacy">Your email app will open with a prepared draft. No information is sent from this website.</p>
          {draftReady && <div className="draft-notice" role="status" data-testid="status-draft-ready"><Check size={18} /><p><b>Email draft prepared.</b> Review it in your email app, attach any selected photos manually, then send when ready.</p><button type="button" aria-label="Dismiss draft status" onClick={() => setDraftReady(false)} data-testid="button-dismiss-draft"><X size={17} /></button></div>}
        </form></div>
      </section>
      <section className="contact-section section-pad">
        <div className="wrap contact-layout">
          <div className="contact-info reveal"><p className="eyebrow mono">08 / Find us</p><h2 className="display section-title">Patel<br />Enterprises.</h2><p className="contact-sub">Dewatering & Groundwater Management Solutions</p>
            <div className="contact-lines"><a href={`tel:${phone}`}><Phone size={17} /><span><small className="mono">Phone</small>+91-8685902932</span><ArrowUpRight size={15} /></a><a href={`mailto:${email}`}><FileText size={17} /><span><small className="mono">Email</small>{email}</span><ArrowUpRight size={15} /></a><div><MapPin size={17} /><span><small className="mono">Address</small>Guruji Complex, Rewari 123401, Haryana</span></div></div>
            <div className="service-area"><span className="mono">Service area</span><b>Haryana · Delhi · NCR · Pan India</b></div>
            <div className="contact-ctas"><a className="btn btn-ink" href={`tel:${phone}`} data-testid="button-contact-call">Call <Phone size={15} /></a><a className="btn btn-teal" href={`https://wa.me/918685902932`} target="_blank" rel="noopener noreferrer" data-testid="button-contact-whatsapp">WhatsApp <ArrowUpRight size={15} /></a><a className="btn btn-paper" href={`mailto:${email}`} data-testid="button-contact-email">Email <ArrowUpRight size={15} /></a></div>
          </div>
          <div className="map-panel reveal"><iframe title="Map showing Rewari, Haryana" src="https://maps.google.com/maps?q=Rewari%2C%20Haryana&t=&z=12&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen data-testid="map-rewari"></iframe><div className="map-card"><MapPin size={18} /><span><b>Guruji Complex</b><small>Rewari 123401, Haryana</small></span></div><a className="map-open mono" href="https://maps.google.com/?q=Guruji+Complex,+Rewari+Haryana" target="_blank" rel="noopener noreferrer">Open map <ArrowUpRight size={13} /></a></div>
        </div>
        <div className="wrap gst-strip"><span className="mono">GSTIN</span><b>06AFRPF8423J1Z5</b><span className="gst-rule"></span><span className="mono">Coverage</span><b>Haryana · Delhi · NCR · Pan India</b></div>
      </section>
    </main>
      <footer className="footer"><div className="wrap footer-main"><div className="footer-brand"><Brand inverse /><p>Professional dewatering and groundwater-management support for construction, excavation and foundation works.</p></div><div className="footer-nav"><span className="mono">Explore</span><div>{[['Home','#home'],['About','#about'],['Services','#services'],['Applications','#applications'],['How we work','#process'],['Projects','#projects'],['Contact','#contact']].map(([text,href])=><a href={href} key={href} data-testid={`footer-${text.toLowerCase().replaceAll(' ','-')}`}>{text}</a>)}</div></div><div className="footer-contact"><span className="mono">Get in touch</span><a href={`tel:${phone}`}>+91-8685902932</a><a href={`mailto:${email}`}>{email}</a><p>Guruji Complex, Rewari 123401, Haryana</p><small>GSTIN 06AFRPF8423J1Z5</small></div></div><div className="wrap footer-bottom"><span>© Patel Enterprises. All rights reserved.</span><span className="mono">Dewatering & Groundwater Management</span><a href="#home" aria-label="Back to top" data-testid="link-back-to-top">Back to top ↑</a></div></footer>
    <div className="mobile-sticky-actions"><a href={`tel:${phone}`} data-testid="mobile-call"><Phone size={17} /> Call</a><a href="https://wa.me/918685902932" target="_blank" rel="noopener noreferrer" data-testid="mobile-whatsapp">WhatsApp <ArrowUpRight size={16} /></a></div>
    {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Illustrative site photo viewer" onClick={() => setLightbox(null)} data-testid="gallery-lightbox"><button className="lightbox-close" type="button" aria-label="Close image viewer" onClick={() => setLightbox(null)} data-testid="button-lightbox-close"><X /></button><button className="lightbox-prev" type="button" aria-label="Previous image" onClick={event => { event.stopPropagation(); setLightbox((lightbox + gallery.length - 1) % gallery.length); }} data-testid="button-lightbox-prev"><ChevronLeft /></button><figure onClick={event => event.stopPropagation()}><img src={gallery[lightbox].src} alt={gallery[lightbox].alt} width="1200" height="800" /><figcaption><span className="mono">ILLUSTRATIVE SITE IMAGERY · NOT PATEL PROJECT PROOF</span><b>{gallery[lightbox].label}</b></figcaption></figure><button className="lightbox-next" type="button" aria-label="Next image" onClick={event => { event.stopPropagation(); setLightbox((lightbox + 1) % gallery.length); }} data-testid="button-lightbox-next"><ChevronRight /></button></div>}
  </div>;
}

export default App;
