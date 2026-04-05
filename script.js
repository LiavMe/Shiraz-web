// ===== Testimonials Data =====
// NOTE: Replace with real testimonials before going live
const testimonials = [
    {
        name: "מיכל כהן",
        location: "רעננה",
        rating: 5,
        text: "שירז פשוט קסומה! אחרי סדרת טיפולי פנים העור שלי נראה מדהים. היא מקצועית, חמה ותמיד מתאימה את הטיפול בדיוק למה שהעור שלי צריך.",
        service: "טיפולי פנים",
        date: "מרץ 2025"
    },
    {
        name: "נועה לוי",
        location: "הרצליה",
        rating: 5,
        text: "עשיתי הסרת שיער בלייזר אצל שירז וההבדל מורגש כבר מהטיפול הראשון! מאוד מקצועית, מסבירה כל שלב ודואגת שיהיה נוח.",
        service: "הסרת שיער בלייזר",
        date: "פברואר 2025"
    },
    {
        name: "דנה אברהם",
        location: "כפר סבא",
        rating: 5,
        text: "סבלתי שנים מאקנה וכבר איבדתי תקווה. שירז בנתה לי תוכנית טיפול מותאמת אישית והתוצאות פשוט לא יאמנו. ממליצה בחום!",
        service: "טיפול באקנה",
        date: "ינואר 2025"
    },
    {
        name: "רונית שמיר",
        location: "נתניה",
        rating: 5,
        text: "הגעתי לשירז בגלל כתמי פיגמנטציה שהפריעו לי מאוד. אחרי כמה טיפולים העור שלי נראה אחיד וזוהר. שירז היא מקצוענית אמיתית!",
        service: "טיפול בפיגמנטציה",
        date: "דצמבר 2024"
    },
    {
        name: "יעל גולדשטיין",
        location: "פתח תקווה",
        rating: 5,
        text: "טיפול האנטי אייג'ינג אצל שירז שינה לי את הפנים - פשוטו כמשמעו! העור מוצק יותר, חלק יותר, ואני מרגישה שהורדתי שנים. תודה שירז!",
        service: "אנטי אייג'ינג",
        date: "נובמבר 2024"
    },
    {
        name: "שרון דביר",
        location: "ראשון לציון",
        rating: 5,
        text: "האווירה בקליניקה כל כך נעימה ומרגיעה. שירז מקצועית ברמה הגבוהה ביותר ותמיד מעודכנת בטכנולוגיות החדשות. אני לקוחה קבועה כבר 3 שנים!",
        service: "טיפולי פנים",
        date: "אוקטובר 2024"
    }
];

// ===== Topic & Time Maps =====
const topicMap = {
    LaserHairRemoval: "הסרת שיער בלייזר",
    FacialTreatment: "טיפולי פנים",
    Acne: "טיפול באקנה",
    Pigmentation: "טיפול בפיגמנטציה",
    AntiAging: "אנטי אייג'ינג",
    Consultation: "ייעוץ",
    Other: "אחר"
};

const timeMap = {
    Morning: "בוקר (09:00-12:00)",
    Noon: "צהריים (12:00-15:00)",
    Afternoon: "אחר הצהריים (15:00-17:00)",
    Flexible: "גמישה"
};

// ===== DOM Ready =====
document.addEventListener("DOMContentLoaded", () => {
    initMobileMenu();
    initStickyHeader();
    initGallery();
    initTestimonials();
    initContactForm();
    initScrollAnimations();
    lucide.createIcons();
});

// ===== Mobile Menu =====
function initMobileMenu() {
    const btn = document.getElementById("mobileMenuBtn");
    const nav = document.getElementById("navLinks");

    if (!btn || !nav) return;

    btn.addEventListener("click", () => {
        btn.classList.toggle("active");
        nav.classList.toggle("active");
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            btn.classList.remove("active");
            nav.classList.remove("active");
        });
    });
}

// ===== Sticky Header =====
function initStickyHeader() {
    const header = document.getElementById("header");
    if (!header) return;

    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 50);
    });
}

// ===== Gallery Slider =====
function initGallery() {
    const track = document.getElementById("galleryTrack");
    const prevBtn = document.getElementById("galleryPrev");
    const nextBtn = document.getElementById("galleryNext");

    if (!track) return;

    const slides = track.querySelectorAll(".gallery-slide");
    let position = 0;

    function getVisibleCount() {
        if (window.innerWidth <= 480) return 1;
        if (window.innerWidth <= 768) return 2;
        return 3;
    }

    function getSlideWidth() {
        const visible = getVisibleCount();
        const gap = 16;
        const containerWidth = track.parentElement.offsetWidth;
        return (containerWidth + gap) / visible;
    }

    function updatePosition() {
        const slideWidth = getSlideWidth();
        track.style.transform = `translateX(${position * slideWidth}px)`;
    }

    function maxPosition() {
        return slides.length - getVisibleCount();
    }

    function advance() {
        position = position >= maxPosition() ? 0 : position + 1;
        updatePosition();
    }

    function retreat() {
        position = position <= 0 ? maxPosition() : position - 1;
        updatePosition();
    }

    if (prevBtn) prevBtn.addEventListener("click", () => { retreat(); resetAutoplay(); });
    if (nextBtn) nextBtn.addEventListener("click", () => { advance(); resetAutoplay(); });

    // Autoplay
    let autoplayInterval = setInterval(advance, 3000);
    const slider = track.closest(".gallery-slider");

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(advance, 3000);
    }

    slider.addEventListener("mouseenter", () => clearInterval(autoplayInterval));
    slider.addEventListener("mouseleave", () => { autoplayInterval = setInterval(advance, 3000); });

    // Lightbox
    const lightbox = document.createElement("div");
    lightbox.className = "gallery-lightbox";
    lightbox.innerHTML = `<button class="gallery-lightbox-close">&times;</button><img src="" alt="">`;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector("img");
    const lightboxClose = lightbox.querySelector(".gallery-lightbox-close");

    slides.forEach(slide => {
        slide.addEventListener("click", () => {
            const img = slide.querySelector("img");
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add("active");
        });
    });

    lightboxClose.addEventListener("click", () => lightbox.classList.remove("active"));
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.classList.remove("active");
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") lightbox.classList.remove("active");
    });

    // Recalc on resize
    window.addEventListener("resize", () => {
        position = Math.min(position, maxPosition());
        updatePosition();
    });
}

// ===== Testimonials Carousel =====
function initTestimonials() {
    const track = document.getElementById("testimonialsTrack");
    const dotsContainer = document.getElementById("carouselDots");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    if (!track || !dotsContainer) return;

    // Build testimonial cards
    testimonials.forEach(t => {
        const card = document.createElement("div");
        card.className = "testimonial-card";

        const stars = Array.from({ length: 5 }, (_, i) =>
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${i < t.rating ? '#F5A623' : 'none'}" stroke="${i < t.rating ? '#F5A623' : '#DDD'}" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
        ).join("");

        card.innerHTML = `
            <div class="testimonial-inner">
                <div class="testimonial-stars">${stars}</div>
                <p class="testimonial-text">"${t.text}"</p>
                <div class="testimonial-author">
                    <span class="testimonial-name">${t.name}</span>
                    <span class="testimonial-location">${t.location}</span>
                    <span class="testimonial-service">${t.service} | ${t.date}</span>
                </div>
            </div>
        `;
        track.appendChild(card);
    });

    // Dots
    testimonials.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.className = `carousel-dot${i === 0 ? " active" : ""}`;
        dot.addEventListener("click", () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    let currentSlide = 0;
    const dots = dotsContainer.querySelectorAll(".carousel-dot");

    function goTo(index) {
        currentSlide = index;
        track.style.transform = `translateX(${index * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle("active", i === index));
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            goTo(currentSlide > 0 ? currentSlide - 1 : testimonials.length - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            goTo(currentSlide < testimonials.length - 1 ? currentSlide + 1 : 0);
        });
    }

    // Auto-play
    let autoplay = setInterval(() => {
        goTo(currentSlide < testimonials.length - 1 ? currentSlide + 1 : 0);
    }, 6000);

    track.closest(".testimonials-carousel").addEventListener("mouseenter", () => clearInterval(autoplay));
    track.closest(".testimonials-carousel").addEventListener("mouseleave", () => {
        autoplay = setInterval(() => {
            goTo(currentSlide < testimonials.length - 1 ? currentSlide + 1 : 0);
        }, 6000);
    });

    // Touch support
    let touchStartX = 0;
    track.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; });
    track.addEventListener("touchend", e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swipe left => in RTL this means previous
                goTo(currentSlide > 0 ? currentSlide - 1 : testimonials.length - 1);
            } else {
                goTo(currentSlide < testimonials.length - 1 ? currentSlide + 1 : 0);
            }
        }
    });
}

// ===== Contact Form =====
function initContactForm() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = form.fullName.value.trim();
        const phone = form.phone.value.trim();
        const email = form.email.value.trim();
        const topic = form.topic.value;
        const time = form.preferredTime.value;
        const message = form.message.value.trim();

        // Validate phone (Israeli format)
        const phoneRegex = /^0[0-9]{1,2}-?[0-9]{7}$/;
        if (!phoneRegex.test(phone.replace(/-/g, ""))) {
            alert("אנא הכניסי מספר טלפון תקין");
            form.phone.focus();
            return;
        }

        // Build WhatsApp message
        const topicText = topicMap[topic] || topic;
        const timeText = timeMap[time] || "";

        let waMessage = `היי שירז, הגעתי דרך האתר.\n`;
        waMessage += `שמי ${name} וניתן ליצור קשר עימי במספר ${phone}`;
        if (email) waMessage += ` או במייל ${email}`;
        waMessage += `.\n`;
        if (topic) waMessage += `אני מעוניינת בטיפול ${topicText}`;
        if (time && timeText) waMessage += ` בשעות ה${timeText}`;
        if (topic) waMessage += `.\n`;
        if (message) waMessage += `${message}\n`;
        waMessage += `תודה רבה!`;

        const waNumber = "972527772196";
        const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
        window.open(waURL, "_blank");

        form.reset();
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const elements = document.querySelectorAll("[data-animate]");
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add("animate-in");
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    elements.forEach(el => observer.observe(el));
}
