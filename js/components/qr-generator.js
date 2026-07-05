/* ==========================================================================
   CNE Toolkit - Wi-Fi QR Code Generator Component (Translated)
   ========================================================================== */

window.QrGeneratorComponent = {

    render() {
        return `
      <div class="tool-view">

        <div class="tool-header">
          <div class="tool-header-icon">
            <i data-lucide="qr-code"></i>
          </div>
          <div class="tool-header-text">
            <h2>${t('qrTitle')}</h2>
            <p>${t('qrDesc')}</p>
          </div>
        </div>

        <div class="tool-workspace">

          <div class="card">
            <h3>${t('qrNetworkDetailsTitle')}</h3>

            <input type="text" id="wifiSsid" placeholder="SSID" value="MyNetwork">

            <select id="wifiSecurity">
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">Open</option>
            </select>

            <input type="password" id="wifiPassword" value="12345678">

            <label>
              <input type="checkbox" id="wifiHidden"> Hidden Network
            </label>

            <button id="btnGenerateQr">
              Generate QR
            </button>

          </div>

          <div class="card">

            <div id="qrContainer"></div>

            <h4 id="displaySsid">-</h4>
            <p id="displaySecurity">-</p>

            <button id="btnDownloadQr" disabled>
              Download
            </button>

          </div>

        </div>
      </div>
    `;
    },

    init() {

        const wifiSsid = document.getElementById('wifiSsid');
        const wifiSecurity = document.getElementById('wifiSecurity');
        const wifiPassword = document.getElementById('wifiPassword');
        const wifiHidden = document.getElementById('wifiHidden');

        const btnGenerateQr = document.getElementById('btnGenerateQr');
        const btnDownloadQr = document.getElementById('btnDownloadQr');

        const qrContainer = document.getElementById('qrContainer');
        const displaySsid = document.getElementById('displaySsid');
        const displaySecurity = document.getElementById('displaySecurity');

        let qrInstance = null;

        const generateQrCode = () => {

            const ssid = wifiSsid.value.trim();
            const security = wifiSecurity.value;
            const password = wifiPassword.value;
            const hidden = wifiHidden.checked;

            if (!ssid) return;

            // تنظيف القديم
            qrContainer.innerHTML = "";

            let qrText = `WIFI:S:${ssid};T:${security};P:${password};H:${hidden ? "true" : "false"};;`;

            // 🔥 المكتبة الجديدة
            qrInstance = new QRCode(qrContainer, {
                text: qrText,
                width: 220,
                height: 220
            });

            displaySsid.innerText = ssid;
            displaySecurity.innerText = security;

            btnDownloadQr.disabled = false;
        };

        btnGenerateQr.addEventListener('click', generateQrCode);

        btnDownloadQr.addEventListener('click', () => {

            const canvas = qrContainer.querySelector('canvas');

            if (!canvas) return;

            const link = document.createElement('a');
            link.download = "wifi-qr.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });

        generateQrCode();
    }
};