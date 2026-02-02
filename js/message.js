/* ========================================
   💌 MESSAGE PAGE - SCRAPBOOK SCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Element references
    const notes = [
        document.getElementById('note1'),
        document.getElementById('note2'),
        document.getElementById('note3')
    ];
    const dots = document.querySelectorAll('.dot');
    const tapHint = document.getElementById('tapHint');
    const backBtn = document.getElementById('backBtn');

    // State
    let currentNoteIndex = 0;
    const totalNotes = notes.length;
    let isAnimating = false;

    // Initialize - show first note
    showNote(0);

    // Click/tap anywhere to advance
    document.body.addEventListener('click', handleTap);

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            handleTap();
        }
    });

    function handleTap(e) {
        // Don't advance if clicking the back button
        if (e && e.target.closest('.back-btn')) return;
        
        // Prevent rapid tapping during animation
        if (isAnimating) return;

        if (currentNoteIndex < totalNotes - 1) {
            // Advance to next note
            currentNoteIndex++;
            showNote(currentNoteIndex);
        } else if (currentNoteIndex === totalNotes - 1 && !backBtn.classList.contains('visible')) {
            // Show back button after last note
            showComplete();
        }
    }

    function showNote(index) {
        isAnimating = true;

        // Mark previous notes
        notes.forEach((note, i) => {
            if (i < index) {
                note.classList.remove('active');
                note.classList.add('previous');
            } else if (i === index) {
                note.classList.remove('previous');
                note.classList.add('active');
            } else {
                note.classList.remove('active', 'previous');
            }
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.remove('active', 'completed');
            if (i < index) {
                dot.classList.add('completed');
            } else if (i === index) {
                dot.classList.add('active');
            }
        });

        // Update hint text
        if (index === totalNotes - 1) {
            tapHint.textContent = 'tap once more ♥';
        }

        // Allow next tap after animation
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    function showComplete() {
        isAnimating = true;
        
        // Hide tap hint
        tapHint.classList.add('hidden');
        
        // Mark all dots complete
        dots.forEach(dot => {
            dot.classList.remove('active');
            dot.classList.add('completed');
        });

        // Show back button
        backBtn.classList.remove('hidden');
        backBtn.classList.add('visible');

        // Change cursor back to default
        document.body.style.cursor = 'default';
    }
});