/* ==========================================================================
   CNE Toolkit - Binary Converter Component (Translated)
   ========================================================================== */

window.BinaryConverterComponent = {
  render() {
    return `
      <div class="tool-view">
        <div class="tool-header">
          <div class="tool-header-icon">
            <i data-lucide="shuffle"></i>
          </div>
          <div class="tool-header-text">
            <h2>${t('binaryConvTitle')}</h2>
            <p>${t('binaryConvDesc')}</p>
          </div>
        </div>

        <!-- Converter Layout -->
        <div class="card" style="padding: 2rem;">
          <div class="converter-container">
            
            <!-- Binary Form Field -->
            <div style="flex: 1; width: 100%;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <label for="binInput" class="form-label" style="margin-bottom: 0;">${t('binaryInputLabel')}</label>
                <span class="badge badge-primary">${t('navBinaryConv')}</span>
              </div>
              <textarea id="binInput" class="form-input code-style" rows="4" placeholder="e.g. 11000000 10101000" style="resize: none; font-size: 1.1rem; line-height: 1.5;"></textarea>
              
              <!-- Binary Validation -->
              <div id="binValidation" class="validation-block error" style="display: none; padding: 0.5rem 0.75rem; margin-top: 0.75rem;">
                <i data-lucide="x-circle" class="validation-icon" style="width: 1rem; height: 1rem;"></i>
                <span class="validation-message" style="font-size: 0.75rem;">${t('binaryValErr')}</span>
              </div>
            </div>

            <!-- Swap/Direction visual indicator -->
            <div class="swap-icon">
              <i data-lucide="arrow-left-right"></i>
            </div>

            <!-- Decimal Form Field -->
            <div style="flex: 1; width: 100%;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <label for="decInput" class="form-label" style="margin-bottom: 0;">${t('decimalInputLabel')}</label>
                <span class="badge badge-success">${t('ipDecimal')}</span>
              </div>
              <textarea id="decInput" class="form-input code-style" rows="4" placeholder="e.g. 192" style="resize: none; font-size: 1.1rem; line-height: 1.5;"></textarea>
              
              <!-- Decimal Validation -->
              <div id="decValidation" class="validation-block error" style="display: none; padding: 0.5rem 0.75rem; margin-top: 0.75rem;">
                <i data-lucide="x-circle" class="validation-icon" style="width: 1rem; height: 1rem;"></i>
                <span class="validation-message" style="font-size: 0.75rem;">${t('decimalValErr')}</span>
              </div>
            </div>

          </div>

          <div style="margin-top: 2rem; border-top: 1px solid var(--border-light); padding-top: 1.25rem; display: flex; justify-content: space-between; align-items: center; gap: 1rem; flex-wrap: wrap;">
            <button class="btn btn-secondary" id="btnClearConverter">
              <i data-lucide="trash-2"></i>
              <span>${t('clearInputsBtn')}</span>
            </button>
            <p style="font-size: 0.8rem; color: var(--text-light); text-align: start; max-width: 400px; margin: 0;">
              ${t('binaryConvTip')}
            </p>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    const binInput = document.getElementById('binInput');
    const decInput = document.getElementById('decInput');
    const binValidation = document.getElementById('binValidation');
    const decValidation = document.getElementById('decValidation');
    const btnClearConverter = document.getElementById('btnClearConverter');

    let activeSource = null;

    // Format binary string with spaces every 8 bits for readability
    const formatBinaryOutput = (binStr) => {
      const matches = binStr.match(/.{1,8}/g);
      return matches ? matches.join(' ') : binStr;
    };

    const handleBinaryChange = () => {
      if (activeSource === 'decimal') return;
      activeSource = 'binary';
      
      const value = binInput.value;
      const cleaned = value.replace(/\s+/g, '');
      
      if (!cleaned) {
        binValidation.style.display = 'none';
        decInput.value = '';
        activeSource = null;
        return;
      }

      if (CneUtils.validateBinary(cleaned)) {
        binValidation.style.display = 'none';
        const resultDec = CneUtils.binaryToDecimal(cleaned);
        decInput.value = resultDec;
        decValidation.style.display = 'none';
      } else {
        binValidation.style.display = 'flex';
        decInput.value = t('invalidFormat');
      }
      activeSource = null;
    };

    const handleDecimalChange = () => {
      if (activeSource === 'binary') return;
      activeSource = 'decimal';
      
      const value = decInput.value;
      const cleaned = value.trim();
      
      if (!cleaned) {
        decValidation.style.display = 'none';
        binInput.value = '';
        activeSource = null;
        return;
      }

      if (CneUtils.validateDecimal(cleaned)) {
        decValidation.style.display = 'none';
        const resultBin = CneUtils.decimalToBinary(cleaned);
        binInput.value = formatBinaryOutput(resultBin);
        binValidation.style.display = 'none';
      } else {
        decValidation.style.display = 'flex';
        binInput.value = t('invalidFormat');
      }
      activeSource = null;
    };

    // Keystroke listeners
    binInput.addEventListener('input', handleBinaryChange);
    decInput.addEventListener('input', handleDecimalChange);

    // Clear handler
    btnClearConverter.addEventListener('click', () => {
      binInput.value = '';
      decInput.value = '';
      binValidation.style.display = 'none';
      decValidation.style.display = 'none';
    });

    // Populate initial default example (e.g. 192)
    decInput.value = '192';
    handleDecimalChange();
  }
};
