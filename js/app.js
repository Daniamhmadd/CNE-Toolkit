/* ==========================================================================
   CNE Toolkit - App Shell, Router & Navigation Orchestrator
   ========================================================================== */

const CneApp = {

    routes: {
        '/': 'home',
        '/ip-analyzer': IpAnalyzerComponent,
        '/subnet-calculator': SubnetCalculatorComponent,
        '/port-lookup': PortLookupComponent,
        '/password-generator': PasswordGeneratorComponent,
        '/binary-converter': BinaryConverterComponent,
        '/qr-generator': QrGeneratorComponent,
        '/learn': LearnComponent,
        '/about': AboutComponent
    },

    renderHome() {
        return `
      <section class="hero-section">
        <h2 class="hero-title">CNE Toolkit</h2>
        <p class="hero-subtitle">All-in-One Networking Assistant</p>
      </section>

      <div id="tools-grid">
        <h3>Available Utilities</h3>
      </div>
    `;
    },

    route() {
        try {
            let hash = window.location.hash || '#/';
            let path = hash.substring(1);

            const component = this.routes[path] || 'home';
            const contentArea = document.getElementById('page-content');

            if (!contentArea) return;

            contentArea.classList.remove('fade-in');
            void contentArea.offsetWidth;
            contentArea.classList.add('fade-in');

            if (component === 'home') {
                contentArea.innerHTML = this.renderHome();
                this.updateSidebarActiveState('home');
            } else {
                if (!component || !component.render) {
                    console.error('Component missing:', path);
                    contentArea.innerHTML = "<h2>Error loading page</h2>";
                    return;
                }

                contentArea.innerHTML = component.render();

                if (typeof component.init === "function") {
                    component.init();
                }

                this.updateSidebarActiveState(path.replace('/', ''));
            }

            if (window.lucide && lucide.createIcons) {
                lucide.createIcons();
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (err) {
            console.error('Routing error:', err);
        }
    },

    updateSidebarActiveState(pageKey) {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const target = link.getAttribute('data-page');

            if (target === pageKey) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    },

    initMobileMenu() {
        const menuToggleBtn = document.getElementById('menuToggleBtn');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');

        if (!menuToggleBtn || !sidebar || !overlay) return;

        const openClose = () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        };

        const close = () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        };

        menuToggleBtn.addEventListener('click', openClose);
        overlay.addEventListener('click', close);

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) close();
            });
        });
    },

    init() {
        this.initMobileMenu();

        window.addEventListener('hashchange', () => this.route());

        this.route();
    }
};

// Init
document.addEventListener('DOMContentLoaded', () => {
    CneApp.init();
});


// DARK MODE (safe version)
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('sidebarThemeToggle');
    const text = document.getElementById('themeToggleText');

    if (!btn) return;

    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');

        if (text) {
            text.textContent = document.body.classList.contains('dark-theme')
                ? 'Light Mode'
                : 'Dark Mode';
        }
    });
});


// LANGUAGE TOGGLE (safe version)
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('sidebarLangToggle');
    const text = document.getElementById('langToggleText');

    if (!btn) return;

    btn.addEventListener('click', () => {
        if (document.documentElement.dir === 'rtl') {
            document.documentElement.dir = 'ltr';
            document.documentElement.lang = 'en';
            if (text) text.textContent = 'AR';
        } else {
            document.documentElement.dir = 'rtl';
            document.documentElement.lang = 'ar';
            if (text) text.textContent = 'EN';
        }
    });
});