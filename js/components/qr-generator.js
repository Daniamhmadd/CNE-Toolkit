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

          <div id="qrBox" style="margin-top:20px; display:flex; justify-content:center;"></div>

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

        const generate = () => {

            try {

                if (!window.QRCode) {
                    console.error("QRCode library missing");
                    return;
                }

                qrBox.innerHTML = "";

                const ssidVal = ssid.value.trim();
                const passVal = pass.value.trim();
                const secVal = sec.value;

                if (!ssidVal) return;

                const qrText =
                    secVal === "nopass"
                        ? `WIFI:S:${ssidVal};T:nopass;;`
                        : `WIFI:S:${ssidVal};T:${secVal};P:${passVal};;`;

                // create QR
                new QRCode(qrBox, {
                    text: qrText,
                    width: 220,
                    height: 220,
                    correctLevel: QRCode.CorrectLevel.M
                });

                // capture canvas safely
                setTimeout(() => {
                    lastCanvas = qrBox.querySelector("canvas");
                    btnDownload.disabled = !lastCanvas;
                }, 50);

            } catch (err) {
                console.error("QR generation error:", err);
            }
        };

        btnGen.addEventListener("click", generate);

        btnDownload.addEventListener("click", () => {

            if (!lastCanvas) return;

            const link = document.createElement("a");
            link.download = `wifi-qr-${ssid.value || "code"}.png`;
            link.href = lastCanvas.toDataURL("image/png");
            link.click();
        });

        generate();
    }
};