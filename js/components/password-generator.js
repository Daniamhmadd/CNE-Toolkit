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

          <!-- INPUT -->
          <div class="card">
            <h3>${t('passConfigTitle')}</h3>

            <label>${t('typePassword')}</label>

            <input type="text"
                   id="passwordOutput"
                   placeholder="Type password here..."
                   style="width:100%; padding:10px; font-size:16px;">

          </div>

          <!-- OUTPUT -->
          <div class="card">

            <div class="badge" id="strengthBadge">-</div>
            <div id="strengthLabel">-</div>

            <div style="height:10px; background:#ddd; margin-top:10px;">
              <div id="strengthIndicator"
                   style="height:10px; width:0%; background:red;"></div>
            </div>

            <p id="entropyPara">-</p>

          </div>

        </div>
      </div>
    `;
    },

    init() {

        const passwordInput = document.getElementById('passwordOutput');
        const strengthLabel = document.getElementById('strengthLabel');
        const strengthBadge = document.getElementById('strengthBadge');
        const strengthIndicator = document.getElementById('strengthIndicator');
        const entropyPara = document.getElementById('entropyPara');

        passwordInput.addEventListener('input', () => {

            const value = passwordInput.value;
            const length = value.length;

            // 🔍 checks
            const hasUpper = /[A-Z]/.test(value);
            const hasLower = /[a-z]/.test(value);
            const hasNumbers = /[0-9]/.test(value);
            const hasSymbols = /[^A-Za-z0-9]/.test(value);

            // 📊 scoring system
            let score = 0;

            if (length >= 1) score++;
            if (length >= 6) score++;
            if (length >= 10) score++;
            if (hasUpper) score++;
            if (hasLower) score++;
            if (hasNumbers) score++;
            if (hasSymbols) score++;

            // 🔥 strength logic
            let strength = "Weak";
            let color = "red";

            if (score >= 4) {
                strength = "Medium";
                color = "orange";
            }

            if (score >= 6) {
                strength = "Strong";
                color = "green";
            }

            // 🧠 UI update
            strengthLabel.innerText = strength;
            strengthBadge.innerText = strength;

            strengthIndicator.style.width = (score / 7) * 100 + "%";
            strengthIndicator.style.background = color;

            entropyPara.innerText =
                `Length: ${length} | Upper: ${hasUpper ? "Yes" : "No"} | Lower: ${hasLower ? "Yes" : "No"} | Numbers: ${hasNumbers ? "Yes" : "No"} | Symbols: ${hasSymbols ? "Yes" : "No"}`;
        });
    }
};