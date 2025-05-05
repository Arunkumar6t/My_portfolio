// script.js
// Make sure this file is saved as 'script.js'

document.addEventListener('DOMContentLoaded', () => {
    // Get Elements
    const navToggleBtn = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentYearSpan = document.getElementById('current-year');
    const profilePicOverlay = document.querySelector('.profile-pic-overlay');
    const openResumeModalBtn = document.getElementById('open-resume-modal');
    const resumeModal = document.getElementById('resume-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const resumeForm = document.getElementById('resume-download-form');
    const downloadLink = document.getElementById('actual-download-link');
    const submitBtn = resumeForm ? resumeForm.querySelector('button[type="submit"]') : null;

    // Helper function to apply theme class
    const applyTheme = (theme) => {
        const htmlEl = document.documentElement;
        if (theme === 'dark') {
            htmlEl.classList.add('dark-mode');
            htmlEl.classList.remove('light-mode');
            if (themeToggleBtn) themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
        } else {
            htmlEl.classList.add('light-mode');
            htmlEl.classList.remove('dark-mode');
            if (themeToggleBtn) themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
        }
    };

    // --- Theme Management ---
    // 1. Check local storage
    const savedTheme = localStorage.getItem('theme');
    // 2. Check system preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply theme on load: storage > system pref > default (light, based on CSS)
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Apply system preference if no saved theme
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    // Theme toggle button click listener
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const htmlEl = document.documentElement;
            const isDark = htmlEl.classList.contains('dark-mode');
            const newTheme = isDark ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme); // Save preference
        });
    } else {
        console.error("Theme toggle button not found.");
    }

    // Optional: Listen for system theme changes (if user hasn't set a preference)
     window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) { // Only if no manual override exists
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });


    // --- Navigation Toggle (Mobile Hamburger) ---
    if (navToggleBtn && navMenu) {
        navToggleBtn.addEventListener('click', () => {
            const expanded = navMenu.classList.toggle('active');
            navToggleBtn.setAttribute('aria-expanded', expanded);
            const icon = navToggleBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !expanded);
                icon.classList.toggle('fa-times', expanded);
                navToggleBtn.setAttribute('aria-label', expanded ? 'Close navigation menu' : 'Open navigation menu');
            }
        });

        // Close mobile nav when a link inside it is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggleBtn.setAttribute('aria-expanded', 'false');
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
         console.error("Nav toggle button or nav menu not found.");
    }


    // --- Footer Year Update ---
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Prevent Profile Picture Download (Basic) ---
    if (profilePicOverlay) {
        profilePicOverlay.addEventListener('contextmenu', (e) => e.preventDefault());
        profilePicOverlay.addEventListener('dragstart', (e) => e.preventDefault());
    }

    // --- Resume Download Modal Logic ---
    const showModal = () => {
        if (resumeModal && resumeForm && downloadLink && submitBtn) {
            resumeModal.style.display = 'block';
            resumeForm.reset(); // Clear previous entries
            downloadLink.style.display = 'none'; // Hide download link
            submitBtn.style.display = 'block'; // Show submit button
            submitBtn.disabled = false; // Ensure submit is enabled
        } else {
            console.error("Modal elements missing, cannot show modal.");
        }
    };

    const hideModal = () => {
        if (resumeModal) {
            resumeModal.style.display = 'none';
        }
    };

    // Attach listeners only if all modal elements exist
    if (openResumeModalBtn && resumeModal && closeModalBtn && resumeForm && downloadLink && submitBtn) {
        // Open modal button
        openResumeModalBtn.addEventListener('click', showModal);

        // Close modal button (the 'X')
        closeModalBtn.addEventListener('click', hideModal);

        // Close modal if clicking outside the content area
        window.addEventListener('click', (event) => {
            if (event.target === resumeModal) {
                hideModal();
            }
        });

        // Handle form submission inside the modal
        resumeForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Stop page reload
            const nameInput = document.getElementById('downloader-name');
            const companyInput = document.getElementById('downloader-company');
            const name = nameInput ? nameInput.value.trim() : '';
            const company = companyInput ? companyInput.value.trim() : '';

            if (name && company) { // If fields are filled
                downloadLink.style.display = 'inline-block'; // Show download button
                submitBtn.style.display = 'none'; // Hide submit button
                submitBtn.disabled = true; // Prevent re-submit
                console.log(`Resume download request: ${name} from ${company}`);
                // Optional: Trigger download automatically: downloadLink.click();
                // Optional: Close modal after delay: setTimeout(hideModal, 2000);
            } else {
                alert('Please fill in both Name and Company fields.');
            }
        });
    } else {
        console.error("One or more resume modal elements not found. Resume download disabled.");
        // You could add more specific checks here if needed
    }

}); // End DOMContentLoaded