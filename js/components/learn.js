/* ==========================================================================
   CNE Toolkit - Learn Section Component (Translated)
   ========================================================================== */

window.LearnComponent = {
  render() {
    return `
      <div class="tool-view">
        <div class="tool-header">
          <div class="tool-header-icon">
            <i data-lucide="book-open"></i>
          </div>
          <div class="tool-header-text">
            <h2>${t('learnTitle')}</h2>
            <p>${t('learnDesc')}</p>
          </div>
        </div>

        <!-- Learn Cards Grid -->
        <div class="learn-grid">
          
          <!-- OSI Model Card -->
          <div class="learn-card">
            <span class="learn-tag">${t('learnTagArch')}</span>
            <h3>${t('learnOsiTitle')}</h3>
            <p>${t('learnOsiDesc')}</p>
            <div class="learn-content-preview">
              <a class="learn-card-action" data-topic="osi">
                <span>${t('learnOsiBtn')}</span>
                <i data-lucide="arrow-right"></i>
              </a>
            </div>
          </div>

          <!-- TCP/IP Model Card -->
          <div class="learn-card">
            <span class="learn-tag">${t('learnTagArch')}</span>
            <h3>${t('learnTcpipTitle')}</h3>
            <p>${t('learnTcpipDesc')}</p>
            <div class="learn-content-preview">
              <a class="learn-card-action" data-topic="tcpip">
                <span>${t('learnTcpipBtn')}</span>
                <i data-lucide="arrow-right"></i>
              </a>
            </div>
          </div>

          <!-- Common Protocols Card -->
          <div class="learn-card">
            <span class="learn-tag">${t('learnTagProto')}</span>
            <h3>${t('learnProtocolsTitle')}</h3>
            <p>${t('learnProtocolsDesc')}</p>
            <div class="learn-content-preview">
              <a class="learn-card-action" data-topic="protocols">
                <span>${t('learnProtocolsBtn')}</span>
                <i data-lucide="arrow-right"></i>
              </a>
            </div>
          </div>

          <!-- Common Ports Card -->
          <div class="learn-card">
            <span class="learn-tag">${t('learnTagProto')}</span>
            <h3>${t('learnPortsTitle')}</h3>
            <p>${t('learnPortsDesc')}</p>
            <div class="learn-content-preview">
              <a class="learn-card-action" data-topic="ports">
                <span>${t('learnPortsBtn')}</span>
                <i data-lucide="arrow-right"></i>
              </a>
            </div>
          </div>

          <!-- IPv4 Basics Card -->
          <div class="learn-card">
            <span class="learn-tag">${t('learnTagAddr')}</span>
            <h3>${t('learnIpv4Title')}</h3>
            <p>${t('learnIpv4Desc')}</p>
            <div class="learn-content-preview">
              <a class="learn-card-action" data-topic="ipv4">
                <span>${t('learnIpv4Btn')}</span>
                <i data-lucide="arrow-right"></i>
              </a>
            </div>
          </div>

          <!-- Subnetting Basics Card -->
          <div class="learn-card">
            <span class="learn-tag">${t('learnTagAddr')}</span>
            <h3>${t('learnSubnetTitle')}</h3>
            <p>${t('learnSubnetDesc')}</p>
            <div class="learn-content-preview">
              <a class="learn-card-action" data-topic="subnetting">
                <span>${t('learnSubnetBtn')}</span>
                <i data-lucide="arrow-right"></i>
              </a>
            </div>
          </div>

        </div>

        <!-- Global Educational Modal Container -->
        <div class="modal" id="learnModal" role="dialog" aria-modal="true">
          <div class="modal-content">
            <button class="modal-close" id="btnModalClose" aria-label="${t('modalCloseLabel')}">
              <i data-lucide="x"></i>
            </button>
            <div class="modal-header">
              <h3 id="modalTitle" style="font-size: 1.5rem; font-family: var(--font-display);">${t('modalTitleDefault')}</h3>
            </div>
            <div class="modal-body" id="modalBody">
              <!-- Content loaded dynamically on click -->
            </div>
          </div>
        </div>

      </div>
    `;
  },

  // Bilingual Educational Modal database
  topics: {
    en: {
      osi: {
        title: 'The 7-Layer OSI Model',
        body: `
          <p style="margin-bottom: 1rem; font-size: 0.95rem; color: var(--text-medium);">
            The OSI model separates network data transmissions into 7 distinct layers. Each layer has designated jobs and speaks with the layers directly above and below it.
          </p>
          <div style="overflow-x: auto;">
            <table class="modal-table">
              <thead>
                <tr>
                  <th>Layer</th>
                  <th>Name</th>
                  <th>Data Unit (PDU)</th>
                  <th>Functions & Devices</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="osi-layer-num">7</td>
                  <td style="font-weight: 600;">Application</td>
                  <td>Data</td>
                  <td>User interface, HTTP, FTP, SMTP, DNS, APIs.</td>
                </tr>
                <tr>
                  <td class="osi-layer-num">6</td>
                  <td style="font-weight: 600;">Presentation</td>
                  <td>Data</td>
                  <td>Data translation, compression, encryption/decryption (SSL/TLS).</td>
                </tr>
                <tr>
                  <td class="osi-layer-num">5</td>
                  <td style="font-weight: 600;">Session</td>
                  <td>Data</td>
                  <td>Establishes, manages, and terminates application connections (NetBIOS).</td>
                </tr>
                <tr>
                  <td class="osi-layer-num">4</td>
                  <td style="font-weight: 600;">Transport</td>
                  <td>Segments (TCP) / Datagrams (UDP)</td>
                  <td>End-to-end communication, flow control, error correction, port mapping.</td>
                </tr>
                <tr>
                  <td class="osi-layer-num">3</td>
                  <td style="font-weight: 600;">Network</td>
                  <td>Packets</td>
                  <td>Logical addressing (IP), path determination, routing. <i>Devices: Routers.</i></td>
                </tr>
                <tr>
                  <td class="osi-layer-num">2</td>
                  <td style="font-weight: 600;">Data Link</td>
                  <td>Frames</td>
                  <td>Physical addressing (MAC), hardware switching, error detection. <i>Devices: Switches.</i></td>
                </tr>
                <tr>
                  <td class="osi-layer-num">1</td>
                  <td style="font-weight: 600;">Physical</td>
                  <td>Bits</td>
                  <td>Transmission of raw binary signals over cables, light, or air. <i>Devices: Hubs, NICs, Fiber.</i></td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      tcpip: {
        title: 'TCP/IP Model & OSI Mappings',
        body: `
          <p style="margin-bottom: 1rem; font-size: 0.95rem; color: var(--text-medium);">
            The TCP/IP suite is a simplified, 4-layer model mapping directly to internet standards. Unlike OSI, it groups application layers and hardware access layers together.
          </p>
          <div style="overflow-x: auto;">
            <table class="modal-table">
              <thead>
                <tr>
                  <th>TCP/IP Layer</th>
                  <th>OSI Mapped Layers</th>
                  <th>Key Protocols</th>
                  <th>Scope</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="font-weight:600; color: var(--primary);">4. Application</td>
                  <td>Application (7), Presentation (6), Session (5)</td>
                  <td>HTTP, HTTPS, SSH, DNS, DHCP, FTP, SMTP</td>
                  <td>Defines services and user-facing utilities.</td>
                </tr>
                <tr>
                  <td style="font-weight:600; color: var(--primary);">3. Transport</td>
                  <td>Transport (4)</td>
                  <td>TCP, UDP</td>
                  <td>Manages host-to-host data segments.</td>
                </tr>
                <tr>
                  <td style="font-weight:600; color: var(--primary);">2. Internet</td>
                  <td>Network (3)</td>
                  <td>IP (IPv4/IPv6), ICMP, ARP, OSPF</td>
                  <td>Addresses packets and determines routing.</td>
                </tr>
                <tr>
                  <td style="font-weight:600; color: var(--primary);">1. Network Access</td>
                  <td>Data Link (2), Physical (1)</td>
                  <td>Ethernet, Wi-Fi (802.11), PPP, DSL</td>
                  <td>Handles physical network links and frames.</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      protocols: {
        title: 'Common Protocols Reference',
        body: `
          <p style="margin-bottom: 1rem; font-size: 0.95rem; color: var(--text-medium);">
            A network protocol is an established set of rules that determines how data is transmitted between different devices in the same network.
          </p>
          <div style="overflow-x: auto;">
            <table class="modal-table">
              <thead>
                <tr>
                  <th>Protocol</th>
                  <th>Full Name</th>
                  <th>Layer</th>
                  <th>Primary Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="font-weight:600;">HTTP / HTTPS</td>
                  <td>Hypertext Transfer Protocol (Secure)</td>
                  <td>Application</td>
                  <td>Transferring web pages and resource files securely via web browsers.</td>
                </tr>
                <tr>
                  <td style="font-weight:600;">DNS</td>
                  <td>Domain Name System</td>
                  <td>Application</td>
                  <td>Resolving human-readable domains (google.com) to numeric IPs.</td>
                </tr>
                <tr>
                  <td style="font-weight:600;">DHCP</td>
                  <td>Dynamic Host Configuration Protocol</td>
                  <td>Application</td>
                  <td>Automatically assigning IPs, masks, and gateways to network clients.</td>
                </tr>
                <tr>
                  <td style="font-weight:600;">SSH</td>
                  <td>Secure Shell</td>
                  <td>Application</td>
                  <td>Establishing encrypted remote command line access to hosts.</td>
                </tr>
                <tr>
                  <td style="font-weight:600;">TCP</td>
                  <td>Transmission Control Protocol</td>
                  <td>Transport</td>
                  <td>Connection-oriented, reliable, ordered delivery of segments (three-way handshake).</td>
                </tr>
                <tr>
                  <td style="font-weight:600;">UDP</td>
                  <td>User Datagram Protocol</td>
                  <td>Transport</td>
                  <td>Connectionless, speed-focused, best-effort packet delivery (used for gaming, streaming).</td>
                </tr>
                <tr>
                  <td style="font-weight:600;">ARP</td>
                  <td>Address Resolution Protocol</td>
                  <td>Internet</td>
                  <td>Resolving a known logical IP address to a physical MAC address on local segments.</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      ports: {
        title: 'Common Ports Quick-Guide',
        body: `
          <p style="margin-bottom: 1rem; font-size: 0.95rem; color: var(--text-medium);">
            Ports are 16-bit logical sub-addresses ranging from 0 to 65535. They identify which application on a device should process the incoming data.
          </p>
          <ul style="margin-left: 1.25rem; margin-bottom: 1rem; font-size: 0.9rem; color: var(--text-medium); line-height: 1.6;">
            <li><strong>Well-Known Ports (0 - 1023)</strong>: Reserved for system processes and core services (e.g. Port 80 for HTTP, Port 22 for SSH).</li>
            <li><strong>Registered Ports (1024 - 49151)</strong>: Assigned by IANA for specific vendor applications (e.g. Port 3306 for MySQL).</li>
            <li><strong>Dynamic / Private Ports (49152 - 65535)</strong>: Temporarily used by client machines as ephemeral source ports during outgoing connections.</li>
          </ul>
          <div style="overflow-x: auto;">
            <table class="modal-table">
              <thead>
                <tr>
                  <th>Port</th>
                  <th>Protocol</th>
                  <th>Standard Service</th>
                  <th>Security status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>21</strong></td>
                  <td>TCP</td>
                  <td>FTP - File Transfer</td>
                  <td><span class="badge badge-error">Unencrypted</span></td>
                </tr>
                <tr>
                  <td><strong>22</strong></td>
                  <td>TCP</td>
                  <td>SSH - Secure Remote Shell</td>
                  <td><span class="badge badge-success">Encrypted</span></td>
                </tr>
                <tr>
                  <td><strong>23</strong></td>
                  <td>TCP</td>
                  <td>Telnet - Remote Terminal</td>
                  <td><span class="badge badge-error">Unencrypted</span></td>
                </tr>
                <tr>
                  <td><strong>53</strong></td>
                  <td>UDP / TCP</td>
                  <td>DNS - Name Resolution</td>
                  <td><span class="badge badge-primary">Standard</span></td>
                </tr>
                <tr>
                  <td><strong>80</strong></td>
                  <td>TCP</td>
                  <td>HTTP - Web Traffic</td>
                  <td><span class="badge badge-error">Unencrypted</span></td>
                </tr>
                <tr>
                  <td><strong>443</strong></td>
                  <td>TCP</td>
                  <td>HTTPS - Secure Web Traffic</td>
                  <td><span class="badge badge-success">Encrypted</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      ipv4: {
        title: 'IPv4 Basics & Addressing Classes',
        body: `
          <p style="margin-bottom: 1rem; font-size: 0.95rem; color: var(--text-medium);">
            An IPv4 address is a 32-bit logical address structured as four 8-bit octets separated by dots (e.g. 192.168.1.1).
          </p>
          <div style="overflow-x: auto;">
            <table class="modal-table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>First Octet Range</th>
                  <th>Subnet Mask</th>
                  <th>Type / Network Capacity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Class A</strong></td>
                  <td>1 - 126</td>
                  <td>255.0.0.0 (/8)</td>
                  <td>Huge networks (126 Networks, 16.7M hosts each)</td>
                </tr>
                <tr>
                  <td><strong>Class B</strong></td>
                  <td>128 - 191</td>
                  <td>255.255.0.0 (/16)</td>
                  <td>Medium networks (16K Networks, 65K hosts each)</td>
                </tr>
                <tr>
                  <td><strong>Class C</strong></td>
                  <td>192 - 223</td>
                  <td>255.255.255.0 (/24)</td>
                  <td>Small networks (2M Networks, 254 hosts each)</td>
                </tr>
                <tr>
                  <td><strong>Class D</strong></td>
                  <td>224 - 239</td>
                  <td>N/A</td>
                  <td>Reserved for Multicast (no host address assignments)</td>
                </tr>
                <tr>
                  <td><strong>Class E</strong></td>
                  <td>240 - 255</td>
                  <td>N/A</td>
                  <td>Reserved for Experimental/Research purposes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-light); margin-top: 1rem; line-height: 1.4;">
            * Note: First octet 127 is reserved for Local Loopback testing (127.0.0.1) and is not assignable to host NICs.
          </p>
        `
      },
      subnetting: {
        title: 'Subnetting Principles & CIDR Notation',
        body: `
          <p style="margin-bottom: 1rem; font-size: 0.95rem; color: var(--text-medium);">
            Subnetting allows you to borrow bits from the host portion of an IP address to create new sub-networks. This divides large broadcast domains and prevents congestion.
          </p>
          <div style="background-color: var(--bg-input); padding: 1.25rem; border-radius: 12px; margin-bottom: 1.5rem;">
            <h4 style="margin-bottom: 0.5rem; font-size: 0.95rem; font-weight:700;">Subnet Calculations Cheat Sheet:</h4>
            <ul style="margin-left: 1.25rem; font-size: 0.85rem; line-height: 1.6; color: var(--text-medium);">
              <li><strong>Total Subnets Created:</strong> 2^s (where s is the number of bits borrowed from hosts).</li>
              <li><strong>Total Hosts per Subnet:</strong> 2^h (where h is the remaining host bits).</li>
              <li><strong>Usable Hosts per Subnet:</strong> 2^h - 2 (network address and broadcast address cannot be assigned to endpoints).</li>
              <li><strong>Network Address:</strong> Calculated by performing a bitwise logical AND operation between the IP address and the subnet mask.</li>
            </ul>
          </div>
          <div style="overflow-x: auto;">
            <table class="modal-table">
              <thead>
                <tr>
                  <th>CIDR Prefix</th>
                  <th>Subnet Mask</th>
                  <th>Wildcard Mask</th>
                  <th>Total Hosts</th>
                  <th>Usable Hosts</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>/30</strong></td>
                  <td>255.255.255.252</td>
                  <td>0.0.0.3</td>
                  <td>4</td>
                  <td>2 (Ideal for Point-to-Point WAN links)</td>
                </tr>
                <tr>
                  <td><strong>/28</strong></td>
                  <td>255.255.255.240</td>
                  <td>0.0.0.15</td>
                  <td>16</td>
                  <td>14 (Small office LANs)</td>
                </tr>
                <tr>
                  <td><strong>/24</strong></td>
                  <td>255.255.255.0</td>
                  <td>0.0.0.255</td>
                  <td>256</td>
                  <td>254 (Standard local class C subnet)</td>
                </tr>
                <tr>
                  <td><strong>/16</strong></td>
                  <td>255.255.0.0</td>
                  <td>0.0.255.255</td>
                  <td>65,536</td>
                  <td>65,534 (Large corporate enterprise subnet)</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      }
    },
    ar: {
      osi: {
        title: 'نموذج OSI ذو الـ 7 طبقات',
        body: `
          <p style="margin-bottom: 1rem; font-size: 0.95rem; color: var(--text-medium);">
            يقسم نموذج OSI عمليات إرسال البيانات عبر الشبكة إلى 7 طبقات مميزة. لكل طبقة وظائف محددة وتتواصل مع الطبقات التي فوقها وتحتها مباشرة.
          </p>
          <div style="overflow-x: auto;">
            <table class="modal-table">
              <thead>
                <tr>
                  <th>الطبقة</th>
                  <th>الاسم</th>
                  <th>وحدة البيانات (PDU)</th>
                  <th>الوظائف والأجهزة المستعملة</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="osi-layer-num">7</td>
                  <td style="font-weight: 600;">التطبيق (Application)</td>
                  <td>بيانات (Data)</td>
                  <td>واجهة المستخدم، بروتوكولات HTTP, FTP, SMTP, DNS والـ APIs.</td>
                </tr>
                <tr>
                  <td class="osi-layer-num">6</td>
                  <td style="font-weight: 600;">العرض (Presentation)</td>
                  <td>بيانات (Data)</td>
                  <td>ترجمة وتنسيق البيانات، الضغط، التشفير وفك التشفير (SSL/TLS).</td>
                </tr>
                <tr>
                  <td class="osi-layer-num">5</td>
                  <td style="font-weight: 600;">الجلسة (Session)</td>
                  <td>بيانات (Data)</td>
                  <td>إنشاء وإدارة وإنهاء اتصالات التطبيقات (NetBIOS).</td>
                </tr>
                <tr>
                  <td class="osi-layer-num">4</td>
                  <td style="font-weight: 600;">النقل (Transport)</td>
                  <td>قطع (Segments - TCP) / حزم (Datagrams - UDP)</td>
                  <td>الاتصال من البداية للنهاية، التحكم بالتدفق، تصحيح الأخطاء، ربط المنافذ.</td>
                </tr>
                <tr>
                  <td class="osi-layer-num">3</td>
                  <td style="font-weight: 600;">الشبكة (Network)</td>
                  <td>حزم (Packets)</td>
                  <td>العنونة المنطقية (IP)، تحديد مسار البيانات، التوجيه. <i>الأجهزة: الموجهات (Routers).</i></td>
                </tr>
                <tr>
                  <td class="osi-layer-num">2</td>
                  <td style="font-weight: 600;">ربط البيانات (Data Link)</td>
                  <td>أطر (Frames)</td>
                  <td>العنونة الفيزيائية (MAC)، التحويل البرمجي، كشف الأخطاء. <i>الأجهزة: المبدلات (Switches).</i></td>
                </tr>
                <tr>
                  <td class="osi-layer-num">1</td>
                  <td style="font-weight: 600;">الفيزيائية (Physical)</td>
                  <td>بتات (Bits)</td>
                  <td>إرسال الإشارات الثنائية الخام عبر الكابلات، الضوء، أو اللاسلكي. <i>الأجهزة: الموزعات، الكابلات.</i></td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      tcpip: {
        title: 'نموذج TCP/IP ومطابقته مع OSI',
        body: `
          <p style="margin-bottom: 1rem; font-size: 0.95rem; color: var(--text-medium);">
            مجموعة TCP/IP عبارة عن نموذج مبسط من 4 طبقات يتطابق مباشرة مع معايير الإنترنت الأساسية. على عكس OSI، يقوم بدمج طبقات التطبيقات معاً وكذلك الوصول للشبكة الفيزيائية.
          </p>
          <div style="overflow-x: auto;">
            <table class="modal-table">
              <thead>
                <tr>
                  <th>طبقة TCP/IP</th>
                  <th>الطبقات المقابلة في OSI</th>
                  <th>البروتوكولات الرئيسية</th>
                  <th>نطاق العمل</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="font-weight:600; color: var(--primary);">4. التطبيق (Application)</td>
                  <td>التطبيق (7)، العرض (6)، الجلسة (5)</td>
                  <td>HTTP, HTTPS, SSH, DNS, DHCP, FTP, SMTP</td>
                  <td>تحدد الخدمات والأدوات البرمجية التي تظهر للمستخدم.</td>
                </tr>
                <tr>
                  <td style="font-weight:600; color: var(--primary);">3. النقل (Transport)</td>
                  <td>النقل (4)</td>
                  <td>TCP, UDP</td>
                  <td>تنظم وتدير نقل قطع البيانات بين الأجهزة المضيفة.</td>
                </tr>
                <tr>
                  <td style="font-weight:600; color: var(--primary);">2. الإنترنت (Internet)</td>
                  <td>الشبكة (3)</td>
                  <td>IP (IPv4/IPv6), ICMP, ARP, OSPF</td>
                  <td>تعنون حزم البيانات وتحدد مسارات التوجيه المناسبة لها.</td>
                </tr>
                <tr>
                  <td style="font-weight:600; color: var(--primary);">1. الوصول للشبكة (Network Access)</td>
                  <td>ربط البيانات (2)، الفيزيائية (1)</td>
                  <td>Ethernet, Wi-Fi (802.11), PPP, DSL</td>
                  <td>تتعامل مع الروابط الفيزيائية للشبكة ونقل أطر البيانات.</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      protocols: {
        title: 'مرجع البروتوكولات الشائعة',
        body: `
          <p style="margin-bottom: 1rem; font-size: 0.95rem; color: var(--text-medium);">
            بروتوكول الشبكة هو مجموعة القواعد والاتفاقيات المحددة مسبقاً والتي تنظم كيفية تبادل البيانات بين الأجهزة المختلفة داخل نفس الشبكة.
          </p>
          <div style="overflow-x: auto;">
            <table class="modal-table">
              <thead>
                <tr>
                  <th>البروتوكول</th>
                  <th>الاسم الكامل للبروتوكول</th>
                  <th>الطبقة</th>
                  <th>الاستخدام الرئيسي</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="font-weight:600;">HTTP / HTTPS</td>
                  <td>Hypertext Transfer Protocol (Secure)</td>
                  <td>التطبيق</td>
                  <td>نقل صفحات مواقع الويب والملفات بأمان عبر متصفحات الإنترنت.</td>
                </tr>
                <tr>
                  <td style="font-weight:600;">DNS</td>
                  <td>Domain Name System</td>
                  <td>التطبيق</td>
                  <td>تحويل أسماء النطاقات المفهومة للبشر (google.com) لعناوين IP رقمية.</td>
                </tr>
                <tr>
                  <td style="font-weight:600;">DHCP</td>
                  <td>Dynamic Host Configuration Protocol</td>
                  <td>التطبيق</td>
                  <td>توزيع عناوين IP وأقنعة الشبكة والعبارات الافتراضية تلقائياً للأجهزة.</td>
                </tr>
                <tr>
                  <td style="font-weight:600;">SSH</td>
                  <td>Secure Shell</td>
                  <td>التطبيق</td>
                  <td>توفير وصول مشفر وآمن عبر واجهة الأوامر النصية للأجهزة البعيدة.</td>
                </tr>
                <tr>
                  <td style="font-weight:600;">TCP</td>
                  <td>Transmission Control Protocol</td>
                  <td>النقل</td>
                  <td>بروتوكول موثوق يعتمد على إنشاء اتصال مسبق لضمان وصول البيانات مرتبة وكاملة.</td>
                </tr>
                <tr>
                  <td style="font-weight:600;">UDP</td>
                  <td>User Datagram Protocol</td>
                  <td>النقل</td>
                  <td>بروتوكول سريع لا يحتاج لاتصال مسبق، يُستخدم في التطبيقات الحية كالألعاب والبث.</td>
                </tr>
                <tr>
                  <td style="font-weight:600;">ARP</td>
                  <td>Address Resolution Protocol</td>
                  <td>الإنترنت</td>
                  <td>تحويل عنوان IP منطقي معروف إلى عنوان فيزيائي MAC لجهاز ما في الشبكة المحلية.</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      ports: {
        title: 'دليل مرجعي للمنافذ الشائعة',
        body: `
          <p style="margin-bottom: 1rem; font-size: 0.95rem; color: var(--text-medium);">
            المنافذ عبارة عن عناوين منطقية بحجم 16 بت تتراوح بين 0 و 65535. وهي تحدد أي تطبيق داخل الجهاز يجب أن يستقبل بيانات الاتصال الواردة.
          </p>
          <ul style="margin-right: 1.25rem; margin-bottom: 1rem; font-size: 0.9rem; color: var(--text-medium); line-height: 1.6; padding-right: 0.5rem;">
            <li><strong>المنافذ المعروفة (0 - 1023)</strong>: محجوزة للخدمات الأساسية لنظام التشغيل (مثل المنفذ 80 للـ HTTP والمنفذ 22 للـ SSH).</li>
            <li><strong>المنافذ المسجلة (1024 - 49151)</strong>: مخصصة من قبل منظمة IANA لتطبيقات وبرامج معينة (مثل المنفذ 3306 لقواعد MySQL).</li>
            <li><strong>المنافذ الديناميكية (49152 - 65535)</strong>: تُستخدم مؤقتاً كأطراف اتصال عشوائية من قبل الأجهزة العميلة عند إجراء اتصالات خارجية.</li>
          </ul>
          <div style="overflow-x: auto;">
            <table class="modal-table">
              <thead>
                <tr>
                  <th>المنفذ</th>
                  <th>البروتوكول</th>
                  <th>الخدمة الافتراضية</th>
                  <th>الحالة الأمنية</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>21</strong></td>
                  <td>TCP</td>
                  <td>FTP - نقل الملفات</td>
                  <td><span class="badge badge-error">غير مشفر</span></td>
                </tr>
                <tr>
                  <td><strong>22</strong></td>
                  <td>TCP</td>
                  <td>SSH - التحكم المشفر عن بعد</td>
                  <td><span class="badge badge-success">مشفر وآمن</span></td>
                </tr>
                <tr>
                  <td><strong>23</strong></td>
                  <td>TCP</td>
                  <td>Telnet - وصول غير مشفر</td>
                  <td><span class="badge badge-error">غير مشفر</span></td>
                </tr>
                <tr>
                  <td><strong>53</strong></td>
                  <td>UDP / TCP</td>
                  <td>DNS - دمج الأسماء</td>
                  <td><span class="badge badge-primary">قياسي</span></td>
                </tr>
                <tr>
                  <td><strong>80</strong></td>
                  <td>TCP</td>
                  <td>HTTP - تصفح الإنترنت</td>
                  <td><span class="badge badge-error">غير مشفر</span></td>
                </tr>
                <tr>
                  <td><strong>443</strong></td>
                  <td>TCP</td>
                  <td>HTTPS - التصفح الآمن والمشفر</td>
                  <td><span class="badge badge-success">مشفر وآمن</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      ipv4: {
        title: 'أساسيات IPv4 وفئات العنونة',
        body: `
          <p style="margin-bottom: 1rem; font-size: 0.95rem; color: var(--text-medium);">
            عنوان IPv4 عبارة عن عنوان منطقي بحجم 32 بت، يتم تقسيمه على هيئة 4 خانات ثنائية (Octets) يفصل بينها نقاط (مثل 192.168.1.1).
          </p>
          <div style="overflow-x: auto;">
            <table class="modal-table">
              <thead>
                <tr>
                  <th>الفئة (Class)</th>
                  <th>نطاق الخانة الأولى</th>
                  <th>قناع الشبكة الافتراضي</th>
                  <th>السعة الإجمالية للشبكات والأجهزة</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>الفئة A</strong></td>
                  <td>1 - 126</td>
                  <td>255.0.0.0 (/8)</td>
                  <td>شبكات ضخمة جداً (126 شبكة، تحتوي كل منها على 16.7 مليون مضيف)</td>
                </tr>
                <tr>
                  <td><strong>الفئة B</strong></td>
                  <td>128 - 191</td>
                  <td>255.255.0.0 (/16)</td>
                  <td>شبكات متوسطة (16 ألف شبكة، تحتوي كل منها على 65 ألف مضيف)</td>
                </tr>
                <tr>
                  <td><strong>الفئة C</strong></td>
                  <td>192 - 223</td>
                  <td>255.255.255.0 (/24)</td>
                  <td>شبكات صغيرة (2 مليون شبكة، تحتوي كل منها على 254 مضيفاً)</td>
                </tr>
                <tr>
                  <td><strong>الفئة D</strong></td>
                  <td>224 - 239</td>
                  <td>غير متاح</td>
                  <td>محجوزة للبث المتعدد Multicast (لا يمكن إسنادها للأجهزة العادية)</td>
                </tr>
                <tr>
                  <td><strong>الفئة E</strong></td>
                  <td>240 - 255</td>
                  <td>غير متاح</td>
                  <td>محجوزة للأبحاث والتطوير التجريبي فقط</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-light); margin-top: 1rem; line-height: 1.4;">
            * ملاحظة: الرقم 127 في الخانة الأولى محجوز لاختبارات كارت الشبكة المحلي Loopback (127.0.0.1) ولا يُعطى للأجهزة.
          </p>
        `
      },
      subnetting: {
        title: 'قواعد تقسيم الشبكات الفرعية (Subnetting)',
        body: `
          <p style="margin-bottom: 1rem; font-size: 0.95rem; color: var(--text-medium);">
            يتيح تقسيم الشبكات الفرعية استعارة بتات من جزء المضيف (Host) في العنوان لبناء شبكات فرعية أصغر. هذا يقلل من حجم نطاق البث ويحد من الزحام.
          </p>
          <div style="background-color: var(--bg-input); padding: 1.25rem; border-radius: 12px; margin-bottom: 1.5rem;">
            <h4 style="margin-bottom: 0.5rem; font-size: 0.95rem; font-weight:700;">معادلات حساب الـ Subnetting:</h4>
            <ul style="margin-right: 1.25rem; font-size: 0.85rem; line-height: 1.6; color: var(--text-medium); padding-right: 0.5rem;">
              <li><strong>إجمالي الشبكات الفرعية الناتجة:</strong> 2^s (حيث s هي عدد البتات المستعارة).</li>
              <li><strong>إجمالي المضيفين لكل شبكة فرعية:</strong> 2^h (حيث h هي عدد البتات المتبقية للمضيف).</li>
              <li><strong>المضيفين المتاحين للاستخدام:</strong> 2^h - 2 (حيث يتم استبعاد عنوان الشبكة وعنوان البث).</li>
              <li><strong>عنوان الشبكة:</strong> ينتج عن إجراء عملية AND منطقية ثنائية بين عنوان الـ IP وقناع الشبكة.</li>
            </ul>
          </div>
          <div style="overflow-x: auto;">
            <table class="modal-table">
              <thead>
                <tr>
                  <th>البادئة CIDR</th>
                  <th>قناع الشبكة الفرعية</th>
                  <th>قناع الإدخال العشوائي</th>
                  <th>إجمالي العناوين</th>
                  <th>الأجهزة المتاحة</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>/30</strong></td>
                  <td>255.255.255.252</td>
                  <td>0.0.0.3</td>
                  <td>4</td>
                  <td>2 (مثالي لروابط الـ WAN بين الموجهات)</td>
                </tr>
                <tr>
                  <td><strong>/28</strong></td>
                  <td>255.255.255.240</td>
                  <td>0.0.0.15</td>
                  <td>16</td>
                  <td>14 (للمكاتب الصغيرة والشبكات المحلية المحدودة)</td>
                </tr>
                <tr>
                  <td><strong>/24</strong></td>
                  <td>255.255.255.0</td>
                  <td>0.0.0.255</td>
                  <td>256</td>
                  <td>254 (قناع الشبكات الفرعية القياسي للفئة C)</td>
                </tr>
                <tr>
                  <td><strong>/16</strong></td>
                  <td>255.255.0.0</td>
                  <td>0.0.255.255</td>
                  <td>65,536</td>
                  <td>65,534 (للشركات الكبرى ومراكز البيانات الضخمة)</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      }
    }
  },

  init() {
    const learnModal = document.getElementById('learnModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const btnModalClose = document.getElementById('btnModalClose');
    const actionLinks = document.querySelectorAll('.learn-card-action');

    const openTopic = (topicKey) => {
      const activeLang = window.CneAppLanguage || localStorage.getItem('cne_lang') || 'en';
      const data = this.topics[activeLang][topicKey];
      if (!data) return;

      modalTitle.innerText = data.title;
      modalBody.innerHTML = data.body;
      
      // Activate Modal
      learnModal.classList.add('active');
      lucide.createIcons();
      document.body.style.overflow = 'hidden'; // Lock background scroll
    };

    const closeTopic = () => {
      learnModal.classList.remove('active');
      document.body.style.overflow = ''; // Unlock scroll
    };

    // Events
    actionLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const topic = link.getAttribute('data-topic');
        openTopic(topic);
      });
    });

    btnModalClose.addEventListener('click', closeTopic);

    // Close on clicking backdrop overlay
    learnModal.addEventListener('click', (e) => {
      if (e.target === learnModal) {
        closeTopic();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && learnModal.classList.contains('active')) {
        closeTopic();
      }
    });
  }
};
