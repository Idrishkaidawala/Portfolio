document.addEventListener('DOMContentLoaded', () => {

    /* --- Scroll Reveal Animation --- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.section, .slide-up');
    sections.forEach(section => {
        observer.observe(section);
    });

    /* --- Smooth Scrolling & Mobile Menu --- */
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-link');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinksContainer.classList.toggle('nav-active');
            let icon = hamburger.querySelector('i');
            if(navLinksContainer.classList.contains('nav-active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            // Close mobile menu jumping
            if(navLinksContainer && navLinksContainer.classList.contains('nav-active')){
                navLinksContainer.classList.remove('nav-active');
                if(hamburger){
                    let icon = hamburger.querySelector('i');
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }

            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* --- Navbar Active State on Scroll --- */
    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if(scrollY >= (sectionTop - sectionHeight / 4)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') && link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    /* --- Premium Interactive Glass Orbs on Mouse Move --- */
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    
    // Desktop hover parallax
    document.addEventListener('mousemove', (e) => {
        if(window.innerWidth > 900) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            if(orb1 && orb2) {
                orb1.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
                orb2.style.transform = `translate(${x * -50}px, ${y * -50}px)`;
            }
        }
    });

    console.log("Premium Portfolio loaded securely.");
});
