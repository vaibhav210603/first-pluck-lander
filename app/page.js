'use client';

import { useEffect, useState, useRef } from 'react';

// ============ Reveal-on-scroll hook ============
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ============ Flavor bar reveal ============
function useFlavorReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.flavor');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
    }, { threshold: 0.4 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ============ Nav ============
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")}>
      <div className="nav-brand">
        <a href="#" className="nav-logo"><img src="/temitea.png" alt="Temi Tea — The Taste of a Distant Saga" /></a>
      </div>
      <div className="nav-links">
        <a href="#provenance">Provenance</a>
        <a href="#story">Our Story</a>
        <a href="#tasting">Tasting Notes</a>
        <a href="#brew">Brew Guide</a>
      </div>
      <a href="https://temiteaestate.com/products/temiteaspecial-nat" target="_blank" rel="noopener" className="nav-cta">Order Special</a>
    </nav>
  );
}

// ============ Hero ============
function Hero({ titleA = 'The Taste of', titleEm = 'Distant', showRing = true, showMarquee = true }) {
  const imgRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current) return;
      const y = Math.min(window.scrollY, 600);
      imgRef.current.style.transform = `translateY(${y * 0.12}px) rotate(${y * -0.008}deg)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const marqueeItems = [
    'Hand-Plucked at 5,500 ft',
    'Certified Organic Since 2008',
    'A Kingdom\'s Heritage',
    'Whole-Leaf Black Tea',
    'Copper-Bright Infusion',
    'From the Last Himalayan Kingdom',
  ];

  return (
    <header className="hero">
      <div className="hero-bg"></div>
      <div className="hero-grain"></div>
      <div className="container hero-inner">
        <div className="hero-text">
          <div className="hero-meta reveal">
            <div className="pill"><span className="dot"></span>Est. 1969 · Sikkim, India</div>
            <div className="pill">India's Only Certified Organic Estate Tea</div>
          </div>
          <h1 className="hero-title reveal d1">
            {titleA}<br />
             <em>{titleEm}</em><br />
          
            <span className="small"> - Organic Orthodox Black Tea
</span>
          </h1>
          <p className="hero-lede reveal d2">
            At 5,500 feet in the mist-draped Himalayas of Sikkim, India's most geographically protected estate tea is hand-plucked, chemical-free since 2008. Every cup carries the heritage of the last Himalayan kingdom.
          </p>
          <div className="hero-actions reveal d3">
            <a href="https://temiteaestate.com/products/temiteaspecial-nat" target="_blank" rel="noopener" className="btn btn-primary">
              Order Temi Special
              <span className="arrow">→</span>
            </a>
            <a href="#provenance" className="btn btn-ghost">Visit the Estate</a>
          </div>
        </div>

        <div className="hero-product">
          <div className="product-stage">
            <div className="product-circle"></div>
            {showRing && <div className="product-ring"></div>}
            {showRing && (
            <svg className="product-ring-text" viewBox="0 0 600 600">
              <defs>
                <path id="circlePath" d="M 300, 300 m -290, 0 a 290,290 0 1,1 580,0 a 290,290 0 1,1 -580,0" />
              </defs>
              <text>
                <textPath href="#circlePath" startOffset="0">
                  ✦ TEMI TEA SPECIAL ✦ ORGANIC ORTHODOX BLACK TEA ✦ SIKKIM HIMALAYA ✦ HAND-PLUCKED ✦ 5,500 FT ✦ EST. 1969 ✦
                </textPath>
              </text>
            </svg>
            )}
            <img
              ref={imgRef}
              className="product-img"
              src="/images/temi-special-box.png"
              alt="Temi Tea Special — Organic Orthodox Black Tea"
            />
            <a href="#certs" className="sikkim-seal" aria-label="Sikkim Tea Organic Certified">
              <img src="/images/sikkim-organic-badge.png" alt="Sikkim Tea Organic Certified" />
            </a>
            <div className="product-tag t1"><span className="line"></span>Whole Leaf · Spring Flush</div>
            <div className="product-tag t2">100g · MRP ₹530<span className="line"></span></div>
            <div className="product-tag t3"><span className="line"></span>USDA · JAS · Fair Trade</div>
          </div>
        </div>
      </div>

      {showMarquee && (
      <div className="hero-marquee">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>
      )}
    </header>
  );
}

// ============ Stats Strip ============
function Stats() {
  const stats = [
    { num: '5,500', unit: 'ft', label: 'Himalayan Altitude' },
    { num: '440', unit: 'acres', label: 'Estate Area' },
    { num: '1969', unit: '', label: 'Year Established' },
    { num: '2008', unit: '', label: 'Organic Since' },
  ];
  
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 0) {
      setProgress((scrollLeft / maxScroll) * 100);
    }
  };

  return (
    <section className="stats">
      <div className="stats-grid" ref={scrollRef} onScroll={handleScroll}>
        {stats.map((s, i) => (
          <div className="stat reveal" style={{ transitionDelay: `${i * 80}ms` }} key={s.label}>
            <div className="num">{s.num}{s.unit && <span className="unit">{s.unit}</span>}</div>
            <div className="label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="stats-indicator">
        <div className="stats-progress">
          <div className="stats-progress-inner" style={{ transform: `scaleX(${progress / 100})` }}></div>
        </div>
        <div className="stats-hint">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          Swipe to explore
        </div>
      </div>
    </section>
  );
}

// ============ Provenance ============
function Provenance() {
  return (
    <section id="provenance" className="prov section-pad">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow-row">
              <span className="num">01 / 06</span>
              <span className="line"></span>
              <span className="eyebrow">Origin & Terroir</span>
            </div>
          </div>
          <div>
            <h2>India's most<br/>geographically <em>protected</em><br/>estate tea.</h2>
            <p className="lede" style={{ marginTop: 28 }}>
              Temi lies in the protected Himalayan valleys of South Sikkim — a state that achieved full organic status in 2016, making it one of the most ecologically preserved growing regions on Earth.
            </p>
          </div>
        </div>

        <div className="prov-grid">
          <div className="prov-text reveal">
            <p>
              The estate spans 440 acres across gentle loamy slopes, nurtured by four distinct seasons. Elevation, here, is not merely a statistic. At 5,500 feet, cooler temperatures slow the growth of the tea leaf, concentrating the natural compounds that give Temi its signature character — a copper-gold liquor, fruity in aroma, with a clean, mineral finish that no lowland estate can replicate.
            </p>
            <p>
              This is the terroir of Temi Tea Special: India's most protected designation, grown on the only government-owned Himalayan tea estate in Sikkim — a state where, in 2016, every farm became organic by law.
            </p>

            <svg className="altitude-svg reveal d2" viewBox="0 0 600 200" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="ridge" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5b1d18" stopOpacity="0.15"/>
                  <stop offset="100%" stopColor="#5b1d18" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M0 180 L0 140 L60 110 L120 85 L180 65 L240 80 L300 50 L360 30 L420 55 L480 75 L540 95 L600 80 L600 180 Z" fill="url(#ridge)"/>
              <path d="M0 140 L60 110 L120 85 L180 65 L240 80 L300 50 L360 30 L420 55 L480 75 L540 95 L600 80" stroke="#5b1d18" strokeWidth="1.2" fill="none"/>
              <line x1="0" y1="180" x2="600" y2="180" stroke="#c9b893" strokeDasharray="2 4"/>
              <circle cx="360" cy="30" r="5" fill="#e0a235"/>
              <line x1="360" y1="30" x2="360" y2="180" stroke="#e0a235" strokeDasharray="2 3" strokeWidth="1"/>
              <text x="368" y="22" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#5b1d18" letterSpacing="2">TEMI · 5,500 FT</text>
              <text x="0" y="196" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#57463a" letterSpacing="1.5">SEA LEVEL</text>
              <text x="540" y="196" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#57463a" letterSpacing="1.5">HIMALAYAS</text>
            </svg>
          </div>

          <div className="prov-card reveal d2">
            <div className="cell"><div className="label">Established</div><div className="value">1969</div></div>
            <div className="cell"><div className="label">Altitude</div><div className="value">1,400 – 2,000<span style={{fontSize:'14px', color:'var(--ink-soft)', fontStyle:'italic'}}> m</span></div></div>
            <div className="cell"><div className="label">Estate Area</div><div className="value">440 <em>acres</em></div></div>
            <div className="cell"><div className="label">Organic Since</div><div className="value">2008</div></div>
            <div className="cell"><div className="label">Plucking</div><div className="value"><em>Fully</em> hand-plucked</div></div>
            <div className="cell"><div className="label">Flushes</div><div className="value" style={{fontSize:'18px', lineHeight:1.3}}>Spring · Summer<br/>Monsoon · Autumn</div></div>
            <div className="cell"><div className="label">Location</div><div className="value" style={{fontSize:'20px'}}>South Sikkim, India</div></div>
            <div className="cell"><div className="label">Grade</div><div className="value" style={{fontSize:'20px'}}><em>Fine</em> Whole Leaf</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const [expanded, setExpanded] = useState(false);
  
  const feats = [
    { num: '01', a: 'Fine ', b: 'Whole', c: ' Leaves', body: 'Crafted from carefully sorted whole-leaf grade — light in body, with a delicate complexity that distinguishes it from broken-grade blends. Each leaf hand-selected at the flush.' },
    { num: '02', a: 'High-', b: 'Altitude', c: ' Character', body: 'Cool mountain air at 5,500 feet slows the growth cycle, building polyphenol depth and a fruity, aromatic complexity that cannot be engineered at lower elevations.' },
    { num: '03', a: '', b: 'Copper', c: '-Bright Infusion', body: 'The brew yields a luminous copper-gold colour — the natural marker of a genuinely clean leaf. No artificial colouring, no pesticide residue.' },
    { num: '04', a: '', b: 'Zero', c: ' Chemicals', body: 'Operating without synthetic fertilisers or pesticides since 2008. In 2016, Sikkim became India\'s first fully organic state. Temi is its finest expression.' },
    { num: '05', a: 'Award-', b: 'Winning', c: ' Heritage', body: 'Recognised among the finest Himalayan teas in Asia — winning international laurels and placed alongside the storied estates of Darjeeling.' },
    { num: '06', a: '', b: 'Fair Trade', c: ' Certified', body: 'Every purchase directly supports the livelihoods of the hand-pluckers and their families who have tended these slopes for generations.' },
  ];
  const icons = [
    <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21c-4-2-7-6-7-11 0-2 1-4 3-6 1 1 3 2 4 5 1-3 3-4 4-5 2 2 3 4 3 6 0 5-3 9-7 11Z"/></svg>,
    <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m3 20 6-9 4 5 4-6 4 10H3Z"/></svg>,
    <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="8"/><path d="M12 6v6l4 2"/></svg>,
    <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="m5 5 14 14"/></svg>,
    <svg key="4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21h8M12 17v4M7 3h10v6a5 5 0 0 1-10 0V3Z"/><path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3"/></svg>,
    <svg key="5" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21s-7-4-9-9c-1-3 1-7 5-7 2 0 3 1 4 3 1-2 2-3 4-3 4 0 6 4 5 7-2 5-9 9-9 9Z"/></svg>,
  ];

  return (
    <section className="features section-pad">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow-row">
              <span className="num">02 / 06</span>
              <span className="line"></span>
              <span className="eyebrow">The Tea Itself</span>
            </div>
          </div>
          <div>
            <h2>A fine-leaf<br/>black tea, <em>unlike</em><br/>any other.</h2>
            <p className="lede" style={{ marginTop: 28 }}>
              Six characteristics that separate Temi Tea Special from every other black tea you have tasted.
            </p>
          </div>
        </div>
        <div className="ridge-banner reveal d2">
          <svg viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="ridgeFade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e0a235" stopOpacity="0"/>
                <stop offset="100%" stopColor="#e0a235" stopOpacity="0.18"/>
              </linearGradient>
              <linearGradient id="ridgeFade2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c87a35" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="#c87a35" stopOpacity="0.35"/>
              </linearGradient>
              <linearGradient id="ridgeFade3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a120e" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#3a120e" stopOpacity="0.8"/>
              </linearGradient>
            </defs>
            {/* Back ridge */}
            <path d="M0 130 L120 70 L240 100 L360 50 L500 90 L640 30 L780 80 L900 55 L1040 95 L1200 70 L1200 200 L0 200 Z" fill="url(#ridgeFade)"/>
            {/* Mid ridge */}
            <path d="M0 150 L90 110 L210 135 L340 85 L470 125 L600 75 L740 120 L880 90 L1020 130 L1200 110 L1200 200 L0 200 Z" fill="url(#ridgeFade2)"/>
            {/* Front ridge */}
            <path d="M0 175 L80 145 L180 165 L290 130 L410 160 L530 130 L660 155 L790 135 L930 165 L1080 145 L1200 170 L1200 200 L0 200 Z" fill="url(#ridgeFade3)"/>
            {/* Estate marker on a peak */}
            <g transform="translate(640 30)">
              <line x1="0" y1="0" x2="0" y2="-32" stroke="rgba(224, 162, 53, 0.6)" strokeDasharray="2 3" strokeWidth="0.8"/>
              <circle cx="0" cy="-34" r="3" fill="#e0a235"/>
              <circle cx="0" cy="-34" r="6" fill="none" stroke="#e0a235" strokeOpacity="0.4"/>
              <text x="8" y="-30" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#e0a235" letterSpacing="2">TEMI · 5,500 FT</text>
            </g>
            {/* Sun / moon */}
            <circle cx="980" cy="55" r="18" fill="rgba(224, 162, 53, 0.08)"/>
            <circle cx="980" cy="55" r="10" fill="rgba(224, 162, 53, 0.16)"/>
          </svg>
        </div>

        <div className={`feat-grid ${!expanded ? 'collapsed' : ''}`}>
          {feats.map((f, i) => (
            <div className="feat reveal" key={f.num} style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
              <div className="feat-num">— {f.num}</div>
              <div className="feat-icon">{icons[i]}</div>
              <h3>{f.a}<em>{f.b}</em>{f.c}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>

        {!expanded && (
          <div className="view-more-container">
            <button className="btn-view-more" onClick={() => setExpanded(true)}>
              View All Characteristics
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ============ Certifications ============
function Certifications() {
  const FlagUS = (
    <svg viewBox="0 0 30 20" className="flag" aria-hidden="true">
      <rect width="30" height="20" fill="#f9f1de"/>
      {Array.from({length: 7}).map((_, i) => (
        <rect key={i} y={i*(20/13)*2 + (20/13)*1} width="30" height={20/13} fill="#b22234"/>
      ))}
      <rect width="12" height={20/13*7} fill="#3c3b6e"/>
      <g fill="#f9f1de">
        {[0,1,2,3].map(r => [0,1,2,3,4].map(c => (
          <circle key={r+'-'+c} cx={1.5 + c*2.2} cy={1.4 + r*2.4} r="0.5"/>
        )))}
      </g>
    </svg>
  );
  const FlagJP = (
    <svg viewBox="0 0 30 20" className="flag" aria-hidden="true">
      <rect width="30" height="20" fill="#f9f1de"/>
      <circle cx="15" cy="10" r="5" fill="#bc002d"/>
    </svg>
  );
  const FlagEU = (
    <svg viewBox="0 0 30 20" className="flag" aria-hidden="true">
      <rect width="30" height="20" fill="#003399"/>
      {Array.from({length: 12}).map((_, i) => {
        const a = (i / 12) * Math.PI * 2 - Math.PI/2;
        return <circle key={i} cx={15 + Math.cos(a)*5.5} cy={10 + Math.sin(a)*5.5} r="0.7" fill="#ffcc00"/>;
      })}
    </svg>
  );
  const FlagGlobe = (
    <svg viewBox="0 0 30 20" className="flag" aria-hidden="true">
      <rect width="30" height="20" fill="#f9f1de"/>
      <circle cx="15" cy="10" r="6" fill="none" stroke="#2d6a4f" strokeWidth="0.8"/>
      <ellipse cx="15" cy="10" rx="6" ry="2.5" fill="none" stroke="#2d6a4f" strokeWidth="0.6"/>
      <line x1="15" y1="4" x2="15" y2="16" stroke="#2d6a4f" strokeWidth="0.6"/>
    </svg>
  );

  const certs = [
    {
      mark: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 2l2.5 5.5L20 8.5l-4 4 1 5.5-5-2.5L7 18l1-5.5-4-4 5.5-1Z"/></svg>,
      title: 'USDA Organic', sub: 'United States', flag: FlagUS,
      desc: 'United States Department of Agriculture — the global gold standard for organic certification.'
    },
    {
      mark: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>,
      title: 'JAS Certified', sub: 'Japan', flag: FlagJP,
      desc: 'Japanese Agricultural Standard — mandatory for organic entry into Japan.'
    },
    {
      mark: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 3l8 4.5v9L12 21 4 16.5v-9Z"/><path d="M12 3v18M4 7.5l16 9M20 7.5l-16 9"/></svg>,
      title: 'IFOAM / Lacon', sub: 'European Union', flag: FlagEU,
      desc: 'International Federation of Organic Agriculture Movements — European equivalence.'
    },
    {
      mark: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 3v18M5 8h14M5 16h14"/><path d="M5 8l-2 4 4 0Z" fill="currentColor" fillOpacity="0.1"/><path d="M19 8l2 4-4 0Z" fill="currentColor" fillOpacity="0.1"/></svg>,
      title: 'Fair Trade', sub: 'Global Standard', flag: FlagGlobe,
      desc: 'Certified supply chain ethics — fair wages, safe conditions, community investment.'
    },
  ];
  return (
    <section id="certs" className="certs section-pad-sm">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow-row">
              <span className="num">03 / 06</span>
              <span className="line"></span>
              <span className="eyebrow">Certified Integrity</span>
            </div>
          </div>
          <div>
            <h2>Recognised by<br/>the world's most <em>rigorous</em><br/>organic bodies.</h2>
          </div>
        </div>
        <div className="certs-grid reveal">
          {certs.map((c, i) => (
            <div className="cert" key={c.title} style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="cert-top">
                <div className="cert-mark">{c.mark}</div>
                {c.flag}
              </div>
              <div>
                <div className="cert-title">{c.title}</div>
                <div className="cert-sub" style={{ marginTop: 4 }}>{c.sub}</div>
              </div>
              <p className="cert-desc">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ Our Story / Timeline ============
function Story() {
  const events = [
    { year: '1969', title: 'Foundation', desc: 'The Temi Tea Estate is established by the Kingdom of Sikkim. 440 acres of Himalayan slopes are cultivated for the first time.' },
    { year: '1975', title: 'Integration', desc: 'Sikkim joins India. The estate passes to the Government of Sikkim, preserving its heritage and quality mandate.' },
    { year: '2008', title: 'Organic Certification', desc: 'USDA, JAS, and Lacon certifications awarded. Chemical use permanently ended across the estate.' },
    { year: '2016', title: 'Sikkim Goes Organic', desc: 'Sikkim becomes India\'s first fully organic state. Temi becomes the jewel of the world\'s most protected growing region.' },
    { year: '2024', title: 'A Kingdom\'s Gift, To the World', desc: 'Marketed across India and internationally by MRC Agrotech Limited (BSE: 540809), Mumbai.' },
  ];
  return (
    <section id="story" className="story section-pad">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow-row">
              <span className="num">04 / 06</span>
              <span className="line"></span>
              <span className="eyebrow">Our Story</span>
            </div>
          </div>
          <div>
            <h2>A Kingdom's<br/>gift, to <em>the world.</em></h2>
            <p className="lede" style={{ marginTop: 28 }}>
              The story of Temi begins with a Himalayan king, four hundred and forty acres of loamy slope, and four seasons that nurtured a singular character.
            </p>
          </div>
        </div>

        <blockquote className="story-quote reveal">
          Every sip whispers a story of Sikkim's history, landscape, and mysticism.
          <span className="attr">— Temi Tea Estate</span>
        </blockquote>

        <div className="timeline">
          {events.map((e) => (
            <div className="tl-row reveal" key={e.year}>
              <div className="tl-year">{e.year}</div>
              <div><div className="tl-dot"></div></div>
              <div className="tl-content">
                <h4>{e.title}</h4>
                <p>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ Tasting Notes ============
function Tasting() {
  const flavors = [
    { label: 'Body', value: 'Medium-Light', w: 45 },
    { label: 'Astringency', value: 'Gentle', w: 32 },
    { label: 'Aroma', value: 'Pronounced', w: 82 },
    { label: 'Fruity Notes', value: 'Distinct', w: 76 },
    { label: 'Finish', value: 'Long & Clean', w: 88 },
    { label: 'Mineral Note', value: 'Slate-Soft', w: 58 },
  ];
  return (
    <section id="tasting" className="tasting section-pad">
      <div className="container">
        <div className="tasting-grid">
          <div className="reveal">
            <div className="eyebrow-row" style={{ display:'flex', alignItems:'center', gap:14, marginBottom: 28 }}>
              <span className="num" style={{ fontFamily:'JetBrains Mono, monospace', fontSize:11, color:'var(--saffron)', letterSpacing:'0.18em' }}>05 / 06</span>
              <span className="line" style={{ flex:1, height:1, background:'rgba(249, 241, 222, 0.2)', maxWidth:80 }}></span>
              <span className="eyebrow">Sensory Profile</span>
            </div>
            <h2>Copper-gold<br/>in the cup, <em>quietly</em><br/>complex on<br/>the tongue.</h2>
            <p className="tasting-intro">
              A luminous copper-gold liquor — bright, clear, entirely natural. Light-to-medium bodied with a faint muscatel character of high-altitude black tea. Long, clean finish; a quiet mineral note from the slate-rich Sikkim soils lingers.
            </p>
            <div className="flavor-list">
              {flavors.map((f) => (
                <div className="flavor" key={f.label} style={{ '--w': f.w + '%' }}>
                  <div className="flavor-label">{f.label}</div>
                  <div className="flavor-bar"></div>
                  <div className="flavor-value">{f.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal d2">
            <div className="liquor-study">
              <div className="liquor-disc" aria-hidden="true">
                <div className="liquor-disc-inner"></div>
                <div className="liquor-disc-label">
                  <div className="liquor-disc-eyebrow">Liquor</div>
                  <div className="liquor-disc-name">Copper-gold</div>
                  <div className="liquor-disc-hex">#C87A35</div>
                </div>
              </div>

              <div className="steep-flight">
                <div className="steep-flight-head">
                  <span className="eyebrow" style={{ color:'var(--saffron)' }}>Steeping Flight</span>
                  <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:10, letterSpacing:'0.15em', color:'rgba(249,241,222,0.5)', textTransform:'uppercase' }}>1 → 4 min</span>
                </div>
                <div className="steep-row">
                  <div className="steep-chip" style={{ background:'linear-gradient(180deg, #ecc06a, #d59a3e)' }}></div>
                  <div className="steep-chip" style={{ background:'linear-gradient(180deg, #d59a3e, #b76e2e)' }}></div>
                  <div className="steep-chip" style={{ background:'linear-gradient(180deg, #b76e2e, #7a3a14)' }}></div>
                </div>
                <div className="steep-row-labels">
                  <div>
                    <div className="steep-time">1 min</div>
                    <div className="steep-desc">Floral, bright amber</div>
                  </div>
                  <div>
                    <div className="steep-time">2.5 min</div>
                    <div className="steep-desc">Copper, balanced</div>
                  </div>
                  <div>
                    <div className="steep-time">4 min</div>
                    <div className="steep-desc">Deep tangerine</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ Brew Guide ============
function Brew() {
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 0) {
      setProgress((scrollLeft / maxScroll) * 100);
    }
  };

  const steps = [
    {
      n: '01', title: 'Measure', em: 'the Leaf', meta: '2 – 2.5 g / cup',
      body: 'One heaped teaspoon (2–2.5g) of loose-leaf per 200ml of water. For fuller body, increase to 3g.',
      icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M8 18c0-4 4-7 8-7s8 3 8 7-4 5-8 5-8-1-8-5Z"/><path d="M12 8s2-3 4-3 4 3 4 3"/></svg>
    },
    {
      n: '02', title: 'Water', em: 'Temperature', meta: '90 – 95° C',
      body: 'Bring fresh filtered water to 90–95°C. Avoid a full rolling boil — excessive heat destroys the delicate aromatics.',
      icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M16 4v14"/><circle cx="16" cy="22" r="6"/><path d="M14 4h4"/></svg>
    },
    {
      n: '03', title: 'Steep', em: 'Patiently', meta: '2.5 – 3.5 min',
      body: 'Steep for 2.5 to 3.5 minutes. Shorter steeping yields floral brightness; longer deepens body. Remove leaves promptly.',
      icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="16" cy="16" r="12"/><path d="M16 8v8l5 3"/></svg>
    },
    {
      n: '04', title: 'Serve &', em: 'Savour', meta: 'Best served plain',
      body: 'Serve plain in a clear cup to appreciate the copper-gold colour. Milk and sugar mask the character of this extraordinary leaf.',
      icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M7 14h16v5a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6Z"/><path d="M23 16h2a3 3 0 0 1 0 6h-2"/><path d="M12 9s1-2 0-4M16 9s1-2 0-4M20 9s1-2 0-4"/></svg>
    },
  ];
  return (
    <section id="brew" className="brew section-pad">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow-row">
              <span className="num">06 / 06</span>
              <span className="line"></span>
              <span className="eyebrow">Ritual of the Cup</span>
            </div>
          </div>
          <div>
            <h2>How to brew<br/>Temi Tea <em>Special.</em></h2>
            <p className="lede" style={{ marginTop: 28 }}>
              A whole-leaf tea rewards patience. Four steps, four minutes, one quietly extraordinary cup.
            </p>
          </div>
        </div>
        <div className="brew-steps" ref={scrollRef} onScroll={handleScroll}>
          {steps.map((s, i) => (
            <div className="step reveal" key={s.n} style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="step-num">— {s.n}</div>
              <div className="step-glyph">{s.icon}</div>
              <h4>{s.title} <em>{s.em}</em></h4>
              <div className="step-meta">{s.meta}</div>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
        <div className="brew-indicator">
          <div className="brew-progress">
            <div className="brew-progress-inner" style={{ transform: `scaleX(${progress / 100})` }}></div>
          </div>
          <div className="brew-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            Swipe to explore
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ CTA ============
function CTA() {
  return (
    <section id="cta" className="cta">
      <div className="container cta-inner">
        <div className="reveal">
          <div className="eyebrow-row" style={{ display:'flex', alignItems:'center', gap:14, marginBottom: 30 }}>
            <span style={{ fontFamily:'JetBrains Mono, monospace', fontSize:11, color:'var(--saffron)', letterSpacing:'0.2em' }}>— Order Temi Special</span>
            <span style={{ flex:1, height:1, background:'rgba(249, 241, 222, 0.2)', maxWidth:120 }}></span>
          </div>
          <h2>
            Carry a <em>kingdom</em><br/>
            home,<br/>one cup<br/>at a time.
          </h2>
          <p>
            Available online from the estate, and across premium retail in India. For corporate gifting and bulk enquiries, contact MRC Agrotech directly.
          </p>
          <div className="cta-actions">
            <a href="https://temiteaestate.com/products/temiteaspecial-nat" target="_blank" rel="noopener" className="btn btn-primary">
              Buy at temiteaestate.com
              <span className="arrow">→</span>
            </a>
            <a href="#" className="btn btn-ghost">Corporate &amp; Gifting</a>
          </div>
          
        </div>

        <div className="cta-card reveal d2">
          <div className="price-row">
            <div className="price">₹530</div>
            <div className="price-sub">/ 100g</div>
          </div>
          <h4>Temi Tea <em>Special</em></h4>
          <div className="desc">Loose-leaf · Fine Whole Leaf · Premium Grade</div>
          <ul className="features-list">
            <li><span className="check">✓</span> 100% Certified Organic — USDA, JAS, IFOAM</li>
            <li><span className="check">✓</span> Hand-plucked at 5,500 ft, Sikkim Himalaya</li>
            <li><span className="check">✓</span> Sealed at the estate · Fair Trade certified</li>
            <li><span className="check">✓</span> Free shipping on orders above ₹1,000</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ============ Footer ============
function Footer() {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <a href="#" className="foot-logo"><img src="/temitea.png" alt="Temi Tea" /></a>
            <p>India's only certified organic Himalayan estate tea, grown at 5,500 feet in Sikkim since 1969.</p>
            <div className="foot-seal">
              <img src="/images/sikkim-organic-badge.png" alt="Sikkim Tea Organic Certified" />
              <div>
                <div className="foot-seal-title">Sikkim Tea</div>
                <div className="foot-seal-sub">Organic · Trademark of the Estate</div>
              </div>
            </div>
          </div>
          <div>
            <h5>Products</h5>
            <ul>
              <li><a href="#">Temi Special · 100g</a></li>
              <li><a href="#">Temi Classic · 100g</a></li>
              <li><a href="#">Wooden Caddy · 200g</a></li>
              <li><a href="#">Green Tea Caddy</a></li>
              <li><a href="#">Corporate Gifting</a></li>
            </ul>
          </div>
          <div>
            <h5>About</h5>
            <ul>
              <li><a href="#provenance">The Estate</a></li>
              <li><a href="#story">Our Story</a></li>
              <li><a href="#">Certifications</a></li>
              <li><a href="#">Sustainability</a></li>
            </ul>
          </div>
          <div>
            <h5>Marketed by</h5>
            <a href="#" className="mrc-logo"><img src="/images/mrc-agrotech.png" alt="MRC Agrotech Ltd — Growing Together" /></a>
            <ul style={{ marginTop: 16 }}>
              <li>BSE: 540809</li>
              <li>+91-22-40156765</li>
              <li><a href="mailto:Info@mrcagro.com">Info@mrcagro.com</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2025 MRC Agrotech Limited · Temi Tea · All rights reserved</span>
          <span>FSSAI Lic. 12324005000007 · temiteaestate.com</span>
        </div>
      </div>
    </footer>
  );
}

// ============ App ============
function App() {
  useReveal();
  useFlavorReveal();
  return (
    <>
      <Nav />
      <main>
        <Hero titleA="Temi Tea " titleEm="Special" showRing={true} showMarquee={true} />
        <Stats />
        <Provenance />
        <Features />
        <Certifications />
        <Story />
        <Tasting />
        <Brew />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
