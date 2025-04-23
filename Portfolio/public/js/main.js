// DOM Elements
const loader = document.querySelector('.loader-container');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
const scrollTopBtn = document.querySelector('.scroll-top');
const skillProgress = document.querySelectorAll('.skill-progress');
const projectCards = document.querySelectorAll('.project-card');
const filterBtns = document.querySelectorAll('.filter-btn');
const modalBtns = document.querySelectorAll('.project-modal-btn');
const modals = document.querySelectorAll('.modal');
const closeModals = document.querySelectorAll('.close-modal');
const timelineItems = document.querySelectorAll('.timeline-item');
const contactForm = document.getElementById('contactForm');
const typingText = document.querySelector('.typing-text');

// Loader
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('loader-hidden');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
    
    // Start animations after loader is hidden
    animateHero();
    initSkillAnimation();
    animateTimelineItems();
    addHover3DEffect();
  }, 1500);
});

// Navigation
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    scrollTopBtn.classList.add('active');
  } else {
    navbar.classList.remove('scrolled');
    scrollTopBtn.classList.remove('active');
  }
  
  // Check if elements are in viewport
  checkElementsInViewport();
});

// Mobile Navigation
burger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  burger.classList.toggle('active');
});

// Close mobile navigation when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    burger.classList.remove('active');
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (this.getAttribute('href') === '#') return; // Skip scroll-top button
    
    const target = document.querySelector(this.getAttribute('href'));
    const navHeight = navbar.offsetHeight;
    
    window.scrollTo({
      top: target.offsetTop - navHeight,
      behavior: 'smooth'
    });
  });
});

// Scroll to top
scrollTopBtn.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Typing animation for hero section
function animateHero() {
  const professions = [
    'Développeur Web',
    'Développeur iOS',
    'Management Logistique',
    'Étudiant à Bordeaux'
  ];
  
  let professionIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function type() {
    const currentProfession = professions[professionIndex];
    
    if (isDeleting) {
      // Deleting characters
      typingText.textContent = currentProfession.substring(0, characterIndex - 1);
      characterIndex--;
      typingSpeed = 50;
    } else {
      // Typing characters
      typingText.textContent = currentProfession.substring(0, characterIndex + 1);
      characterIndex++;
      typingSpeed = 100;
    }
    
    // When finished typing
    if (!isDeleting && characterIndex === currentProfession.length) {
      isDeleting = true;
      typingSpeed = 1000; // Pause before deleting
    } 
    // When finished deleting
    else if (isDeleting && characterIndex === 0) {
      isDeleting = false;
      professionIndex = (professionIndex + 1) % professions.length;
      typingSpeed = 300; // Pause before typing new word
    }
    
    setTimeout(type, typingSpeed);
  }
  
  // Start typing animation
  setTimeout(type, 1000);
}

// Check if elements are in viewport for animations
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    rect.bottom >= 0
  );
}

function checkElementsInViewport() {
  // Animate project cards when in viewport
  projectCards.forEach(card => {
    if (isInViewport(card) && !card.classList.contains('show')) {
      card.classList.add('show');
    }
  });
  
  // Animate skill bars when in viewport
  skillProgress.forEach(skill => {
    if (isInViewport(skill) && !skill.style.width) {
      const progress = skill.getAttribute('data-progress');
      skill.style.width = `${progress}%`;
    }
  });
}

// Timeline animation améliorée
function animateTimelineItems() {
  const timelineContents = document.querySelectorAll('.timeline-content');
  
  timelineContents.forEach((content, index) => {
    // Réduire le délai entre chaque élément
    const delay = index * 100; // Réduit de 200ms à 100ms
    content.style.transitionDelay = `${delay}ms`;
  });
  
  // Check si les éléments sont dans le viewport pour ajouter la classe show
  function checkTimelineInView() {
    timelineContents.forEach((content) => {
      const rect = content.getBoundingClientRect();
      // Augmenter la valeur pour déclencher l'animation plus tôt
      const isInViewport = 
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.95 && // Augmenté de 0.85 à 0.95
        rect.bottom >= 0;
      
      if (isInViewport && !content.classList.contains('show')) {
        content.classList.add('show');
      }
    });
  }
  
  // Animer les éléments au chargement de la page si visibles
  checkTimelineInView();
  
  // Ajouter un event listener pour le scroll
  window.addEventListener('scroll', checkTimelineInView);
}

// Initialize skill animation
function initSkillAnimation() {
  setTimeout(() => {
    checkElementsInViewport();
  }, 500);
}

// Project filtering
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    // Filter projects
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
        setTimeout(() => {
          card.classList.add('show');
        }, 100);
      } else {
        card.classList.remove('show');
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Project modals
modalBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const project = btn.getAttribute('data-project');
    const modal = document.getElementById(`${project}Modal`);
    
    if (modal) {
      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  });
});

// Close modal buttons
closeModals.forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    const modal = closeBtn.closest('.modal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
  });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
  modals.forEach(modal => {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  });
});

// Contact form submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('formSuccessMessage');
    
    if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
      alert('Veuillez remplir tous les champs du formulaire.');
      return;
    }
    
    // Construire les données de formulaire
    const formData = new FormData(contactForm);
    
    // Désactiver le bouton de soumission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
    
    // Envoyer à Netlify
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString()
    })
    .then(response => {
      if (response.ok) {
        // Succès - afficher le message
        successMessage.style.display = 'block';
        contactForm.reset();
        
        // Faire défiler vers le message de succès
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Cacher le message après 5 secondes
        setTimeout(() => {
          successMessage.style.display = 'none';
        }, 5000);
      } else {
        throw new Error('Erreur lors de l\'envoi du formulaire');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer ultérieurement.');
    })
    .finally(() => {
      // Réactiver le bouton de soumission
      submitButton.disabled = false;
      submitButton.innerHTML = 'Envoyer';
    });
  });
}

// Update active nav link based on scroll position
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= (sectionTop - navbar.offsetHeight - 100)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Ajout d'effet hover 3D sur les timeline items
function addHover3DEffect() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach((item) => {
    const content = item.querySelector('.timeline-content');
    
    item.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 768) return; // Désactiver sur mobile
      
      const rect = content.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xRotation = (y - rect.height / 2) / 20;
      const yRotation = -(x - rect.width / 2) / 20;
      
      content.style.transform = `
        perspective(1000px)
        rotateX(${xRotation}deg)
        rotateY(${yRotation}deg)
        translateZ(10px)
      `;
    });
    
    item.addEventListener('mouseleave', () => {
      content.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
} 