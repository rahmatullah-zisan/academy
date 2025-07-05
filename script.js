document.addEventListener('DOMContentLoaded', function () {

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
            // Close mobile menu on link click
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // --- Video Modal Functionality ---
    const videoThumbnail = document.getElementById('video-thumbnail');
    const watchDemoBtn = document.getElementById('watch-demo-btn');
    const videoModal = document.getElementById('video-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const youtubePlayer = document.getElementById('youtube-player');
    const originalVideoSrc = youtubePlayer.src;

    const openModal = () => {
        videoModal.classList.remove('hidden');
        videoModal.classList.add('flex');
        youtubePlayer.src = originalVideoSrc.includes('autoplay') ? originalVideoSrc : originalVideoSrc + "&autoplay=1";
    };

    const closeModal = () => {
        videoModal.classList.add('hidden');
        videoModal.classList.remove('flex');
        youtubePlayer.src = originalVideoSrc.split("&")[0]; // Stop video
    };

    if (videoThumbnail) videoThumbnail.addEventListener('click', openModal);
    if (watchDemoBtn) watchDemoBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (videoModal) videoModal.addEventListener('click', (e) => { if (e.target === videoModal) closeModal(); });

    // --- Intersection Observer for Animations ---
    const animatedElements = document.querySelectorAll('.animate-in');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add delay if specified
                const delay = parseInt(entry.target.dataset.animDelay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                    // Trigger count-up if element is a counter
                    const countUpElement = entry.target.querySelector('[data-count-up]');
                    if(countUpElement) {
                        animateCountUp(countUpElement);
                    }
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));

    // --- Count-Up Animation Function ---
    function animateCountUp(el) {
        const target = parseInt(el.dataset.countUp, 10);
        let current = 0;
        const increment = target / 100; // Adjust for speed
        const updateCount = () => {
            current += increment;
            if (current < target) {
                el.innerText = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                el.innerText = target;
            }
        };
        updateCount();
    }
});