document.addEventListener('DOMContentLoaded', function () {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const mobileMenuLinks = mobileMenu.querySelectorAll('a');
            const themeToggleButton = document.getElementById('theme-toggle');
            const htmlElement = document.documentElement;

            // Toggle mobile menu
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // Close mobile menu when a link is clicked
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });

            // Smooth scrolling for all anchor links (handled by `scroll-smooth` class in <html>)
            // This is just a fallback or for more complex scenarios if needed.
            // The `scroll-smooth` class provides a CSS-only solution.
            
            // Optional: Close menu if clicked outside
            document.addEventListener('click', function(event) {
                const isClickInsideMenu = mobileMenu.contains(event.target);
                const isClickOnButton = mobileMenuButton.contains(event.target);
                if (!isClickInsideMenu && !isClickOnButton) {
                    mobileMenu.classList.add('hidden');
                }
            });

            // Theme toggling
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                htmlElement.classList.add('dark');
                themeToggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
            } else {
                themeToggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
            }

            themeToggleButton.addEventListener('click', () => {
                htmlElement.classList.toggle('dark');
                if (htmlElement.classList.contains('dark')) {
                    localStorage.setItem('theme', 'dark');
                    themeToggleButton.innerHTML = '<i class="fa-solid fa-moon"></i>';
                } else {
                    localStorage.setItem('theme', 'light');
                    themeToggleButton.innerHTML = '<i class="fa-solid fa-sun"></i>';
                }
            });
        });