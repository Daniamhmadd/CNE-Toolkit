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
        <h2>CNE Toolkit</h2>
        <p>Network Engineering Toolkit</p>
      </section>
    `;
    },

    route() {
        const contentArea = document.getElementById('page-content');
        if (!contentArea) return;

        let hash = window.location.hash || '#/';
        let path = hash.replace('#', '');

        const component = this.routes[path] || 'home';

        try {

            contentArea.classList.remove('fade-in');
            void contentArea.offsetWidth;
            contentArea.classList.add('fade-in');

            if (component === 'home') {

                contentArea.innerHTML = this.renderHome();
                this.updateSidebarActiveState('home');

            } else {

                if (!component) {
                    contentArea.innerHTML = "<h2>Route not found</h2>";
                    return;
                }

                if (typeof component.render !== "function") {
                    console.error("Component missing render():", path);
                    contentArea.innerHTML = "<h2>Error loading component</h2>";
                    return;
                }

                contentArea.innerHTML = component.render();

                if (typeof component.init === "function") {
                    component.init();
                }

                this.updateSidebarActiveState(path.replace('/', ''));
            }

            if (window.lucide) {
                lucide.createIcons();
            }

            window.scrollTo({ top: 0 });

        } catch (err) {
            console.error("App routing error:", err);
            contentArea.innerHTML = "<h2>Something went wrong</h2>";
        }
    },

    updateSidebarActiveState(pageKey) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle(
                'active',
                link.getAttribute('data-page') === pageKey
            );
        });
    },

    initMobileMenu() {
        const btn = document.getElementById('menuToggleBtn');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');

        if (!btn || !sidebar || !overlay) return;

        btn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    },

    init() {
        this.initMobileMenu();
        window.addEventListener('hashchange', () => this.route());
        this.route();
    }
};


// INIT SAFE
document.addEventListener('DOMContentLoaded', () => {
    try {
        CneApp.init();
    } catch (e) {
        console.error("Init failed:", e);
    }
});


// DARK MODE SAFE
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('sidebarThemeToggle');
    const text = document.getElementById('themeToggleText');

    if (!btn) return;

    btn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');

        if (text) {
            text.textContent =
                document.body.classList.contains('dark-theme')
                    ? 'Light Mode'
                    : 'Dark Mode';
        }
    });
});


// LANGUAGE SAFE
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