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

          <!-- SETTINGS -->
          <div class="card">

            <h3>${t('passConfigTitle')}</h3>

            <label>${t('passLengthLabel')}</label>
            <input type="range" id="passLength" min="6" max="64" value="16">
            <span id="lengthVal">16</span>

            <br><br>

            <label><input type="checkbox" id="chkUpper" checked> ${t('passUppercase')}</label><br>
            <label><input type="checkbox" id="chkLower" checked> ${t('passLowercase')}</label><br>
            <label><input type="checkbox" id="chkNumbers" checked> ${t('passNumbers')}</label><br>
            <label><input type="checkbox" id="chkSymbols" checked> ${t('passSymbols')}</label><br>

            <div id="passValidation" style="display:none;color:red;margin-top:10px;">
              ${t('passValErr')}
            </div>

            <button id="btnGeneratePass">
              ${t('btnGeneratePass')}
            </button>

          </div>

          <!-- OUTPUT -->
          <div class="card">

            <input type="text" id="passwordOutput" placeholder="Password">

            <button id="btnCopyPass">Copy</button>

            <div class="badge" id="strengthBadge">-</div>
            <div id="strengthLabel">-</div>

            <div style="height:10px;background:#ddd;margin-top:10px;">
              <div id="strengthIndicator" style="height:10px;width:0%;background:red;"></div>
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

        // slider
        passLength.addEventListener('input', (e) => {
            lengthVal.innerText = e.target.value;
        });

        const getOptions = () => ({
            uppercase: chkUpper.checked,
            lowercase: chkLower.checked,
            numbers: chkNumbers.checked,
            symbols: chkSymbols.checked
        });

        // ✅ VALIDATION (fixed scope)
        this.validateOptions = () => {
            const o = getOptions();
            const valid = o.uppercase || o.lowercase || o.numbers || o.symbols;

            passValidation.style.display = valid ? 'none' : 'block';
            btnGeneratePass.disabled = !valid;

            return valid;
        };

        const updateStrengthUI = (strength) => {

            strengthBadge.innerText = t(strength.label);
            strengthLabel.innerText = t(strength.label);

            entropyPara.innerText = `Entropy: ${strength.entropy}`;

            let color = 'red';
            if (strength.label === 'passMedium') color = 'orange';
            if (strength.label === 'passStrong') color = 'green';

            strengthIndicator.style.width =
                `${Math.min(100, (strength.entropy / 128) * 100)}%`;

            strengthIndicator.style.background = color;
        };

        const triggerGeneration = () => {

            if (!this.validateOptions()) return;

            const length = parseInt(passLength.value, 10);
            const options = getOptions();

            const password = CneUtils.generatePassword(length, options);
            passwordOutput.value = password;

            const strength = CneUtils.calculatePasswordStrength(password, options);

            updateStrengthUI(strength);
        };

        // events
        btnGeneratePass.addEventListener('click', triggerGeneration);

        [chkUpper, chkLower, chkNumbers, chkSymbols].forEach(el => {
            el.addEventListener('change', () => this.validateOptions());
        });

        // 🔥 LIVE typing feature (رجعناه صح)
        passwordOutput.addEventListener('input', () => {

            const val = passwordOutput.value;

            const boxes = {
                chkUpper: /[A-Z]/,
                chkLower: /[a-z]/,
                chkNumbers: /[0-9]/,
                chkSymbols: /[^A-Za-z0-9]/
            };

            for (let id in boxes) {
                const el = document.getElementById(id);
                if (el) el.checked = boxes[id].test(val);
            }

            const strength = CneUtils.calculatePasswordStrength(val, getOptions());
            updateStrengthUI(strength);
        });

        btnCopyPass.addEventListener('click', () => {
            const text = passwordOutput.value;
            if (!text) return;

            navigator.clipboard.writeText(text);

            btnCopyPass.innerText = "Copied!";
            setTimeout(() => btnCopyPass.innerText = "Copy", 1500);
        });

        // init
        triggerGeneration();
    }
};