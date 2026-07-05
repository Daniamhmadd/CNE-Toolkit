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

        let path = (window.location.hash || '#/').replace('#', '');

        const component = this.routes[path] || 'home';

        try {
            contentArea.classList.remove('fade-in');
            void contentArea.offsetWidth;
            contentArea.classList.add('fade-in');

            if (component === 'home') {
                contentArea.innerHTML = this.renderHome();
                this.updateSidebarActiveState('home');
            } else {
                contentArea.innerHTML = component.render();
                component.init?.();
                this.updateSidebarActiveState(path.replace('/', ''));
            }

            if (window.lucide) lucide.createIcons();

            window.scrollTo({ top: 0 });

        } catch (e) {
            console.error(e);
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

        btn.onclick = () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        };

        overlay.onclick = () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        };
    },

    init() {
        this.initMobileMenu();
        window.addEventListener('hashchange', () => this.route());
        this.route();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    CneApp.init();
});