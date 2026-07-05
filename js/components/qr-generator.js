/* ==========================================================================
   CNE Toolkit - Wi-Fi QR Code Generator Component (Translated)
   ========================================================================== */

window.QrGeneratorComponent = {
  render() {
    return `
      <div class="tool-view">
        <div class="tool-header">
          <div class="tool-header-icon">
            <i data-lucide="qr-code"></i>
          </div>
          <div class="tool-header-text">
            <h2>${t('qrTitle')}</h2>
            <p>${t('qrDesc')}</p>
          </div>
        </div>

        <div class="tool-workspace">
          <!-- Inputs Card -->
          <div class="card">
            <h3 class="card-title" style="margin-bottom: 1.5rem;">${t('qrNetworkDetailsTitle')}</h3>
            
            <div class="form-group">
              <label for="wifiSsid" class="form-label">${t('qrSsidLabel')}</label>
              <input type="text" id="wifiSsid" class="form-input" placeholder="${t('qrSsidPlaceholder')}" value="MyHomeNetwork" autocomplete="off">
            </div>

            <div class="form-group">
              <label for="wifiSecurity" class="form-label">${t('qrSecurityLabel')}</label>
              <select id="wifiSecurity" class="form-input">
                <option value="WPA">${t('qrSecurityWPA')}</option>
                <option value="WEP">${t('qrSecurityWEP')}</option>
                <option value="nopass">${t('qrSecurityOpen')}</option>
              </select>
            </div>

            <div class="form-group" id="passGroup">
              <label for="wifiPassword" class="form-label">${t('qrPasswordLabel')}</label>
              <div style="position: relative; display: flex; align-items: center;">
                <input type="password" id="wifiPassword" class="form-input" placeholder="${t('qrPasswordPlaceholder')}" value="SuperSecretPass123" style="padding-inline-end: 2.75rem;">
                <button type="button" id="btnToggleWifiPass" class="copy-btn" style="position: absolute; inset-inline-end: 0.75rem; background: transparent;" title="${t('qrTogglePassTooltip')}">
                  <i data-lucide="eye" id="wifiPassEyeIcon"></i>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label class="checkbox-label" style="padding: 0.25rem 0.5rem; width: fit-content;">
                <input type="checkbox" id="wifiHidden" class="checkbox-input">
                <span>${t('qrHiddenLabel')}</span>
              </label>
            </div>

            <!-- Validation Block -->
            <div id="qrValidation" class="validation-block error" style="display: none; margin-top: 1rem;">
              <i data-lucide="alert-triangle" class="validation-icon"></i>
              <span class="validation-message" id="qrValidationText">-</span>
            </div>

            <div style="margin-top: 1.5rem;">
              <button class="btn btn-primary btn-block" id="btnGenerateQr">
                <i data-lucide="qr-code"></i>
                <span>${t('btnGenerateQr')}</span>
              </button>
            </div>
          </div>

          <!-- Display Canvas Card -->
          <div class="qr-card">
            <div class="qr-canvas-container">
              <canvas id="qrCanvas" width="220" height="220"></canvas>
            </div>
            
            <div style="text-align: center; width: 100%;">
              <h4 id="displaySsid" style="font-size: 1.15rem; margin-bottom: 0.25rem; font-family: var(--font-display);">MyHomeNetwork</h4>
              <p id="displaySecurity" style="font-size: 0.8rem; color: var(--text-light); margin-bottom: 1.5rem;">WPA/WPA2 Security</p>
              
              <button class="btn btn-secondary btn-block" id="btnDownloadQr" disabled>
                <i data-lucide="download"></i>
                <span>${t('btnDownloadQr')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    const wifiSsid = document.getElementById('wifiSsid');
    const wifiSecurity = document.getElementById('wifiSecurity');
    const wifiPassword = document.getElementById('wifiPassword');
    const btnToggleWifiPass = document.getElementById('btnToggleWifiPass');
    const wifiHidden = document.getElementById('wifiHidden');
    const qrValidation = document.getElementById('qrValidation');
    const btnGenerateQr = document.getElementById('btnGenerateQr');
    
    const qrCanvas = document.getElementById('qrCanvas');
    const btnDownloadQr = document.getElementById('btnDownloadQr');
    const displaySsid = document.getElementById('displaySsid');
    const displaySecurity = document.getElementById('displaySecurity');
    const passGroup = document.getElementById('passGroup');

    // Toggle password block visibility on Security Type changes
    wifiSecurity.addEventListener('change', (e) => {
      if (e.target.value === 'nopass') {
        passGroup.style.display = 'none';
      } else {
        passGroup.style.display = 'block';
      }
    });

    // Toggle password input characters representation (eye toggle)
    btnToggleWifiPass.addEventListener('click', () => {
      if (wifiPassword.type === 'password') {
        wifiPassword.type = 'text';
        btnToggleWifiPass.innerHTML = '<i data-lucide="eye-off" id="wifiPassEyeIcon"></i>';
      } else {
        wifiPassword.type = 'password';
        btnToggleWifiPass.innerHTML = '<i data-lucide="eye" id="wifiPassEyeIcon"></i>';
      }
      lucide.createIcons();
    });

    const generateQrCode = () => {
      const ssid = wifiSsid.value.trim();
      const security = wifiSecurity.value;
      const password = wifiPassword.value;
      const isHidden = wifiHidden.checked;

      // Validation
      if (!ssid) {
        qrValidation.className = 'validation-block error';
        qrValidation.style.display = 'flex';
        qrValidation.innerHTML = `
          <i data-lucide="alert-triangle" class="validation-icon"></i>
          <span class="validation-message">${t('qrValSsidErr')}</span>
        `;
        lucide.createIcons();
        btnDownloadQr.disabled = true;
        return;
      }

      if (security !== 'nopass' && !password) {
        qrValidation.className = 'validation-block error';
        qrValidation.style.display = 'flex';
        qrValidation.innerHTML = `
          <i data-lucide="alert-triangle" class="validation-icon"></i>
          <span class="validation-message">${t('qrValPassErr')}</span>
        `;
        lucide.createIcons();
        btnDownloadQr.disabled = true;
        return;
      }

      qrValidation.style.display = 'none';

      // Escape special characters in SSID and password if needed
      const escapeWifiVal = (str) => {
        return str.replace(/\\/g, '\\\\')
                  .replace(/;/g, '\\;')
                  .replace(/:/g, '\\:')
                  .replace(/,/g, '\\,');
      };

      const escapedSsid = escapeWifiVal(ssid);
      const escapedPass = security !== 'nopass' ? escapeWifiVal(password) : '';
      const hiddenStr = isHidden ? 'true' : '';

      const qrText = `WIFI:S:${escapedSsid};T:${security};P:${escapedPass};H:${hiddenStr};;`;

      // Call QRCode browser package method to paint canvas
      if (typeof QRCode !== 'undefined') {
        QRCode.toCanvas(qrCanvas, qrText, {
          width: 220,
          margin: 1,
          color: {
            dark: '#0f172a',
            light: '#ffffff'
          },
          errorCorrectionLevel: 'Q'
        }, (error) => {
          if (error) {
            console.error(error);
            qrValidation.className = 'validation-block error';
            qrValidation.style.display = 'flex';
            qrValidation.innerHTML = `
              <i data-lucide="x-circle" class="validation-icon"></i>
              <span class="validation-message">${t('qrValFail')}</span>
            `;
            lucide.createIcons();
            btnDownloadQr.disabled = true;
          } else {
            // Success
            btnDownloadQr.disabled = false;
            displaySsid.innerText = ssid;
            
            let secLabel = t('qrDisplayOpen');
            if (security === 'WPA') secLabel = t('qrDisplayWPA');
            if (security === 'WEP') secLabel = t('qrDisplayWEP');
            displaySecurity.innerText = secLabel;
          }
        });
      } else {
        qrValidation.className = 'validation-block error';
        qrValidation.style.display = 'flex';
        qrValidation.innerHTML = `
          <i data-lucide="x-circle" class="validation-icon"></i>
          <span class="validation-message">${t('qrValNoLib')}</span>
        `;
        lucide.createIcons();
      }
    };

    btnGenerateQr.addEventListener('click', generateQrCode);

    // Download QR Code Canvas as PNG
    btnDownloadQr.addEventListener('click', () => {
      const ssid = wifiSsid.value.trim() || 'wifi';
      const link = document.createElement('a');
      link.download = `wifi-qr-${ssid}.png`;
      link.href = qrCanvas.toDataURL('image/png');
      link.click();
    });

    // Generate initial on mount
    generateQrCode();
  }
};
