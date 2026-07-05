/* ==========================================================================
   CNE Toolkit - Core Utilities & Networking Mathematics
   ========================================================================== */

const CneUtils = {
  
  // --- IP Address Utilities ---

  /**
   * Validates if a string is a valid IPv4 address in dotted-decimal format.
   * @param {string} ipStr 
   * @returns {boolean}
   */
  validateIp(ipStr) {
    const trimmed = ipStr.trim();
    const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    if (!ipv4Regex.test(trimmed)) return false;
    
    const octets = trimmed.split('.').map(Number);
    return octets.every(octet => octet >= 0 && octet <= 255);
  },

  /**
   * Converts a dotted-decimal IPv4 address into a 32-bit unsigned integer.
   * @param {string} ipStr 
   * @returns {number}
   */
  ipToLong(ipStr) {
    const octets = ipStr.trim().split('.').map(Number);
    return ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0;
  },

  /**
   * Converts a 32-bit unsigned integer back into a dotted-decimal IPv4 string.
   * @param {number} longVal 
   * @returns {string}
   */
  longToIp(longVal) {
    const octet1 = (longVal >>> 24) & 255;
    const octet2 = (longVal >>> 16) & 255;
    const octet3 = (longVal >>> 8) & 255;
    const octet4 = longVal & 255;
    return `${octet1}.${octet2}.${octet3}.${octet4}`;
  },

  /**
   * Resolves the IP Address Class (A, B, C, D, or E) based on the first octet.
   * @param {string} ipStr 
   * @returns {string}
   */
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

  /**
   * Identifies whether the IP address is Private or Public.
   * @param {string} ipStr 
   * @returns {string} "Private" | "Public" | "Loopback" | "Link-Local"
   */
  getIpPrivacy(ipStr) {
    if (!this.validateIp(ipStr)) return 'Invalid';
    const octets = ipStr.trim().split('.').map(Number);
    
    // Private Network Ranges (RFC 1918)
    // 10.0.0.0 - 10.255.255.255
    if (octets[0] === 10) return 'Private';
    // 172.16.0.0 - 172.31.255.255
    if (octets[0] === 172 && (octets[1] >= 16 && octets[1] <= 31)) return 'Private';
    // 192.168.0.0 - 192.168.255.255
    if (octets[0] === 192 && octets[1] === 168) return 'Private';
    
    // Loopback Range (RFC 5735)
    // 127.0.0.0 - 127.255.255.255
    if (octets[0] === 127) return 'Private (Loopback)';
    
    // Link-Local (APIPA) Range (RFC 3927)
    // 169.254.0.0 - 169.254.255.255
    if (octets[0] === 169 && octets[1] === 254) return 'Private (Link-Local)';
    
    return 'Public';
  },

  /**
   * Formats an IPv4 address to its binary representation.
   * @param {string} ipStr 
   * @returns {string}
   */
  ipToBinary(ipStr) {
    if (!this.validateIp(ipStr)) return 'Invalid';
    return ipStr.trim().split('.')
      .map(octet => Number(octet).toString(2).padStart(8, '0'))
      .join('.');
  },

  /**
   * Formats a 32-bit unsigned integer to decimal.
   * @param {string} ipStr 
   * @returns {string}
   */
  ipToDecimal(ipStr) {
    if (!this.validateIp(ipStr)) return 'Invalid';
    return this.ipToLong(ipStr).toString(10);
  },

  /**
   * Formats an IPv4 address to its hexadecimal representation.
   * @param {string} ipStr 
   * @returns {string}
   */
  ipToHex(ipStr) {
    if (!this.validateIp(ipStr)) return 'Invalid';
    const hex = this.ipToLong(ipStr).toString(16).toUpperCase().padStart(8, '0');
    return `0x${hex}`;
  },


  // --- Subnet Calculator ---

  /**
   * Calculates subnet details based on base IP and CIDR prefix.
   * @param {string} ipStr 
   * @param {number} prefix 
   * @returns {Object|null}
   */
  calculateSubnet(ipStr, prefix) {
    if (!this.validateIp(ipStr) || prefix < 0 || prefix > 32) return null;
    
    const ipLong = this.ipToLong(ipStr);
    
    // Masks calculations using unsigned right shifts
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
      usableHosts = 2; // RFC 3021
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
      usableHosts: usableHosts >= 0 ? usableHosts.toLocaleString() : '0',
      subnetMask: this.longToIp(maskLong),
      wildcardMask: this.longToIp(wildcardLong)
    };
  },


  // --- Password Generator & Analyzer ---

  /**
   * Generates a random secure password based on specified parameters.
   * @param {number} length 
   * @param {Object} options 
   * @returns {string}
   */
  generatePassword(length, options) {
    const pools = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:\',./<>?'
    };
    
    let characterPool = '';
    let password = '';
    
    // Ensure we take at least one character from each selected pool for quality
    const guaranteedChars = [];
    
    if (options.uppercase) {
      characterPool += pools.uppercase;
      guaranteedChars.push(pools.uppercase[Math.floor(Math.random() * pools.uppercase.length)]);
    }
    if (options.lowercase) {
      characterPool += pools.lowercase;
      guaranteedChars.push(pools.lowercase[Math.floor(Math.random() * pools.lowercase.length)]);
    }
    if (options.numbers) {
      characterPool += pools.numbers;
      guaranteedChars.push(pools.numbers[Math.floor(Math.random() * pools.numbers.length)]);
    }
    if (options.symbols) {
      characterPool += pools.symbols;
      guaranteedChars.push(pools.symbols[Math.floor(Math.random() * pools.symbols.length)]);
    }
    
    if (characterPool.length === 0) return '';
    
    // Fill the remaining length with random pool selections
    const remainingLength = length - guaranteedChars.length;
    for (let i = 0; i < remainingLength; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      password += characterPool[randomIndex];
    }
    
    // Prepend guaranteed characters and shuffle the password
    let fullPasswordArray = [...guaranteedChars, ...password.split('')];
    
    // Durstenfeld shuffle algorithm
    for (let i = fullPasswordArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [fullPasswordArray[i], fullPasswordArray[j]] = [fullPasswordArray[j], fullPasswordArray[i]];
    }
    
    return fullPasswordArray.join('');
  },

  /**
   * Calculates password entropy and strength.
   * Returns semantic keys mapping to CneTranslations.
   * @param {string} password 
   * @param {Object} options 
   * @returns {Object} { entropy, label, class }
   */
  calculatePasswordStrength(password, options) {
    if (!password) return { entropy: 0, label: 'passWeak', class: 'badge-error' };
    
    let poolSize = 0;
    if (options.uppercase) poolSize += 26;
    if (options.lowercase) poolSize += 26;
    if (options.numbers) poolSize += 10;
    if (options.symbols) poolSize += 30; // approx symbols pool size
    
    if (poolSize === 0) return { entropy: 0, label: 'passWeak', class: 'badge-error' };
    
    // Entropy formula: H = L * log2(R)
    const entropy = Math.round(password.length * (Math.log(poolSize) / Math.log(2)));
    
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


  // --- Binary Converter Utilities ---

  /**
   * Validates if a string is a valid binary sequence.
   * @param {string} str 
   * @returns {boolean}
   */
  validateBinary(str) {
    const cleaned = str.replace(/\s+/g, '');
    if (cleaned.length === 0) return false;
    return /^[01]+$/.test(cleaned);
  },

  /**
   * Validates if a string is a valid positive decimal.
   * @param {string} str 
   * @returns {boolean}
   */
  validateDecimal(str) {
    const cleaned = str.trim();
    if (cleaned.length === 0) return false;
    return /^[0-9]+$/.test(cleaned);
  },

  /**
   * Converts Binary to Decimal.
   * @param {string} binStr 
   * @returns {string}
   */
  binaryToDecimal(binStr) {
    const cleaned = binStr.replace(/\s+/g, '');
    if (!this.validateBinary(cleaned)) return 'Invalid';
    // JavaScript standard parseInt parses large binary strings, but to prevent overflows
    // on extremely long inputs, we use BigInt if supported, or normal parseInt.
    try {
      return BigInt(`0b${cleaned}`).toString(10);
    } catch {
      return parseInt(cleaned, 2).toString(10);
    }
  },

  /**
   * Converts Decimal to Binary.
   * @param {string} decStr 
   * @returns {string}
   */
  decimalToBinary(decStr) {
    const cleaned = decStr.trim();
    if (!this.validateDecimal(cleaned)) return 'Invalid';
    try {
      return BigInt(cleaned).toString(2);
    } catch {
      return parseInt(cleaned, 10).toString(2);
    }
  }
};
