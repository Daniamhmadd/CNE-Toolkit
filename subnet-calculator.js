/* ==========================================================================
   CNE Toolkit - Subnet Calculator Component (Translated)
   ========================================================================== */

window.SubnetCalculatorComponent = {
  render() {
    // Generate CIDR options /0 to /32 with visual hints
    let cidrOptions = '';
    for (let i = 32; i >= 0; i--) {
      let mask = '';
      // Pre-calculate mask label for common dropdown representation
      const maskLong = i === 0 ? 0 : (~0 << (32 - i)) >>> 0;
      const octet1 = (maskLong >>> 24) & 255;
      const octet2 = (maskLong >>> 16) & 255;
      const octet3 = (maskLong >>> 8) & 255;
      const octet4 = maskLong & 255;
      mask = `${octet1}.${octet2}.${octet3}.${octet4}`;
      
      const selected = i === 24 ? 'selected' : '';
      cidrOptions += `<option value="${i}" ${selected}>/${i} &nbsp;&mdash;&nbsp; ${mask}</option>`;
    }

    return `
      <div class="tool-view">
        <div class="tool-header">
          <div class="tool-header-icon">
            <i data-lucide="calculator"></i>
          </div>
          <div class="tool-header-text">
            <h2>${t('subnetCalcTitle')}</h2>
            <p>${t('subnetCalcDesc')}</p>
          </div>
        </div>

        <div class="tool-workspace">
          <!-- Inputs Card -->
          <div class="card">
            <h3 class="card-title" style="margin-bottom: 1.5rem;">${t('inputParamsTitle')}</h3>
            
            <div class="form-group">
              <label for="subIpInput" class="form-label">${t('baseIpLabel')}</label>
              <input type="text" id="subIpInput" class="form-input" placeholder="${t('ipPlaceholder')}" value="192.168.1.10" autocomplete="off">
            </div>

            <div class="form-group">
              <label for="cidrSelect" class="form-label">${t('cidrLabel')}</label>
              <select id="cidrSelect" class="form-input" style="font-family: monospace; direction: ltr;">
                ${cidrOptions}
              </select>
            </div>

            <!-- Validation Info -->
            <div id="subnetValidation" class="validation-block success">
              <i data-lucide="check-circle" class="validation-icon"></i>
              <span class="validation-message" id="subnetValidationText">${t('subValValid')}</span>
            </div>
          </div>

          <!-- Outputs Card -->
          <div class="card results-card">
            <div class="results-header">
              <h3>${t('subnetInfoTitle')}</h3>
              <span class="badge badge-primary" id="subnetBadge">/24</span>
            </div>

            <div class="results-grid">
              <div class="result-row">
                <span class="result-label">${t('subNetwork')}</span>
                <span class="result-value code-style" id="subNetwork">-</span>
              </div>

              <div class="result-row">
                <span class="result-label">${t('subBroadcast')}</span>
                <span class="result-value code-style" id="subBroadcast">-</span>
              </div>

              <div class="result-row">
                <span class="result-label">${t('subFirstHost')}</span>
                <span class="result-value code-style" id="subFirst">-</span>
              </div>

              <div class="result-row">
                <span class="result-label">${t('subLastHost')}</span>
                <span class="result-value code-style" id="subLast">-</span>
              </div>

              <div class="result-row">
                <span class="result-label">${t('subMask')}</span>
                <span class="result-value code-style" id="subMask">-</span>
              </div>

              <div class="result-row">
                <span class="result-label">${t('subWildcard')}</span>
                <span class="result-value code-style" id="subWildcard">-</span>
              </div>

              <div class="result-row">
                <span class="result-label">${t('subTotalHosts')}</span>
                <span class="result-value" id="subTotalHosts">-</span>
              </div>

              <div class="result-row">
                <span class="result-label">${t('subUsableHosts')}</span>
                <span class="result-value" id="subUsableHosts">-</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    const subIpInput = document.getElementById('subIpInput');
    const cidrSelect = document.getElementById('cidrSelect');
    const subnetValidation = document.getElementById('subnetValidation');
    const subnetBadge = document.getElementById('subnetBadge');

    const subNetwork = document.getElementById('subNetwork');
    const subBroadcast = document.getElementById('subBroadcast');
    const subFirst = document.getElementById('subFirst');
    const subLast = document.getElementById('subLast');
    const subMask = document.getElementById('subMask');
    const subWildcard = document.getElementById('subWildcard');
    const subTotalHosts = document.getElementById('subTotalHosts');
    const subUsableHosts = document.getElementById('subUsableHosts');

    const calculate = () => {
      const ip = subIpInput.value.trim();
      const prefix = parseInt(cidrSelect.value, 10);
      
      // Update badge
      subnetBadge.innerText = `/${prefix}`;

      if (!ip) {
        subnetValidation.className = 'validation-block error';
        subnetValidation.innerHTML = `
          <i data-lucide="alert-triangle" class="validation-icon"></i>
          <span class="validation-message">${t('subValEmpty')}</span>
        `;
        lucide.createIcons();
        clearResults();
        return;
      }

      if (CneUtils.validateIp(ip)) {
        subnetValidation.className = 'validation-block success';
        subnetValidation.innerHTML = `
          <i data-lucide="check-circle" class="validation-icon"></i>
          <span class="validation-message">${t('subValValid')}</span>
        `;
        lucide.createIcons();

        const result = CneUtils.calculateSubnet(ip, prefix);
        if (result) {
          subNetwork.innerText = result.networkAddress;
          subBroadcast.innerText = result.broadcastAddress;
          subFirst.innerText = result.firstHost;
          subLast.innerText = result.lastHost;
          subMask.innerText = result.subnetMask;
          subWildcard.innerText = result.wildcardMask;
          subTotalHosts.innerText = result.totalHosts;
          subUsableHosts.innerText = result.usableHosts;
        }
      } else {
        subnetValidation.className = 'validation-block error';
        subnetValidation.innerHTML = `
          <i data-lucide="x-circle" class="validation-icon"></i>
          <span class="validation-message">${t('subValInvalid')}</span>
        `;
        lucide.createIcons();
        clearResults();
      }
    };

    const clearResults = () => {
      subNetwork.innerText = '-';
      subBroadcast.innerText = '-';
      subFirst.innerText = '-';
      subLast.innerText = '-';
      subMask.innerText = '-';
      subWildcard.innerText = '-';
      subTotalHosts.innerText = '-';
      subUsableHosts.innerText = '-';
    };

    subIpInput.addEventListener('input', calculate);
    cidrSelect.addEventListener('change', calculate);

    // Run initially
    calculate();
  }
};
