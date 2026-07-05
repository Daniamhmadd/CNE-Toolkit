/* ==========================================================================
   CNE Toolkit - About Page Component
   ========================================================================== */

window.AboutComponent = {

    render() {
        return `
      <div class="tool-view">
        
        <div class="tool-header">
          <div class="tool-header-icon">
            <i data-lucide="info"></i>
          </div>
          <div class="tool-header-text">
            <h2>${t('aboutTitle')}</h2>
            <p>${t('aboutDesc')}</p>
          </div>
        </div>

        <div class="about-grid">

          <!-- Main Content -->
          <div class="card about-main">

            <h3 class="about-title">${t('aboutHeading')}</h3>

            <p class="about-paragraph">
              ${t('aboutMainParagraph')}
            </p>

            <h4 class="about-subtitle">${t('aboutPrinciplesTitle')}</h4>

            <div class="about-principles">

              ${this.principleCard('zap', 'aboutP1Title', 'aboutP1Desc')}
              ${this.principleCard('shield-check', 'aboutP2Title', 'aboutP2Desc')}
              ${this.principleCard('smartphone', 'aboutP3Title', 'aboutP3Desc')}
              ${this.principleCard('globe', 'aboutP4Title', 'aboutP4Desc')}

            </div>
          </div>

          <!-- Sidebar -->
          <div class="card about-sidebar">

            <h3 class="card-title">${t('aboutTechTitle')}</h3>

            <div class="tech-stack">

              ${this.techRow('aboutTechFramework', 'aboutTechFrameworkVal')}
              ${this.techRow('aboutTechStyles', 'aboutTechStylesVal')}
              ${this.techRow('aboutTechFonts', 'aboutTechFontsVal')}
              ${this.techRow('aboutTechIcons', 'aboutTechIconsVal')}
              ${this.techRow('aboutTechQr', 'aboutTechQrVal')}

            </div>

            <div class="about-footer">
              <i data-lucide="network"></i>
              <span>${t('aboutFooterDev')}</span>
            </div>

          </div>

        </div>
      </div>
    `;
    },

    principleCard(icon, titleKey, descKey) {
        return `
      <div class="principle-card">
        <div class="principle-icon">
          <i data-lucide="${icon}"></i>
        </div>
        <div>
          <h5>${t(titleKey)}</h5>
          <p>${t(descKey)}</p>
        </div>
      </div>
    `;
    },

    techRow(labelKey, valueKey) {
        return `
      <div class="tech-row">
        <span class="tech-label">${t(labelKey)}</span>
        <span class="tech-value">${t(valueKey)}</span>
      </div>
    `;
    },

    init() {
        // intentionally empty
    }
};
