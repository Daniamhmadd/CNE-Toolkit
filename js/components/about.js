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
            <h2>About CNE Toolkit</h2>
            <p>Learn more about the application's design, security, and developer integration resources.</p>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 2rem; align-items: start;">
          
          <!-- Content Card -->
          <div class="card" style="padding: 2.5rem;">
            <h3 style="font-size: 1.75rem; margin-bottom: 1rem; font-family: var(--font-display); color: var(--primary);">
              CNE Toolkit
            </h3>
            <p style="font-size: 1.05rem; line-height: 1.75; color: var(--text-medium); margin-bottom: 1.5rem;">
              CNE Toolkit is a modern web application created to simplify common networking tasks for students and IT professionals by providing useful networking utilities in one place. 
              Whether you are preparing for a Cisco CCNA certification, auditing ports in a server room, or calculating subnet IP spaces on a customer site, the toolkit provides instant calculations in an accessible interface.
            </p>

            <h4 style="font-size: 1.15rem; margin-bottom: 1rem; font-family: var(--font-display);">Core Design Principles</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem;">
              
              <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="color: var(--primary); padding: 0.25rem;">
                  <i data-lucide="zap" style="width: 1.25rem; height: 1.25rem; stroke-width: 2.5;"></i>
                </div>
                <div>
                  <h5 style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.15rem;">Instant Computation</h5>
                  <p style="font-size: 0.85rem; color: var(--text-light); line-height: 1.4;">Calculations update dynamically as you type, with zero lag or latency.</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="color: var(--primary); padding: 0.25rem;">
                  <i data-lucide="shield-check" style="width: 1.25rem; height: 1.25rem; stroke-width: 2.5;"></i>
                </div>
                <div>
                  <h5 style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.15rem;">Privacy-First</h5>
                  <p style="font-size: 0.85rem; color: var(--text-light); line-height: 1.4;">100% client-side logic. No network requests, database storage, or analytics tracking.</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="color: var(--primary); padding: 0.25rem;">
                  <i data-lucide="smartphone" style="width: 1.25rem; height: 1.25rem; stroke-width: 2.5;"></i>
                </div>
                <div>
                  <h5 style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.15rem;">Mobile Responsive</h5>
                  <p style="font-size: 0.85rem; color: var(--text-light); line-height: 1.4;">Optimized layouts scale smoothly across devices, from workstations to phones.</p>
                </div>
              </div>

              <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
                <div style="color: var(--primary); padding: 0.25rem;">
                  <i data-lucide="globe" style="width: 1.25rem; height: 1.25rem; stroke-width: 2.5;"></i>
                </div>
                <div>
                  <h5 style="font-weight: 700; font-size: 0.95rem; margin-bottom: 0.15rem;">Offline-Ready</h5>
                  <p style="font-size: 0.85rem; color: var(--text-light); line-height: 1.4;">Fully operable without internet connectivity when running locally.</p>
                </div>
              </div>

            </div>
          </div>

          <!-- Technologies Sidebar Card -->
          <div class="card" style="padding: 1.75rem; background-color: var(--bg-input);">
            <h3 class="card-title" style="margin-bottom: 1.25rem;">Tech Stack</h3>
            
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              
              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-light); padding-bottom: 0.5rem;">
                <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-light);">Framework</span>
                <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-dark);">Vanilla ES5 / SPA Shell</span>
              </div>

              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-light); padding-bottom: 0.5rem;">
                <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-light);">Design & Styles</span>
                <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-dark);">Vanilla CSS3 (Grid/Flex)</span>
              </div>

              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-light); padding-bottom: 0.5rem;">
                <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-light);">Typography</span>
                <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-dark);">Google Fonts (Outfit, Inter)</span>
              </div>

              <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-light); padding-bottom: 0.5rem;">
                <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-light);">Icon Suite</span>
                <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-dark);">Lucide Vector CDN</span>
              </div>

              <div style="display: flex; justify-content: space-between; padding-bottom: 0.25rem;">
                <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-light);">QR Engine</span>
                <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-dark);">QRCode.js (Soldair)</span>
              </div>

            </div>

            <div style="margin-top: 2rem; text-align: center; background-color: var(--bg-card); padding: 1rem; border-radius: 12px; border: 1px solid var(--border-light);">
              <i data-lucide="network" style="width: 2rem; height: 2rem; color: var(--primary); margin: 0 auto 0.25rem;"></i>
              <span style="display: block; font-size: 0.75rem; color: var(--text-light);">Developed in 2026</span>
            </div>
          </div>

        </div>
      </div>
    `;
  },

  init() {
    // No special event hooks needed for About Page
  }
};
