document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (!hamburger || !navMenu) return;

  const toggleMenu = (e) => {
    if (e) e.preventDefault();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('nav-open'); // lock background scroll
  };

  // Use pointer events on mobile; fall back to click elsewhere
  const activationEvent = window.PointerEvent ? 'pointerup' : 'click';
  hamburger.addEventListener(activationEvent, toggleMenu);

  // Close on link tap
  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('nav-open');
    });
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-item').forEach(el => {
    observer.observe(el);
});

// Form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handler)
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Statistics counter animation
const animateStats = () => {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (stat.textContent.includes('%')) {
                stat.textContent = Math.floor(current) + '%';
            } else if (stat.textContent.includes('+')) {
                stat.textContent = Math.floor(current) + '+';
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 20);
    });
};

// Trigger stats animation when section comes into view
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statsObserver.observe(statsSection);
}

// Code preview hover effects
const codePreview = document.querySelector('.code-preview');
if (codePreview) {
    codePreview.addEventListener('mouseenter', () => {
        codePreview.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(2deg) scale(1.02)';
    });
    
    codePreview.addEventListener('mouseleave', () => {
        codePreview.style.transform = 'perspective(1000px) rotateY(-15deg) rotateX(5deg) scale(1)';
    });
}

// Project cards interaction
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.15)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.1)';
    });
});

// Copy to clipboard functionality for code blocks
document.querySelectorAll('pre code').forEach(codeBlock => {
    const copyButton = document.createElement('button');
    copyButton.innerHTML = '<i class="fas fa-copy"></i>';
    copyButton.className = 'copy-btn';
    copyButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        padding: 8px;
        border-radius: 4px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const preElement = codeBlock.parentElement;
    preElement.style.position = 'relative';
    preElement.appendChild(copyButton);
    
    preElement.addEventListener('mouseenter', () => {
        copyButton.style.opacity = '1';
    });
    
    preElement.addEventListener('mouseleave', () => {
        copyButton.style.opacity = '0';
    });
    
    copyButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(codeBlock.textContent);
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Add keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'k':
                e.preventDefault();
                // Focus on navigation or search
                document.querySelector('.nav-menu a')?.focus();
                break;
        }
    }
    
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
});

// Performance optimization: Debounce scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Optimized scroll handler
const handleScroll = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', handleScroll);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage) {
        setTimeout(() => {
            heroContent.classList.add('fade-in-up');
        }, 200);
        
        setTimeout(() => {
            heroImage.classList.add('fade-in-up');
        }, 400);
    }
    
    // Preload critical images
    const criticalImages = [
        // Add any critical image URLs here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Contact information click handlers
document.querySelectorAll('.contact-item').forEach(item => {
    const icon = item.querySelector('i');
    const text = item.querySelector('p').textContent;
    
    item.addEventListener('click', () => {
        if (icon.classList.contains('fa-envelope')) {
            window.location.href = `mailto:${text}`;
        } else if (icon.classList.contains('fa-phone')) {
            window.location.href = `tel:${text}`;
        } else if (icon.classList.contains('fa-linkedin')) {
            window.open(`https://linkedin.com/in/${text}`, '_blank');
        }
    });
    
    // Add cursor pointer
    item.style.cursor = 'pointer';
});
/* ---- Chart.js Dashboard ---- */
const blue = getComputedStyle(document.documentElement)
              .getPropertyValue('--primary-color') || '#2563eb';

/* 1. Pie – Vertriebsregionen */
new Chart(document.getElementById('comboChart'), {
  type: 'bar',       // Gesamtchart ist "bar"
  data: {
    labels: ['2023', '2024', '2025', 'OKP', 'VVG', 'Vorsorge'],
    datasets: [
      {
        label: 'Baseline Abschlüsse (3 Jahre)',
        type: 'line',
        data: [20000, 230000, 25000, null, null, null],        // Nur für die 3 Jahre gültig
        borderColor: '#FF8A00',
        backgroundColor: 'rgba(255, 138, 0, 0.08)',
        fill: true,
        tension: 0.3,
        yAxisID: 'y'
      },
      {
        label: 'Abschlüsse nach Sparte',
        type: 'bar',
        data: [null, null, null, 18000, 15000, 10000],          // Nur für die Sparten gültig
        backgroundColor: [
          '#FF8A00',
          '#FFD6A3',
          '#ffe5c0'
        ],
        yAxisID: 'y'
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#FF8A00',
          font: { size: 15 }
        }
      },
      title: {
        display: true,
        text: 'Abschlüsse Baseline & nach Sparte (kombiniert)',
        color: '#FF8A00',
        font: { weight: 'bold', size: 20 }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Abschlüsse' }
      }
    }
  }
});
    // Datenverteilung angepasst, du kannst die Werte je nach realem Anteil ändern
    datasets: [{
      data: [30, 20, 20, 15, 15],
      backgroundColor: [
        '#2563eb', // Zentralschweiz
        '#4183ec', // Westschweiz
        '#60a5fa', // Nordschweiz
        '#93c5fd', // Tessin
        '#bfdbfe'  // Zürich
      ]
    }]
  },
  options: {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#2563eb',    // Portfolio-Blau für die Legende
          font: { size: 16, weight: 'bold' },
          boxWidth: 24,
          padding: 18
        }
      }
    }
  }
});


/* 2. Bar – Abschlüsse nach Sparte */
new Chart(document.getElementById('barAbschluesse'), {
  type:'bar',
  data:{
    labels:['OKP','VVG','Vorsorge'],
    datasets:[{data:[18000,15000,10000],
      backgroundColor:['#2563eb','#1e40af','#3b82f6']}]
  },
  options:{
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.6,   // Grafik ist breiter als hoch
    plugins:{legend:{display:false}},
    scales:{y:{beginAtZero:true}}
}});

/* 3. Line – Baseline letzte 3 Jahre */
new Chart(document.getElementById('lineBaseline'), {
  type:'line',
  data:{
    labels:['2023','2024','2025'],
    datasets:[{data:[20000,230000,25000],
      borderColor:blue,backgroundColor:'rgba(37,99,235,.15)',fill:true,tension:.3}]
  },
  options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}
});

/* 4. Progress-Kreise – Abschlussziele */
const goals=[{id:'circleZiel1',val:80},{id:'circleZiel2',val:55},{id:'circleZiel3',val:65}];
goals.forEach(g=>{
  new Chart(document.getElementById(g.id),{
    type:'doughnut',
    data:{datasets:[{data:[g.val,100-g.val],
      backgroundColor:[blue,'#e5e7eb']}]},
    options:{cutout:'70%',plugins:{legend:{display:false},tooltip:{enabled:false}}}
  });
});

/* 5. KPI-Cards */
document.getElementById('kpiTermine').textContent = '12 000';
document.getElementById('kpiLeads').textContent   = '90 000';
document.getElementById('kpiBudget').textContent  = 'CHF 20 000';

