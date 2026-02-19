// warung_manja/js/script.js
// JavaScript untuk Warung Manja Food

document.addEventListener('DOMContentLoaded', function() {
    // ========== HAMBURGER MENU ==========
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navbar = document.getElementById('navbar');
    
    if (hamburgerBtn && navbar) {
        hamburgerBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            navbar.classList.toggle('active');
            const icon = hamburgerBtn.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navbar.contains(event.target) && !hamburgerBtn.contains(event.target)) {
                navbar.classList.remove('active');
                const icon = hamburgerBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when link clicked
        const navLinks = document.querySelectorAll('.nav-link, .social-menu-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbar.classList.remove('active');
                const icon = hamburgerBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if(target) {
                e.preventDefault();
                target.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========== SCROLL TO TOP BUTTON ==========
    const scrollBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========== FALLBACK GAMBAR MENU ==========
    const menuCards = document.querySelectorAll('.card');
    
    menuCards.forEach(card => {
        const imgDiv = card.querySelector('.card-img');
        if (imgDiv) {
            const bgImage = window.getComputedStyle(imgDiv).backgroundImage;
            if (bgImage === 'none' || bgImage.includes('none') || bgImage.includes('url("")')) {
                imgDiv.style.backgroundColor = '#d8b4fe';
                imgDiv.style.backgroundImage = 'none';
                imgDiv.style.display = 'flex';
                imgDiv.style.alignItems = 'center';
                imgDiv.style.justifyContent = 'center';
                
                const title = card.querySelector('h3')?.innerText || 'Menu';
                let emoji = '🍽️';
                
                if (title.toLowerCase().includes('risol')) emoji = '🌯';
                else if (title.toLowerCase().includes('piscok')) emoji = '🍌';
                else if (title.toLowerCase().includes('sosis')) emoji = '🌭';
                else if (title.toLowerCase().includes('ager')) emoji = '🍮';
                
                imgDiv.innerHTML = `<span style="font-size:3rem; opacity:0.7;">${emoji}</span>`;
            }
        }
    });

    // ========== FALLBACK REKOMENDASI GAMBAR ==========
    const rekomendasiImgs = document.querySelectorAll('.rekomendasi-img');
    
    rekomendasiImgs.forEach(imgDiv => {
        const bgImage = window.getComputedStyle(imgDiv).backgroundImage;
        if (bgImage === 'none' || bgImage.includes('none') || bgImage.includes('url("")')) {
            imgDiv.style.backgroundColor = '#d8b4fe';
            imgDiv.style.backgroundImage = 'none';
            imgDiv.style.display = 'flex';
            imgDiv.style.alignItems = 'center';
            imgDiv.style.justifyContent = 'center';
            imgDiv.innerHTML = `<span style="font-size:2rem;">⭐</span>`;
        }
    });

    // ========== FALLBACK GAMBAR TOKO ==========
    const tokoImg = document.querySelector('.tentang-image .img-placeholder');
    if (tokoImg) {
        const bgImage = window.getComputedStyle(tokoImg).backgroundImage;
        if (bgImage === 'none' || bgImage.includes('none') || bgImage.includes('url("")')) {
            tokoImg.style.backgroundColor = '#e9d5ff';
            tokoImg.style.backgroundImage = 'none';
            tokoImg.style.display = 'flex';
            tokoImg.style.alignItems = 'center';
            tokoImg.style.justifyContent = 'center';
            tokoImg.innerHTML = `<i class="fas fa-store" style="font-size: 4rem; color: #6b21a5;"></i>`;
        }
    }

    // ========== VALIDASI LOGO ==========
    const logoImg = document.getElementById('logoImg');
    if (logoImg) {
        const imgTester = new Image();
        imgTester.src = 'assets/images/logo-warung-manja.jpg';
        imgTester.onerror = function() {
            logoImg.classList.add('fallback-logo');
        };
        
        const bgLogo = window.getComputedStyle(logoImg).backgroundImage;
        if (bgLogo === 'none' || bgLogo.includes('none')) {
            logoImg.classList.add('fallback-logo');
        }
    }

    // ========== UPDATE TAHUN ==========
    const copyrightElements = document.querySelectorAll('.copyright');
    const currentYear = new Date().getFullYear();
    copyrightElements.forEach(el => {
        el.innerHTML = el.innerHTML.replace(/2025/g, currentYear);
    });

    // ========== HIGHLIGHT NAVIGASI ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinks2 = document.querySelectorAll('.nav-link');
    
    function highlightNavigation() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks2.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
});