/**
 * DIVINE VASTU BY KARISHMA
 * Interactive Navigation, Video Carousel, Consultation Form & WhatsApp Engine
 * Expert: Karishma | Phone: +91 7038803101 | Instagram: @Vastu_By_Karishma
 */

// Helper to pre-select a service from cards
window.selectVastuService = function(serviceName) {
  const serviceSelect = document.getElementById('vastuPropertyType');
  if (serviceSelect && serviceName) {
    for (let i = 0; i < serviceSelect.options.length; i++) {
      if (serviceSelect.options[i].text.toLowerCase().includes(serviceName.toLowerCase()) || 
          serviceSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase())) {
        serviceSelect.selectedIndex = i;
        break;
      }
    }
  }
  const bookingSec = document.getElementById('booking');
  if (bookingSec) {
    bookingSec.scrollIntoView({ behavior: 'smooth' });
  }
  const nameInput = document.getElementById('vastuName');
  if (nameInput) {
    setTimeout(() => nameInput.focus(), 600);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-links a');
  const mainNavBackdrop = document.getElementById('mainNavBackdrop');

  const closeMobileNav = () => {
    if (mainNav && mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      if (mainNavBackdrop) mainNavBackdrop.classList.remove('show');
      if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.innerHTML = '☰';
      }
    }
  };

  if (mobileMenuBtn && mainNav) {
    const siteHeader = document.getElementById('siteHeader');
    mobileMenuBtn.addEventListener('click', () => {
      if (siteHeader) {
        const rect = siteHeader.getBoundingClientRect();
        mainNav.style.top = Math.max(0, rect.bottom) + 'px';
      }
      mainNav.classList.toggle('open');
      const isOpen = mainNav.classList.contains('open');
      if (mainNavBackdrop) mainNavBackdrop.classList.toggle('show', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      mobileMenuBtn.innerHTML = isOpen ? '✕' : '☰';
    });

    if (mainNavBackdrop) {
      mainNavBackdrop.addEventListener('click', closeMobileNav);
    }

    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // 2. Smooth Scroll for internal anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Set min date for booking
  const bookingDateInput = document.getElementById('vastuDate');
  if (bookingDateInput) {
    const today = new Date().toISOString().split('T')[0];
    bookingDateInput.setAttribute('min', today);
  }

  // ==========================================================================
  // 2.5. VASTU INSTAGRAM REELS VIDEO CAROUSEL ENGINE
  // ==========================================================================
  const vastuReelCards = document.querySelectorAll('.vastu-reel-card');
  const vastuReelTrack = document.getElementById('vastuVideoCarouselTrack');
  const vastuPrevReelBtn = document.getElementById('vastuPrevReelBtn');
  const vastuNextReelBtn = document.getElementById('vastuNextReelBtn');

  // Pause all other reels
  const pauseAllVastuReels = (exceptVideo = null) => {
    vastuReelCards.forEach(card => {
      const vid = card.querySelector('video');
      if (vid && vid !== exceptVideo) {
        vid.pause();
        card.classList.remove('playing');
      }
    });
  };

  vastuReelCards.forEach(card => {
    const video = card.querySelector('.reel-video-element');
    const muteBtn = card.querySelector('.reel-mute-btn');
    const progressFill = card.querySelector('.reel-progress-fill');

    if (video) {
      // Muted by default for browser autoplay policy
      video.muted = true;

      // Card Click: Play / Pause toggle
      card.addEventListener('click', (e) => {
        if (e.target.closest('.reel-mute-btn')) return;

        if (video.paused) {
          pauseAllVastuReels(video);
          video.play().then(() => {
            card.classList.add('playing');
          }).catch(err => {
            console.log('Video play error:', err);
          });
        } else {
          video.pause();
          card.classList.remove('playing');
        }
      });

      // Mute / Unmute Toggle Button
      if (muteBtn) {
        muteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          video.muted = !video.muted;
          muteBtn.innerHTML = video.muted ? '🔇' : '🔊';
          muteBtn.title = video.muted ? 'Unmute audio' : 'Mute audio';
        });
      }

      // Progress bar tracking
      video.addEventListener('timeupdate', () => {
        if (progressFill && video.duration) {
          const pct = (video.currentTime / video.duration) * 100;
          progressFill.style.width = pct + '%';
        }
      });

      // Reset when ended
      video.addEventListener('ended', () => {
        card.classList.remove('playing');
        if (progressFill) progressFill.style.width = '0%';
      });
    }
  });

  // Carousel Arrow Controls
  if (vastuReelTrack) {
    const getScrollStep = () => {
      const card = vastuReelTrack.querySelector('.vastu-reel-card');
      return card ? card.offsetWidth + 24 : 314;
    };

    if (vastuPrevReelBtn) {
      vastuPrevReelBtn.addEventListener('click', () => {
        vastuReelTrack.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      });
    }

    if (vastuNextReelBtn) {
      vastuNextReelBtn.addEventListener('click', () => {
        vastuReelTrack.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      });
    }
  }

  // 3. Consultation Form Dispatcher (WhatsApp & Email)
  const form = document.getElementById('vastuConsultationForm');
  const whatsappBtn = document.getElementById('vastuWhatsAppSubmit');
  const emailBtn = document.getElementById('vastuEmailSubmit');

  // Modal Elements
  const modal = document.getElementById('vastuModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDoneBtn = document.getElementById('modalDoneBtn');
  const modalSummaryRef = document.getElementById('modalSummaryRef');
  const modalSummaryName = document.getElementById('modalSummaryName');
  const modalSummaryPhone = document.getElementById('modalSummaryPhone');
  const modalSummaryProperty = document.getElementById('modalSummaryProperty');
  const modalSummaryMode = document.getElementById('modalSummaryMode');
  const modalSummaryDate = document.getElementById('modalSummaryDate');
  const modalWhatsAppDirect = document.getElementById('modalWhatsAppDirect');
  const modalEmailDirect = document.getElementById('modalEmailDirect');

  const getFormData = () => {
    const name = document.getElementById('vastuName')?.value.trim();
    const phone = document.getElementById('vastuPhone')?.value.trim();
    const city = document.getElementById('vastuCity')?.value.trim() || 'Not specified';
    const propertyType = document.getElementById('vastuPropertyType')?.value || 'Home / Apartment';
    const consultMode = document.getElementById('vastuConsultMode')?.value || 'Online Consultation (Layout & Video)';
    const date = document.getElementById('vastuDate')?.value || 'Earliest Available';
    const notes = document.getElementById('vastuNotes')?.value.trim() || 'No additional notes provided';

    return { name, phone, city, propertyType, consultMode, date, notes };
  };

  const validateForm = (data) => {
    if (!data.name) {
      alert('Please enter your full name.');
      document.getElementById('vastuName')?.focus();
      return false;
    }
    if (!data.phone || data.phone.length < 10) {
      alert('Please enter a valid 10-digit mobile/WhatsApp number.');
      document.getElementById('vastuPhone')?.focus();
      return false;
    }
    return true;
  };

  const generateRef = () => {
    const num = Math.floor(1000 + Math.random() * 9000);
    return `DV-${num}`;
  };

  const showModal = (data, refCode) => {
    if (!modal) return;
    if (modalSummaryRef) modalSummaryRef.textContent = refCode;
    if (modalSummaryName) modalSummaryName.textContent = data.name;
    if (modalSummaryPhone) modalSummaryPhone.textContent = data.phone;
    if (modalSummaryProperty) modalSummaryProperty.textContent = data.propertyType;
    if (modalSummaryMode) modalSummaryMode.textContent = `${data.consultMode} (${data.city})`;
    if (modalSummaryDate) modalSummaryDate.textContent = data.date;

    const waText = encodeURIComponent(
      `*Divine Vastu Consultation Request [${refCode}]*\n` +
      `----------------------------------------\n` +
      `*Expert:* Karishma\n` +
      `*Tagline:* Better Vastu, Better Life\n\n` +
      `👤 *Client Name:* ${data.name}\n` +
      `📞 *Phone / WhatsApp:* ${data.phone}\n` +
      `📍 *City / Location:* ${data.city}\n` +
      `🏡 *Property Type:* ${data.propertyType}\n` +
      `🌐 *Consultation Mode:* ${data.consultMode}\n` +
      `🗓 *Preferred Date:* ${data.date}\n` +
      `📝 *Space Details / Concerns:* ${data.notes}\n` +
      `----------------------------------------\n` +
      `Sent via Divine Vastu by Karishma website.`
    );
    const waUrl = `https://wa.me/917038803101?text=${waText}`;

    const mailSubject = encodeURIComponent(`Divine Vastu Consultation Request [${refCode}] - ${data.name}`);
    const mailBody = encodeURIComponent(
      `DIVINE VASTU BY KARISHMA - CONSULTATION REQUEST\n` +
      `===============================================\n` +
      `Booking Reference: ${refCode}\n\n` +
      `Client Name: ${data.name}\n` +
      `Phone Number: ${data.phone}\n` +
      `City / Location: ${data.city}\n` +
      `Property Type: ${data.propertyType}\n` +
      `Consultation Mode: ${data.consultMode}\n` +
      `Preferred Date: ${data.date}\n\n` +
      `Space Details & Specific Concerns:\n${data.notes}\n\n` +
      `Tagline: "Balance Energy, Enhance Harmony, Elevate Life"\n` +
      `Sent via Divine Vastu by Karishma web portal.`
    );
    const mailUrl = `mailto:divinevastubykarishma@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    if (modalWhatsAppDirect) modalWhatsAppDirect.href = waUrl;
    if (modalEmailDirect) modalEmailDirect.href = mailUrl;

    modal.classList.add('show');
  };

  const closeModal = () => {
    if (modal) modal.classList.remove('show');
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Handle WhatsApp submit button
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = getFormData();
      if (!validateForm(data)) return;

      const refCode = generateRef();
      const waText = encodeURIComponent(
        `*Divine Vastu Consultation Request [${refCode}]*\n` +
        `Hello Karishma,\nI would like to book a Vastu consultation for my property.\n\n` +
        `👤 *Name:* ${data.name}\n` +
        `📞 *Phone:* ${data.phone}\n` +
        `📍 *City:* ${data.city}\n` +
        `🏡 *Property:* ${data.propertyType}\n` +
        `🌐 *Mode:* ${data.consultMode}\n` +
        `🗓 *Preferred Date:* ${data.date}\n` +
        `📝 *Concerns/Notes:* ${data.notes}\n\n` +
        `_Better Vastu, Better Life_`
      );
      const waUrl = `https://wa.me/917038803101?text=${waText}`;

      window.open(waUrl, '_blank');

      setTimeout(() => {
        showModal(data, refCode);
      }, 400);
    });
  }

  // Handle Email submit button
  if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = getFormData();
      if (!validateForm(data)) return;

      const refCode = generateRef();
      const mailSubject = encodeURIComponent(`Divine Vastu Consultation Request [${refCode}] - ${data.name}`);
      const mailBody = encodeURIComponent(
        `DIVINE VASTU BY KARISHMA - CONSULTATION REQUEST\n` +
        `===============================================\n` +
        `Booking Reference: ${refCode}\n\n` +
        `Client Name: ${data.name}\n` +
        `Phone Number: ${data.phone}\n` +
        `City / Location: ${data.city}\n` +
        `Property Type: ${data.propertyType}\n` +
        `Consultation Mode: ${data.consultMode}\n` +
        `Preferred Date: ${data.date}\n\n` +
        `Space Details / Concerns:\n${data.notes}\n\n` +
        `Tagline: "Better Vastu, Better Life"`
      );
      const mailUrl = `mailto:divinevastubykarishma@gmail.com?subject=${mailSubject}&body=${mailBody}`;

      window.location.href = mailUrl;

      setTimeout(() => {
        showModal(data, refCode);
      }, 400);
    });
  }

  // 4. Indian Language Switcher
  const indianLanguages = [
    { code: 'mr', name: 'Marathi', native: 'मराठी', region: 'महाराष्ट्र (नागपूर)' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', region: 'भारत / National' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', region: 'ఆంధ్ర & తెలంగాణ' },
    { code: 'bn', name: 'Bangla', native: 'বাংলা', region: 'পশ্চিমবঙ্গ / Bengal' },
    { code: 'en', name: 'English', native: 'English', region: 'International' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', region: 'தமிழ்நாடு' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', region: 'ગુજરાત' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', region: 'ಕರ್ನಾಟಕ' }
  ];

  const topLangBtns = document.querySelectorAll('.top-lang-btn');
  const applyLanguage = (langCode) => {
    localStorage.setItem('selected_indian_lang', langCode);
    const host = window.location.hostname;
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    if (host && host !== 'localhost') {
      document.cookie = `googtrans=/en/${langCode}; domain=.${host}; path=/;`;
    }
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event('change'));
    } else {
      setTimeout(() => {
        const lateCombo = document.querySelector('.goog-te-combo');
        if (lateCombo) {
          lateCombo.value = langCode;
          lateCombo.dispatchEvent(new Event('change'));
        } else {
          window.location.reload();
        }
      }, 300);
    }
  };

  topLangBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang) {
        topLangBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyLanguage(lang);
      }
    });
  });
});
