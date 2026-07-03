/* ═══════════════════════════════════════════════════════════
   QAVIO — main.js
   ═══════════════════════════════════════════════════════════ */

'use strict';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── CUSTOM CURSOR ─────────────────────────────────────── */
const curDot  = document.getElementById('cur-dot');
const curRing = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

window.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  curDot.style.left = mx + 'px';
  curDot.style.top  = my + 'px';
});

if (!prefersReducedMotion) (function animRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  curRing.style.left = rx + 'px';
  curRing.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .feat-card, .sec-card, .price-card, .plan-cta, .channel, .sector-tab').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('c-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('c-hover'));
});

/* ─── NAV SCROLL ─────────────────────────────────────────── */
const nav = document.getElementById('nav');
const langDd = document.getElementById('lang-dd');
const heroLogo = document.getElementById('hero-logo');
const mobileHeader = document.getElementById('mobile-header');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  const pastHero = window.scrollY > 80;
  if (langDd)       langDd.classList.toggle('hidden', pastHero);
  if (heroLogo)     heroLogo.classList.toggle('hidden', pastHero);
  if (mobileHeader) mobileHeader.classList.toggle('hidden', pastHero);
}, { passive: true });

/* ─── MOBILE HAMBURGER + DRAWER ────────────────────────── */
const hamburger    = document.getElementById('hamburger');
const mobileMenu   = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-overlay');

function openDrawer() {
  hamburger?.classList.add('open');
  mobileMenu?.classList.add('open');
  mobileOverlay?.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  hamburger?.classList.remove('open');
  mobileMenu?.classList.remove('open');
  mobileOverlay?.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', () => {
  mobileMenu?.classList.contains('open') ? closeDrawer() : openDrawer();
});

document.getElementById('mmenu-close')?.addEventListener('click', closeDrawer);
mobileOverlay?.addEventListener('click', closeDrawer);

document.querySelectorAll('.mmenu-links a').forEach(link => {
  link.addEventListener('click', closeDrawer);
});

/* ─── MOBILE LANG TRIGGER ───────────────────────────────── */
const mobileLangTrigger = document.getElementById('mobile-lang-trigger');
const mobileLangMenu    = document.getElementById('mobile-lang-menu');

mobileLangTrigger?.addEventListener('click', e => {
  e.stopPropagation();
  const opening = !mobileLangMenu.classList.contains('open');
  mobileLangMenu.classList.toggle('open', opening);
  mobileLangTrigger.classList.toggle('open', opening);
});

document.addEventListener('click', () => {
  mobileLangMenu?.classList.remove('open');
  mobileLangTrigger?.classList.remove('open');
});

/* ─── SECTOR DATA ────────────────────────────────────────── */
const SECTOR_DATA = {
  klinik: {
    greeting:    'Merhaba! 👋 Kliniğimize hoş geldiniz. Size nasıl yardımcı olabilirim?',
    buttons:     ['📅 Randevu Al', '💊 Tedavi Bilgisi', '💰 Fiyat Öğren'],
    customerMsg: 'Konsültasyon için randevu almak istiyorum',
    flowBadge:   '🗓️ RANDEVU FORMU',
    flowCardTxt: 'Randevu almak için formu açınız...',
    formTitle:   'Randevu Bilgileri',
    formSub:     'Formu doldurun, hemen onaylayalım',
    service:     'Saç Ekimi Konsültasyon',
    dates:       [['Sal','20'],['Çar','21'],['Per','22'],['Cum','23']],
    times:       ['10:00','11:30','14:00'],
    btn:         'Randevuyu Onayla ✓',
    dash: {
      stats: [
        { count: 47, suffix: '',  label: 'Bugün mesaj', trend: '↑ %23' },
        { count: 12, suffix: '',  label: 'Randevu',     trend: '↑ %8'  },
        { count: 91, suffix: '%', label: 'Otomasyon',   trend: '✓ hedef' },
        { text: '3s',             label: 'Ort. yanıt',  trend: '✓'     },
      ],
      section: 'Bugünkü Randevular',
      rows: [
        { name: 'Ayşe Demir',  time: '10:00 · Konsültasyon', badge: 'Onaylı',  dot: 'dot-g', bg: 'bg-g' },
        { name: 'Emre Çelik',  time: '11:30 · FUE Saç',      badge: 'Bekliyor',dot: 'dot-y', bg: 'bg-y' },
        { name: 'Fatma Kaya',  time: '14:00 · Kaş Ekimi',    badge: 'Onaylı',  dot: 'dot-g', bg: 'bg-g' },
      ]
    }
  },
  restoran: {
    greeting:    'Merhaba! 👋 Hoş geldiniz. Bugün size nasıl yardımcı olabiliriz?',
    buttons:     ['📅 Rezervasyon Al', '🍽️ Menüyü İncele', '📍 Konum & Saatler'],
    customerMsg: 'Bu akşam masa rezervasyonu istiyorum',
    flowBadge:   '🍽️ REZERVASYON FORMU',
    flowCardTxt: 'Masa rezervasyonu için formu açınız...',
    formTitle:   'Masa Rezervasyonu',
    formSub:     'Kişi sayısı ve saat seçin',
    service:     '👥 4 Kişilik Masa',
    dates:       [['Paz','15'],['Pts','16'],['Sal','17'],['Çar','18']],
    times:       ['19:00','20:00','21:00'],
    btn:         'Rezervasyonu Onayla ✓',
    dash: {
      stats: [
        { count: 63, suffix: '',  label: 'Bugün mesaj',  trend: '↑ %31' },
        { count: 18, suffix: '',  label: 'Rezervasyon',  trend: '↑ %15' },
        { count: 94, suffix: '%', label: 'Otomasyon',    trend: '✓ hedef' },
        { text: '2s',             label: 'Ort. yanıt',   trend: '✓'     },
      ],
      section: 'Bugünkü Rezervasyonlar',
      rows: [
        { name: 'Masa 4',  time: '19:30 · 4 kişi', badge: 'Onaylı',  dot: 'dot-g', bg: 'bg-g' },
        { name: 'Masa 7',  time: '20:00 · 2 kişi', badge: 'Bekliyor',dot: 'dot-y', bg: 'bg-y' },
        { name: 'Masa 12', time: '21:00 · 6 kişi', badge: 'Onaylı',  dot: 'dot-g', bg: 'bg-g' },
      ]
    }
  },
  guzellik: {
    greeting:    'Merhaba! 👋 Salonumuza hoş geldiniz. Ne yapmak istersiniz?',
    buttons:     ['📅 Seans Rezervasyonu', '💅 Hizmetlerimiz', '💰 Fiyat Listesi'],
    customerMsg: 'Saç boyama için seans randevusu istiyorum',
    flowBadge:   '✂️ SEANS FORMU',
    flowCardTxt: 'Güzellik seansı için formu açınız...',
    formTitle:   'Güzellik Seansı',
    formSub:     'Hizmet ve zamanınızı seçin',
    service:     'Saç Boyama & Refleks',
    dates:       [['Pts','16'],['Sal','17'],['Çar','18'],['Per','19']],
    times:       ['10:30','13:00','15:30'],
    btn:         'Randevuyu Onayla ✓',
    dash: {
      stats: [
        { count: 38, suffix: '',  label: 'Bugün mesaj', trend: '↑ %17' },
        { count: 9,  suffix: '',  label: 'Seans',       trend: '↑ %12' },
        { count: 89, suffix: '%', label: 'Otomasyon',   trend: '✓ hedef' },
        { text: '4s',             label: 'Ort. yanıt',  trend: '✓'     },
      ],
      section: 'Bugünkü Seanslar',
      rows: [
        { name: 'Zeynep Arslan', time: '10:30 · Saç Boyama',   badge: 'Onaylı',  dot: 'dot-g', bg: 'bg-g' },
        { name: 'Selin Yıldız',  time: '13:00 · Manikür',      badge: 'Onaylı',  dot: 'dot-g', bg: 'bg-g' },
        { name: 'Canan Demir',   time: '15:30 · Kaş Şekli',   badge: 'Bekliyor',dot: 'dot-y', bg: 'bg-y' },
      ]
    }
  },
  servis: {
    greeting:    'Merhaba! 👋 Servisimize hoş geldiniz. Aracınız için ne yapabiliriz?',
    buttons:     ['🔧 Servis Randevusu', '🚗 Araç Sorgula', '💰 Fiyat Al'],
    customerMsg: 'Aracım için bakım randevusu almak istiyorum',
    flowBadge:   '🔧 SERVİS FORMU',
    flowCardTxt: 'Servis randevusu için formu açınız...',
    formTitle:   'Araç Kabul Formu',
    formSub:     'Bilgileri girin, randevu oluşturalım',
    service:     'Periyodik Bakım — 15.000 km',
    dates:       [['Pts','16'],['Sal','17'],['Per','19'],['Cum','20']],
    times:       ['09:00','11:00','14:00'],
    btn:         'Randevuyu Onayla ✓',
    dash: {
      stats: [
        { count: 29, suffix: '',  label: 'Bugün mesaj', trend: '↑ %11' },
        { count: 7,  suffix: '',  label: 'Araç',        trend: '↑ %6'  },
        { count: 88, suffix: '%', label: 'Otomasyon',   trend: '✓ hedef' },
        { text: '3s',             label: 'Ort. yanıt',  trend: '✓'     },
      ],
      section: 'Bugünkü Araçlar',
      rows: [
        { name: '34 ABC 123', time: '09:00 · Yağ Değişimi', badge: 'Onaylı',  dot: 'dot-g', bg: 'bg-g' },
        { name: '06 XYZ 456', time: '11:00 · Fren Bakımı',  badge: 'Bekliyor',dot: 'dot-y', bg: 'bg-y' },
        { name: '35 DEF 789', time: '14:00 · Lastik Değ.',  badge: 'Onaylı',  dot: 'dot-g', bg: 'bg-g' },
      ]
    }
  },
  emlak: {
    greeting:    'Merhaba! 👋 Hoş geldiniz. Hayalinizdeki mülkü bulmak için buradayız!',
    buttons:     ['🏠 Ziyaret Planla', '🔍 İlanları Gör', '📞 Danışmana Bağlan'],
    customerMsg: 'Satılık 3+1 daire için bilgi almak istiyorum',
    flowBadge:   '🏠 ZİYARET FORMU',
    flowCardTxt: 'Gayrimenkul ziyareti için formu açınız...',
    formTitle:   'Ziyaret Randevusu',
    formSub:     'Tercih ve zamanınızı seçin',
    service:     '3+1 Daire — Kadıköy',
    dates:       [['Sal','17'],['Çar','18'],['Per','19'],['Cum','20']],
    times:       ['11:00','14:00','16:00'],
    btn:         'Ziyareti Onayla ✓',
    dash: {
      stats: [
        { count: 22, suffix: '',  label: 'Bugün mesaj', trend: '↑ %9'  },
        { count: 5,  suffix: '',  label: 'Ziyaret',     trend: '↑ %4'  },
        { count: 85, suffix: '%', label: 'Otomasyon',   trend: '✓ hedef' },
        { text: '5s',             label: 'Ort. yanıt',  trend: '✓'     },
      ],
      section: 'Bugünkü Ziyaretler',
      rows: [
        { name: 'Mehmet Kaya',  time: '11:00 · 3+1 Kadıköy',    badge: 'Onaylı',  dot: 'dot-g', bg: 'bg-g' },
        { name: 'Aylin Şahin',  time: '14:00 · 2+1 Beşiktaş',   badge: 'Onaylı',  dot: 'dot-g', bg: 'bg-g' },
        { name: 'Can Erdoğan',  time: '16:00 · Daire Ataşehir',  badge: 'Bekliyor',dot: 'dot-y', bg: 'bg-y' },
      ]
    }
  }
};

/* ─── SECTOR DATA (EN) ───────────────────────────────────── */
const SECTOR_DATA_EN = {
  klinik: {
    greeting:    'Hello! 👋 Welcome to our clinic. How can I help you?',
    buttons:     ['📅 Book Appointment', '💊 Treatment Info', '💰 Get Prices'],
    customerMsg: 'I\'d like to book a consultation',
    flowBadge:   '🗓️ APPOINTMENT FORM',
    flowCardTxt: 'Please open the form to book...',
    formTitle:   'Appointment Details',
    formSub:     'Fill in the form, we\'ll confirm right away',
    service:     'Hair Transplant Consultation',
    dates:       [['Tue','20'],['Wed','21'],['Thu','22'],['Fri','23']],
    times:       ['10:00','11:30','14:00'],
    btn:         'Confirm Appointment ✓',
    dash: {
      stats: [
        { count: 47, suffix: '',  label: 'Today\'s messages', trend: '↑ 23%' },
        { count: 12, suffix: '',  label: 'Appointments',      trend: '↑ 8%'  },
        { count: 91, suffix: '%', label: 'Automation',        trend: '✓ target' },
        { text: '3s',             label: 'Avg. response',     trend: '✓'     },
      ],
      section: 'Today\'s Appointments',
      rows: [
        { name: 'Emma Johnson',  time: '10:00 · Consultation', badge: 'Confirmed', dot: 'dot-g', bg: 'bg-g' },
        { name: 'James Smith',   time: '11:30 · FUE Hair',     badge: 'Pending',   dot: 'dot-y', bg: 'bg-y' },
        { name: 'Sophia Davis',  time: '14:00 · Eyebrow',      badge: 'Confirmed', dot: 'dot-g', bg: 'bg-g' },
      ]
    }
  },
  restoran: {
    greeting:    'Hello! 👋 Welcome. How can we help you today?',
    buttons:     ['📅 Make Reservation', '🍽️ View Menu', '📍 Location & Hours'],
    customerMsg: 'I\'d like to reserve a table for tonight',
    flowBadge:   '🍽️ RESERVATION FORM',
    flowCardTxt: 'Please open the form to reserve a table...',
    formTitle:   'Table Reservation',
    formSub:     'Select party size and time',
    service:     '👥 Table for 4',
    dates:       [['Sun','15'],['Mon','16'],['Tue','17'],['Wed','18']],
    times:       ['19:00','20:00','21:00'],
    btn:         'Confirm Reservation ✓',
    dash: {
      stats: [
        { count: 63, suffix: '',  label: 'Today\'s messages', trend: '↑ 31%' },
        { count: 18, suffix: '',  label: 'Reservations',      trend: '↑ 15%' },
        { count: 94, suffix: '%', label: 'Automation',        trend: '✓ target' },
        { text: '2s',             label: 'Avg. response',     trend: '✓'     },
      ],
      section: 'Today\'s Reservations',
      rows: [
        { name: 'Table 4',  time: '19:30 · 4 guests', badge: 'Confirmed', dot: 'dot-g', bg: 'bg-g' },
        { name: 'Table 7',  time: '20:00 · 2 guests', badge: 'Pending',   dot: 'dot-y', bg: 'bg-y' },
        { name: 'Table 12', time: '21:00 · 6 guests', badge: 'Confirmed', dot: 'dot-g', bg: 'bg-g' },
      ]
    }
  },
  guzellik: {
    greeting:    'Hello! 👋 Welcome to our salon. What would you like?',
    buttons:     ['📅 Book Session', '💅 Our Services', '💰 Price List'],
    customerMsg: 'I\'d like to book a hair coloring session',
    flowBadge:   '✂️ SESSION FORM',
    flowCardTxt: 'Please open the form to book your session...',
    formTitle:   'Beauty Session',
    formSub:     'Choose your service and time',
    service:     'Hair Coloring & Highlights',
    dates:       [['Mon','16'],['Tue','17'],['Wed','18'],['Thu','19']],
    times:       ['10:30','13:00','15:30'],
    btn:         'Confirm Appointment ✓',
    dash: {
      stats: [
        { count: 38, suffix: '',  label: 'Today\'s messages', trend: '↑ 17%' },
        { count: 9,  suffix: '',  label: 'Sessions',          trend: '↑ 12%' },
        { count: 89, suffix: '%', label: 'Automation',        trend: '✓ target' },
        { text: '4s',             label: 'Avg. response',     trend: '✓'     },
      ],
      section: 'Today\'s Sessions',
      rows: [
        { name: 'Emma Wilson',  time: '10:30 · Hair Coloring',   badge: 'Confirmed', dot: 'dot-g', bg: 'bg-g' },
        { name: 'Sarah Lee',    time: '13:00 · Manicure',        badge: 'Confirmed', dot: 'dot-g', bg: 'bg-g' },
        { name: 'Mia Taylor',   time: '15:30 · Eyebrow Shaping', badge: 'Pending',   dot: 'dot-y', bg: 'bg-y' },
      ]
    }
  },
  servis: {
    greeting:    'Hello! 👋 Welcome to our service center. How can we help your vehicle?',
    buttons:     ['🔧 Book Service', '🚗 Vehicle Lookup', '💰 Get Quote'],
    customerMsg: 'I\'d like to book a maintenance appointment',
    flowBadge:   '🔧 SERVICE FORM',
    flowCardTxt: 'Please open the form to book a service...',
    formTitle:   'Vehicle Intake Form',
    formSub:     'Enter details and we\'ll schedule your appointment',
    service:     'Periodic Maintenance — 15,000 km',
    dates:       [['Mon','16'],['Tue','17'],['Thu','19'],['Fri','20']],
    times:       ['09:00','11:00','14:00'],
    btn:         'Confirm Appointment ✓',
    dash: {
      stats: [
        { count: 29, suffix: '',  label: 'Today\'s messages', trend: '↑ 11%' },
        { count: 7,  suffix: '',  label: 'Vehicles',          trend: '↑ 6%'  },
        { count: 88, suffix: '%', label: 'Automation',        trend: '✓ target' },
        { text: '3s',             label: 'Avg. response',     trend: '✓'     },
      ],
      section: 'Today\'s Vehicles',
      rows: [
        { name: '34 ABC 123', time: '09:00 · Oil Change',    badge: 'Confirmed', dot: 'dot-g', bg: 'bg-g' },
        { name: '06 XYZ 456', time: '11:00 · Brake Service', badge: 'Pending',   dot: 'dot-y', bg: 'bg-y' },
        { name: '35 DEF 789', time: '14:00 · Tire Change',   badge: 'Confirmed', dot: 'dot-g', bg: 'bg-g' },
      ]
    }
  },
  emlak: {
    greeting:    'Hello! 👋 Welcome. We\'re here to help you find your dream property!',
    buttons:     ['🏠 Schedule Viewing', '🔍 View Listings', '📞 Talk to Agent'],
    customerMsg: 'I\'d like info on a 3-bedroom apartment for sale',
    flowBadge:   '🏠 VIEWING FORM',
    flowCardTxt: 'Please open the form to schedule a viewing...',
    formTitle:   'Viewing Appointment',
    formSub:     'Choose your preferences and time',
    service:     '3-Bed Apartment — Kadıköy',
    dates:       [['Tue','17'],['Wed','18'],['Thu','19'],['Fri','20']],
    times:       ['11:00','14:00','16:00'],
    btn:         'Confirm Viewing ✓',
    dash: {
      stats: [
        { count: 22, suffix: '',  label: 'Today\'s messages', trend: '↑ 9%' },
        { count: 5,  suffix: '',  label: 'Viewings',          trend: '↑ 4%' },
        { count: 85, suffix: '%', label: 'Automation',        trend: '✓ target' },
        { text: '5s',             label: 'Avg. response',     trend: '✓'    },
      ],
      section: 'Today\'s Viewings',
      rows: [
        { name: 'Michael Brown',  time: '11:00 · 3-Bed Kadıköy',   badge: 'Confirmed', dot: 'dot-g', bg: 'bg-g' },
        { name: 'Jessica Miller', time: '14:00 · 2-Bed Beşiktaş',  badge: 'Confirmed', dot: 'dot-g', bg: 'bg-g' },
        { name: 'Daniel Clark',   time: '16:00 · Apt. Ataşehir',   badge: 'Pending',   dot: 'dot-y', bg: 'bg-y' },
      ]
    }
  }
};

/* ─── HERO PHONE ANIMATOR ───────────────────────────────── */
class HeroPhone {
  constructor() {
    this.screens       = Array.from(document.querySelectorAll('.pscreen'));
    this.dots          = Array.from(document.querySelectorAll('.pdot'));
    this.currentSector = 'klinik';
    this.current       = 0;
    window.heroPhone   = this;
    this.timers    = [];
    this.nextTimer = null; // tracked separately so switchSector can cancel it
    this.durations = [7000, 6500, 6500]; // ms each screen stays visible

    if (!this.screens.length) return;
    this.activate(0);
    this.schedule();

    // Sector tab switching
    document.querySelectorAll('.sector-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.sector-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.switchSector(tab.dataset.sector);
      });
    });
  }

  schedule() {
    const t = setTimeout(() => {
      this.next();
      this.schedule();
    }, this.durations[this.current]);
    this.timers.push(t);
  }

  next() {
    const nextIdx = (this.current + 1) % this.screens.length;
    const curr = this.screens[this.current];

    curr.classList.add('exiting');
    this.dots[this.current]?.classList.remove('active');

    this.nextTimer = setTimeout(() => {
      this.nextTimer = null;
      curr.classList.remove('active', 'exiting');
      this.current = nextIdx;
      this.activate(nextIdx);
    }, 450);
  }

  activate(idx) {
    const screen = this.screens[idx];
    this.restartAnims(screen);
    screen.classList.add('active');
    this.dots[idx]?.classList.add('active');

    // Screen-specific logic
    if (idx === 0) this.runChatSequence(screen);
    if (idx === 1) this.runFlowSequence(screen);
    if (idx === 2) this.runDashSequence(screen);
  }

  restartAnims(el) {
    el.querySelectorAll('[data-anim]').forEach(child => {
      child.classList.remove('show');
      child.style.animation = 'none';
      void child.offsetHeight; // force reflow
      child.style.animation  = '';
    });
    // Reset dashboard rows
    el.querySelectorAll('.dash-row').forEach(r => r.classList.remove('show'));
    // Reset chip selections to default
    el.querySelectorAll('.date-chip').forEach(c => c.classList.remove('sel'));
    // Remove glows
    el.querySelectorAll('.glow, .pulse').forEach(c => c.classList.remove('glow', 'pulse'));
    // Reset counters
    el.querySelectorAll('[data-count]').forEach(c => { c.textContent = '0'; });
    // Remove highlights
    el.querySelectorAll('.flow-val.hl').forEach(v => v.classList.remove('hl'));
  }

  after(ms, fn) {
    const t = setTimeout(fn, ms);
    this.timers.push(t);
    return t;
  }

  switchSector(key) {
    const isEn = window.currentLang === 'en';
    const d = (isEn ? SECTOR_DATA_EN : SECTOR_DATA)[key];
    if (!d) return;
    this.currentSector = key;

    // Cancel every pending timer including the untracked next() transition
    this.timers.forEach(clearTimeout);
    this.timers = [];
    if (this.nextTimer) { clearTimeout(this.nextTimer); this.nextTimer = null; }

    // ── Update pscreen-0 chat content ──
    const s0 = document.getElementById('pscreen-0');
    if (s0) {
      // First bot message: sector-specific greeting + buttons
      const firstMsg = s0.querySelector('.msg-i[data-anim]');
      if (firstMsg) {
        const btnsHtml = d.buttons
          .map(b => `<div class="msg-btn" data-anim>${b}</div>`)
          .join('');
        firstMsg.innerHTML = `${d.greeting}<div class="msg-btns">${btnsHtml}</div><div class="msg-t">09:41</div>`;
      }

      // Outgoing customer message
      const outMsg = s0.querySelector('.msg-o[data-anim]');
      if (outMsg) outMsg.innerHTML = `${d.customerMsg}<div class="msg-t">09:42 ✓✓</div>`;

      // Last bot message: flow card
      const flowMsgs = s0.querySelectorAll('.msg-i[data-anim]');
      const lastMsg  = flowMsgs[flowMsgs.length - 1];
      if (lastMsg && lastMsg !== firstMsg) {
        const openBtn = isEn ? 'Open Form →' : 'Formu Aç →';
        lastMsg.innerHTML = `<span style="color:#25D366;font-weight:700;font-size:9px;display:block;margin-bottom:4px">${d.flowBadge}</span>${d.flowCardTxt}<div style="background:#25D366;color:#fff;border-radius:6px;padding:5px;font-size:10px;font-weight:700;text-align:center;margin-top:6px">${openBtn}</div><div class="msg-t">09:42</div>`;
      }
    }

    // ── Update pscreen-1 flow form content ──
    const s1 = document.getElementById('pscreen-1');
    if (s1) {
      const barT = s1.querySelector('.flow-bar-t');
      if (barT) barT.textContent = d.buttons[0];

      const h1 = s1.querySelector('.flow-h1');
      if (h1) h1.textContent = d.formTitle;

      const sub = s1.querySelector('.flow-sub');
      if (sub) sub.textContent = d.formSub;

      const svc = s1.querySelector('.flow-val-svc');
      if (svc) svc.innerHTML = `${d.service} <span style="color:#999;font-size:9px">▼</span>`;

      const dateRows = s1.querySelectorAll('.date-row');
      if (dateRows[0]) {
        const chips = dateRows[0].querySelectorAll('.date-chip');
        d.dates.forEach((pair, i) => {
          if (chips[i]) chips[i].innerHTML = `${pair[0]}<br><b>${pair[1]}</b>`;
        });
      }
      if (dateRows[1]) {
        const chips = dateRows[1].querySelectorAll('.date-chip');
        d.times.forEach((t, i) => { if (chips[i]) chips[i].textContent = t; });
      }

      const btn = s1.querySelector('.flow-btn-gr');
      if (btn) btn.textContent = d.btn;
    }

    // ── Update pscreen-2 (dashboard) ──
    const s2 = document.getElementById('pscreen-2');
    if (s2 && d.dash) {
      const cards = s2.querySelectorAll('.dash-card');
      d.dash.stats.forEach((stat, i) => {
        const card = cards[i];
        if (!card) return;
        const val   = card.querySelector('.dash-val');
        const lbl   = card.querySelector('.dash-lbl');
        const trend = card.querySelector('.dash-trend');
        if (val) {
          if (stat.count !== undefined) {
            val.dataset.count = stat.count;
            if (stat.suffix !== undefined) val.dataset.suffix = stat.suffix;
            val.textContent = '0';
          } else {
            delete val.dataset.count;
            val.textContent = stat.text || '';
          }
        }
        if (lbl)   lbl.textContent   = stat.label;
        if (trend) trend.textContent = stat.trend;
      });

      const sec = s2.querySelector('.dash-sec');
      if (sec) sec.textContent = d.dash.section;

      const rows = s2.querySelectorAll('.dash-row');
      d.dash.rows.forEach((row, i) => {
        const el = rows[i];
        if (!el) return;
        const dot   = el.querySelector('.dash-dot');
        const name  = el.querySelector('.dash-rn');
        const time  = el.querySelector('.dash-rt');
        const badge = el.querySelector('.dash-badge');
        if (dot)   dot.className        = 'dash-dot ' + row.dot;
        if (name)  name.textContent     = row.name;
        if (time)  time.textContent     = row.time;
        if (badge) { badge.textContent  = row.badge; badge.className = 'dash-badge ' + row.bg; }
        el.classList.remove('show');
      });
    }

    // Reset and restart from screen 0 (chat)
    this.screens.forEach(s => s.classList.remove('active', 'exiting'));
    this.current = 0;
    this.activate(0);
    this.schedule();
  }

  showAnim(el) {
    if (!el) return;
    el.classList.add('show');
  }

  /* Chat screen sequence */
  runChatSequence(screen) {
    const items = screen.querySelectorAll('[data-anim]');
    const delays = [400, 1200, 1900, 2200, 3200, 4400];
    items.forEach((el, i) => {
      this.after(delays[i] ?? (300 + i * 600), () => this.showAnim(el));
    });
    // Pulse first button
    this.after(3100, () => {
      const btn = screen.querySelector('.msg-btn');
      if (btn) btn.classList.add('pulse');
    });
  }

  /* Flow form sequence */
  runFlowSequence(screen) {
    // Highlight name field
    this.after(800, () => {
      const name = screen.querySelector('.flow-val-name');
      if (name) name.classList.add('hl');
    });
    // Highlight service
    this.after(1700, () => {
      const svc = screen.querySelector('.flow-val-svc');
      if (svc) svc.classList.add('hl');
    });
    // Select date chip
    this.after(2600, () => {
      const chips = screen.querySelectorAll('.date-chip');
      chips.forEach(c => c.classList.remove('sel'));
      if (chips[1]) chips[1].classList.add('sel'); // "Çar 21"
    });
    // Select time chip
    this.after(3600, () => {
      const tChips = screen.querySelectorAll('.time-chip');
      tChips.forEach(c => c.classList.remove('sel'));
      if (tChips[1]) tChips[1].classList.add('sel'); // "11:30"
    });
    // Pulse submit button
    this.after(4700, () => {
      const btn = screen.querySelector('.flow-btn-gr');
      if (btn) btn.classList.add('glow');
    });
  }

  /* Dashboard sequence */
  runDashSequence(screen) {
    // Count up numbers
    this.after(300, () => {
      screen.querySelectorAll('[data-count]').forEach(el => {
        this.countUp(el, parseInt(el.dataset.count), 1800);
      });
    });
    // Show rows with stagger
    const rows = screen.querySelectorAll('.dash-row');
    rows.forEach((row, i) => {
      this.after(1800 + i * 700, () => row.classList.add('show'));
    });
  }

  countUp(el, target, duration) {
    const suffix = el.dataset.suffix || '';
    if (prefersReducedMotion) { el.textContent = target + suffix; return; }
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}


/* ─── FADE UP ────────────────────────────────────────────── */
function initFadeUp() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fu').forEach(el => obs.observe(el));
}

/* ─── CONTACT FORM ───────────────────────────────────────── */
window.handleSubmit = async function(e) {
  e.preventDefault();
  const form = e.target;
  const fd   = new FormData(form);

  const w3fd = new FormData();
  w3fd.append('access_key', '71af3b49-80a6-4864-a8ec-c227be023cb7');
  w3fd.append('to_email',   'hello@qavio.nl');
  w3fd.append('subject',    `Yeni Demo Talebi — ${fd.get('name')}`);
  w3fd.append('from_name',  'Qavio Website');
  w3fd.append('name',       fd.get('name')    || '');
  w3fd.append('phone',      fd.get('phone')   || '');
  w3fd.append('email',      fd.get('email')   || '');
  w3fd.append('sector',     fd.get('sector')  || '');
  w3fd.append('message',    fd.get('message') || '');
  fetch('https://api.web3forms.com/submit', { method: 'POST', body: w3fd })
    .catch(() => {});

  document.getElementById('cform').style.display     = 'none';
  document.getElementById('f-success').style.display = 'block';
};

/* ─── SMOOTH SCROLL ──────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ─── HERO SCROLL EXIT ───────────────────────────────────── */
function initHeroScroll() {
  if (prefersReducedMotion) return;
  const hero = document.getElementById('hero');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const p = Math.min(window.scrollY / (hero.offsetHeight * 0.6), 1);
    if (p > 0) {
      hero.style.transform = `scale(${1 - p * 0.05})`;
      hero.style.opacity   = `${1 - p * 0.25}`;
    } else {
      hero.style.transform = '';
      hero.style.opacity   = '';
    }
  }, { passive: true });
}


/* ─── GEO PRICING ────────────────────────────────────────── */
const geoState = { isTurkey: false, rate: null };

const USD_MONTHLY  = [19,  49,  129];
const USD_YEARLY   = [15,  39,   99];
const USD_YR_TOTAL = [149, 389, 990];
const USD_YR_SAVE  = [79,  199, 558];

function fmtTL(usd) {
  const raw  = usd * geoState.rate;
  const step = raw >= 1000 ? 100 : 10;
  return '₺' + (Math.ceil(raw / step) * step).toLocaleString('tr-TR');
}

function applyGeoPrice() {
  if (!geoState.isTurkey || !geoState.rate) return;

  const isYearly = document.getElementById('tog-yearly')?.classList.contains('active');

  document.querySelectorAll('.js-price').forEach((el, i) => {
    el.dataset.monthly = fmtTL(USD_MONTHLY[i]);
    el.dataset.yearly  = fmtTL(USD_YEARLY[i]);
    el.textContent = isYearly ? el.dataset.yearly : el.dataset.monthly;
  });

  document.querySelectorAll('.js-yearly-note').forEach((el, i) => {
    el.textContent = fmtTL(USD_YR_TOTAL[i]) + '/yıl · ' + fmtTL(USD_YR_SAVE[i]) + ' tasarruf';
  });

  document.querySelectorAll('[data-i18n="plan-per"]').forEach(el => {
    el.textContent = '/ay';
  });
}

async function initGeoPrice() {
  try {
    const geo  = await fetch('https://ipapi.co/json/').then(r => r.json());
    if (geo.country_code !== 'TR') return;

    const data = await fetch('https://open.er-api.com/v6/latest/USD').then(r => r.json());
    geoState.isTurkey = true;
    geoState.rate     = data.rates.TRY;
    applyGeoPrice();
  } catch (_) { /* kur çekilemezse USD kalır */ }
}

/* ─── PRICE TOGGLE ───────────────────────────────────────── */
function initPriceToggle() {
  const togMonthly = document.getElementById('tog-monthly');
  const togYearly  = document.getElementById('tog-yearly');
  if (!togMonthly || !togYearly) return;

  function setMode(mode) {
    const yearly = mode === 'yearly';
    togMonthly.classList.toggle('active', !yearly);
    togYearly.classList.toggle('active', yearly);
    document.querySelectorAll('.js-price').forEach(el => {
      el.textContent = yearly ? el.dataset.yearly : el.dataset.monthly;
    });
    document.querySelectorAll('.js-yearly-note').forEach(el => {
      el.classList.toggle('show', yearly);
    });
  }

  togMonthly.addEventListener('click', () => setMode('monthly'));
  togYearly.addEventListener('click', () => setMode('yearly'));
}

/* ─── INIT ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  new HeroPhone();
  initFadeUp();
  initSmoothScroll();
  initHeroScroll();
  initPriceToggle();
  initGeoPrice();
  document.querySelectorAll('.channel[href*="wa.me"]').forEach(a => {
    a.href = `https://wa.me/${WA_NUMBER}`;
  });
});
