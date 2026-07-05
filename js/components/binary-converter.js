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

      <div class="card" style="padding: 2rem;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem;">
                
                <div class="form-group">
                    <label class="form-label" style="font-weight: 600;">Decimal (Base 10)</label>
                    <input type="text" id="decInput" class="form-input code-style" placeholder="e.g. 192" style="width: 100%; padding: 0.75rem; font-family: monospace;">
                </div>

                <div class="form-group">
                    <label class="form-label" style="font-weight: 600;">Binary (Base 2)</label>
                    <input type="text" id="binInput" class="form-input code-style" placeholder="e.g. 11000000" style="width: 100%; padding: 0.75rem; font-family: monospace;">
                </div>

                <div class="form-group">
                    <label class="form-label" style="font-weight: 600;">Hexadecimal (Base 16)</label>
                    <input type="text" id="hexInput" class="form-input code-style" placeholder="e.g. C0" style="width: 100%; padding: 0.75rem; font-family: monospace; text-transform: uppercase;">
                </div>

                <div class="form-group">
                    <label class="form-label" style="font-weight: 600;">Octal (Base 8)</label>
                    <input type="text" id="octInput" class="form-input code-style" placeholder="e.g. 300" style="width: 100%; padding: 0.75rem; font-family: monospace;">
                </div>

            </div>

            <button id="btnClearAll" class="btn btn-secondary" style="margin-top: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                <i data-lucide="trash-2"></i> Clear Inputs
            </button>
        </div>
            <p style="font-size: 0.8rem; color: var(--text-light); text-align: start; max-width: 400px; margin: 0;">
              ${t('binaryConvTip')}
            </p>
          </div>
        </div>
      </div>
    `;
  },

    init() {
        const decInput = document.getElementById('decInput');
        const binInput = document.getElementById('binInput');
        const hexInput = document.getElementById('hexInput');
        const octInput = document.getElementById('octInput');
        const btnClearAll = document.getElementById('btnClearAll');

        // ÏÇáÉ áÊÍÏíË ÈÇÞí ÇáÍÞæá ÈäÇÁð Úáì ÇáÞíãÉ ÇáãÏÎáÉ æÇáäÙÇã ÇáÎÇÕ ÈåÇ
        const updateAllFields = (value, fromBase) => {
            if (!value.trim()) {
                if (decInput) decInput.value = '';
                if (binInput) binInput.value = '';
                if (hexInput) hexInput.value = '';
                if (octInput) octInput.value = '';
                return;
            }

            try {
                // ÊÍæíá ÇáãÏÎá Åáì ÑÞã ÚÔÑí ÃæáÇð ÈäÇÁð Úáì äÙÇã ÇáÅÏÎÇá
                const parsedInt = parseInt(value, fromBase);

                if (isNaN(parsedInt)) return;

                // ÊÍÏíË ßá ÍÞá ÅÐÇ áã íßä åæ ÇáÍÞá ÇáäÔØ ÇáÐí íßÊÈ Ýíå ÇáãÓÊÎÏã ÍÇáíÇð
                if (fromBase !== 10 && decInput) decInput.value = parsedInt.toString(10);
                if (fromBase !== 2 && binInput) binInput.value = parsedInt.toString(2);
                if (fromBase !== 16 && hexInput) hexInput.value = parsedInt.toString(16).toUpperCase();
                if (fromBase !== 8 && octInput) octInput.value = parsedInt.toString(8);
            } catch (e) {
                console.error("Conversion error", e);
            }
        };

        // ÑÈØ ÇáÃÍÏÇË ááÍÞæá ÇáÃÑÈÚÉ áÊÚãá ÚäÏ ÇáßÊÇÈÉ ÇáÝæÑíÉ
        if (decInput) decInput.addEventListener('input', (e) => updateAllFields(e.target.value, 10));
        if (binInput) binInput.addEventListener('input', (e) => updateAllFields(e.target.value, 2));
        if (hexInput) hexInput.addEventListener('input', (e) => updateAllFields(e.target.value, 16));
        if (octInput) octInput.addEventListener('input', (e) => updateAllFields(e.target.value, 8));

        // ÒÑ ãÓÍ ßÇÝÉ ÇáÍÞæá
        if (btnClearAll) {
            btnClearAll.addEventListener('click', () => {
                if (decInput) decInput.value = '';
                if (binInput) binInput.value = '';
                if (hexInput) hexInput.value = '';
                if (octInput) octInput.value = '';
            });
        }
    }
};