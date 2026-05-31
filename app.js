document.addEventListener('DOMContentLoaded', () => {
    // Check if portfolioData is loaded
    if (!window.portfolioData) {
        console.error("portfolioData is not available. Please verify portfolio-data.js.");
        return;
    }

    const data = window.portfolioData;

    /* ====================================================
       DOM ELEMENTS SELECTORS
       ==================================================== */
    const navLogoName = document.getElementById('nav-logo-name');
    const heroName = document.getElementById('hero-name');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroAboutBrief = document.getElementById('hero-about-brief');
    
    // Social Links
    const socialLinkedin = document.getElementById('social-linkedin');
    const socialGithub = document.getElementById('social-github');
    const socialEmail = document.getElementById('social-email');
    
    // About Section
    const aboutFullText = document.getElementById('about-full-text');
    const aboutLocation = document.getElementById('about-location');
    const educationTimeline = document.getElementById('education-timeline');
    
    // Skills Section
    const skillsGrid = document.getElementById('skills-grid');
    
    // Projects Section
    const projectsContainer = document.getElementById('projects-container');
    
    // Contact Info & Achievements
    const contactEmailVal = document.getElementById('contact-email-val');
    const contactPhoneVal = document.getElementById('contact-phone-val');
    const achievementsList = document.getElementById('achievements-list');
    
    // Forms & Feedback
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    
    // Drawer & Modals
    const customizerDrawer = document.getElementById('customizer-drawer');
    const customizerOverlay = document.getElementById('customizer-overlay');
    const customizerOpenBtn = document.getElementById('customizer-open-btn');
    const customizerCloseBtn = document.getElementById('customizer-close-btn');
    
    const projectModal = document.getElementById('project-modal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalTech = document.getElementById('modal-tech');
    const modalDesc = document.getElementById('modal-desc');
    const modalActionBtn = document.getElementById('modal-action-btn');
    
    // Customizer Input Fields
    const pickerPrimary = document.getElementById('picker-primary');
    const pickerSecondary = document.getElementById('picker-secondary');
    const inputName = document.getElementById('input-name');
    const inputTitle = document.getElementById('input-title');
    const inputLocation = document.getElementById('input-location');
    const inputEmail = document.getElementById('input-email');
    const inputPhone = document.getElementById('input-phone');
    const inputAbout = document.getElementById('input-about');
    
    const btnCopyConfig = document.getElementById('btn-copy-config');
    const btnDownloadConfig = document.getElementById('btn-download-config');

    /* ====================================================
       INITIAL RENDERING SYSTEM
       ==================================================== */
    function renderPortfolio() {
        // Name & Subtitles
        const firstName = data.name.split(' ')[0] || data.name;
        navLogoName.textContent = data.name.split(' ').slice(1).join(' ') || firstName;
        heroName.textContent = data.name;
        heroSubtitle.textContent = data.title;
        heroAboutBrief.textContent = data.about.length > 180 ? data.about.substring(0, 180) + '...' : data.about;
        
        // About Section
        aboutFullText.textContent = data.about;
        aboutLocation.textContent = data.location;
        
        // Social Link Elements
        socialLinkedin.href = data.socials.linkedin || '#';
        socialGithub.href = data.socials.github || '#';
        socialEmail.href = data.socials.email || '#';
        
        // Contact Details
        contactEmailVal.textContent = data.email;
        contactEmailVal.href = `mailto:${data.email}`;
        contactPhoneVal.textContent = data.phone;
        contactPhoneVal.href = `tel:${data.phone.replace(/\s+/g, '')}`;
        
        // Render Education Timeline
        educationTimeline.innerHTML = '';
        data.education.forEach((edu) => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <h4 class="timeline-title">${edu.degree}</h4>
                        <span class="timeline-date">${edu.period}</span>
                    </div>
                    <div class="timeline-institution">${edu.institution}</div>
                    <p class="timeline-desc">${edu.details}</p>
                    <span class="timeline-grade">${edu.grade}</span>
                </div>
            `;
            educationTimeline.appendChild(item);
        });

        // Render Technical Skills Categories
        skillsGrid.innerHTML = '';
        
        // Helper mapping for category icons and display names
        const categoryMap = {
            programming: { name: "Programming", icon: "code" },
            electronics: { name: "Electronics", icon: "microchip" },
            cybersecurity: { name: "Cybersecurity", icon: "shield-alt" },
            tools: { name: "Engineering Tools", icon: "tools" },
            softSkills: { name: "Professional Strengths", icon: "user-astronaut" }
        };

        Object.keys(data.skills).forEach((catKey) => {
            const cat = categoryMap[catKey] || { name: catKey, icon: "circle" };
            const list = data.skills[catKey];
            
            const card = document.createElement('div');
            card.className = 'skill-category-card glass-card';
            
            let pillsHtml = '';
            list.forEach(skill => {
                pillsHtml += `<span class="skill-pill"><i class="fas fa-terminal"></i> ${skill}</span>`;
            });
            
            card.innerHTML = `
                <h3><i class="fas fa-${cat.icon} accent-icon"></i> ${cat.name}</h3>
                <div class="skill-list">
                    ${pillsHtml}
                </div>
            `;
            skillsGrid.appendChild(card);
        });

        // Render Projects Cards
        projectsContainer.innerHTML = '';
        data.projects.forEach((proj) => {
            const card = document.createElement('div');
            card.className = 'project-card glass-card';
            
            let techTagsHtml = '';
            proj.tech.forEach(t => {
                techTagsHtml += `<span class="tech-tag">${t}</span>`;
            });

            card.innerHTML = `
                <div>
                    <div class="project-card-header">
                        <span class="project-badge">${proj.category}</span>
                        <div class="project-icon"><i class="fas fa-folder-open"></i></div>
                    </div>
                    <h3 class="project-title">${proj.title}</h3>
                    <p class="project-desc">${proj.description}</p>
                    <div class="project-tech">
                        ${techTagsHtml}
                    </div>
                </div>
                <div class="project-card-footer">
                    <a href="#" class="card-link learn-more-btn" data-project-id="${proj.id}">
                        Learn More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `;
            projectsContainer.appendChild(card);
        });

        // Render Certifications / Achievements List
        achievementsList.innerHTML = '';
        data.certifications.forEach(cert => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-circle-check"></i> ${cert}`;
            achievementsList.appendChild(li);
        });
        
        // Modal Events Bind
        document.querySelectorAll('.learn-more-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const pId = btn.getAttribute('data-project-id');
                const project = data.projects.find(p => p.id === pId);
                if (project) {
                    openProjectModal(project);
                }
            });
        });
    }

    /* ====================================================
       PROJECT DETAIL MODAL
       ==================================================== */
    function openProjectModal(project) {
        modalTitle.textContent = project.title;
        modalCategory.textContent = project.category;
        modalDesc.textContent = project.description;
        
        modalTech.innerHTML = '';
        project.tech.forEach(t => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = t;
            modalTech.appendChild(tag);
        });

        projectModal.classList.add('active');
    }

    function closeProjectModal() {
        projectModal.classList.remove('active');
    }

    modalCloseBtn.addEventListener('click', closeProjectModal);
    modalActionBtn.addEventListener('click', closeProjectModal);
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) closeProjectModal();
    });

    /* ====================================================
       INTERACTIVE CANVAS PARTICLE SYSTEM (Circuit Node/Cyber Matrix)
       ==================================================== */
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 2 + 1.5;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 12;
            
            // Random direction
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
        }

        draw() {
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }

        update() {
            // Drift slightly
            this.x += this.vx;
            this.y += this.vy;

            // Boundary checks
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

            // Mouse Interaction: Magnetic repulsion/attraction
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let maxDistance = mouse.radius;
                    let force = (maxDistance - distance) / maxDistance;
                    
                    // Repel force
                    let directionX = forceDirectionX * force * this.density * 0.5;
                    let directionY = forceDirectionY * force * this.density * 0.5;
                    
                    this.x -= directionX;
                    this.y -= directionY;
                }
            }
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.min(Math.floor((canvas.width * canvas.height) / 14000), 100);
        for (let i = 0; i < count; i++) {
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            particles.push(new Particle(x, y));
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].draw();
            particles[i].update();
        }
        
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    // Connect close nodes to form high-tech circuit board connections
    function connectParticles() {
        let maxDist = 120;
        let opacityVal = 0.12;
        let primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
        
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDist) {
                    let alpha = (1 - (distance / maxDist)) * opacityVal;
                    ctx.strokeStyle = primaryColor.startsWith('#') ? 
                        hexToRgba(primaryColor, alpha) : `rgba(0, 240, 255, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Hex converter helper for dynamic canvas colors
    function hexToRgba(hex, alpha) {
        let c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c = hex.substring(1).split('');
            if(c.length === 3){
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c>>16)&255, (c>>8)&255, c&255].join(',') + ',' + alpha + ')';
        }
        return `rgba(0, 240, 255, ${alpha})`;
    }

    initParticles();
    animateParticles();
    window.addEventListener('resize', initParticles);

    /* ====================================================
       THEME AND NAVIGATION SYSTEM
       ==================================================== */
    // Scroll shrink navigation bar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('shrunk');
        } else {
            navbar.classList.remove('shrunk');
        }
        
        // Update active nav link on scroll
        let currentSection = 'hero';
        document.querySelectorAll('section').forEach(sec => {
            const secTop = sec.offsetTop - 120;
            if (window.scrollY >= secTop) {
                currentSection = sec.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Dark / Light Theme Toggle Action
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Read cached preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.className = 'fas fa-sun';
            themeToggle.style.boxShadow = '0 0 10px rgba(255, 123, 0, 0.3)';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggle.style.boxShadow = 'none';
        }
    }

    // Mobile Navbar Hamburguer Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileNavToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'var(--nav-bg)';
        navLinks.style.padding = '1.5rem';
        navLinks.style.gap = '1rem';
        navLinks.style.borderBottom = '1px solid var(--card-border)';
    });

    /* ====================================================
       INTERSECTION OBSERVER (Scroll Fade Reveal)
       ==================================================== */
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        revealObserver.observe(el);
    });

    /* ====================================================
       CONTACT FORM SUBMITTER
       ==================================================== */
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const submitBtnSpan = submitBtn.querySelector('span');
        const submitBtnIcon = submitBtn.querySelector('i');
        
        // Set loading state
        submitBtn.disabled = true;
        submitBtnSpan.textContent = 'Encrypting & Sending...';
        submitBtnIcon.className = 'fas fa-spinner fa-spin';
        formFeedback.className = 'form-feedback hidden';
        
        // Simulate high-tech network post submission
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtnSpan.textContent = 'Message Sent';
            submitBtnIcon.className = 'fas fa-check-circle';
            submitBtn.classList.remove('primary-btn');
            submitBtn.style.background = '#10b981';
            submitBtn.style.color = '#ffffff';
            
            formFeedback.textContent = `Thank you, ${document.getElementById('form-name').value}! Your message has been sent successfully. N Shanmugapriya will get back to you shortly.`;
            formFeedback.classList.remove('hidden');
            formFeedback.className = 'form-feedback success';
            
            contactForm.reset();
            
            // Reset button after delay
            setTimeout(() => {
                submitBtnSpan.textContent = 'Send Message';
                submitBtnIcon.className = 'fas fa-paper-plane';
                submitBtn.removeAttribute('style');
                submitBtn.className = 'cta-btn primary-btn block-btn';
            }, 6000);
        }, 1800);
    });

    /* ====================================================
       LIVE PORTFOLIO CUSTOMIZER DRAWER ACTIONS
       ==================================================== */
    function openCustomizer() {
        // Initialize values inside the customizer drawer with current portfolio state
        pickerPrimary.value = data.theme.primaryColor;
        pickerSecondary.value = data.theme.secondaryColor;
        inputName.value = data.name;
        inputTitle.value = data.title;
        inputLocation.value = data.location;
        inputEmail.value = data.email;
        inputPhone.value = data.phone;
        inputAbout.value = data.about;
        
        customizerDrawer.classList.add('active');
        customizerOverlay.classList.add('active');
    }

    function closeCustomizer() {
        customizerDrawer.classList.remove('active');
        customizerOverlay.classList.remove('active');
    }

    customizerOpenBtn.addEventListener('click', openCustomizer);
    customizerCloseBtn.addEventListener('click', closeCustomizer);
    customizerOverlay.addEventListener('click', closeCustomizer);

    // Color Pickers Real-Time update
    pickerPrimary.addEventListener('input', (e) => {
        const val = e.target.value;
        document.documentElement.style.setProperty('--primary', val);
        data.theme.primaryColor = val;
        // Dynamic re-render shadows
        document.documentElement.style.setProperty('--shadow-color', `${val}26`);
    });

    pickerSecondary.addEventListener('input', (e) => {
        const val = e.target.value;
        document.documentElement.style.setProperty('--secondary', val);
        data.theme.secondaryColor = val;
    });

    // Bio profile inputs listener for instantaneous DOM updating
    inputName.addEventListener('input', (e) => {
        data.name = e.target.value;
        renderPortfolio();
    });

    inputTitle.addEventListener('input', (e) => {
        data.title = e.target.value;
        renderPortfolio();
    });

    inputLocation.addEventListener('input', (e) => {
        data.location = e.target.value;
        renderPortfolio();
    });

    inputEmail.addEventListener('input', (e) => {
        data.email = e.target.value;
        renderPortfolio();
    });

    inputPhone.addEventListener('input', (e) => {
        data.phone = e.target.value;
        renderPortfolio();
    });

    inputAbout.addEventListener('input', (e) => {
        data.about = e.target.value;
        renderPortfolio();
    });

    // Copy configuration JSON
    btnCopyConfig.addEventListener('click', () => {
        navigator.clipboard.writeText(JSON.stringify(data, null, 2))
            .then(() => {
                btnCopyConfig.innerHTML = '<i class="fas fa-check"></i> Copied to Clipboard!';
                btnCopyConfig.style.background = 'rgba(16, 185, 129, 0.15)';
                btnCopyConfig.style.color = '#10b981';
                setTimeout(() => {
                    btnCopyConfig.innerHTML = '<i class="fas fa-copy"></i> Copy Configuration';
                    btnCopyConfig.removeAttribute('style');
                }, 3000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    });

    // Download configuration JSON
    btnDownloadConfig.addEventListener('click', () => {
        const fileContent = JSON.stringify(data, null, 2);
        const blob = new Blob([fileContent], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement("a");
        a.href = url;
        a.download = `portfolio-config-${data.name.toLowerCase().replace(/\s+/g, '-')}.json`;
        document.body.appendChild(a);
        a.click();
        
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });

    /* ====================================================
       INITIALIZATION CALLS
       ==================================================== */
    // Apply initial customizer theme colors
    document.documentElement.style.setProperty('--primary', data.theme.primaryColor);
    document.documentElement.style.setProperty('--secondary', data.theme.secondaryColor);
    
    // Initial Render
    renderPortfolio();
});
