/* ==========================================================================
   CNE Toolkit - Password Generator Component (Translated)
   ========================================================================== */

// الكود الكامل لـ password-generator.js
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
              <label class="form-label">${t('passLengthLabel')}</label>
              <input type="range" id="passLength" min="6" max="64" value="16">
              <span id="lengthVal">16</span>
            </div>

            <div class="form-group">
              <label class="form-label">${t('passIncludeLabel')}</label>

              <label><input type="checkbox" id="chkUpper" checked> ${t('passUppercase')}</label>
              <label><input type="checkbox" id="chkLower" checked> ${t('passLowercase')}</label>
              <label><input type="checkbox" id="chkNumbers" checked> ${t('passNumbers')}</label>
              <label><input type="checkbox" id="chkSymbols" checked> ${t('passSymbols')}</label>
            </div>

            <div id="passValidation" style="display:none; color:red;">
              ${t('passValErr')}
            </div>

            <button id="btnGeneratePass" class="btn btn-primary">
              ${t('btnGeneratePass')}
            </button>

          </div>

          <!-- Output -->
          <div class="card results-card">

            <input type="text" id="passwordOutput" readonly />

            <button id="btnCopyPass">Copy</button>

            <div class="badge" id="strengthBadge">-</div>
            <div id="strengthLabel">-</div>
            <div class="strength-bar">
              <div id="strengthIndicator"></div>
            </div>

            <p id="entropyPara">-</p>

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

        passLength.addEventListener('input', e => {
            lengthVal.innerText = e.target.value;
        });

        const getOptions = () => ({
            uppercase: chkUpper.checked,
            lowercase: chkLower.checked,
            numbers: chkNumbers.checked,
            symbols: chkSymbols.checked
        });

        // ✅ FIX: صار global داخل component
        this.validateOptions = () => {
            const opts = getOptions();
            const valid = opts.uppercase || opts.lowercase || opts.numbers || opts.symbols;

            if (!valid) {
                passValidation.style.display = 'block';
                btnGeneratePass.disabled = true;
            } else {
                passValidation.style.display = 'none';
                btnGeneratePass.disabled = false;
            }

            return valid;
        };

        [chkUpper, chkLower, chkNumbers, chkSymbols].forEach(el => {
            el.addEventListener('change', () => this.validateOptions());
        });

        const triggerGeneration = () => {
            if (!this.validateOptions()) return;

            const length = parseInt(passLength.value);
            const options = getOptions();

            const password = CneUtils.generatePassword(length, options);
            passwordOutput.value = password;

            const strength = CneUtils.calculatePasswordStrength(password, options);

            strengthBadge.innerText = t(strength.label);
            strengthLabel.innerText = t(strength.label);

            entropyPara.innerText = `${t('passEntropyInfo')}: ${strength.entropy}`;

            let color = 'red';
            if (strength.label === 'passMedium') color = 'orange';
            if (strength.label === 'passStrong') color = 'green';

            strengthIndicator.style.width = `${Math.min(100, strength.entropy)}%`;
            strengthIndicator.style.background = color;
        };

        btnGeneratePass.addEventListener('click', triggerGeneration);

        btnCopyPass.addEventListener('click', () => {
            const text = passwordOutput.value; // ✅ FIX

            if (!text) return;

            navigator.clipboard.writeText(text);

            btnCopyPass.innerText = "Copied!";
            setTimeout(() => btnCopyPass.innerText = "Copy", 1500);
        });

        triggerGeneration();
    }
};