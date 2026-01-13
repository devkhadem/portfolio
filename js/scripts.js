/*!
*   Khademul Islam - Ultramodern Portfolio JS - World Class Upgrade v2
*   Copyright 2025
*/

window.addEventListener('DOMContentLoaded', event => {

    // --- SMOOTH SCROLL & ACTIVE LINK LOGIC ---
    const setActiveLink = (targetId) => {
        document.querySelectorAll('.sidebar-menu .nav-link').forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.navbar-nav .nav-item .nav-link[href*="${targetId}"]`);
        if (activeLink) activeLink.classList.add('active');
    };

    document.querySelectorAll('a.js-scroll-trigger, a.back-to-top').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                // If mobile sidebar is open, close it when a scroll trigger is activated
                if (window.innerWidth < 992 && sidebar.classList.contains('sidebar-open')) {
                    sidebar.classList.remove('sidebar-open');
                    overlay.classList.remove('active');
                }
            }
        });
    });

    // --- SECTION VISIBILITY & SCROLLSPY ---
    const sections = document.querySelectorAll('.resume-section');
    if (sections.length > 0) {
        sections[0].classList.add('is-visible');
        setActiveLink(sections[0].id);
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                setActiveLink(entry.target.id);
            }
        });
    }, { rootMargin: '0px 0px -40% 0px', threshold: 0.1 });
    sections.forEach(section => observer.observe(section));


    // --- UPGRADE V2: PORTFOLIO 3D TILT & GLARE EFFECT ---
    // Disable on mobile to prevent interference with touch/scroll
    if (window.innerWidth > 992) {
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Set CSS variables for glare effect
                item.style.setProperty('--mouse-x', `${x}px`);
                item.style.setProperty('--mouse-y', `${y}px`);

                // 3D Tilt Effect
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -8; // Max rotation 8deg
                const rotateY = ((x - centerX) / centerX) * 8;
                item.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'rotateX(0) rotateY(0)';
            });
        });
    }

    // --- NEW COLLAPSIBLE SIDEBAR LOGIC ---
    const sidebar = document.getElementById('sideNav');
    const toggleBtn = document.querySelector('.toggle-btn');
    const mainContent = document.querySelector('.main-content');
    const footer = document.querySelector('.footer-section');

    if (sidebar && toggleBtn && mainContent && footer) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('collapsed');
            footer.classList.toggle('collapsed');
        });
    }

    // --- NEW MOBILE SIDEBAR LOGIC ---
    const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
    const overlay = document.getElementById('main-content-overlay');

    if (mobileToggleBtn && sidebar && overlay) {
        mobileToggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('sidebar-open');
            overlay.classList.toggle('active');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('sidebar-open');
            overlay.classList.remove('active');
        });
    }

    // Close mobile sidebar when a nav link is clicked
    document.querySelectorAll('.sidebar-menu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (sidebar.classList.contains('sidebar-open')) {
                sidebar.classList.remove('sidebar-open');
                overlay.classList.remove('active');
            }
        });
    });




    // --- 3D PROFILE EFFECT (Sidebar) ---
    // Disable on mobile to prevent interference with touch/scroll
    if (window.innerWidth > 992) {
        const sideNav = document.getElementById('sideNav');
        const profileWrapper = document.querySelector('.profile-3d-wrapper');
        if (sideNav && profileWrapper) {
            sideNav.addEventListener('mousemove', (e) => {
                const rect = sideNav.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                profileWrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
            });
            sideNav.addEventListener('mouseleave', () => {
                profileWrapper.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
            });
        }
    }


    // --- PARTICLES.JS BACKGROUND ---
    if(document.getElementById('particles-js')){
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 1, "direction": "none", "out_mode": "out" }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } }, "push": { "particles_nb": 4 } }
            },
            "retina_detect": true
        });
    }
});