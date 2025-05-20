
// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Update year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Initialize Custom Cursor
    initCustomCursor();
    
    // Mobile menu toggle
    initMobileMenu();

    // Smooth scrolling for anchor links
    initSmoothScrolling();
    
    // Add active state to navbar links based on scroll position
    highlightNavLink();
    window.addEventListener('scroll', highlightNavLink);
    
    // Add fade-in animations on scroll
    initFadeInAnimations();

    // Project filtering
    initProjectFilters();
});

// Custom cursor functionality
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorBorder = document.querySelector('.cursor-border');
    
    if (!cursorDot || !cursorBorder || window.innerWidth < 768) return;
    
    const moveCursor = (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        cursorBorder.style.left = `${posX}px`;
        cursorBorder.style.top = `${posY}px`;
    };
    
    window.addEventListener('mousemove', moveCursor);
    
    const handleMouseOver = (e) => {
        if (
            e.target.tagName === 'A' || 
            e.target.tagName === 'BUTTON' || 
            e.target.closest('a') || 
            e.target.closest('button')
        ) {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorDot.style.backgroundColor = 'rgba(0, 168, 232, 0.3)';
            cursorBorder.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDot.style.backgroundColor = 'rgba(0, 168, 232, 0.5)';
            cursorBorder.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    };
    
    document.addEventListener('mouseover', handleMouseOver);
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    let mobileMenu = null;
    let isMenuOpen = false;
    
    if (!mobileMenuBtn) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        if (!mobileMenu) {
            createMobileMenu();
        }
        
        toggleMobileMenu();
    });
    
    function createMobileMenu() {
        mobileMenu = document.createElement('div');
        mobileMenu.classList.add('mobile-menu');
        mobileMenu.innerHTML = `
            <nav>
                <a href="#about" class="mobile-nav-link">About</a>
                <a href="#skills" class="mobile-nav-link">Skills</a>
                <a href="#education" class="mobile-nav-link">Education</a>
                <a href="#experience" class="mobile-nav-link">Experience</a>
                <a href="#projects" class="mobile-nav-link">Projects</a>
                <a href="#events" class="mobile-nav-link">Events</a>
                <a href="#contact" class="mobile-nav-link">Contact</a>
            </nav>
        `;
        
        document.body.appendChild(mobileMenu);
        
        // Add click event listeners to mobile nav links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleMobileMenu();
            });
        });
    }
    
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenu.classList.add('open');
            mobileMenuBtn.classList.add('open');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('open');
            mobileMenuBtn.classList.remove('open');
            document.body.style.overflow = '';
        }
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// Highlight active nav link based on scroll position
function highlightNavLink() {
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Initialize fade-in animations on scroll
function initFadeInAnimations() {
    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Handle scroll event
    function handleScroll() {
        const fadeElements = document.querySelectorAll('.fade-in-section');
        fadeElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('is-visible');
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load
}

// Initialize project filtering
function initProjectFilters() {
    const filters = document.querySelectorAll('.project-filter');
    const projects = document.querySelectorAll('.project-card');
    
    if (!filters.length || !projects.length) return;
    
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Update active filter
            filters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-filter');
            
            // Filter projects
            projects.forEach(project => {
                if (category === 'all') {
                    project.style.display = 'block';
                } else {
                    const categories = project.getAttribute('data-categories').split(' ');
                    if (categories.includes(category)) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                }
            });
        });
    });
}
