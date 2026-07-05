/* ==========================================================================
   CNE Toolkit - Wi-Fi QR Code Generator Component (Translated)
   ========================================================================== */

window.QrGeneratorComponent = {

    render() {
        return `
      <div class="tool-view">

        <div class="tool-header">
          <i data-lucide="qr-code"></i>
          <h2>${t('qrTitle')}</h2>
        </div>

        <div class="tool-workspace">

          <input id="wifiSsid" placeholder="SSID" value="MyNetwork">
          <input id="wifiPassword" placeholder="Password" value="12345678">

          <select id="wifiSecurity">
            <option value="WPA">WPA</option>
            <option value="WEP">WEP</option>
            <option value="nopass">Open</option>
          </select>

          <button id="btnGenerateQr">Generate</button>

          <div id="qrBox" style="margin-top:20px;"></div>

          <button id="btnDownloadQr" disabled>Download</button>

        </div>
      </div>
    `;
    },

    init() {

        const ssid = document.getElementById("wifiSsid");
        const pass = document.getElementById("wifiPassword");
        const sec = document.getElementById("wifiSecurity");

        const btnGen = document.getElementById("btnGenerateQr");
        const btnDownload = document.getElementById("btnDownloadQr");
        const qrBox = document.getElementById("qrBox");

        let lastCanvas = null;

        function generate() {

            if (typeof QRCode === "undefined") {
                alert("QR library not loaded");
                return;
            }

            qrBox.innerHTML = "";

            const text = `WIFI:S:${ssid.value};T:${sec.value};P:${pass.value};;`;

            new QRCode(qrBox, {
                text,
                width: 220,
                height: 220
            });

            setTimeout(() => {
                lastCanvas = qrBox.querySelector("canvas");
                btnDownload.disabled = !lastCanvas;
            }, 300);
        }

        btnGen.addEventListener("click", generate);

        btnDownload.addEventListener("click", () => {
            if (!lastCanvas) return;

            const a = document.createElement("a");
            a.download = "wifi-qr.png";
            a.href = lastCanvas.toDataURL("image/png");
            a.click();
        });

        generate();
    }
};