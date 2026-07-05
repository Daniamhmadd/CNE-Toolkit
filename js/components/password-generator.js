/* ==========================================================================
   CNE Toolkit - Password Generator Component (Translated)
   ========================================================================== */

// الكود الكامل لـ password-generator.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. تحديد كافة العناصر الموجودة في الصفحة
    const passwordOutput = document.getElementById('passwordOutput');
    const chkUpper = document.getElementById('chkUpper');
    const chkLower = document.getElementById('chkLower');
    const chkNumbers = document.getElementById('chkNumbers');
    const chkSymbols = document.getElementById('chkSymbols');
    const btnGenerate = document.getElementById('btnGenerate');
    const btnCopy = document.getElementById('btnCopy');
    const passLength = document.getElementById('passLength');

    // 2. دالة التحقق من الخيارات (تُحدث المربعات والشريط)
    const validateOptions = () => {
        if (!passwordOutput) return;
        const val = passwordOutput.value;

        // تحديث المربعات بناءً على النص
        if (chkUpper) chkUpper.checked = /[A-Z]/.test(val);
        if (chkLower) chkLower.checked = /[a-z]/.test(val);
        if (chkNumbers) chkNumbers.checked = /[0-9]/.test(val);
        if (chkSymbols) chkSymbols.checked = /[^A-Za-z0-9]/.test(val);
    };

    // 3. دالة توليد الباسورد
    const triggerGeneration = () => {
        const length = parseInt(passLength?.value || 16, 10);
        const options = {
            upper: chkUpper?.checked,
            lower: chkLower?.checked,
            numbers: chkNumbers?.checked,
            symbols: chkSymbols?.checked
        };

        // توليد الباسورد
        const password = CneUtils.generatePassword(length, options);
        if (passwordOutput) {
            passwordOutput.value = password;
            passwordOutput.style.color = 'var(--text-dark)';
        }
        validateOptions();
    };

    // 4. ربط الأحداث (Event Listeners)
    if (btnGenerate) {
        btnGenerate.addEventListener('click', triggerGeneration);
    }

    if (passwordOutput) {
        // هذا السطر هو الذي سيجعل المربعات تتفاعل عند الكتابة اليدوية
        passwordOutput.addEventListener('input', () => {
            validateOptions();
        });
    }

    // 5. تهيئة أولية (حتى لا تظهر الصفحة فارغة عند التحميل)
    triggerGeneration();
});