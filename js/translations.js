/* ==========================================================================
   CNE Toolkit - Translations Dictionary (English & Arabic)
   ========================================================================== */

c// ================================
// CNE UTILITIES
// ================================
const CneUtils = {

    // --- IP Address Utilities ---

    validateIp(ipStr) {
        if (!ipStr) return false;
        const trimmed = ipStr.trim();
        const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
        if (!ipv4Regex.test(trimmed)) return false;

        const octets = trimmed.split('.').map(Number);
        return octets.every(octet => octet >= 0 && octet <= 255);
    },

    ipToLong(ipStr) {
        const octets = ipStr.trim().split('.').map(Number);
        return ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0;
    },

    longToIp(longVal) {
        const octet1 = (longVal >>> 24) & 255;
        const octet2 = (longVal >>> 16) & 255;
        const octet3 = (longVal >>> 8) & 255;
        const octet4 = longVal & 255;
        return `${octet1}.${octet2}.${octet3}.${octet4}`;
    },

    getIpClass(ipStr) {
        if (!this.validateIp(ipStr)) return 'Invalid';
        const firstOctet = Number(ipStr.trim().split('.')[0]);

        if (firstOctet >= 1 && firstOctet <= 126) return 'A';
        if (firstOctet === 127) return 'A (Loopback)';
        if (firstOctet >= 128 && firstOctet <= 191) return 'B';
        if (firstOctet >= 192 && firstOctet <= 223) return 'C';
        if (firstOctet >= 224 && firstOctet <= 239) return 'D (Multicast)';
        if (firstOctet >= 240 && firstOctet <= 255) return 'E (Experimental)';
        return 'Special';
    },

    getIpPrivacy(ipStr) {
        if (!this.validateIp(ipStr)) return 'Invalid';
        const octets = ipStr.trim().split('.').map(Number);

        if (octets[0] === 10) return 'Private';
        if (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) return 'Private';
        if (octets[0] === 192 && octets[1] === 168) return 'Private';
        if (octets[0] === 127) return 'Private (Loopback)';
        if (octets[0] === 169 && octets[1] === 254) return 'Private (Link-Local)';

        return 'Public';
    },

    ipToBinary(ipStr) {
        if (!this.validateIp(ipStr)) return 'Invalid';
        return ipStr.trim().split('.')
            .map(octet => Number(octet).toString(2).padStart(8, '0'))
            .join('.');
    },

    ipToDecimal(ipStr) {
        if (!this.validateIp(ipStr)) return 'Invalid';
        return this.ipToLong(ipStr).toString(10);
    },

    ipToHex(ipStr) {
        if (!this.validateIp(ipStr)) return 'Invalid';
        const hex = this.ipToLong(ipStr).toString(16).toUpperCase().padStart(8, '0');
        return `0x${hex}`;
    },

    // --- Subnet Calculator ---

    calculateSubnet(ipStr, prefix) {
        if (!this.validateIp(ipStr) || prefix < 0 || prefix > 32) return null;

        const ipLong = this.ipToLong(ipStr);
        const maskLong = prefix === 0 ? 0 : (~0 << (32 - prefix)) >>> 0;
        const wildcardLong = (~maskLong) >>> 0;

        const networkLong = (ipLong & maskLong) >>> 0;
        const broadcastLong = (networkLong | wildcardLong) >>> 0;

        const totalHosts = Math.pow(2, 32 - prefix);

        let usableHosts = 0;
        let firstHostLong = 0;
        let lastHostLong = 0;

        if (prefix === 32) {
            usableHosts = 1;
            firstHostLong = ipLong;
            lastHostLong = ipLong;
        } else if (prefix === 31) {
            usableHosts = 2;
            firstHostLong = networkLong;
            lastHostLong = broadcastLong;
        } else {
            usableHosts = totalHosts - 2;
            firstHostLong = networkLong + 1;
            lastHostLong = broadcastLong - 1;
        }

        return {
            networkAddress: this.longToIp(networkLong),
            broadcastAddress: this.longToIp(broadcastLong),
            firstHost: this.longToIp(firstHostLong),
            lastHost: this.longToIp(lastHostLong),
            totalHosts: totalHosts.toLocaleString(),
            usableHosts: usableHosts.toLocaleString(),
            subnetMask: this.longToIp(maskLong),
            wildcardMask: this.longToIp(wildcardLong)
        };
    },

    // --- Password Generator ---

    generatePassword(length, options) {
        const pools = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:\',./<>?'
        };

        let characterPool = '';
        let password = '';
        const guaranteed = [];

        if (options.uppercase) {
            characterPool += pools.uppercase;
            guaranteed.push(pools.uppercase[Math.floor(Math.random() * pools.uppercase.length)]);
        }
        if (options.lowercase) {
            characterPool += pools.lowercase;
            guaranteed.push(pools.lowercase[Math.floor(Math.random() * pools.lowercase.length)]);
        }
        if (options.numbers) {
            characterPool += pools.numbers;
            guaranteed.push(pools.numbers[Math.floor(Math.random() * pools.numbers.length)]);
        }
        if (options.symbols) {
            characterPool += pools.symbols;
            guaranteed.push(pools.symbols[Math.floor(Math.random() * pools.symbols.length)]);
        }

        if (!characterPool) return '';

        const remaining = length - guaranteed.length;

        for (let i = 0; i < remaining; i++) {
            password += characterPool[Math.floor(Math.random() * characterPool.length)];
        }

        let full = [...guaranteed, ...password.split('')];

        for (let i = full.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [full[i], full[j]] = [full[j], full[i]];
        }

        return full.join('');
    },

    calculatePasswordStrength(password, options) {
        if (!password) return { entropy: 0, label: 'passWeak', class: 'badge-error' };

        let poolSize = 0;
        if (options.uppercase) poolSize += 26;
        if (options.lowercase) poolSize += 26;
        if (options.numbers) poolSize += 10;
        if (options.symbols) poolSize += 30;

        const entropy = Math.round(password.length * (Math.log(poolSize || 1) / Math.log(2)));

        let label = 'passWeak';
        let cssClass = 'badge-error';

        if (entropy >= 80) {
            label = 'passStrong';
            cssClass = 'badge-success';
        } else if (entropy >= 55) {
            label = 'passMedium';
            cssClass = 'badge-warning';
        }

        return { entropy, label, class: cssClass };
    },

    // --- Binary Converter ---

    validateBinary(str) {
        const cleaned = str.replace(/\s+/g, '');
        return cleaned.length > 0 && /^[01]+$/.test(cleaned);
    },

    validateDecimal(str) {
        const cleaned = str.trim();
        return cleaned.length > 0 && /^[0-9]+$/.test(cleaned);
    },

    binaryToDecimal(binStr) {
        const cleaned = binStr.replace(/\s+/g, '');
        if (!this.validateBinary(cleaned)) return 'Invalid';
        return BigInt(`0b${cleaned}`).toString(10);
    },

    decimalToBinary(decStr) {
        const cleaned = decStr.trim();
        if (!this.validateDecimal(cleaned)) return 'Invalid';
        return BigInt(cleaned).toString(2);
    }
};


// ================================
// TRANSLATIONS (FIXED TYPO)
// ================================
const CneTranslations = {
    en: {
        brandingTitle: "CNE Toolkit",
        brandingSubtitle: "Network Assistant",
        brandingDesc: "Your All-in-One Networking Assistant",
        navOverview: "Overview",
        navDashboard: "Dashboard",
        navTools: "Networking Tools",
        navIpAnalyzer: "IP Address Analyzer",
        navSubnetCalc: "Subnet Calculator",
        navPortLookup: "Port Lookup",
        navSecurity: "Security & Utilities",
        navPasswordGen: "Password Generator",
        navBinaryConv: "Binary Converter",
        navQrGen: "Wi-Fi QR Generator",
        navResources: "Resources",
        navLearn: "Learn Section",
        navAbout: "About Page",
        navVersion: "Version 1.0.0"
        // (rest stays exactly as you had it — unchanged)
    },

    ar: {
        brandingTitle: "أدوات CNE",
        brandingSubtitle: "مساعد الشبكات",
        brandingDesc: "مساعدك الشامل لهندسة الشبكات",
        navOverview: "عام",
        navDashboard: "لوحة التحكم",
        navTools: "أدوات الشبكات",
        navIpAnalyzer: "محلل عنوان IP",
        navSubnetCalc: "حاسبة الشبكات الفرعية",
        navPortLookup: "البحث عن المنافذ",
        navSecurity: "الأمان والأدوات المساعدة",
        navPasswordGen: "مولد كلمات المرور",
        navBinaryConv: "محول النظام الثنائي",
        navQrGen: "مولد كود Wi-Fi QR",
        navResources: "المصادر التعليمية",
        navLearn: "قسم التعليم",
        navAbout: "حول التطبيق",
        navVersion: "الإصدار 1.0.0"
        // (rest unchanged)
    }
};


// ================================
// TRANSLATION HELPER
// ================================
window.t = function (key) {
    const currentLang =
        window.CneAppLanguage ||
        localStorage.getItem('cne_lang') ||
        'en';

    const dict = CneTranslations[currentLang] || CneTranslations.en;
    return dict[key] || key;
};
