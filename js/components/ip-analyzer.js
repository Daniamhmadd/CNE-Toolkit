/* ==========================================================================
   CNE Toolkit - IP Address Analyzer Component (Translated)
   ========================================================================== */

window.IpAnalyzerComponent = {
  render() {
    return `
      <div class="tool-view">
        <div class="tool-header">
          <div class="tool-header-icon">
            <i data-lucide="binary"></i>
          </div>
          <div class="tool-header-text">
            <h2>${t('ipAnalyzerTitle')}</h2>
            <p>${t('ipAnalyzerDesc')}</p>
          </div>
        </div>

        <div class="tool-workspace">
          <!-- Input Form Column -->
          <div class="card">
            <h3 class="card-title" style="margin-bottom: 1.5rem;">${t('inputParamsTitle')}</h3>
            
            <div class="form-group">
              <label for="ipInput" class="form-label">${t('ipInputLabel')}</label>
              <input type="text" id="ipInput" class="form-input" placeholder="${t('ipPlaceholder')}" value="192.168.1.10" autocomplete="off">
            </div>

            <!-- Validation Feedback Alert Box -->
            <div id="ipValidation" class="validation-block success">
              <i data-lucide="check-circle" class="validation-icon"></i>
              <span class="validation-message" id="validationText">${t('ipValValid')}</span>
            </div>
          </div>

          <!-- Results Panel Column -->
          <div class="card results-card">
            <div class="results-header">
              <h3>${t('analysisResultsTitle')}</h3>
              <span class="badge badge-primary">IPv4</span>
            </div>

            <div class="results-grid">
              <div class="result-row">
                <span class="result-label">${t('ipClass')}</span>
                <span class="result-value" id="resClass">-</span>
              </div>

              <div class="result-row">
                <span class="result-label">${t('ipScope')}</span>
                <span class="result-value" id="resScope">-</span>
              </div>

              <div class="result-row result-row-vertical">
                <span class="result-label">${t('ipBinary')}</span>
                <span class="result-value code-style" id="resBinary">-</span>
              </div>

              <div class="result-row">
                <span class="result-label">${t('ipDecimal')}</span>
                <span class="result-value code-style" id="resDecimal">-</span>
              </div>

              <div class="result-row">
                <span class="result-label">${t('ipHexadecimal')}</span>
                <span class="result-value code-style" id="resHex">-</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    const ipInput = document.getElementById('ipInput');
    const ipValidation = document.getElementById('ipValidation');
    
    const resClass = document.getElementById('resClass');
    const resScope = document.getElementById('resScope');
    const resBinary = document.getElementById('resBinary');
    const resDecimal = document.getElementById('resDecimal');
    const resHex = document.getElementById('resHex');

    const updateAnalysis = () => {
      const value = ipInput.value.trim();
      
      if (!value) {
        // Empty state
        ipValidation.className = 'validation-block error';
        ipValidation.innerHTML = `
          <i data-lucide="alert-triangle" class="validation-icon"></i>
          <span class="validation-message">${t('ipValEmpty')}</span>
        `;
        lucide.createIcons();
        
        resClass.innerText = '-';
        resScope.innerText = '-';
        resBinary.innerText = '-';
        resDecimal.innerText = '-';
        resHex.innerText = '-';
        return;
      }

      if (CneUtils.validateIp(value)) {
        // Valid IP
        ipValidation.className = 'validation-block success';
        ipValidation.innerHTML = `
          <i data-lucide="check-circle" class="validation-icon"></i>
          <span class="validation-message">${t('ipValValid')}</span>
        `;
        lucide.createIcons();

        // Calculate values
        const ipClass = CneUtils.getIpClass(value);
        const ipPrivacy = CneUtils.getIpPrivacy(value);
        const ipBinary = CneUtils.ipToBinary(value);
        const ipDecimal = CneUtils.ipToDecimal(value);
        const ipHex = CneUtils.ipToHex(value);

        // Map class display label (Class A, Loopback, etc.)
        let displayClass = '';
        if (ipClass.includes('Loopback')) {
          displayClass = `${t('ipClassLabel')} A (${t('ipLoopback')})`;
        } else if (ipClass.includes('Multicast')) {
          displayClass = `D (${t('navTools')} - Multicast)`;
        } else if (ipClass.includes('Experimental')) {
          displayClass = `E (${t('aboutP2Title')})`;
        } else {
          displayClass = `${t('ipClassLabel')} ${ipClass}`;
        }

        resClass.innerHTML = `<span class="badge ${ipClass.startsWith('A') || ipClass.startsWith('B') || ipClass.startsWith('C') ? 'badge-success' : 'badge-warning'}">${displayClass}</span>`;
        
        // Map privacy/routing scope display labels
        let privacyBadge = 'badge-primary';
        let privacyLabel = t('ipPublic');
        
        if (ipPrivacy === 'Private') {
          privacyBadge = 'badge-success';
          privacyLabel = t('ipPrivate');
        } else if (ipPrivacy.includes('Loopback')) {
          privacyBadge = 'badge-warning';
          privacyLabel = t('ipLoopback');
        } else if (ipPrivacy.includes('Link-Local')) {
          privacyBadge = 'badge-warning';
          privacyLabel = t('ipLinkLocal');
        }
        
        resScope.innerHTML = `<span class="badge ${privacyBadge}">${privacyLabel}</span>`;
        
        resBinary.innerText = ipBinary;
        resDecimal.innerText = ipDecimal;
        resHex.innerText = ipHex;
      } else {
        // Invalid IP
        ipValidation.className = 'validation-block error';
        ipValidation.innerHTML = `
          <i data-lucide="x-circle" class="validation-icon"></i>
          <span class="validation-message">${t('ipValInvalid')}</span>
        `;
        lucide.createIcons();

        resClass.innerText = t('invalidFormat');
        resScope.innerText = t('invalidFormat');
        resBinary.innerText = t('invalidFormat');
        resDecimal.innerText = t('invalidFormat');
        resHex.innerText = t('invalidFormat');
      }
    };

    // Listen for real-time keystrokes
    ipInput.addEventListener('input', updateAnalysis);
    
    // Initial run on mount
    updateAnalysis();
  }
};
