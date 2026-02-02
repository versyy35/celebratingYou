/* ========================================
   🎂 BIRTHDAY CARD - MAIN SCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Element references
    const envelopeScene = document.getElementById('envelopeScene');
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const cardScene = document.getElementById('cardScene');
    const cardCover = document.getElementById('cardCover');
    const cardInside = document.getElementById('cardInside');
    const confettiContainer = document.getElementById('confettiContainer');
    const polaroidStack = document.getElementById('polaroidStack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const currentPhotoSpan = document.getElementById('currentPhoto');

    // State
    let currentPhotoIndex = 0;
    const totalPhotos = 5;

    /* ========================================
       ✉️ ENVELOPE INTERACTION
       ======================================== */
    envelopeWrapper.addEventListener('click', openEnvelope);

    function openEnvelope() {
        // Add opening animation class
        envelopeWrapper.classList.add('opening');
        
        // Disable further clicks
        envelopeWrapper.style.pointerEvents = 'none';

        // After envelope opens, transition to card scene
        setTimeout(() => {
            envelopeScene.classList.add('hidden');
            cardScene.classList.remove('hidden');
            
            // Trigger confetti!
            launchConfetti();
        }, 800);
    }

    /* ========================================
       💌 CARD INTERACTION
       ======================================== */
    cardCover.addEventListener('click', openCard);

    function openCard() {
        // Hide cover, show inside
        cardCover.classList.add('hidden');
        cardInside.classList.remove('hidden');
        
        // Initialize photo gallery
        initializeGallery();
        
        // Another burst of confetti!
        setTimeout(() => launchConfetti(), 300);
    }

    /* ========================================
       📸 PHOTO GALLERY
       ======================================== */
    function initializeGallery() {
        updateGallery();
    }

    function updateGallery() {
        const polaroids = polaroidStack.querySelectorAll('.polaroid');
        
        polaroids.forEach((polaroid, index) => {
            // Remove all state classes
            polaroid.classList.remove('active', 'prev', 'next');
            
            if (index === currentPhotoIndex) {
                polaroid.classList.add('active');
            } else if (index === getPrevIndex()) {
                polaroid.classList.add('prev');
            } else if (index === getNextIndex()) {
                polaroid.classList.add('next');
            }
        });

        // Update counter
        currentPhotoSpan.textContent = currentPhotoIndex + 1;
    }

    function getPrevIndex() {
        return (currentPhotoIndex - 1 + totalPhotos) % totalPhotos;
    }

    function getNextIndex() {
        return (currentPhotoIndex + 1) % totalPhotos;
    }

    function goToNext() {
        currentPhotoIndex = getNextIndex();
        updateGallery();
    }

    function goToPrev() {
        currentPhotoIndex = getPrevIndex();
        updateGallery();
    }

    // Navigation buttons
    nextBtn.addEventListener('click', goToNext);
    prevBtn.addEventListener('click', goToPrev);

    // Click on polaroid to advance
    polaroidStack.addEventListener('click', (e) => {
        const polaroid = e.target.closest('.polaroid');
        if (!polaroid) return;

        if (polaroid.classList.contains('next')) {
            goToNext();
        } else if (polaroid.classList.contains('prev')) {
            goToPrev();
        }
    });

    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    polaroidStack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    polaroidStack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left -> next
                goToNext();
            } else {
                // Swiped right -> prev
                goToPrev();
            }
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (cardInside.classList.contains('hidden')) return;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            goToNext();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            goToPrev();
        }
    });

    /* ========================================
       🎊 CONFETTI
       ======================================== */
    function launchConfetti() {
        const colors = [
            '#c9b8e0', // purple main
            '#b49fcc', // purple mid
            '#f2d4dc', // pink soft
            '#e8a0b4', // pink accent
            '#fff5e0', // yellow soft
            '#fdf8f3', // cream
        ];

        const shapes = ['♥', '✦', '✿', '❀', '♡', '★', '•'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                createConfettiPiece(colors, shapes);
            }, i * 30);
        }
    }

    function createConfettiPiece(colors, shapes) {
        const confetti = document.createElement('span');
        confetti.className = 'confetti';
        
        // Random properties
        const isShape = Math.random() > 0.5;
        
        if (isShape) {
            confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.style.fontSize = `${Math.random() * 1 + 0.8}rem`;
        } else {
            confetti.style.width = `${Math.random() * 8 + 4}px`;
            confetti.style.height = confetti.style.width;
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        }

        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDuration = `${Math.random() * 2 + 3}s`;
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;

        confettiContainer.appendChild(confetti);

        // Clean up after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }

    /* ========================================
       🎨 OPTIONAL: Add random rotations to polaroids
       ======================================== */
    function addRandomRotations() {
        const polaroids = polaroidStack.querySelectorAll('.polaroid');
        polaroids.forEach((polaroid) => {
            const randomRotation = (Math.random() - 0.5) * 6; // -3 to 3 degrees
            polaroid.style.setProperty('--base-rotation', `${randomRotation}deg`);
        });
    }

    // Initialize random rotations
    addRandomRotations();
});
