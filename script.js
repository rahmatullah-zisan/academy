document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu on link click
            if (mobileMenu.classList.contains('hidden') === false) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // Video Modal
    const videoThumbnail = document.getElementById('video-thumbnail');
    const watchDemoBtn = document.getElementById('watch-demo-btn');
    const videoModal = document.getElementById('video-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const youtubePlayer = document.getElementById('youtube-player');
    const originalVideoSrc = youtubePlayer.src;

    const openModal = () => {
        videoModal.classList.remove('hidden');
        videoModal.classList.add('flex');
        youtubePlayer.src = originalVideoSrc + "?autoplay=1"; // Autoplay when modal opens
    };

    const closeModal = () => {
        videoModal.classList.add('hidden');
        videoModal.classList.remove('flex');
        youtubePlayer.src = originalVideoSrc; // Stop video by resetting src
    };

    videoThumbnail.addEventListener('click', openModal);
    watchDemoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
    closeModalBtn.addEventListener('click', closeModal);

    // Close modal by clicking outside the video
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeModal();
        }
    });

    // Animate on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .course-card, .success-card, #about > div > div, #contact > div > div').forEach(el => {
        el.style.opacity = '0'; // Initially hide elements
        observer.observe(el);
    });
});
