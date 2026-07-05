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

            <input id="wifiSsid" class="form-input" placeholder="SSID" value="MyNetwork">

            <select id="wifiSecurity" class="form-input">
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">Open</option>
            </select>

            <input id="wifiPassword" class="form-input" type="password" value="12345678">

            <label>
              <input type="checkbox" id="wifiHidden">
              Hidden
            </label>

            <button class="btn btn-primary" id="btnGenerateQr">
              Generate QR
            </button>

            <div id="qrValidation" style="display:none;color:red;"></div>
          </div>

          <div class="card">
            <canvas id="qrCanvas" width="220" height="220"></canvas>

            <h4 id="displaySsid">-</h4>
            <p id="displaySecurity">-</p>

            <button id="btnDownloadQr" disabled>Download</button>
          </div>

        </div>
      </div>
    `;
    },

    init() {

        const ssid = document.getElementById('wifiSsid');
        const security = document.getElementById('wifiSecurity');
        const password = document.getElementById('wifiPassword');
        const hidden = document.getElementById('wifiHidden');

        const canvas = document.getElementById('qrCanvas');
        const btn = document.getElementById('btnGenerateQr');
        const downloadBtn = document.getElementById('btnDownloadQr');

        const err = document.getElementById('qrValidation');
        const displaySsid = document.getElementById('displaySsid');
        const displaySecurity = document.getElementById('displaySecurity');

        const generate = () => {

            const s = ssid.value.trim();
            const sec = security.value;
            const pass = password.value;
            const h = hidden.checked;

            if (!s) {
                err.style.display = "block";
                err.innerText = "SSID required";
                return;
            }

            if (sec !== "nopass" && !pass) {
                err.style.display = "block";
                err.innerText = "Password required";
                return;
            }

            err.style.display = "none";

            const text = `WIFI:S:${s};T:${sec};P:${pass};H:${h};;`;

            // ✅ FIX: الطريقة الصحيحة مع مكتبة qrcode
            QRCode.toCanvas(canvas, text, {
                width: 220,
                margin: 1,
                errorCorrectionLevel: "M"
            }, function (error) {

                if (error) {
                    console.error(error);
                    err.style.display = "block";
                    err.innerText = "QR generation failed";
                    return;
                }

                downloadBtn.disabled = false;

                displaySsid.innerText = s;
                displaySecurity.innerText = sec;
            });
        };

        btn.addEventListener("click", generate);

        downloadBtn.addEventListener("click", () => {
            const a = document.createElement("a");
            a.download = "wifi-qr.png";
            a.href = canvas.toDataURL("image/png");
            a.click();
        });

        generate();
    }
};
