// script.js - Final Version
document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const navToggleBtn = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Check if elements exist before adding listeners
    if (navToggleBtn && navMenu) {
        navToggleBtn.addEventListener('click', () => {
            // Toggle the 'active' class on the menu
            const expanded = navMenu.classList.toggle('active');
            // Update aria-expanded attribute for accessibility
            navToggleBtn.setAttribute('aria-expanded', expanded);

            // Toggle the icon class (bars/times)
            const icon = navToggleBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !expanded); // Show bars if NOT expanded
                icon.classList.toggle('fa-times', expanded); // Show times if expanded
            }
            // Update aria-label for accessibility
            navToggleBtn.setAttribute('aria-label', expanded ? 'Close navigation menu' : 'Open navigation menu');
        });

        // Add event listener to close menu when a link inside is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Check if the menu is currently active (visible)
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active'); // Hide the menu
                    navToggleBtn.setAttribute('aria-expanded', 'false'); // Update accessibility attribute

                    // Change icon back to bars
                    const icon = navToggleBtn.querySelector('i');
                     if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                        navToggleBtn.setAttribute('aria-label', 'Open navigation menu');
                     }
                }
            });
        });
    } else {
         console.error("Navigation toggle button or menu element not found.");
    }

    // --- Footer Year Update ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Prevent Profile Picture Download (Basic) ---
    const profilePicOverlay = document.querySelector('.profile-pic-overlay');
    if (profilePicOverlay) {
        profilePicOverlay.addEventListener('contextmenu', (e) => e.preventDefault());
        profilePicOverlay.addEventListener('dragstart', (e) => e.preventDefault());
    }

    // --- Optional: Simple typing effect ---
    const typingEffectEl = document.getElementById('typing-effect');
    // You can uncomment and refine this later if desired
    /*
    if (typingEffectEl) {
        const text = typingEffectEl.textContent;
        typingEffectEl.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingEffectEl.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 110); // Adjust typing speed
            } else {
                // Optional: Add logic to pause and restart or stop
            }
        }
        setTimeout(typeWriter, 600); // Start after a delay
    }
    */

}); // End DOMContentLoaded
