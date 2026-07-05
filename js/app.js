/* ==========================================================================
   CNE Toolkit - App Shell, Router & Navigation Orchestrator
   ========================================================================== */

const CneApp = {
  // Routes mapping url hash -> component module
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

  /**
   * Renders the home dashboard view.
   * @returns {string}
   */
  renderHome() {
    return `
      <!-- Hero Banner -->
      <section class="hero-section">
        <h2 class="hero-title">CNE Toolkit</h2>
        <p class="hero-subtitle">Your All-in-One Networking Assistant. A collection of networking tools designed to help students and IT professionals perform common networking tasks quickly and easily.</p>
      </section>

      <!-- Tools and Pages Grid -->
      <h3 style="font-size: 1.5rem; margin-bottom: 1.25rem; font-family: var(--font-display); font-weight: 700; color: var(--text-dark);">Available Utilities</h3>
      
      <div class="grid-cols-1-2-3">
        <!-- IP Address Analyzer Card -->
        <div class="card">
          <div class="card-icon-container">
            <i data-lucide="binary"></i>
          </div>
          <h4 class="card-title">IP Address Analyzer</h4>
          <p class="card-desc">Verify IPv4 addresses, inspect octet classes, determine network privacy scope (RFC 1918), and translate to binary/hexadecimal registers.</p>
          <a href="#/ip-analyzer" class="card-link">
            <span>Launch Tool</span>
            <i data-lucide="arrow-right"></i>
          </a>
        </div>

        <!-- Subnet Calculator Card -->
        <div class="card">
          <div class="card-icon-container">
            <i data-lucide="calculator"></i>
          </div>
          <h4 class="card-title">Subnet Calculator</h4>
          <p class="card-desc">Compute complex subnets. Input a base IP and CIDR prefix to solve network and broadcast boundaries, usable host pools, and wildcard masking.</p>
          <a href="#/subnet-calculator" class="card-link">
            <span>Launch Tool</span>
            <i data-lucide="arrow-right"></i>
          </a>
        </div>

        <!-- Port Lookup Card -->
        <div class="card">
          <div class="card-icon-container">
            <i data-lucide="search-code"></i>
          </div>
          <h4 class="card-title">Port Lookup</h4>
          <p class="card-desc">Query socket ports to identify service protocols and database entries. Includes a searchable table database of standard network ports.</p>
          <a href="#/port-lookup" class="card-link">
            <span>Launch Tool</span>
            <i data-lucide="arrow-right"></i>
          </a>
        </div>

        <!-- Password Generator Card -->
        <div class="card">
          <div class="card-icon-container">
            <i data-lucide="key-round"></i>
          </div>
          <h4 class="card-title">Password Generator</h4>
          <p class="card-desc">Construct secure alphanumeric passwords. Customize character pools, adjust sizes, copy to clipboard, and view cryptographic entropy scores.</p>
          <a href="#/password-generator" class="card-link">
            <span>Launch Tool</span>
            <i data-lucide="arrow-right"></i>
          </a>
        </div>

        <!-- Binary Converter Card -->
        <div class="card">
          <div class="card-icon-container">
            <i data-lucide="shuffle"></i>
          </div>
          <h4 class="card-title">Binary Converter</h4>
          <p class="card-desc">Perform dual-directional mathematical translations between Binary arrays (Base 2 registers) and Decimal integers (Base 10 integers).</p>
          <a href="#/binary-converter" class="card-link">
            <span>Launch Tool</span>
            <i data-lucide="arrow-right"></i>
          </a>
        </div>

        <!-- Wi-Fi QR Generator Card -->
        <div class="card">
          <div class="card-icon-container">
            <i data-lucide="qr-code"></i>
          </div>
          <h4 class="card-title">Wi-Fi QR Generator</h4>
          <p class="card-desc">Design custom Wi-Fi access QR codes. Encode network SSID, security credentials, and export local high-res PNG images for signage/printing.</p>
          <a href="#/qr-generator" class="card-link">
            <span>Launch Tool</span>
            <i data-lucide="arrow-right"></i>
          </a>
        </div>

        <!-- Learn Section Card -->
        <div class="card">
          <div class="card-icon-container">
            <i data-lucide="book-open"></i>
          </div>
          <h4 class="card-title">Learn Section</h4>
          <p class="card-desc">Access reference cheat sheets covering OSI layers, TCP/IP stack mappings, fundamental internet protocols, and subnet address arithmetic.</p>
          <a href="#/learn" class="card-link">
            <span>Open Guide</span>
            <i data-lucide="arrow-right"></i>
          </a>
        </div>

        <!-- About Card -->
        <div class="card">
          <div class="card-icon-container">
            <i data-lucide="info"></i>
          </div>
          <h4 class="card-title">About Page</h4>
          <p class="card-desc">Discover the background of the CNE Toolkit network assistant, developer specifications, privacy parameters, and tech stack details.</p>
          <a href="#/about" class="card-link">
            <span>View Details</span>
            <i data-lucide="arrow-right"></i>
          </a>
        </div>
      </div>
    `;
  },

  /**
   * Performs routing based on hash changes.
   */
  route() {
    let hash = window.location.hash || '#/';
    
    // Normalize hash: remove leading hash character
    let path = hash.substring(1);
    
    // Default to home if route not registered
    let component = this.routes[path] || 'home';
    const contentArea = document.getElementById('page-content');
    
    // Reset view transition classes
    contentArea.classList.remove('fade-in');
    void contentArea.offsetWidth; // Trigger reflow to restart animation
    contentArea.classList.add('fade-in');

    if (component === 'home') {
      contentArea.innerHTML = this.renderHome();
      this.updateSidebarActiveState('home');
    } else {
      // Render component UI
      contentArea.innerHTML = component.render();
      // Initialize component interactivity hooks
      component.init();
      // Highlight correct sidebar navigation link
      this.updateSidebarActiveState(path.substring(1)); // strip slash
    }

    // Refresh Lucide Vector Icons
    lucide.createIcons();
    
    // Scroll to top of viewport
    window.scrollTo({ top: 0, behavior: 'instant' });
  },

  /**
   * Highlights the active sidebar navigation anchor.
   * @param {string} pageKey 
   */
  updateSidebarActiveState(pageKey) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const targetPage = link.getAttribute('data-page');
      if (targetPage === pageKey) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  },

  /**
   * Sets up global sidebar toggling logic for mobile sizes.
   */
  initMobileMenu() {
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleSidebar = () => {
      sidebar.classList.toggle('active');
      sidebarOverlay.classList.toggle('active');
    };

    const closeSidebar = () => {
      sidebar.classList.remove('active');
      sidebarOverlay.classList.remove('active');
    };

    menuToggleBtn.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Auto close sidebar when a link is clicked on mobile viewport sizes
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          closeSidebar();
        }
      });
    });
  },

  /**
   * App bootstrapping entry point.
   */
  init() {
    this.initMobileMenu();
    
    // Hash Routing setup
    window.addEventListener('hashchange', () => this.route());
    
    // Run route first time
    this.route();
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  CneApp.init();
});
// ﬂÊœ  ‘€Ì· Ê »œÌ· «·Ê÷⁄ «·œ«ﬂ‰ (Dark Mode)
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('sidebarThemeToggle');
    const themeText = document.getElementById('themeToggleText');

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            // ≈÷«›… √Ê ≈“«·… ﬂ·«” «·œ«—ﬂ „Êœ „‰ «·Ã”„ «·—∆Ì”Ì ··„Êﬁ⁄
            document.body.classList.toggle('dark-theme');

            //  €ÌÌ— «·‰’ œ«Œ· «·“— Õ”» «·Ê÷⁄ «·Õ«·Ì
            if (document.body.classList.contains('dark-theme')) {
                if (themeText) themeText.textContent = 'Light Mode';
            } else {
                if (themeText) themeText.textContent = 'Dark Mode';
            }
        });
    }
});
// ﬂÊœ  ‘€Ì· Ê ÕÊÌ· «··€… («·⁄—»Ì… / «·≈‰Ã·Ì“Ì…)
document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('sidebarLangToggle');
    const langText = document.getElementById('langToggleText');

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            // «· Õﬁﬁ „‰ «·« Ã«Â «·Õ«·Ì ··„Êﬁ⁄ (RTL Ì⁄‰Ì ⁄—»Ì)
            if (document.documentElement.dir === 'rtl') {
                document.documentElement.dir = 'ltr';
                document.documentElement.lang = 'en';
                if (langText) langText.textContent = '«·⁄—»Ì…';
            } else {
                document.documentElement.dir = 'rtl';
                document.documentElement.lang = 'ar';
                if (langText) langText.textContent = 'English';
            }
        });
    }
});