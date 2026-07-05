/* ==========================================================================
   CNE Toolkit - Password Generator Component (Translated)
   ========================================================================== */

window.PasswordGeneratorComponent = {
  render() {
    return `
      <div class="tool-view">
        <div class="tool-header">
          <div class="tool-header-icon">
            <i data-lucide="key-round"></i>
          </div>
          <div class="tool-header-text">
            <h2>${t('passwordGenTitle')}</h2>
            <p>${t('passwordGenDesc')}</p>
          </div>
        </div>

        <div class="tool-workspace">
          <!-- Configurations Card -->
          <div class="card">
            <h3 class="card-title" style="margin-bottom: 1.5rem;">${t('passConfigTitle')}</h3>
            
            <div class="form-group">
              <label for="passLength" class="form-label">${t('passLengthLabel')}</label>
              <div class="slider-container">
                <input type="range" id="passLength" class="range-slider" min="6" max="64" value="16">
                <span class="slider-val" id="lengthVal">16</span>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">${t('passIncludeLabel')}</label>
              <div class="checkbox-grid">
                <label class="checkbox-label">
                  <input type="checkbox" id="chkUpper" class="checkbox-input" checked>
                  <span>${t('passUppercase')}</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" id="chkLower" class="checkbox-input" checked>
                  <span>${t('passLowercase')}</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" id="chkNumbers" class="checkbox-input" checked>
                  <span>${t('passNumbers')}</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" id="chkSymbols" class="checkbox-input" checked>
                  <span>${t('passSymbols')}</span>
                </label>
              </div>
            </div>

            <!-- Validation Info -->
            <div id="passValidation" class="validation-block error" style="display: none; margin-top: 1rem;">
              <i data-lucide="alert-triangle" class="validation-icon"></i>
              <span class="validation-message">${t('passValErr')}</span>
            </div>

            <div style="margin-top: 1.5rem;">
              <button class="btn btn-primary btn-block" id="btnGeneratePass">
                <i data-lucide="refresh-cw"></i>
                <span>${t('btnGeneratePass')}</span>
              </button>
            </div>
          </div>

          <!-- Output Display Card -->
          <div class="card results-card">
            <div class="results-header">
              <h3>${t('analysisResultsTitle')}</h3>
              <span class="badge" id="strengthBadge">-</span>
            </div>

        <input type="text" id="passwordOutput" placeholder="Type here..." style="background: #ffffff; border: 1px solid #ccc; padding: 10px; border-radius: 5px; width: 100%; color: #000;">
              <button class="copy-btn" id="btnCopyPass" title="${t('btnCopyTooltip')}" disabled>
                <i data-lucide="copy" id="copyIcon"></i>
              </button>
            </div>

            <div class="results-grid">
              <div class="result-row-vertical" style="padding: 1rem;">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center; gap: 0.5rem;">
                  <span class="result-label">${t('passStrength')}</span>
                  <span class="strength-label-text" id="strengthLabel">-</span>
                </div>
                
                <div class="strength-meter-bar" style="width: 100%;">
                  <div class="strength-indicator" id="strengthIndicator" style="width: 0%;"></div>
                </div>
                
                <p style="font-size: 0.75rem; color: var(--text-light); margin-top: 0.75rem; line-height: 1.4;" id="entropyPara">
                  -
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    const passLength = document.getElementById('passLength');
    const lengthVal = document.getElementById('lengthVal');
    const chkUpper = document.getElementById('chkUpper');
    const chkLower = document.getElementById('chkLower');
    const chkNumbers = document.getElementById('chkNumbers');
    const chkSymbols = document.getElementById('chkSymbols');
    const passValidation = document.getElementById('passValidation');
    const btnGeneratePass = document.getElementById('btnGeneratePass');
    
    const passwordOutput = document.getElementById('passwordOutput');
    const btnCopyPass = document.getElementById('btnCopyPass');
    const strengthBadge = document.getElementById('strengthBadge');
    const strengthLabel = document.getElementById('strengthLabel');
    const strengthIndicator = document.getElementById('strengthIndicator');
    const entropyPara = document.getElementById('entropyPara');

    // Length Slider update
    passLength.addEventListener('input', (e) => {
      lengthVal.innerText = e.target.value;
    });

    const getOptions = () => {
      return {
        uppercase: chkUpper.checked,
        lowercase: chkLower.checked,
        numbers: chkNumbers.checked,
        symbols: chkSymbols.checked
      };
    };

    const validateOptions = () => {
      const opts = getOptions();
      const isValid = opts.uppercase || opts.lowercase || opts.numbers || opts.symbols;
      
      if (!isValid) {
        passValidation.style.display = 'flex';
        btnGeneratePass.disabled = true;
        btnGeneratePass.style.opacity = '0.5';
        btnGeneratePass.style.cursor = 'not-allowed';
      } else {
        passValidation.style.display = 'none';
        btnGeneratePass.disabled = false;
        btnGeneratePass.style.opacity = '1';
        btnGeneratePass.style.cursor = 'pointer';
      }
      return isValid;
    };

    [chkUpper, chkLower, chkNumbers, chkSymbols].forEach(chk => {
      chk.addEventListener('change', validateOptions);
    });

    const triggerGeneration = () => {
      if (!validateOptions()) return;

      const length = parseInt(passLength.value, 10);
      const options = getOptions();
      
      const password = CneUtils.generatePassword(length, options);
      passwordOutput.innerText = password;
      passwordOutput.style.color = 'var(--text-dark)';
      btnCopyPass.disabled = false;
      
      // Update Strength Info (which returns keys like 'passStrong')
      const strength = CneUtils.calculatePasswordStrength(password, options);
      const localizedLabel = t(strength.label); // e.g. "Strong" or "قوي"
      
      strengthBadge.className = `badge ${strength.class}`;
      strengthBadge.innerText = localizedLabel;
      
      strengthLabel.innerText = localizedLabel;
      
      // Format entropy text
      entropyPara.innerHTML = t('passEntropyInfo').replace('{entropy}', strength.entropy);

      // Color and bar adjustments
      let colorClass = 'var(--error)';
      if (strength.label === 'passMedium') colorClass = 'var(--warning)';
      if (strength.label === 'passStrong') colorClass = 'var(--success)';
      
      strengthLabel.style.color = colorClass;
      strengthIndicator.style.backgroundColor = colorClass;
      
      // Map entropy percentages (cap at 128 bits for 100% visualization)
      const pct = Math.min(100, Math.round((strength.entropy / 128) * 100));
      strengthIndicator.style.width = `${pct}%`;
    };

    btnGeneratePass.addEventListener('click', triggerGeneration);

    // Copy to clipboard with success UI transition
    btnCopyPass.addEventListener('click', () => {
      const textToCopy = passwordOutput.innerText;
      if (textToCopy === t('passOutputPlaceholder') || !textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        btnCopyPass.classList.add('copied');
        btnCopyPass.innerHTML = `<span style="font-size:0.75rem; font-weight:700; color:var(--success); margin-inline-end:0.25rem;">${t('copiedSuccess')}</span><i data-lucide="check" style="width: 1.25rem; height: 1.25rem;"></i>`;
        lucide.createIcons();

        setTimeout(() => {
          btnCopyPass.classList.remove('copied');
          btnCopyPass.innerHTML = '<i data-lucide="copy" style="width: 1.25rem; height: 1.25rem;"></i>';
          lucide.createIcons();
        }, 2000);
      });
    });

    // Run first time to populate initially
    triggerGeneration();
  }
};
