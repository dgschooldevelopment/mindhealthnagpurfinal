/**
 * MIND & HEALTH WELLNESS CENTER - DR. HARIBHAU DORLIKAR
 * Interactive Web Features & Appointment Engine
 */

// Global helper for course enrollment buttons
window.setBookingCourse = function() {
  const serviceSelect = document.getElementById('bookingService');
  if (serviceSelect) {
    serviceSelect.value = 'Clinical Hypnotherapist Training Course';
    if (!serviceSelect.value) {
      serviceSelect.value = 'Learn Hypnosis Course';
    }
  }
  const bookingSec = document.getElementById('booking');
  if (bookingSec) {
    bookingSec.scrollIntoView({ behavior: 'smooth' });
  }
  const nameInput = document.getElementById('bookingName');
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

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });
  }

  // 2. Interactive Symptom Matcher
  const symptomChips = document.querySelectorAll('.symptom-chip');
  const matchResultTitle = document.getElementById('matchResultTitle');
  const matchResultDesc = document.getElementById('matchResultDesc');
  const matchResultTag = document.getElementById('matchResultTag');
  const matchSelectBtn = document.getElementById('matchSelectBtn');
  const serviceSelect = document.getElementById('bookingService');

  const therapyData = {
    'anxiety': {
      title: 'Clinical Anxiety & Panic Relief Therapy',
      desc: 'Deep subconscious desensitization and neuro-calming techniques to overcome panic attacks, social anxiety, chronic worrying, and physical symptoms without addictive sedatives.',
      tag: 'Drug-Free Rapid Calming',
      serviceValue: 'Anxiety Treatment'
    },
    'insomnia': {
      title: 'Restorative Sleep & Insomnia Hypnotherapy',
      desc: 'Reprogramming night-time brainwave frequencies to eliminate sleep anxiety, racing bedtime thoughts, and dependency on sleeping pills for deep, natural rejuvenation.',
      tag: 'Natural Sleep Restoration',
      serviceValue: 'Sleep Therapy'
    },
    'exam_fear': {
      title: 'Student Counseling & Memory Conditioning',
      desc: 'Specialized hypno-counseling to conquer exam phobia, eliminate procrastination, sharpen focus, and unlock photographic memory recall for students.',
      tag: 'Academic Breakthrough',
      serviceValue: 'Student Counseling'
    },
    'depression': {
      title: 'Holistic Depression & Mood Elevation Therapy',
      desc: 'Gentle cognitive restructuring, subconscious trauma clearance, and Ayurvedic lifestyle balance to restore inner vitality, enthusiasm, and purpose.',
      tag: 'Mind Vitality Restoration',
      serviceValue: 'Depression Therapy'
    },
    'phobia': {
      title: 'Targeted Phobia & Habit Cessation Protocol',
      desc: 'Permanent elimination of specific phobias (fear of flying, heights, stage fright, public speaking) and overcoming addictions like smoking, nail-biting, and emotional eating.',
      tag: 'Rapid Neuro Reprogramming',
      serviceValue: 'Hypnotherapy'
    },
    'learn_hypnosis': {
      title: 'Professional Clinical Hypnosis Certification Training',
      desc: 'Learn the complete science and art of hypnotism directly from Dr. Dorlikar (30+ yrs teaching, 1,000+ shows, 500+ students). Includes hands-on practical stages and certification.',
      tag: 'Doctor-Led Certification',
      serviceValue: 'Learn Hypnosis Course'
    },
    'yoga_ayurveda': {
      title: 'Therapeutic Yoga & Ayurvedic Consultation',
      desc: 'Individualized Prakriti (body-mind constitution) diagnosis, customized medicinal herbal guidance, pranayama breath science, and guided transcendental meditation.',
      tag: 'Ancient Holistic Healing',
      serviceValue: 'Yoga & Ayurveda'
    }
  };

  if (symptomChips.length > 0) {
    symptomChips.forEach(chip => {
      chip.addEventListener('click', () => {
        symptomChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const type = chip.getAttribute('data-symptom');
        const data = therapyData[type];

        if (data && matchResultTitle && matchResultDesc && matchResultTag) {
          matchResultTitle.textContent = data.title;
          matchResultDesc.textContent = data.desc;
          matchResultTag.textContent = data.tag;

          if (matchSelectBtn) {
            matchSelectBtn.onclick = () => {
              if (serviceSelect) {
                serviceSelect.value = data.serviceValue;
              }
              const bookingSection = document.getElementById('booking');
              if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
                // Briefly highlight service select
                serviceSelect.focus();
                serviceSelect.style.borderColor = '#c89326';
                setTimeout(() => {
                  serviceSelect.style.borderColor = '';
                }, 2000);
              }
            };
          }
        }
      });
    });
  }

  // 3. Animated Stats Counters
  const counters = document.querySelectorAll('.stat-number');
  let hasCounted = false;

  const startCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toLocaleString() + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString() + suffix;
        }
      }, stepTime);
    });
  };

  const statsSection = document.querySelector('.stats-bar-section');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasCounted) {
          hasCounted = true;
          startCounters();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    if (btn && answer) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAns = otherItem.querySelector('.faq-answer');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        if (isOpen) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
        }
      });
    }
  });

  // 5. Booking Form Engine (Email & WhatsApp Dispatch)
  const bookingForm = document.getElementById('appointmentForm');
  const sendEmailBtn = document.getElementById('sendEmailBtn');
  const bookWhatsAppBtn = document.getElementById('bookWhatsAppBtn');
  
  // Modal Elements
  const modalBackdrop = document.getElementById('bookingModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDoneBtn = document.getElementById('modalDoneBtn');
  const modalSummaryRef = document.getElementById('modalSummaryRef');
  const modalSummaryName = document.getElementById('modalSummaryName');
  const modalSummaryPhone = document.getElementById('modalSummaryPhone');
  const modalSummaryCenter = document.getElementById('modalSummaryCenter');
  const modalSummaryService = document.getElementById('modalSummaryService');
  const modalSummaryDateTime = document.getElementById('modalSummaryDateTime');
  const modalWhatsAppDirect = document.getElementById('modalWhatsAppDirect');
  const modalEmailDirect = document.getElementById('modalEmailDirect');

  const getFormData = () => {
    const name = document.getElementById('bookingName')?.value.trim();
    const phone = document.getElementById('bookingPhone')?.value.trim();
    const email = document.getElementById('bookingEmail')?.value.trim() || 'Not provided';
    const center = document.getElementById('bookingCenter')?.value;
    const service = document.getElementById('bookingService')?.value;
    const date = document.getElementById('bookingDate')?.value || 'Earliest Available';
    const timeSlot = document.getElementById('bookingSlot')?.value;
    const message = document.getElementById('bookingMessage')?.value.trim() || 'No specific notes provided';

    return { name, phone, email, center, service, date, timeSlot, message };
  };

  const validateForm = (data) => {
    if (!data.name) {
      alert('Please enter your full name.');
      document.getElementById('bookingName')?.focus();
      return false;
    }
    if (!data.phone || data.phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      document.getElementById('bookingPhone')?.focus();
      return false;
    }
    if (!data.service) {
      alert('Please select the therapy or service you need.');
      document.getElementById('bookingService')?.focus();
      return false;
    }
    return true;
  };

  const generateBookingReference = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `MHW-${randomNum}`;
  };

  const showConfirmationModal = (data, bookingRef) => {
    if (!modalBackdrop) return;

    if (modalSummaryRef) modalSummaryRef.textContent = bookingRef;
    if (modalSummaryName) modalSummaryName.textContent = data.name;
    if (modalSummaryPhone) modalSummaryPhone.textContent = data.phone;
    if (modalSummaryCenter) modalSummaryCenter.textContent = data.center;
    if (modalSummaryService) modalSummaryService.textContent = data.service;
    if (modalSummaryDateTime) modalSummaryDateTime.textContent = `${data.date} (${data.timeSlot})`;

    // Prepare direct click links in modal
    const emailSubject = encodeURIComponent(`Appointment Request [${bookingRef}]: ${data.name} - ${data.service}`);
    const emailBody = encodeURIComponent(
      `MIND & HEALTH WELLNESS CENTER - APPOINTMENT REQUEST\n` +
      `===================================================\n` +
      `Booking Reference: ${bookingRef}\n\n` +
      `Patient Name: ${data.name}\n` +
      `Phone Number: ${data.phone}\n` +
      `Email Address: ${data.email}\n` +
      `Preferred Center: ${data.center}\n` +
      `Selected Service: ${data.service}\n` +
      `Preferred Date: ${data.date}\n` +
      `Preferred Time Slot: ${data.timeSlot}\n\n` +
      `Patient Symptoms / Health Notes:\n${data.message}\n\n` +
      `Sent via mindhealthnagpur.com website appointment booking system.`
    );
    const mailtoUrl = `mailto:haribhau1000@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    const waText = encodeURIComponent(
      `*New Appointment Request [${bookingRef}]*\n` +
      `*Center:* Mind & Health Wellness Center\n` +
      `----------------------------------------\n` +
      `*Name:* ${data.name}\n` +
      `*Phone:* ${data.phone}\n` +
      `*Location:* ${data.center}\n` +
      `*Therapy:* ${data.service}\n` +
      `*Date/Slot:* ${data.date} (${data.timeSlot})\n` +
      `*Note:* ${data.message}\n` +
      `----------------------------------------\n` +
      `Dr. Haribhau Dorlikar | +91 83292 12282`
    );
    const waUrl = `https://wa.me/918329212282?text=${waText}`;

    if (modalWhatsAppDirect) modalWhatsAppDirect.href = waUrl;
    if (modalEmailDirect) modalEmailDirect.href = mailtoUrl;

    modalBackdrop.classList.add('show');
  };

  const closeModal = () => {
    if (modalBackdrop) modalBackdrop.classList.remove('show');
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalDoneBtn) modalDoneBtn.addEventListener('click', closeModal);

  // Close when clicking outside modal card
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  // Handle Send via Email button
  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = getFormData();
      if (!validateForm(data)) return;

      const bookingRef = generateBookingReference();

      const emailSubject = encodeURIComponent(`Appointment Request [${bookingRef}]: ${data.name} - ${data.service}`);
      const emailBody = encodeURIComponent(
        `MIND & HEALTH WELLNESS CENTER - APPOINTMENT REQUEST\n` +
        `===================================================\n` +
        `Booking Reference: ${bookingRef}\n\n` +
        `Patient Name: ${data.name}\n` +
        `Phone Number: ${data.phone}\n` +
        `Email Address: ${data.email}\n` +
        `Preferred Center: ${data.center}\n` +
        `Selected Service: ${data.service}\n` +
        `Preferred Date: ${data.date}\n` +
        `Preferred Time Slot: ${data.timeSlot}\n\n` +
        `Patient Symptoms / Health Notes:\n${data.message}\n\n` +
        `Sent via mindhealthnagpur.com website booking portal.`
      );

      const mailtoUrl = `mailto:haribhau1000@gmail.com?subject=${emailSubject}&body=${emailBody}`;

      // Open mail client
      window.location.href = mailtoUrl;

      // Show in-page confirmation
      setTimeout(() => {
        showConfirmationModal(data, bookingRef);
      }, 400);
    });
  }

  // Handle Book via WhatsApp button
  if (bookWhatsAppBtn) {
    bookWhatsAppBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const data = getFormData();
      if (!validateForm(data)) return;

      const bookingRef = generateBookingReference();

      const waText = encodeURIComponent(
        `*New Appointment Booking [${bookingRef}]*\n` +
        `Hello Dr. Haribhau Dorlikar,\nI would like to book a consultation at Mind & Health Wellness Center.\n\n` +
        `👤 *Name:* ${data.name}\n` +
        `📞 *Phone:* ${data.phone}\n` +
        `📍 *Center:* ${data.center}\n` +
        `🌿 *Service:* ${data.service}\n` +
        `🗓 *Date/Time:* ${data.date} (${data.timeSlot})\n` +
        `📝 *Problem/Notes:* ${data.message}`
      );

      const waUrl = `https://wa.me/918329212282?text=${waText}`;

      // Open WhatsApp
      window.open(waUrl, '_blank');

      // Show confirmation
      setTimeout(() => {
        showConfirmationModal(data, bookingRef);
      }, 400);
    });
  }

  // 6. Smooth Scroll for all internal anchor links
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

  // Set minimum date for appointment booking to today
  const bookingDateInput = document.getElementById('bookingDate');
  if (bookingDateInput) {
    const today = new Date().toISOString().split('T')[0];
    bookingDateInput.setAttribute('min', today);
  }

  // ==========================================================================
  // 6.5. INSTAGRAM VIDEO REELS CAROUSEL ENGINE
  // ==========================================================================
  const reelCards = document.querySelectorAll('.reel-card');
  const reelTrack = document.getElementById('videoCarouselTrack');
  const prevReelBtn = document.getElementById('prevReelBtn');
  const nextReelBtn = document.getElementById('nextReelBtn');

  // Pause all reels helper
  const pauseAllReels = (exceptVideo = null) => {
    reelCards.forEach(card => {
      const vid = card.querySelector('video');
      if (vid && vid !== exceptVideo) {
        vid.pause();
        card.classList.remove('playing');
      }
    });
  };

  reelCards.forEach(card => {
    const video = card.querySelector('.reel-video-element');
    const muteBtn = card.querySelector('.reel-mute-btn');
    const progressFill = card.querySelector('.reel-progress-fill');

    if (video) {
      // By default videos are muted for safe browser autoplay policy
      video.muted = true;

      // Card Click: Toggle Play / Pause
      card.addEventListener('click', (e) => {
        // If clicking mute button, do not toggle play
        if (e.target.closest('.reel-mute-btn')) return;

        if (video.paused) {
          pauseAllReels(video);
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

      // Mute Toggle Button Click
      if (muteBtn) {
        muteBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          video.muted = !video.muted;
          muteBtn.innerHTML = video.muted ? '🔇' : '🔊';
          muteBtn.title = video.muted ? 'Unmute audio' : 'Mute audio';
        });
      }

      // Progress bar fill on timeupdate
      video.addEventListener('timeupdate', () => {
        if (progressFill && video.duration) {
          const pct = (video.currentTime / video.duration) * 100;
          progressFill.style.width = pct + '%';
        }
      });

      // When video ends, reset progress fill
      video.addEventListener('ended', () => {
        card.classList.remove('playing');
        if (progressFill) progressFill.style.width = '0%';
      });
    }
  });

  // Carousel Arrow Navigation
  if (reelTrack) {
    const getScrollStep = () => {
      const card = reelTrack.querySelector('.reel-card');
      return card ? card.offsetWidth + 24 : 314;
    };

    if (prevReelBtn) {
      prevReelBtn.addEventListener('click', () => {
        reelTrack.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
      });
    }

    if (nextReelBtn) {
      nextReelBtn.addEventListener('click', () => {
        reelTrack.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
      });
    }
  }

  // ==========================================================================
  // 7. INDIAN LANGUAGE SWITCHER (MARATHI, HINDI, TELUGU, BANGLA & ALL LANGUAGES)
  // ==========================================================================
  const indianLanguages = [
    { code: 'mr', name: 'Marathi', native: 'मराठी', region: 'महाराष्ट्र (नागपूर)' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी', region: 'भारत / National' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', region: 'ఆంధ్ర & తెలంగాణ' },
    { code: 'bn', name: 'Bangla', native: 'বাংলা', region: 'পশ্চিমবঙ্গ / Bengal' },
    { code: 'en', name: 'English', native: 'English', region: 'International' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', region: 'தமிழ்நாடு' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', region: 'ગુજરાત' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', region: 'ಕರ್ನಾಟಕ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം', region: 'കേരളം' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', region: 'ਪੰਜਾਬ' },
    { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', region: 'ଓଡ଼ିଶା' },
    { code: 'ur', name: 'Urdu', native: 'اردو', region: 'قومی زبان' },
    { code: 'as', name: 'Assamese', native: 'অসমীয়া', region: 'অসম' },
    { code: 'sa', name: 'Sanskrit', native: 'संस्कृतम्', region: 'शास्त्रीय' }
  ];

  const langDropdownWrapper = document.getElementById('langDropdownWrapper');
  const langToggleBtn = document.getElementById('langToggleBtn');
  const activeLangDisplay = document.getElementById('activeLangDisplay');
  const langOptionsContainer = document.getElementById('langOptionsContainer');
  const langSearchInput = document.getElementById('langSearchInput');
  const topLangBtns = document.querySelectorAll('.top-lang-btn');

  let currentLang = localStorage.getItem('selected_indian_lang') || 'en';

  // Check existing googtrans cookie
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  if (match && match[1]) {
    const parts = match[1].split('/');
    if (parts.length >= 3 && parts[2]) {
      currentLang = parts[2];
    }
  }

  // Render language options in dropdown
  const renderLanguageOptions = (filter = '') => {
    if (!langOptionsContainer) return;
    langOptionsContainer.innerHTML = '';

    const q = filter.trim().toLowerCase();
    const filtered = indianLanguages.filter(l => 
      !q || 
      l.name.toLowerCase().includes(q) || 
      l.native.toLowerCase().includes(q) || 
      l.region.toLowerCase().includes(q)
    );

    if (filtered.length === 0) {
      langOptionsContainer.innerHTML = '<div style="padding: 12px; font-size: 0.85rem; color: #7c9085; text-align: center;">No matching language found</div>';
      return;
    }

    filtered.forEach(lang => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `lang-option-item ${lang.code === currentLang ? 'selected' : ''}`;
      btn.setAttribute('data-lang', lang.code);

      btn.innerHTML = `
        <div class="lang-names">
          <span class="lang-native">${lang.native}</span>
          <span class="lang-english">${lang.name}</span>
        </div>
        <span class="lang-badge-state">${lang.region}</span>
      `;

      btn.addEventListener('click', () => {
        applyLanguage(lang.code);
        if (langDropdownWrapper) langDropdownWrapper.classList.remove('active');
      });

      langOptionsContainer.appendChild(btn);
    });
  };

  // Switch and apply chosen language
  const applyLanguage = (langCode) => {
    currentLang = langCode;
    localStorage.setItem('selected_indian_lang', langCode);

    // Set cookie for Google Translate
    const host = window.location.hostname;
    document.cookie = `googtrans=/en/${langCode}; path=/;`;
    if (host && host !== 'localhost') {
      document.cookie = `googtrans=/en/${langCode}; domain=.${host}; path=/;`;
    }

    // Trigger Google Translate Combo
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event('change'));
    } else {
      // If combo is not ready yet, set cookie and reload smoothly
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

    // Update active UI elements
    updateActiveUI(langCode);
  };

  const updateActiveUI = (langCode) => {
    const langObj = indianLanguages.find(l => l.code === langCode);
    if (langObj && activeLangDisplay) {
      activeLangDisplay.textContent = `${langObj.native} (${langObj.name})`;
    }

    // Update top bar quick buttons
    topLangBtns.forEach(b => {
      if (b.getAttribute('data-lang') === langCode) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // Re-render dropdown to reflect selected state
    renderLanguageOptions(langSearchInput?.value || '');
  };

  // Toggle Dropdown
  if (langToggleBtn && langDropdownWrapper) {
    langToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdownWrapper.classList.toggle('active');
      if (langDropdownWrapper.classList.contains('active') && langSearchInput) {
        setTimeout(() => langSearchInput.focus(), 100);
      }
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!langDropdownWrapper.contains(e.target)) {
        langDropdownWrapper.classList.remove('active');
      }
    });
  }

  // Quick buttons in top bar
  topLangBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (lang) applyLanguage(lang);
    });
  });

  // Search input filter
  if (langSearchInput) {
    langSearchInput.addEventListener('input', (e) => {
      renderLanguageOptions(e.target.value);
    });
    langSearchInput.addEventListener('click', (e) => e.stopPropagation());
  }

  // Initial render
  renderLanguageOptions();
  updateActiveUI(currentLang);
});

