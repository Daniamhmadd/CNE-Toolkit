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

        const path = (window.location.hash || '#/').replace('#', '');

        const component = this.routes[path] || 'home';

        try {

            // reset animation safely
            contentArea.classList.remove('fade-in');
            void contentArea.offsetWidth;
            contentArea.classList.add('fade-in');

            // HOME
            if (component === 'home') {
                contentArea.innerHTML = this.renderHome();
                this.updateSidebarActiveState('home');
            }

            // COMPONENTS
            else if (typeof component === 'object') {
                contentArea.innerHTML = component.render?.() || '';
                component.init?.();

                // important fix: normalize key
                this.updateSidebarActiveState(path.replace('/', ''));
            }

            // fallback (broken route)
            else {
                contentArea.innerHTML = `<h2>Page Not Found</h2>`;
            }

            // icons safety
            if (window.lucide) {
                lucide.createIcons();
            }

            window.scrollTo({ top: 0, behavior: 'instant' });

        } catch (e) {
            console.error("Route Error:", e);
            contentArea.innerHTML = `<h2>Page Error</h2>`;
        }
    },

    updateSidebarActiveState(pageKey) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle(
                'active',
                link.dataset.page === pageKey
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

        // important fix: prevent double-init bugs
        if (!this._initialized) {
            this._initialized = true;
            this.route();
        }
    }
};

// SAFE INIT (important)
document.addEventListener('DOMContentLoaded', () => {
    try {
        CneApp.init();
    } catch (e) {
        console.error("Init failed:", e);
    }
});