/* Login front-end demonstration (Member B, UC-A01).
   This is NOT real authentication: anyone can read this script. The final system must verify
   password_hash() values on the server and start a PHP session. Passwords are compared here as
   SHA-256 hashes only to show that plain-text passwords should never be stored. */
(() => {
  'use strict';
  const SESSION_KEY = 'kf-demo-session';
  const ATTEMPT_KEY = 'kf-login-attempts';
  const MAX_ATTEMPTS = 5;
  const LOCK_SECONDS = 30;
  // Fictional accounts. Hash of the demo password "Workshop-2026".
  const DEMO_HASH = '0fb9e7b83a4307cfd2f6172cf34dac707521486cbf897bb07bf2574237295b13';
  const ACCOUNTS = {
    'employee@kittenfactory.test': {role: 'Employee', name: 'Alex Morgan', hash: DEMO_HASH, home: '../materials/index.php'},
    'admin@kittenfactory.test': {role: 'Admin', name: 'Sam Rivera', hash: DEMO_HASH, home: '../materials/index.php'},
    'customer@kittenfactory.test': {role: 'Customer', name: 'Jordan Lee', hash: DEMO_HASH, home: '../products/catalog.php'}
  };
  const $ = id => document.getElementById(id);
  const form = $('login-form');
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  async function sha256(text) {
    const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('');
  }
  function read(key) { try { return JSON.parse(sessionStorage.getItem(key) || 'null'); } catch (_) { return null; } }
  function write(key, value) { try { value === null ? sessionStorage.removeItem(key) : sessionStorage.setItem(key, JSON.stringify(value)); } catch (_) {} }

  function showSignedIn() {
    const session = read(SESSION_KEY);
    if (!session) { $('signed-in').hidden = true; form.hidden = false; return; }
    form.hidden = true;
    $('signed-in').hidden = false;
    $('signed-in').innerHTML = `Signed in as <strong>${esc(session.name)}</strong> (${esc(session.role)}) for this demo tab. <a href="${esc(session.home)}">Continue</a> · <button class="link-button" id="sign-out">Sign out</button>`;
    $('sign-out').addEventListener('click', () => { write(SESSION_KEY, null); showSignedIn(); $('email').focus(); });
  }

  function lockedFor() {
    const state = read(ATTEMPT_KEY) || {count: 0, until: 0};
    return Math.max(0, Math.ceil((state.until - Date.now()) / 1000));
  }
  function applyLock() {
    const seconds = lockedFor();
    $('login-submit').disabled = seconds > 0;
    if (seconds > 0) {
      showError(`Too many failed attempts. Try again in ${seconds} seconds.`);
      setTimeout(applyLock, 1000);
    } else if ($('login-errors').textContent.startsWith('Too many')) {
      $('login-errors').hidden = true;
    }
  }
  function showError(text) {
    $('login-errors').hidden = false;
    $('login-errors').textContent = text;
  }

  $('toggle-password').addEventListener('click', () => {
    const showing = $('password').type === 'text';
    $('password').type = showing ? 'password' : 'text';
    $('toggle-password').textContent = showing ? 'Show' : 'Hide';
    $('toggle-password').setAttribute('aria-pressed', String(!showing));
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (lockedFor() > 0) { applyLock(); return; }
    const email = $('email').value.trim().toLowerCase();
    const password = $('password').value;
    const errors = {};
    if (!email) errors.email = 'Enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter an email address in the format name@example.com.';
    if (!password) errors.password = 'Enter your password.';
    ['email', 'password'].forEach(k => {
      $(k).setAttribute('aria-invalid', errors[k] ? 'true' : 'false');
      $(k + '-error').textContent = errors[k] || '';
    });
    if (Object.keys(errors).length) {
      showError('Please correct the highlighted fields. ' + Object.values(errors).join(' '));
      $('login-errors').focus();
      return;
    }
    let hash;
    try { hash = await sha256(password); }
    catch (_) { showError('This browser cannot run the demo sign-in check. Open the site over https or localhost.'); return; }
    const account = ACCOUNTS[email];
    if (!account || account.hash !== hash) {
      const state = read(ATTEMPT_KEY) || {count: 0, until: 0};
      state.count += 1;
      if (state.count >= MAX_ATTEMPTS) { state.count = 0; state.until = Date.now() + LOCK_SECONDS * 1000; }
      write(ATTEMPT_KEY, state);
      // One general message: do not reveal whether the email or the password was wrong.
      showError('The email or password is incorrect.');
      $('password').value = '';
      $('password').focus();
      applyLock();
      return;
    }
    write(ATTEMPT_KEY, null);
    write(SESSION_KEY, {email, role: account.role, name: account.name, home: account.home});
    location.href = account.home;
  });

  showSignedIn();
  applyLock();
})();
