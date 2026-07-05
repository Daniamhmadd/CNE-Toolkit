/* ==========================================================================
   CNE Toolkit - Core Utilities & Networking Mathematics
   ========================================================================== */

const CneUtils = {

    // --- IP Address Utilities ---

    validateIp(ipStr) {
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
        return [
            (longVal >>> 24) & 255,
            (longVal >>> 16) & 255,
            (longVal >>> 8) & 255,
            longVal & 255
        ].join('.');
    },

    getIpClass(ipStr) {
        if (!this.validateIp(ipStr)) return 'Invalid';
        const firstOctet = Number(ipStr.trim().split('.')[0]);

        if (firstOctet <= 126) return 'A';
        if (firstOctet === 127) return 'A (Loopback)';
        if (firstOctet <= 191) return 'B';
        if (firstOctet <= 223) return 'C';
        if (firstOctet <= 239) return 'D (Multicast)';
        return 'E (Experimental)';
    },

    getIpPrivacy(ipStr) {
        if (!this.validateIp(ipStr)) return 'Invalid';
        const [a, b] = ipStr.trim().split('.').map(Number);

        if (a === 10) return 'Private';
        if (a === 172 && b >= 16 && b <= 31) return 'Private';
        if (a === 192 && b === 168) return 'Private';
        if (a === 127) return 'Loopback';
        if (a === 169 && b === 254) return 'Link-Local';

        return 'Public';
    },

    ipToBinary(ipStr) {
        if (!this.validateIp(ipStr)) return 'Invalid';
        return ipStr.split('.')
            .map(o => Number(o).toString(2).padStart(8, '0'))
            .join('.');
    },

    ipToDecimal(ipStr) {
        if (!this.validateIp(ipStr)) return 'Invalid';
        return this.ipToLong(ipStr).toString();
    },

    ipToHex(ipStr) {
        if (!this.validateIp(ipStr)) return 'Invalid';
        return '0x' + this.ipToLong(ipStr).toString(16).toUpperCase().padStart(8, '0');
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

        let usableHosts, firstHostLong, lastHostLong;

        if (prefix === 32) {
            usableHosts = 1;
            firstHostLong = lastHostLong = ipLong;
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

    // --- Password Generator & Analyzer ---

    generatePassword(length, options) {

        const pools = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            // FIX: string broken in your version, now safe
            symbols: "!@#$%^&*()_+-=[]{}|;:',./<>?"
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

        const safeLength = Math.max(length, guaranteed.length);
        const remaining = safeLength - guaranteed.length;

        for (let i = 0; i < remaining; i++) {
            password += characterPool[Math.floor(Math.random() * characterPool.length)];
        }

        let arr = [...guaranteed, ...password];

        // shuffle
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr.join('');
    },

    calculatePasswordStrength(password, options) {
        if (!password) return { entropy: 0, label: 'passWeak', class: 'badge-error' };

        let pool = 0;
        if (options.uppercase) pool += 26;
        if (options.lowercase) pool += 26;
        if (options.numbers) pool += 10;
        if (options.symbols) pool += 30;

        if (!pool) return { entropy: 0, label: 'passWeak', class: 'badge-error' };

        const entropy = Math.round(password.length * Math.log2(pool));

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
        const c = str.replace(/\s+/g, '');
        return c.length > 0 && /^[01]+$/.test(c);
    },

    validateDecimal(str) {
        const c = str.trim();
        return c.length > 0 && /^[0-9]+$/.test(c);
    },

    binaryToDecimal(bin) {
        const c = bin.replace(/\s+/g, '');
        if (!this.validateBinary(c)) return 'Invalid';
        return BigInt('0b' + c).toString(10);
    },

    decimalToBinary(dec) {
        const c = dec.trim();
        if (!this.validateDecimal(c)) return 'Invalid';
        return BigInt(c).toString(2);
    }
};
