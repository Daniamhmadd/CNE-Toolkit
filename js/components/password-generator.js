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

          <div class="card">

            <h3>${t('passConfigTitle')}</h3>

            <label><input type="checkbox" id="chkUpper" checked> ${t('passUppercase')}</label><br>
            <label><input type="checkbox" id="chkLower" checked> ${t('passLowercase')}</label><br>
            <label><input type="checkbox" id="chkNumbers" checked> ${t('passNumbers')}</label><br>
            <label><input type="checkbox" id="chkSymbols" checked> ${t('passSymbols')}</label><br>

            <div id="passValidation" style="display:none;color:red;margin-top:10px;">
              ${t('passValErr')}
            </div>

            <button id="btnGeneratePass">${t('btnGeneratePass')}</button>

          </div>

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

        const get = (id) => document.getElementById(id);

        const chkUpper = get('chkUpper');
        const chkLower = get('chkLower');
        const chkNumbers = get('chkNumbers');
        const chkSymbols = get('chkSymbols');

        const passValidation = get('passValidation');
        const btnGeneratePass = get('btnGeneratePass');

        const passwordOutput = get('passwordOutput');
        const btnCopyPass = get('btnCopyPass');

        const strengthBadge = get('strengthBadge');
        const strengthLabel = get('strengthLabel');
        const strengthIndicator = get('strengthIndicator');
        const entropyPara = get('entropyPara');

        const FIXED_LENGTH = 16;

        const getOptions = () => ({
            uppercase: chkUpper?.checked,
            lowercase: chkLower?.checked,
            numbers: chkNumbers?.checked,
            symbols: chkSymbols?.checked
        });

        const validateOptions = () => {
            const o = getOptions();
            const valid = o.uppercase || o.lowercase || o.numbers || o.symbols;

            if (passValidation) {
                passValidation.style.display = valid ? 'none' : 'block';
            }

            if (btnGeneratePass) {
                btnGeneratePass.disabled = !valid;
            }

            return valid;
        };

        const updateUI = (strength) => {

            if (strengthBadge) strengthBadge.innerText = t(strength.label);
            if (strengthLabel) strengthLabel.innerText = t(strength.label);
            if (entropyPara) entropyPara.innerText = `Entropy: ${strength.entropy}`;

            let color = 'red';
            if (strength.label === 'passMedium') color = 'orange';
            if (strength.label === 'passStrong') color = 'green';

            if (strengthIndicator) {
                strengthIndicator.style.width =
                    `${Math.min(100, (strength.entropy / 128) * 100)}%`;
                strengthIndicator.style.background = color;
            }
        };

        const generatePassword = () => {

            if (!validateOptions()) return;

            const options = getOptions();
            const password = CneUtils.generatePassword(FIXED_LENGTH, options);

            passwordOutput.value = password;

            const strength = CneUtils.calculatePasswordStrength(password, options);
            updateUI(strength);
        };

        const copyPassword = async () => {
            const text = passwordOutput.value;
            if (!text) return;

            try {
                await navigator.clipboard.writeText(text);
                btnCopyPass.innerText = "Copied!";
                setTimeout(() => btnCopyPass.innerText = "Copy", 1200);
            } catch (e) {
                // fallback
                passwordOutput.select();
                document.execCommand("copy");
                btnCopyPass.innerText = "Copied!";
                setTimeout(() => btnCopyPass.innerText = "Copy", 1200);
            }
        };

        [chkUpper, chkLower, chkNumbers, chkSymbols].forEach(el => {
            el?.addEventListener('change', validateOptions);
        });

        btnGeneratePass?.addEventListener('click', generatePassword);
        btnCopyPass?.addEventListener('click', copyPassword);

        passwordOutput?.addEventListener('input', () => {
            const val = passwordOutput.value;

            const boxes = {
                chkUpper: /[A-Z]/,
                chkLower: /[a-z]/,
                chkNumbers: /[0-9]/,
                chkSymbols: /[^A-Za-z0-9]/
            };

            for (let id in boxes) {
                const el = get(id);
                if (el) el.checked = boxes[id].test(val);
            }

            const strength = CneUtils.calculatePasswordStrength(val, getOptions());
            updateUI(strength);
        });

        generatePassword();
    }
};