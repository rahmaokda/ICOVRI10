/**
 * ICOVRI 10 — Registration Form
 * Saves to Google Sheets via Apps Script, then redirects to
 * Google Form for file uploads (abstract + payment receipt).
 *
 * See SHEETS_SETUP.md to connect the Apps Script endpoint.
 */

const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
const GOOGLE_FORM_URL = 'https://forms.gle/AJU26SQP2AsQNq1t8';

const Form = (() => {

  function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
  }

  function getVal(id) {
    return (document.getElementById(id)?.value || '').trim();
  }

  async function submitForm() {
    const ar = document.body.classList.contains('ar');

    const fields = {
      timestamp:    new Date().toISOString(),
      name:         getVal('fname'),
      title:        getVal('title'),
      affiliation:  getVal('affil'),
      email:        getVal('email'),
      phone:        getVal('phone'),
      nationality:  getVal('nationality'),
      participation: getVal('ptype'),
      abstract:     getVal('abstract'),
      payment:      getVal('payment'),
    };

    // Required field validation
    const required = ['name','title','affiliation','email','phone','nationality','ptype','abstract','payment'];
    const missing  = required.filter(k => !fields[k === 'ptype' ? 'participation' : k]);
    if (missing.length) {
      showToast(ar ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      showToast(ar ? 'البريد الإلكتروني غير صحيح' : 'Please enter a valid email address.');
      return;
    }

    // Disable button
    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.innerHTML = '<span>' + (ar ? 'جارٍ الحفظ…' : 'Saving…') + '</span>';

    // Send to Google Sheets (if URL is set)
    if (APPS_SCRIPT_URL !== 'YOUR_APPS_SCRIPT_URL_HERE') {
      try {
        await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields),
        });
      } catch (err) {
        console.warn('Sheet sync failed:', err);
        // Don't block the user — still proceed to Google Form
      }
    }

    // Show success + link to Google Form for file uploads
    document.getElementById('regForm').style.display = 'none';
    document.getElementById('formSuccess').classList.add('show');
    window.scrollTo({ top: document.getElementById('register').offsetTop, behavior: 'smooth' });

    // Auto-open Google Form after 1.5s
    setTimeout(() => {
      window.open(GOOGLE_FORM_URL, '_blank');
    }, 1500);
  }

  function init() {
    document.getElementById('submitBtn')?.addEventListener('click', submitForm);
    window.submitForm = submitForm;
  }

  window.showToast = showToast;
  return { init, showToast };
})();
