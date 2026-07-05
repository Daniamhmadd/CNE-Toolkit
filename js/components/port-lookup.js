/* ==========================================================================
   CNE Toolkit - Port Lookup Component (Translated)
   ========================================================================== */

window.PortLookupComponent = {
  // Pre-populated common ports list
  commonPorts: [
    { number: 20, service: 'FTP Data', protocol: 'TCP', desc: 'File Transfer Protocol (Data Transfer)' },
    { number: 21, service: 'FTP', protocol: 'TCP', desc: 'File Transfer Protocol (Control Connection)' },
    { number: 22, service: 'SSH', protocol: 'TCP', desc: 'Secure Shell (Encrypted remote command line and SFTP)' },
    { number: 23, service: 'Telnet', protocol: 'TCP', desc: 'Teletype Network (Unencrypted remote terminal connection)' },
    { number: 25, service: 'SMTP', protocol: 'TCP', desc: 'Simple Mail Transfer Protocol (Email routing/sending)' },
    { number: 53, service: 'DNS', protocol: 'TCP/UDP', desc: 'Domain Name System (Resolves hostnames to IP addresses)' },
    { number: 67, service: 'DHCP Server', protocol: 'UDP', desc: 'Dynamic Host Configuration Protocol (Server listening port)' },
    { number: 68, service: 'DHCP Client', protocol: 'UDP', desc: 'Dynamic Host Configuration Protocol (Client listening port)' },
    { number: 80, service: 'HTTP', protocol: 'TCP', desc: 'Hypertext Transfer Protocol (Unencrypted web traffic)' },
    { number: 110, service: 'POP3', protocol: 'TCP', desc: 'Post Office Protocol v3 (Retrieving emails from server)' },
    { number: 143, service: 'IMAP', protocol: 'TCP', desc: 'Internet Message Access Protocol (Retrieving emails with sync)' },
    { number: 161, service: 'SNMP', protocol: 'UDP', desc: 'Simple Network Management Protocol (Network management & monitoring)' },
    { number: 389, service: 'LDAP', protocol: 'TCP/UDP', desc: 'Lightweight Directory Access Protocol (Directory services)' },
    { number: 443, service: 'HTTPS', protocol: 'TCP', desc: 'Hypertext Transfer Protocol Secure (Encrypted web traffic)' },
    { number: 3306, service: 'MySQL', protocol: 'TCP', desc: 'MySQL Database service' },
    { number: 3389, service: 'RDP', protocol: 'TCP/UDP', desc: 'Remote Desktop Protocol (Windows remote desktop)' },
    { number: 8080, service: 'HTTP Alternate', protocol: 'TCP', desc: 'Alternative web port, proxy server, or caching server' }
  ],

  render() {
    // Generate table rows dynamically
    let tableRows = '';
    this.commonPorts.forEach(port => {
      tableRows += `
        <tr class="port-row-clickable" data-port="${port.number}">
          <td><span class="port-badge">${port.number}</span></td>
          <td style="font-weight: 600; color: var(--text-dark);">${port.service}</td>
          <td><span class="badge badge-primary">${port.protocol}</span></td>
          <td>${port.desc}</td>
        </tr>
      `;
    });

    return `
      <div class="tool-view">
        <div class="tool-header">
          <div class="tool-header-icon">
            <i data-lucide="search-code"></i>
          </div>
          <div class="tool-header-text">
            <h2>${t('portLookupTitle')}</h2>
            <p>${t('portLookupDesc')}</p>
          </div>
        </div>

        <div class="tool-workspace">
          <!-- Port Query Column -->
          <div class="card">
            <h3 class="card-title" style="margin-bottom: 1.5rem;">${t('portSearchTitle')}</h3>
            
            <div class="form-group">
              <label for="portInput" class="form-label">${t('portInputLabel')}</label>
              <input type="text" id="portInput" class="form-input" placeholder="${t('portPlaceholder')}" autocomplete="off">
            </div>

            <!-- Single Result Card -->
            <div class="card results-card" style="margin-top: 1.5rem; padding: 1.25rem;">
              <div class="results-header" style="margin-bottom: 0.75rem; padding-bottom: 0.5rem;">
                <h4 style="font-size: 0.95rem; font-weight: 700;">${t('portQueryMatch')}</h4>
                <span class="badge" id="portQueryBadge" style="display: none;">TCP</span>
              </div>
              
              <div id="portResultBody">
                <div style="text-align: center; padding: 1.5rem 0; color: var(--text-light);">
                  <i data-lucide="search" style="margin: 0 auto 0.5rem; width: 1.5rem; height: 1.5rem;"></i>
                  <p style="font-size: 0.85rem;">${t('portQueryEmptyPrompt')}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Common Ports Database Reference Column -->
          <div class="card">
            <h3 class="card-title" style="margin-bottom: 1rem;">${t('portTableTitle')}</h3>
            
            <!-- Table Filter Search -->
            <div class="search-container">
              <input type="text" id="tableFilter" class="form-input" placeholder="${t('portTableFilterPlaceholder')}" style="padding: 0.65rem 0.85rem; font-size: 0.875rem;">
            </div>

            <div class="port-table-container">
              <table class="port-table">
                <thead>
                  <tr>
                    <th>${t('portTableColPort')}</th>
                    <th>${t('portTableColService')}</th>
                    <th>${t('portTableColProto')}</th>
                    <th>${t('portTableColDesc')}</th>
                  </tr>
                </thead>
                <tbody id="portTableBody">
                  ${tableRows}
                </tbody>
              </table>
            </div>
            <p style="font-size: 0.75rem; color: var(--text-light); margin-top: 0.75rem; text-align: center;">
              ${t('portTableTip')}
            </p>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    const portInput = document.getElementById('portInput');
    const portQueryBadge = document.getElementById('portQueryBadge');
    const portResultBody = document.getElementById('portResultBody');
    const tableFilter = document.getElementById('tableFilter');
    const portTableBody = document.getElementById('portTableBody');
    const clickRows = document.querySelectorAll('.port-row-clickable');

    const updateLookup = (portNum) => {
      const trimmed = portNum.trim();
      
      if (!trimmed) {
        portQueryBadge.style.display = 'none';
        portResultBody.innerHTML = `
          <div style="text-align: center; padding: 1.5rem 0; color: var(--text-light);">
            <i data-lucide="search" style="margin: 0 auto 0.5rem; width: 1.5rem; height: 1.5rem;"></i>
            <p style="font-size: 0.85rem;">${t('portQueryEmptyPrompt')}</p>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      // Check if is integer
      const numericPort = parseInt(trimmed, 10);
      if (isNaN(numericPort) || !/^[0-9]+$/.test(trimmed) || numericPort < 0 || numericPort > 65535) {
        portQueryBadge.style.display = 'none';
        portResultBody.innerHTML = `
          <div class="validation-block error" style="margin: 0;">
            <i data-lucide="x-circle" class="validation-icon"></i>
            <span class="validation-message">${t('portValInvalid')}</span>
          </div>
        `;
        lucide.createIcons();
        return;
      }

      // Search database
      const match = this.commonPorts.find(p => p.number === numericPort);

      if (match) {
        // Found standard port
        portQueryBadge.style.display = 'inline-flex';
        portQueryBadge.className = 'badge badge-success';
        portQueryBadge.innerText = match.protocol;

        portResultBody.innerHTML = `
          <div class="results-grid">
            <div class="result-row" style="padding: 0.5rem 0.75rem; border-color: transparent; background-color: transparent;">
              <span class="result-label">${t('portInputLabel')}</span>
              <span class="result-value" style="font-size: 1.15rem; color: var(--primary);">${match.number}</span>
            </div>
            <div class="result-row" style="padding: 0.5rem 0.75rem; border-color: transparent; background-color: transparent;">
              <span class="result-label">${t('portServiceNameLabel')}</span>
              <span class="result-value">${match.service}</span>
            </div>
            <div class="result-row-vertical" style="padding: 0.5rem 0.75rem;">
              <span class="result-label">${t('portDescriptionLabel')}</span>
              <span class="result-value" style="font-weight: 500; font-size: 0.875rem; color: var(--text-medium);">${match.desc}</span>
            </div>
          </div>
        `;
      } else {
        // Unknown or custom port
        portQueryBadge.style.display = 'inline-flex';
        portQueryBadge.className = 'badge badge-warning';
        portQueryBadge.innerText = t('portUnknownStatus');

        portResultBody.innerHTML = `
          <div class="results-grid">
            <div class="result-row" style="padding: 0.5rem 0.75rem; border-color: transparent; background-color: transparent;">
              <span class="result-label">${t('portInputLabel')}</span>
              <span class="result-value" style="font-size: 1.15rem; color: var(--text-medium);">${numericPort}</span>
            </div>
            <div class="result-row-vertical" style="padding: 0.5rem 0.75rem; background-color: var(--warning-light); border-color: rgba(245, 158, 11, 0.2);">
              <span class="result-label" style="color: var(--warning);">${t('portStatusLabel')}</span>
              <span class="result-value" style="color: var(--warning); font-size: 0.95rem;">${t('portUnknownText')}</span>
            </div>
          </div>
        `;
      }
      lucide.createIcons();
    };

    // Filter table search
    const filterTable = () => {
      const filterText = tableFilter.value.toLowerCase().trim();
      const rows = portTableBody.querySelectorAll('tr');
      
      rows.forEach(row => {
        const portNumber = row.getAttribute('data-port');
        const serviceName = row.children[1].innerText.toLowerCase();
        const description = row.children[3].innerText.toLowerCase();
        
        if (portNumber.includes(filterText) || serviceName.includes(filterText) || description.includes(filterText)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    };

    // Events
    portInput.addEventListener('input', (e) => updateLookup(e.target.value));
    tableFilter.addEventListener('input', filterTable);

    // Row selection handles
    clickRows.forEach(row => {
      row.addEventListener('click', () => {
        const portNum = row.getAttribute('data-port');
        portInput.value = portNum;
        updateLookup(portNum);
        
        // Scroll target input into view on mobile
        if (window.innerWidth <= 1024) {
          portInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  }
};
