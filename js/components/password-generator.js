/* ==========================================================================
   CNE Toolkit - Password Generator Component (Translated)
   ========================================================================== */

// الكود الكامل لـ password-generator.js
window.PasswordGeneratorComponent = {
    render() {
        return `
      <div class="tool-view">
        <div class="tool-header">
          <div class="tool-header-icon"><i data-lucide="key-round"></i></div>
          <div class="tool-header-text">
            <h2>${t('passwordGenTitle')}</h2>
            <p>${t('passwordGenDesc')}</p>
          </div>
        </div>
        <div class="tool-workspace">
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
                <label class="checkbox-label"><input type="checkbox" id="chkUpper" class="checkbox-input" checked><span>${t('passUppercase')}</span></label>
                <label class="checkbox-label"><input type="checkbox" id="chkLower" class="checkbox-input" checked><span>${t('passLowercase')}</span></label>
                <label class="checkbox-label"><input type="checkbox" id="chkNumbers" class="checkbox-input" checked><span>${t('passNumbers')}</span></label>
                <label class="checkbox-label"><input type="checkbox" id="chkSymbols" class="checkbox-input" checked><span>${t('passSymbols')}</span></label>
              </div>
            </div>
            <div id="passValidation" class="validation-block error" style="display: none; margin-top: 1rem;">
              <i data-lucide="alert-triangle" class="validation-icon"></i>
              <span class="validation-message">${t('passValErr')}</span>
            </div>
            <div style="margin-top: 1.5rem;">
              <button class="btn btn-primary btn-block" id="btnGeneratePass">
                <i data-lucide="refresh-cw"></i><span>${t('btnGeneratePass')}</span>
              </button>
            </div>
          </div>
          <div class="card results-card">
            <div class="results-header"><h3>${t('analysisResultsTitle')}</h3><span class="badge" id="strengthBadge">-</span></div>
            <div class="password-output-box">
              <input type="text" id="passwordOutput" class="password-input" style="background: #ffffff; border: 1px solid #ccc; padding: 10px; width: 100%; border-radius: 5px;">
              <button class="copy-btn" id="btnCopyPass" title="Copy"><i data-lucide="copy" id="copyIcon"></i></button>
            </div>
            <div class="results-grid">
              <div class="result-row-vertical" style="padding: 1rem;">
                <div style="display: flex; justify-content: space-between; width: 100%; align-items: center; gap: 0.5rem;">
                  <span class="result-label">${t('passStrength')}</span>
                  <span class="strength-label-text" id="strengthLabel">-</span>
                </div>
                <div class="strength-meter-bar" style="width: 100%;"><div class="strength-indicator" id="strengthIndicator" style="width: 0%;"></div></div>
                <p style="font-size: 0.75rem; color: var(--text-light); margin-top: 0.75rem; line-height: 1.4;" id="entropyPara">-</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    },

    init() {
        const passLength = document.getElementById('passLength');
        const chkUpper = document.getElementById('chkUpper');
        const chkLower = document.getElementById('chkLower');
        const chkNumbers = document.getElementById('chkNumbers');
        const chkSymbols = document.getElementById('chkSymbols');
        const passwordOutput = document.getElementById('passwordOutput');
        const btnGeneratePass = document.getElementById('btnGeneratePass');
        const btnCopyPass = document.getElementById('btnCopyPass');
        const strengthBadge = document.getElementById('strengthBadge');
        const strengthLabel = document.getElementById('strengthLabel');
        const strengthIndicator = document.getElementById('strengthIndicator');
        const entropyPara = document.getElementById('entropyPara');

        const getOptions = () => ({
            uppercase: chkUpper.checked,
            lowercase: chkLower.checked,
            numbers: chkNumbers.checked,
            symbols: chkSymbols.checked
        });

        const validateOptions = () => {
            const opts = getOptions();
            const isValid = opts.uppercase || opts.lowercase || opts.numbers || opts.symbols;
            const passValidation = document.getElementById('passValidation');
            if (!isValid) {
                passValidation.style.display = 'flex';
                btnGeneratePass.disabled = true;
            } else {
                passValidation.style.display = 'none';
                btnGeneratePass.disabled = false;
            }
            return isValid;
        };

        const triggerGeneration = () => {
            if (!validateOptions()) return;
            const password = CneUtils.generatePassword(parseInt(passLength.value, 10), getOptions());
            passwordOutput.value = password;

            const strength = CneUtils.calculatePasswordStrength(password, getOptions());
            strengthBadge.innerText = t(strength.label);
            strengthLabel.innerText = t(strength.label);
            entropyPara.innerHTML = t('passEntropyInfo').replace('{entropy}', strength.entropy);

            let color = strength.label === 'passStrong' ? 'var(--success)' : (strength.label === 'passMedium' ? 'var(--warning)' : 'var(--error)');
            strengthLabel.style.color = color;
            strengthIndicator.style.backgroundColor = color;
            strengthIndicator.style.width = `${Math.min(100, Math.round((strength.entropy / 128) * 100))}%`;
        };

        // الربط الصحيح للمدخلات اليدوية
        passwordOutput.addEventListener('input', (e) => {
            const val = e.target.value;
            chkUpper.checked = /[A-Z]/.test(val);
            chkLower.checked = /[a-z]/.test(val);
            chkNumbers.checked = /[0-9]/.test(val);
            chkSymbols.checked = /[^A-Za-z0-9]/.test(val);
            validateOptions();
        });

        btnGeneratePass.addEventListener('click', triggerGeneration);
        [chkUpper, chkLower, chkNumbers, chkSymbols].forEach(chk => chk.addEventListener('change', validateOptions));

        btnCopyPass.addEventListener('click', () => {
            navigator.clipboard.writeText(passwordOutput.value).then(() => {
                btnCopyPass.innerHTML = `<span style="font-size:0.75rem; font-weight:700; color:var(--success);">Copied!</span>`;
                setTimeout(() => { btnCopyPass.innerHTML = '<i data-lucide="copy"></i>'; lucide.createIcons(); }, 2000);
            });
        });

        triggerGeneration();
    }
};