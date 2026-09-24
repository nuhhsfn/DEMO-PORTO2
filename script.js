/**
 * PORTFOLIO NUH HASIF IFTIHAR — SMK TELKOM LAMPUNG (RPL)
 * Interactive Script Logic & Features
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCustomCursor();
  initAmbientParticles();
  initNavbarAndScroll();
  initTypingEffect();
  initCounterStats();
  initHeroTilt();
  initHeroFireEmbers();
  initHeroAirplaneFlight();
  initLofiAudioPlayer();
  initFilters();
  initProjectModals();
  initDeepSeaGame();
  initFaqAccordion();
  initContactForm();
  initScrollReveal();
});

/* ================= 1. PRELOADER COUNTDOWN ================= */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const percentEl = document.getElementById('preloader-percent');
  const barEl = document.getElementById('preloader-bar');
  
  if (!preloader || !percentEl || !barEl) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 3;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      percentEl.textContent = '100%';
      barEl.style.width = '100%';
      
      setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.style.overflow = 'auto';
      }, 400);
    } else {
      percentEl.textContent = `${progress}%`;
      barEl.style.width = `${progress}%`;
    }
  }, 45);
}

/* ================= 2. CUSTOM GLOW CURSOR ================= */
function initCustomCursor() {
  const cursorDot = document.getElementById('cursor-dot');
  const cursorTrail = document.getElementById('cursor-trail');
  if (!cursorDot || !cursorTrail) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let trailX = mouseX;
  let trailY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  });

  function renderTrail() {
    trailX += (mouseX - trailX) * 0.18;
    trailY += (mouseY - trailY) * 0.18;
    cursorTrail.style.left = `${trailX}px`;
    cursorTrail.style.top = `${trailY}px`;
    requestAnimationFrame(renderTrail);
  }
  requestAnimationFrame(renderTrail);

  // Hover expansion on interactive elements
  const hoverables = document.querySelectorAll('a, button, input, textarea, .glass-card-premium');
  hoverables.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursorTrail.style.transform = 'translate(-50%, -50%) scale(1.6)';
      cursorTrail.style.borderColor = '#00f0ff';
      cursorTrail.style.background = 'rgba(0, 240, 255, 0.15)';
    });
    el.addEventListener('mouseleave', () => {
      cursorTrail.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorTrail.style.borderColor = 'rgba(0, 240, 255, 0.4)';
      cursorTrail.style.background = 'rgba(0, 240, 255, 0.05)';
    });
  });
}

/* ================= 3. AMBIENT PARTICLES (BUBBLES & PLANKTON) ================= */
function initAmbientParticles() {
  const bubblesLayer = document.getElementById('bubbles-layer');
  const planktonLayer = document.getElementById('plankton-layer');
  const preloaderBubbles = document.querySelector('.preloader-bubbles');

  // Spawn Background Bubbles
  if (bubblesLayer) {
    for (let i = 0; i < 16; i++) {
      createBubble(bubblesLayer);
    }
  }

  if (preloaderBubbles) {
    for (let i = 0; i < 10; i++) {
      createBubble(preloaderBubbles);
    }
  }

  function createBubble(container) {
    const bubble = document.createElement('span');
    bubble.className = 'bubble-item';
    const size = Math.random() * 16 + 6;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${Math.random() * 10 + 8}s`;
    bubble.style.animationDelay = `${Math.random() * 6}s`;
    container.appendChild(bubble);
  }

  // Spawn Plankton Glowing Dots
  if (planktonLayer) {
    for (let i = 0; i < 24; i++) {
      const plankton = document.createElement('span');
      plankton.className = 'plankton-dot';
      const size = Math.random() * 4 + 2;
      plankton.style.width = `${size}px`;
      plankton.style.height = `${size}px`;
      plankton.style.left = `${Math.random() * 100}%`;
      plankton.style.top = `${Math.random() * 100}%`;
      plankton.style.animationDuration = `${Math.random() * 4 + 3}s`;
      plankton.style.animationDelay = `${Math.random() * 3}s`;
      planktonLayer.appendChild(plankton);
    }
  }
}

/* ================= 4. NAVBAR & SCROLL PROGRESS ================= */
function initNavbarAndScroll() {
  const header = document.getElementById('header');
  const scrollProgress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerOverlay = document.getElementById('mobile-drawer-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    
    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }

    if (scrollTop > 50) {
      header?.classList.add('scrolled');
      backToTop?.classList.add('visible');
    } else {
      header?.classList.remove('scrolled');
      backToTop?.classList.remove('visible');
    }

    // Active Section Spy
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Drawer Toggle
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  const closeDrawer = () => {
    mobileDrawer?.classList.remove('open');
    document.body.style.overflow = 'auto';
  };

  drawerClose?.addEventListener('click', closeDrawer);
  drawerOverlay?.addEventListener('click', closeDrawer);
  mobileLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // Back to Top Click
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ================= 5. TYPING EFFECT ================= */
function initTypingEffect() {
  const typingTarget = document.getElementById('typing-text');
  if (!typingTarget) return;

  const roles = [
    'Web Developer',
    'Front-End Specialist',
    'Siswa RPL SMK Telkom',
    'UI/UX Enthusiast',
    'PHP & JavaScript Coder'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentRole = roles[roleIdx];
    
    if (isDeleting) {
      typingTarget.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 50;
    } else {
      typingTarget.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 110;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      isDeleting = true;
      typeSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ================= 6. ANIMATED COUNTER STATS ================= */
function initCounterStats() {
  const counterEls = document.querySelectorAll('.counter-val');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counterEls.forEach((el) => {
          const target = parseInt(el.getAttribute('data-target'), 10) || 0;
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 40));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              el.textContent = target;
              clearInterval(interval);
            } else {
              el.textContent = current;
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsGrid = document.querySelector('.hero-stats-grid');
  if (statsGrid) observer.observe(statsGrid);
}

/* ================= 7. 3D HERO PROFILE TILT ================= */
function initHeroTilt() {
  const cardWrapper = document.getElementById('hero-tilt-card');
  const card = cardWrapper?.querySelector('.hero-profile-card');
  const glare = cardWrapper?.querySelector('.card-glare-overlay');

  if (!cardWrapper || !card) return;

  cardWrapper.addEventListener('mousemove', (e) => {
    const rect = cardWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(0, 240, 255, 0.45) 0%, transparent 65%)`;
    }
  });

  cardWrapper.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    if (glare) {
      glare.style.background = 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.25) 0%, transparent 70%)';
    }
  });
}

/* ================= 8. LO-FI WEB AUDIO SYNTHESIZER ================= */
function initLofiAudioPlayer() {
  const playBtn = document.getElementById('lofi-play');
  const playIcon = document.getElementById('lofi-play-icon');
  const prevBtn = document.getElementById('lofi-prev');
  const nextBtn = document.getElementById('lofi-next');
  const playerCard = document.getElementById('lofi-player');
  const discIcon = document.getElementById('lofi-disc');
  const titleEl = document.getElementById('lofi-title');
  const artistEl = document.getElementById('lofi-artist');
  const trackIndicator = document.getElementById('track-indicator');
  const statusEl = document.getElementById('lofi-status');
  const progressFill = document.getElementById('lofi-progress-fill');
  const progressBar = document.getElementById('lofi-progress-bar');
  const currentTimeEl = document.getElementById('lofi-current-time');
  const durationEl = document.getElementById('lofi-duration');

  const tracks = [
    { title: 'SMK Telkom Late Night Coding', artist: 'Ambient Chill • Nuh Hasif', duration: 90, chords: [261.63, 329.63, 392.00, 493.88] }, // C Maj7
    { title: 'Deep Sea Cyber Chill', artist: 'Ocean Vibe • Synthwave', duration: 110, chords: [220.00, 261.63, 329.63, 392.00] }, // A min7
    { title: 'Lampung Shore Sunset Lo-Fi', artist: 'Acoustic Calm • Relaxing', duration: 80, chords: [174.61, 220.00, 261.63, 329.63] } // F Maj7
  ];

  let currentTrackIdx = 0;
  let isPlaying = false;
  let audioCtx = null;
  let synthInterval = null;
  let progressTimer = null;
  let currentSeconds = 0;

  function updateTrackUI() {
    const track = tracks[currentTrackIdx];
    if (titleEl) titleEl.textContent = track.title;
    if (artistEl) artistEl.textContent = track.artist;
    if (trackIndicator) trackIndicator.textContent = `${currentTrackIdx + 1}/${tracks.length}`;
    if (durationEl) durationEl.textContent = formatTime(track.duration);
    currentSeconds = 0;
    updateProgressUI();
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function updateProgressUI() {
    const track = tracks[currentTrackIdx];
    const pct = (currentSeconds / track.duration) * 100;
    if (progressFill) progressFill.style.width = `${pct}%`;
    if (currentTimeEl) currentTimeEl.textContent = formatTime(currentSeconds);
  }

  function playSynthNote() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const track = tracks[currentTrackIdx];
    const chordNotes = track.chords;
    const baseFreq = chordNotes[Math.floor(Math.random() * chordNotes.length)];
    const freq = baseFreq * (Math.random() > 0.6 ? 2 : 1);

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Warm low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, audioCtx.currentTime);

    // Soft Attack & Decay
    const now = audioCtx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 2.4);
  }

  function startPlayback() {
    isPlaying = true;
    playerCard?.classList.add('playing');
    discIcon?.classList.add('playing');
    if (playIcon) playIcon.className = 'fa-solid fa-pause';
    if (statusEl) statusEl.textContent = 'Memutar Lo-Fi...';

    playSynthNote();
    synthInterval = setInterval(playSynthNote, 1400);

    progressTimer = setInterval(() => {
      currentSeconds++;
      const track = tracks[currentTrackIdx];
      if (currentSeconds >= track.duration) {
        nextTrack();
      } else {
        updateProgressUI();
      }
    }, 1000);
  }

  function stopPlayback() {
    isPlaying = false;
    playerCard?.classList.remove('playing');
    discIcon?.classList.remove('playing');
    if (playIcon) playIcon.className = 'fa-solid fa-play';
    if (statusEl) statusEl.textContent = 'Lo-Fi Dijeda';

    clearInterval(synthInterval);
    clearInterval(progressTimer);
  }

  function togglePlay() {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  }

  function nextTrack() {
    stopPlayback();
    currentTrackIdx = (currentTrackIdx + 1) % tracks.length;
    updateTrackUI();
    startPlayback();
  }

  function prevTrack() {
    stopPlayback();
    currentTrackIdx = (currentTrackIdx - 1 + tracks.length) % tracks.length;
    updateTrackUI();
    startPlayback();
  }

  playBtn?.addEventListener('click', togglePlay);
  nextBtn?.addEventListener('click', nextTrack);
  prevBtn?.addEventListener('click', prevTrack);

  progressBar?.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const track = tracks[currentTrackIdx];
    currentSeconds = Math.floor(pos * track.duration);
    updateProgressUI();
  });

  updateTrackUI();
}

/* ================= 9. FILTER TABS (SKILLS & PROJECTS) ================= */
function initFilters() {
  // Skill Filters
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      skillCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project Filters
  const projectTabs = document.querySelectorAll('.project-tab');
  const projectCards = document.querySelectorAll('.project-card');

  projectTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      projectTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      projectCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ================= 10. PROJECT DETAIL MODAL ================= */
function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const closeBtn = document.getElementById('modal-close');
  const contentArea = document.getElementById('modal-content-area');
  const viewBtns = document.querySelectorAll('.view-detail-btn');

  const projectDetails = {
    telkomedu: {
      title: 'TelkomEdu — LMS & Presensi Siswa RPL SMK Telkom',
      category: 'SMK TELKOM LAMPUNG • WEB APPLICATION',
      image: 'assets/project_telkomedu.jpg',
      tags: ['PHP', 'MySQL', 'JavaScript', 'Tailwind CSS', 'Chart.js'],
      desc: 'Sistem Manajemen Pembelajaran (LMS) komprehensif yang dirancang untuk mendukung kegiatan belajar mengajar produktif di jurusan Rekayasa Perangkat Lunak (RPL) SMK Telkom Lampung.',
      features: [
        'Dashboard terpadu siswa & guru dengan visualisasi progres materi',
        'Pengumpulan tugas koding online dengan validasi batas waktu otomatis',
        'Sistem presensi / absensi digital berbasis tanggal dan sesi lab',
        'Manajemen modul pembelajaran dan bank soal ujian online'
      ],
      role: 'Full-Stack Developer (UI Design, Database Relational, & Front-End Slicing)'
    },
    umkm: {
      title: 'Katalog Digital UMKM Kerajinan & Kopi Lampung',
      category: 'E-COMMERCE & LOCAL SHOWCASE',
      image: 'assets/project_umkm.jpg',
      tags: ['HTML5', 'CSS3 Glassmorphism', 'Vanilla JS', 'WhatsApp API'],
      desc: 'Website e-commerce interaktif untuk memperluas jangkauan pasar perajin lokal Kain Tapis dan petani Kopi Robusta Lampung dengan pengalaman belanja yang elegan.',
      features: [
        'Katalog produk interaktif dengan filter kategori & pencarian cepat',
        'Keranjang belanja (Shopping Cart) dinamis dengan penyimpanan localStorage',
        'Fitur Direct-to-WhatsApp Checkout dengan pesan format otomatis',
        'Tampilan modern berestetika Deep Sea yang memanjakan mata'
      ],
      role: 'Front-End Developer & UI Designer'
    },
    labrpl: {
      title: 'Sistem Inventaris Lab Komputer RPL Telkom',
      category: 'SISTEM INFORMASI SEKOLAH',
      image: 'assets/project_lab_rpl.jpg',
      tags: ['PHP Native', 'MySQL', 'Bootstrap 5', 'DataTables'],
      desc: 'Aplikasi berbasis web untuk mendata perangkat PC, server, laptop, dan peripheral di laboratorium jurusan Rekayasa Perangkat Lunak SMK Telkom Lampung.',
      features: [
        'Manajemen data perangkat (CRUD) dengan status kondisi real-time',
        'Sistem peminjaman dan reservasi ruang lab untuk praktikum',
        'Pencatatan riwayat kerusakan perangkat & tiket perbaikan teknisi',
        'Cetak laporan inventaris berkala ke format PDF / Excel'
      ],
      role: 'Back-End & Database Architect'
    },
    tourism: {
      title: 'Explore Lampung — Portal Wisata Bahari & Budaya',
      category: 'LANDING PAGE & TOURISM',
      image: 'assets/project_tourism.jpg',
      tags: ['Modern CSS', 'Glassmorphism', 'JavaScript Animation'],
      desc: 'Website promosi pariwisata yang menampilkan pesona alam Lampung, seperti Pulau Pahawang, Teluk Kiluan, dan Gunung Anak Krakatau.',
      features: [
        'Hero section cinematic dengan video ambient dan parallax effect',
        'Widget estimasi paket perjalanan dan booking tur interaktif',
        'Galeri foto destinasi dengan modal lightbox beresolusi tinggi',
        'Panduan rute dan tips wisata ramah wisatawan'
      ],
      role: 'Front-End Web Designer'
    }
  };

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data || !contentArea) return;

    contentArea.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="modal-hero-img" />
      <div class="modal-category">${data.category}</div>
      <h3 class="modal-title font-display">${data.title}</h3>
      <div class="project-tags" style="margin-bottom: 1rem;">
        ${data.tags.map(t => `<span class="ptag">${t}</span>`).join('')}
      </div>
      <p class="modal-text">${data.desc}</p>
      
      <h4 class="modal-section-title font-mono">Fitur Utama:</h4>
      <ul class="modal-feature-list">
        ${data.features.map(f => `<li><i class="fa-solid fa-circle-check text-cyan"></i> <span>${f}</span></li>`).join('')}
      </ul>

      <h4 class="modal-section-title font-mono">Peran dalam Proyek:</h4>
      <p class="modal-text font-semibold text-white">${data.role}</p>

      <div class="modal-action-row">
        <a href="#kontak" class="btn-tide btn-sm modal-cta-btn">
          <i class="fa-solid fa-comment-dots"></i> Tanya Seputar Proyek
        </a>
        <button class="btn-ghost-tide btn-sm modal-dismiss-btn">
          Tutup
        </button>
      </div>
    `;

    modal?.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Hook internal modal close button
    contentArea.querySelector('.modal-dismiss-btn')?.addEventListener('click', closeModal);
    contentArea.querySelector('.modal-cta-btn')?.addEventListener('click', closeModal);
  }

  function closeModal() {
    modal?.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  viewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pId = btn.getAttribute('data-project');
      if (pId) openModal(pId);
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);
}

/* ================= 11. DEEP SEA DIVER CANVAS MINI-GAME ================= */
function initDeepSeaGame() {
  const canvas = document.getElementById('deep-sea-canvas');
  const overlay = document.getElementById('game-overlay');
  const startBtn = document.getElementById('game-start-btn');
  const scoreEl = document.getElementById('game-score');
  const highscoreEl = document.getElementById('game-highscore');
  const livesEl = document.getElementById('game-lives');
  const overlayTitle = document.getElementById('overlay-title');
  const overlayDesc = document.getElementById('overlay-desc');

  if (!canvas || !startBtn) return;
  const ctx = canvas.getContext('2d');

  let score = 0;
  let lives = 3;
  let highscore = parseInt(localStorage.getItem('nuh_porto_game_highscore') || '0', 10);
  if (highscoreEl) highscoreEl.textContent = highscore;

  let gameRunning = false;
  let animId = null;

  // Submarine Player
  const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 65,
    width: 55,
    height: 30,
    speed: 7,
    dx: 0
  };

  // Falling Items (Crystals & Torpedoes)
  let items = [];
  let itemSpawnTimer = 0;

  const itemTypes = [
    { label: 'HTML', color: '#fb923c', type: 'code', points: 10, radius: 14 },
    { label: 'CSS', color: '#38bdf8', type: 'code', points: 10, radius: 14 },
    { label: 'JS', color: '#facc15', type: 'code', points: 15, radius: 14 },
    { label: 'PHP', color: '#818cf8', type: 'code', points: 15, radius: 14 },
    { label: 'RPL', color: '#00f0ff', type: 'gem', points: 30, radius: 16 },
    { label: '💣', color: '#f87171', type: 'bomb', points: -1, radius: 15 }
  ];

  // Mouse & Touch Controls
  canvas.addEventListener('mousemove', (e) => {
    if (!gameRunning) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const mouseX = (e.clientX - rect.left) * scaleX;
    player.x = Math.max(0, Math.min(canvas.width - player.width, mouseX - player.width / 2));
  });

  canvas.addEventListener('touchmove', (e) => {
    if (!gameRunning) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const touchX = (e.touches[0].clientX - rect.left) * scaleX;
    player.x = Math.max(0, Math.min(canvas.width - player.width, touchX - player.width / 2));
    e.preventDefault();
  }, { passive: false });

  // Keyboard Controls
  const keys = {};
  window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
  });
  window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
  });

  function resetGame() {
    score = 0;
    lives = 3;
    items = [];
    player.x = canvas.width / 2 - player.width / 2;
    if (scoreEl) scoreEl.textContent = '0';
    if (livesEl) livesEl.textContent = '❤️❤️❤️';
  }

  function spawnItem() {
    const isBomb = Math.random() < 0.35;
    let selected;
    if (isBomb) {
      selected = itemTypes.find(t => t.type === 'bomb');
    } else {
      const codeGems = itemTypes.filter(t => t.type !== 'bomb');
      selected = codeGems[Math.floor(Math.random() * codeGems.length)];
    }

    items.push({
      ...selected,
      x: Math.random() * (canvas.width - 40) + 20,
      y: -20,
      speed: Math.random() * 2 + 2.5 + Math.min(score * 0.03, 4)
    });
  }

  function updateGame() {
    if (!gameRunning) return;

    // Keyboard movement
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
      player.x = Math.max(0, player.x - player.speed);
    }
    if (keys['ArrowRight'] || keys['d'] || keys['D']) {
      player.x = Math.min(canvas.width - player.width, player.x + player.speed);
    }

    // Spawn timer
    itemSpawnTimer++;
    if (itemSpawnTimer > 35) {
      spawnItem();
      itemSpawnTimer = 0;
    }

    // Update items
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      item.y += item.speed;

      // Collision with submarine player
      if (
        item.x > player.x - 10 &&
        item.x < player.x + player.width + 10 &&
        item.y > player.y - 10 &&
        item.y < player.y + player.height
      ) {
        if (item.type === 'bomb') {
          lives--;
          if (livesEl) livesEl.textContent = '❤️'.repeat(Math.max(0, lives));
          if (lives <= 0) {
            gameOver();
            return;
          }
        } else {
          score += item.points;
          if (scoreEl) scoreEl.textContent = score;
          if (score > highscore) {
            highscore = score;
            if (highscoreEl) highscoreEl.textContent = highscore;
            localStorage.setItem('nuh_porto_game_highscore', highscore.toString());
          }
        }
        items.splice(i, 1);
        continue;
      }

      // Remove off-screen items
      if (item.y > canvas.height + 30) {
        items.splice(i, 1);
      }
    }

    drawGame();
    animId = requestAnimationFrame(updateGame);
  }

  function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Underwater background grid effect
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Draw Submarine Player
    drawSubmarine(player.x, player.y, player.width, player.height);

    // Draw Falling Items
    items.forEach((item) => {
      ctx.save();
      ctx.shadowBlur = 12;
      ctx.shadowColor = item.color;
      
      // Item circle / bubble
      ctx.fillStyle = 'rgba(7, 14, 26, 0.8)';
      ctx.strokeStyle = item.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Item label
      ctx.fillStyle = item.color;
      ctx.font = 'bold 11px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(item.label, item.x, item.y);

      ctx.restore();
    });
  }

  function drawSubmarine(x, y, w, h) {
    ctx.save();
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#00f0ff';

    // Submarine Body
    ctx.fillStyle = '#0e2a47';
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Periscope Tower
    ctx.fillStyle = '#00f0ff';
    ctx.fillRect(x + w / 2 - 4, y - 8, 8, 10);

    // Porthole Window
    ctx.fillStyle = '#00f0ff';
    ctx.beginPath();
    ctx.arc(x + w / 2, y + h / 2, 6, 0, Math.PI * 2);
    ctx.fill();

    // Propeller
    ctx.fillStyle = '#facc15';
    ctx.fillRect(x - 5, y + h / 2 - 6, 4, 12);

    ctx.restore();
  }

  function startGame() {
    resetGame();
    gameRunning = true;
    overlay?.classList.add('hidden');
    updateGame();
  }

  function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(animId);
    if (overlayTitle) overlayTitle.textContent = 'GAME OVER!';
    if (overlayDesc) overlayDesc.textContent = `Penyelaman selesai! Skor Anda: ${score} | Highscore: ${highscore}`;
    if (startBtn) startBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Main Lagi';
    overlay?.classList.remove('hidden');
  }

  startBtn.addEventListener('click', startGame);
  drawGame();
}

/* ================= 12. FAQ ACCORDION ================= */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    questionBtn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Close all other items
      faqItems.forEach((other) => {
        other.classList.remove('active');
        const otherAns = other.querySelector('.faq-answer');
        if (otherAns) otherAns.style.maxHeight = '0';
        other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen && answer) {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = `${answer.scrollHeight + 30}px`;
      }
    });
  });
}

/* ================= 13. CONTACT FORM WITH WHATSAPP LINK ================= */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const toast = document.getElementById('toast-box');
  const toastText = document.getElementById('toast-text');

  function showToast(msg) {
    if (!toast || !toastText) return;
    toastText.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('sender-name')?.value.trim();
    const contact = document.getElementById('sender-email')?.value.trim();
    const subject = document.getElementById('sender-subject')?.value.trim() || 'Pesan Portofolio';
    const message = document.getElementById('sender-message')?.value.trim();

    if (!name || !contact || !message) {
      showToast('Harap lengkapi semua kolom bertanda *!');
      return;
    }

    // Format WhatsApp Redirect Message
    const textMsg = encodeURIComponent(
      `*Pesan Baru dari Web Portofolio*\n\n` +
      `*Nama:* ${name}\n` +
      `*Kontak/Email:* ${contact}\n` +
      `*Subjek:* ${subject}\n\n` +
      `*Pesan:*\n${message}`
    );

    showToast('Mengarahkan pesan ke WhatsApp...');

    setTimeout(() => {
      window.open(`https://wa.me/6281234567890?text=${textMsg}`, '_blank');
      form.reset();
    }, 1000);
  });
}

/* ================= 14. SCROLL REVEAL OBSERVER ================= */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ================= 15. HERO FIRE FLAME EMBERS ENGINE ================= */
function initHeroFireEmbers() {
  const canvas = document.getElementById('fire-embers-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let particles = [];
  const maxParticles = 45;

  const colors = [
    '#ffffff', // Core spark white
    '#fff07a', // Bright yellow
    '#ffaa00', // Fiery amber
    '#ff5500', // Flaming orange
    '#ff2200', // Deep red flame
    '#00f0ff'  // Oceanic plasma flame accent
  ];

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = canvas.width = rect.width * (window.devicePixelRatio || 1);
    height = canvas.height = rect.height * (window.devicePixelRatio || 1);
    ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }

  resize();
  window.addEventListener('resize', resize);

  class EmberParticle {
    constructor(isBurst = false, burstX = null, burstY = null) {
      this.reset(isBurst, burstX, burstY);
    }

    reset(isBurst = false, burstX = null, burstY = null) {
      const displayW = canvas.offsetWidth || 400;
      const displayH = canvas.offsetHeight || 500;

      if (isBurst && burstX !== null && burstY !== null) {
        this.x = burstX + (Math.random() - 0.5) * 40;
        this.y = burstY + (Math.random() - 0.5) * 40;
        this.vx = (Math.random() - 0.5) * 2.5;
        this.vy = -(Math.random() * 3.5 + 1.5);
        this.life = 0;
        this.maxLife = Math.random() * 45 + 30;
      } else {
        // Spawn along the bottom & lower flanks of the photo card
        const spawnSide = Math.random();
        if (spawnSide < 0.7) {
          // Bottom area
          this.x = displayW * 0.15 + Math.random() * (displayW * 0.7);
          this.y = displayH * 0.85 + Math.random() * (displayH * 0.15);
        } else if (spawnSide < 0.85) {
          // Left flank
          this.x = displayW * 0.1 + Math.random() * 25;
          this.y = displayH * 0.4 + Math.random() * (displayH * 0.5);
        } else {
          // Right flank
          this.x = displayW * 0.85 + Math.random() * 25;
          this.y = displayH * 0.4 + Math.random() * (displayH * 0.5);
        }

        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = -(Math.random() * 1.8 + 0.8);
        this.life = 0;
        this.maxLife = Math.random() * 70 + 50;
      }

      this.radius = Math.random() * 2.2 + 1.0;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.baseOpacity = Math.random() * 0.6 + 0.4;
      this.swaySpeed = Math.random() * 0.08 + 0.03;
      this.swayAmp = Math.random() * 1.2 + 0.5;
      this.angle = Math.random() * Math.PI * 2;
    }

    update() {
      this.life++;
      this.angle += this.swaySpeed;
      this.x += this.vx + Math.sin(this.angle) * this.swayAmp * 0.35;
      this.y += this.vy;

      // Slight shrinkage as ember burns out
      if (this.radius > 0.4) {
        this.radius -= 0.012;
      }

      if (this.life >= this.maxLife || this.y < -10) {
        this.reset();
      }
    }

    draw(context) {
      const progress = this.life / this.maxLife;
      const alpha = this.baseOpacity * (1 - progress);

      context.save();
      context.globalAlpha = Math.max(0, Math.min(1, alpha));
      context.fillStyle = this.color;
      context.shadowColor = this.color;
      context.shadowBlur = this.radius * 3.5;

      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }
  }

  // Populate initial embers
  for (let i = 0; i < maxParticles; i++) {
    const p = new EmberParticle();
    // Stagger initial progress
    p.life = Math.floor(Math.random() * p.maxLife);
    p.y -= Math.random() * 180;
    particles.push(p);
  }

  // Card interaction - Ember flare on mouse movement
  const cardWrapper = document.getElementById('hero-tilt-card');
  if (cardWrapper) {
    cardWrapper.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      if (particles.length < maxParticles + 25) {
        for (let j = 0; j < 3; j++) {
          particles.push(new EmberParticle(true, mx, my));
        }
      }
    });

    cardWrapper.addEventListener('mouseenter', () => {
      for (let j = 0; j < 12; j++) {
        const displayW = canvas.offsetWidth || 400;
        const displayH = canvas.offsetHeight || 500;
        particles.push(new EmberParticle(true, displayW * 0.5, displayH * 0.8));
      }
    });
  }

  // Animation Loop
  function renderEmbers() {
    const displayW = canvas.offsetWidth || 400;
    const displayH = canvas.offsetHeight || 500;
    ctx.clearRect(0, 0, displayW, displayH);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);

      // Remove excess burst particles when expired
      if (particles.length > maxParticles && p.life >= p.maxLife) {
        particles.splice(i, 1);
      }
    }

    requestAnimationFrame(renderEmbers);
  }

  requestAnimationFrame(renderEmbers);
}

/* ================= 16. HERO AIRPLANE FLIGHT & RADAR SYSTEM ================= */
function initHeroAirplaneFlight() {
  const airplane = document.getElementById('hero-airplane');
  const radarBtn = document.getElementById('flight-radar-btn');
  if (!airplane && !radarBtn) return;

  const flightStatusEl = radarBtn?.querySelector('.flight-status');
  const flightCodeEl = radarBtn?.querySelector('.flight-code');
  let isSupersonic = false;

  // Web Audio Synth for Jet Sound Effect (Gentle whoosh)
  function playJetFlybySound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      // Buffer noise source for jet turbine rush
      const bufferSize = ctx.sampleRate * 2.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.25;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter to simulate turbine rushing wind
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 1.2);
      filter.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 2.5);
      filter.Q.value = 3.0;

      // Gain Envelope
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.0);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 2.5);
    } catch (err) {
      // Audio context policy safe fallback
    }
  }

  function triggerSupersonicFlight() {
    if (isSupersonic || !airplane) return;
    isSupersonic = true;

    // Trigger Jet Engine Sound
    playJetFlybySound();

    // Restart animation with supersonic speed
    airplane.classList.remove('supersonic-flyby');
    void airplane.offsetWidth; // Force reflow
    airplane.classList.add('supersonic-flyby');

    if (flightStatusEl) {
      flightStatusEl.textContent = 'SUPERSONIC • MACH 2.5 🔥';
      flightStatusEl.style.color = '#ffaa00';
    }
    if (flightCodeEl) {
      flightCodeEl.textContent = 'FLIGHT NHI-SPEED';
    }
    if (radarBtn) {
      radarBtn.style.borderColor = '#ffaa00';
      radarBtn.style.boxShadow = '0 0 35px rgba(255, 170, 0, 0.6)';
    }

    if (typeof showToast === 'function') {
      showToast('✈️ Pesawat supersonik NHI meluncur di atas langit hero!');
    }

    setTimeout(() => {
      airplane.classList.remove('supersonic-flyby');
      isSupersonic = false;
      if (flightStatusEl) {
        flightStatusEl.textContent = 'AIRBORNE • FL380';
        flightStatusEl.style.color = 'var(--primary)';
      }
      if (flightCodeEl) {
        flightCodeEl.textContent = 'FLIGHT NHI-777';
      }
      if (radarBtn) {
        radarBtn.style.borderColor = 'rgba(0, 240, 255, 0.35)';
        radarBtn.style.boxShadow = '0 0 25px rgba(0, 240, 255, 0.2)';
      }
    }, 4500);
  }

  // Event Listeners
  radarBtn?.addEventListener('click', triggerSupersonicFlight);
  radarBtn?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerSupersonicFlight();
    }
  });

  airplane?.addEventListener('click', triggerSupersonicFlight);
}
