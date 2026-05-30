// ========================================
// Navigation Toggle (Mobile)
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
});

// ========================================
// Scroll Header Background
// ========================================
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    }
});

// ========================================
// Animated Counter
// ========================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    
    // data-target이 없거나 유효하지 않으면 애니메이션 스킵
    if (!target || isNaN(target)) {
        return;
    }
    
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Observer for stat counters
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            animateCounter(entry.target);
        }
    });
}, observerOptions);

// Observe all stat numbers (only those with data-target)
document.querySelectorAll('.stat-number[data-target]').forEach(stat => {
    statObserver.observe(stat);
});

// ========================================
// Observer for Solution Cards
// ========================================
const solutionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200); // Stagger animation by 200ms
        }
    });
}, observerOptions);

// Observe all solution cards
document.querySelectorAll('.solution-card').forEach(card => {
    solutionObserver.observe(card);
});

// ========================================
// Enhanced Hover Effects for Solution Cards
// ========================================
document.querySelectorAll('.solution-card').forEach(card => {
    const visual = card.querySelector('.solution-visual');
    
    if (visual) {
        card.addEventListener('mouseenter', function() {
            // Add hover class for additional animations
            visual.classList.add('hover-active');
            
            // Animate mockups
            const mockups = visual.querySelectorAll('.dashboard-mockup, .mobile-mockup, .calculator-mockup, .analytics-dashboard, .inventory-dashboard');
            mockups.forEach((mockup, index) => {
                setTimeout(() => {
                    mockup.style.transform = 'scale(1.05) translateY(-5px)';
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            visual.classList.remove('hover-active');
            
            // Reset mockup transforms
            const mockups = visual.querySelectorAll('.dashboard-mockup, .mobile-mockup, .calculator-mockup, .analytics-dashboard, .inventory-dashboard');
            mockups.forEach(mockup => {
                mockup.style.transform = '';
            });
        });
    }
});

// ========================================
// Parallax Effect for Hero Background
// ========================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = document.getElementById('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Form Validation & Submission
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 3 && value.length <= 7) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else if (value.length > 7) {
                value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
            }
            
            e.target.value = value;
        });
    }
    
    // Form validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            company: document.getElementById('company').value,
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            inquiryType: document.getElementById('inquiry-type').value,
            message: document.getElementById('message').value,
            privacy: document.getElementById('privacy').checked
        };
        
        // Basic validation
        if (!formData.company || !formData.name || !formData.phone || !formData.email || !formData.inquiryType) {
            alert('필수 항목을 모두 입력해주세요.');
            return;
        }
        
        if (!formData.privacy) {
            alert('개인정보 수집 및 이용에 동의해주세요.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('올바른 이메일 주소를 입력해주세요.');
            return;
        }
        
        // Phone validation
        const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
        if (!phoneRegex.test(formData.phone)) {
            alert('올바른 연락처를 입력해주세요. (예: 010-1234-5678)');
            return;
        }
        
        // ===== GAS Web App 으로 전송 (GitHub Pages 정적 호스팅) =====
        const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbz6bBzHs0YgwopFeIWT5F69kx0Oma1w7MJjR3wjXWawMe6vfWx0I9WoaSUqsnNAfWrFGw/exec';

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.textContent : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = '전송 중...';
        }

        // CORS 프리플라이트 회피: form-urlencoded + no-cors
        // 연락처(phone)는 Leading Zero 방어 위해 String 그대로 전송
        const payload = new URLSearchParams({
            company: formData.company,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            inquiryType: formData.inquiryType,
            message: formData.message
        });

        fetch(GAS_ENDPOINT, {
            method: 'POST',
            mode: 'no-cors',
            body: payload
        })
            .then(() => {
                // no-cors는 응답을 읽을 수 없어 낙관적 성공 처리
                // (시트 누적·메일 발송은 서버측에서 수행됨)
                showSuccessModal();
                contactForm.reset();
            })
            .catch(() => {
                alert('전송 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }
            });
    });
}

// ========================================
// Success Modal
// ========================================
function showSuccessModal() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>문의가 접수되었습니다!</h3>
            <p>담당자가 24시간 이내에<br>연락드리겠습니다.</p>
            <button class="btn btn-primary" onclick="closeSuccessModal()">확인</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .success-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: relative;
            background: white;
            border-radius: 16px;
            padding: 48px;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 20px 25px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
        }
        
        .modal-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #10B981 0%, #059669 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
        }
        
        .modal-icon i {
            font-size: 40px;
            color: white;
        }
        
        .modal-content h3 {
            font-size: 24px;
            margin-bottom: 16px;
            color: #111827;
        }
        
        .modal-content p {
            font-size: 16px;
            color: #6B7280;
            margin-bottom: 32px;
            line-height: 1.6;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // Auto close after 5 seconds
    setTimeout(closeSuccessModal, 5000);
}

function closeSuccessModal() {
    const modal = document.querySelector('.success-modal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// ========================================
// Award Video Autoplay on Scroll
// ========================================
const awardVideo = document.getElementById('awardVideo');

if (awardVideo) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Play video when it comes into view
                awardVideo.play().catch(error => {
                    console.log('Video autoplay failed:', error);
                    // If autoplay fails (browser policy), show play button
                    const playIndicator = document.querySelector('.play-indicator');
                    if (playIndicator) {
                        playIndicator.style.opacity = '1';
                        playIndicator.style.pointerEvents = 'auto';
                        playIndicator.addEventListener('click', () => {
                            awardVideo.play();
                            playIndicator.style.opacity = '0';
                        });
                    }
                });
            } else {
                // Pause video when it goes out of view
                awardVideo.pause();
            }
        });
    }, {
        threshold: 0.5 // Video must be 50% visible to start playing
    });
    
    videoObserver.observe(awardVideo);
    
    // Add click handler to video wrapper for manual play/pause
    const videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper) {
        videoWrapper.addEventListener('click', () => {
            if (awardVideo.paused) {
                awardVideo.play();
            } else {
                awardVideo.pause();
            }
        });
    }
}

// ========================================
// Enhanced Scroll Animations for New Sections
// ========================================
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe award items
document.querySelectorAll('.award-item, .achievement-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(item);
});

// Observe CEO message section
const ceoMessage = document.querySelector('.ceo-message');
if (ceoMessage) {
    ceoMessage.style.opacity = '0';
    ceoMessage.style.transform = 'translateY(30px)';
    ceoMessage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeInObserver.observe(ceoMessage);
}
// ============================================================
// 구내통신이란? 섹션 스크롤 리빌 (기존 .visible 패턴과 동일, 스태거 적용)
// ============================================================
const gunaeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 120);
            gunaeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('#gunae .gunae-reveal').forEach((el) => {
    gunaeObserver.observe(el);
});

// Observe area distribution cards
document.querySelectorAll('.area-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(card);
});

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);

// ========================================
// Dynamic Visual Animations
// ========================================

// Animate calculator values on scroll
const calculatorObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const calcValues = entry.target.querySelectorAll('.calc-value, .result-value');
            calcValues.forEach((value, index) => {
                setTimeout(() => {
                    value.style.animation = 'pulse 0.5s ease';
                }, index * 200);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.calculator-mockup').forEach(calc => {
    calculatorObserver.observe(calc);
});

// Animate map pins
const mapPinObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const pins = entry.target.querySelectorAll('.map-pin');
            pins.forEach((pin, index) => {
                setTimeout(() => {
                    pin.style.opacity = '1';
                    pin.style.animation = 'pin-bounce 2s ease-in-out infinite';
                }, index * 300);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.mobile-map').forEach(map => {
    mapPinObserver.observe(map);
});

// Initialize map pins as hidden
document.querySelectorAll('.map-pin').forEach(pin => {
    pin.style.opacity = '0';
});

// ========================================
// Inventory Alert Animation
// ========================================
const inventoryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const alerts = entry.target.querySelectorAll('.alert-badge');
            alerts.forEach(alert => {
                alert.style.animation = 'pulse 2s ease-in-out infinite';
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.inventory-dashboard').forEach(inventory => {
    inventoryObserver.observe(inventory);
});

// ========================================
// Active Section Highlighting in Navigation
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinksHighlight = document.querySelectorAll('.nav-link[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksHighlight.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Performance Optimization: Lazy Loading
// ========================================
if ('IntersectionObserver' in window) {
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Trigger any deferred animations
                if (element.dataset.animateOnView) {
                    element.classList.add('animate');
                }
                
                lazyObserver.unobserve(element);
            }
        });
    });
    
    document.querySelectorAll('[data-animate-on-view]').forEach(el => {
        lazyObserver.observe(el);
    });
}

// ========================================
// Console Welcome Message
// ========================================
console.log('%c🚀 Hublink - KT 구내통신의 최대 파트너사', 'font-size: 20px; font-weight: bold; color: #1E3A8A;');
console.log('%c20년 기술력으로 만든, 기업이 신뢰하는 네트워크 인프라', 'font-size: 14px; color: #06B6D4;');
console.log('%c문의: contact@hublink.kr', 'font-size: 12px; color: #6B7280;');

// ========================================
// License, Award, Team & Work Photo Lightbox
// ========================================
document.querySelectorAll('.license-image-wrapper, .additional-award-image, .team-photo-wrapper, .work-photo-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', function() {
        const img = this.querySelector('img');
        const lightbox = document.createElement('div');
        lightbox.className = 'license-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-backdrop"></div>
            <div class="lightbox-content">
                <button class="lightbox-close">
                    <i class="fas fa-times"></i>
                </button>
                <img src="${img.src}" alt="${img.alt}">
                <div class="lightbox-caption">${img.alt}</div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Fade in animation
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
        
        // Close handlers
        const closeBtn = lightbox.querySelector('.lightbox-close');
        const backdrop = lightbox.querySelector('.lightbox-backdrop');
        
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeLightbox);
        backdrop.addEventListener('click', closeLightbox);
        
        // ESC key to close
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    });
});

// ========================================
// Prevent Right Click on Production (Optional)
// ========================================
// Uncomment if needed for production
// document.addEventListener('contextmenu', event => event.preventDefault());

// ========================================
// Debug Mode Detection
// ========================================
const isDebugMode = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

if (isDebugMode) {
    console.log('%c🔧 Debug Mode Active', 'background: #FCD34D; color: #78350F; padding: 4px 8px; border-radius: 4px;');
    console.log('Current viewport:', window.innerWidth + 'x' + window.innerHeight);
}