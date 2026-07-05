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

        <div class="learn-grid">
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

        <div class="modal" id="learnModal" role="dialog" aria-modal="true">
          <div class="modal-content">
            <button class="modal-close" id="btnModalClose">
              <i data-lucide="x"></i>
            </button>

            <div class="modal-header">
              <h3 id="modalTitle">${t('modalTitleDefault')}</h3>
            </div>

            <div class="modal-body" id="modalBody"></div>
          </div>
        </div>
      </div>
    `;
    },

    topics: {
        en: { /* نفس المحتوى بدون تغيير */ },
        ar: { /* نفس المحتوى بدون تغيير */ }
    },

    init() {
        const learnModal = document.getElementById('learnModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        const btnModalClose = document.getElementById('btnModalClose');

        if (!learnModal || !modalTitle || !modalBody) return;

        const getLang = () =>
            window.CneAppLanguage ||
            localStorage.getItem('cne_lang') ||
            'en';

        const openTopic = (topicKey) => {
            const lang = getLang();
            const data = this.topics?.[lang]?.[topicKey];

            if (!data) return;

            modalTitle.innerText = data.title;
            modalBody.innerHTML = data.body;

            learnModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            if (window.lucide) lucide.createIcons();
        };

        const closeModal = () => {
            learnModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        // Event delegation بدل querySelectorAll
        document.addEventListener('click', (e) => {
            const action = e.target.closest('.learn-card-action');
            if (action) {
                e.preventDefault();
                openTopic(action.dataset.topic);
            }

            if (e.target === btnModalClose) {
                closeModal();
            }

            if (e.target === learnModal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }
};