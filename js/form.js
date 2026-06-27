/**
 * ICOVRI 10 — Registration Form
 * Submits to Google Sheets via Apps Script Web App.
 *
 * HOW TO CONNECT (one-time setup):
 * 1. Open Google Sheets in icovriconference@gmail.com
 * 2. Extensions → Apps Script → paste the code from SETUP.md
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me (icovriconference@gmail.com)
 *    - Who has access: Anyone
 * 4. Copy the deployment URL and paste it into APPS_SCRIPT_URL below
 */

const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';

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
      timestamp:   new Date().toISOString(),
      firstName:   getVal('fname'),
      lastName:    getVal('lname'),
      email:       getVal('email'),
      phone:       getVal('phone'),
      affiliation: getVal('affil'),
      country:     getVal('country'),
      type:        getVal('ptype'),
      room:        getVal('rtype'),
      paper:       getVal('paper'),
      notes:       getVal('notes'),
    };

    // Validation
    const required = ['firstName','lastName','email','affiliation','country','type','room'];
    if (required.some(k => !fields[k])) {
      showToast(ar ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      showToast(ar ? 'البريد الإلكتروني غير صحيح' : 'Please enter a valid email address.');
      return;
    }

    // Disable button and show loading state
    const btn = document.getElementById('submitBtn');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<span>Submitting…</span>';

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Apps Script requires no-cors
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });

      // no-cors means we can't read the response — assume success if no error thrown
      document.getElementById('regForm').style.display = 'none';
      document.getElementById('formSuccess').classList.add('show');
      window.scrollTo({ top: document.getElementById('register').offsetTop, behavior: 'smooth' });

    } catch (err) {
      showToast(ar
        ? 'حدث خطأ، يرجى المحاولة مرة أخرى'
        : 'Something went wrong. Please try again.');
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  }

  function init() {
    document.getElementById('submitBtn')?.addEventListener('click', submitForm);
    window.submitForm = submitForm;
  }

  window.showToast = showToast;
  return { init, showToast };
})();
