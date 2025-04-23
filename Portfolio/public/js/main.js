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
const techNetwork = document.querySelector('.tech-network');
const networkNodes = document.querySelectorAll('.tech-network .node');
const connections = document.querySelectorAll('.tech-network .connection');

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
    initTechNetwork();
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

// Tech Network Animation
function initTechNetwork() {
  if (!techNetwork) return;
  
  // Setup connections dynamically
  setupConnections();
  
  // Add interactive behavior
  networkNodes.forEach(node => {
    // Highlight connections and connected nodes on hover
    node.addEventListener('mouseenter', () => highlightConnections(node));
    node.addEventListener('mouseleave', () => resetConnections());
    
    // Add 3D tilt effect on mousemove
    node.addEventListener('mousemove', handleNodeMouseMove);
  });
  
  // Add 3D perspective effect to entire network
  techNetwork.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = techNetwork.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    // Ajuster la transformation pour que le mouvement soit cohérent avec la position du curseur
    techNetwork.style.transform = `
      perspective(1000px)
      rotateY(${-x * 15}deg)
      rotateX(${y * 15}deg)
      translateZ(10px)
    `;
    
    // Déplacer légèrement le nœud central en fonction de la position du curseur
    const centerNode = document.querySelector('.node.center');
    if (centerNode) {
      centerNode.style.transform = `
        translate(${x * 15}px, ${y * 15}px)
        scale(1.05)
      `;
    }
  });
  
  techNetwork.addEventListener('mouseleave', () => {
    techNetwork.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
    
    // Réinitialiser la position du nœud central
    const centerNode = document.querySelector('.node.center');
    if (centerNode) {
      centerNode.style.transform = '';
    }
  });
  
  // Animate connections with random periods
  animateConnections();
}

function setupConnections() {
  // Position each connection between its nodes
  const nodePositions = {
    n1: document.querySelector('.n1'),
    n2: document.querySelector('.n2'),
    n3: document.querySelector('.n3'),
    n4: document.querySelector('.n4'),
    n5: document.querySelector('.n5'),
    center: document.querySelector('.node.center')
  };
  
  // Connection: node1 - node2
  positionConnection(document.querySelector('.c1-2'), nodePositions.n1, nodePositions.n2);
  
  // Connection: node1 - center
  positionConnection(document.querySelector('.c1-6'), nodePositions.n1, nodePositions.center);
  
  // Connection: node2 - node3
  positionConnection(document.querySelector('.c2-3'), nodePositions.n2, nodePositions.n3);
  
  // Connection: node2 - center
  positionConnection(document.querySelector('.c2-6'), nodePositions.n2, nodePositions.center);
  
  // Connection: node3 - node4
  positionConnection(document.querySelector('.c3-4'), nodePositions.n3, nodePositions.n4);
  
  // Connection: node3 - center
  positionConnection(document.querySelector('.c3-6'), nodePositions.n3, nodePositions.center);
  
  // Connection: node4 - node5
  positionConnection(document.querySelector('.c4-5'), nodePositions.n4, nodePositions.n5);
  
  // Connection: node4 - center
  positionConnection(document.querySelector('.c4-6'), nodePositions.n4, nodePositions.center);
  
  // Connection: node5 - center
  positionConnection(document.querySelector('.c5-6'), nodePositions.n5, nodePositions.center);
  
  // Connection: node5 - node1
  positionConnection(document.querySelector('.c5-1'), nodePositions.n5, nodePositions.n1);
}

function positionConnection(connectionElement, fromNode, toNode) {
  if (!connectionElement || !fromNode || !toNode) return;
  
  const fromRect = fromNode.getBoundingClientRect();
  const toRect = toNode.getBoundingClientRect();
  const networkRect = techNetwork.getBoundingClientRect();
  
  // Calculate positions relative to the tech-network container
  const fromX = (fromRect.left + fromRect.width/2) - networkRect.left;
  const fromY = (fromRect.top + fromRect.height/2) - networkRect.top;
  const toX = (toRect.left + toRect.width/2) - networkRect.left;
  const toY = (toRect.top + toRect.height/2) - networkRect.top;
  
  // Calculate length and angle
  const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
  const angle = Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI;
  
  // Set the connection style
  connectionElement.style.width = `${length}px`;
  connectionElement.style.left = `${fromX}px`;
  connectionElement.style.top = `${fromY}px`;
  connectionElement.style.transform = `rotate(${angle}deg)`;
  
  // Store the nodes this connection links for future reference
  connectionElement.dataset.from = fromNode.className.split(' ')[1];
  connectionElement.dataset.to = toNode.className.split(' ')[1];
}

function highlightConnections(node) {
  // Get the class name of the node (e.g., "n1", "center", etc.)
  const nodeClass = node.className.split(' ')[1];
  
  // Reset all nodes and connections
  networkNodes.forEach(n => n.style.opacity = '0.6');
  connections.forEach(c => c.style.opacity = '0.3');
  
  // Highlight the selected node
  node.style.opacity = '1';
  node.style.transform = 'scale(1.2)';
  
  // Highlight connections and connected nodes
  connections.forEach(connection => {
    if (connection.dataset.from === nodeClass || connection.dataset.to === nodeClass) {
      connection.style.opacity = '1';
      
      // Find and highlight the connected node
      const connectedNodeClass = connection.dataset.from === nodeClass 
        ? connection.dataset.to 
        : connection.dataset.from;
      
      const connectedNode = document.querySelector(`.${connectedNodeClass}`);
      if (connectedNode) {
        connectedNode.style.opacity = '1';
        connectedNode.style.transform = 'scale(1.1)';
      }
    }
  });
}

function resetConnections() {
  networkNodes.forEach(node => {
    node.style.opacity = '1';
    node.style.transform = '';
  });
  
  connections.forEach(connection => {
    connection.style.opacity = '0.6';
  });
}

function handleNodeMouseMove(e) {
  const node = e.currentTarget;
  const { left, top, width, height } = node.getBoundingClientRect();
  const x = (e.clientX - left) / width - 0.5;
  const y = (e.clientY - top) / height - 0.5;
  
  node.style.transform = `
    scale(1.1)
    rotateY(${x * 20}deg)
    rotateX(${-y * 20}deg)
    translateZ(10px)
  `;
}

function animateConnections() {
  connections.forEach((connection, index) => {
    // Particle effect along connections
    setInterval(() => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.position = 'absolute';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.background = 'white';
      particle.style.borderRadius = '50%';
      particle.style.filter = 'blur(1px)';
      particle.style.opacity = '0.8';
      particle.style.left = '0';
      particle.style.top = '0';
      particle.style.zIndex = '1';
      particle.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
      
      connection.appendChild(particle);
      
      // Animate particle along connection
      const duration = Math.random() * 1000 + 1000; // 1s to 2s
      
      particle.animate([
        { left: '0%', opacity: 0 },
        { left: '50%', opacity: 1 },
        { left: '100%', opacity: 0 }
      ], {
        duration: duration,
        easing: 'ease-in-out'
      }).onfinish = () => {
        particle.remove();
      };
    }, 2000 + index * 200); // Stagger the intervals
  });
} 