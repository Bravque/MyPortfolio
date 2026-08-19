/* Accessible contact-form validation + submission.
   - Inline, per-field error messages (role="alert", aria-invalid).
   - Submits to the form's `action` (Formspree by default) via fetch.
   - No secrets in the client: the endpoint is a public form URL. */

const RULES = {
  name: {
    validate: (v) => v.trim().length >= 2,
    message: 'Please enter your name (at least 2 characters).',
  },
  email: {
    validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
    message: 'Please enter a valid email address.',
  },
  subject: {
    validate: (v) => v.trim().length >= 3,
    message: 'Please add a subject (at least 3 characters).',
  },
  message: {
    validate: (v) => v.trim().length >= 10,
    message: 'Please write a message (at least 10 characters).',
  },
};

export function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('form-status');

  const fieldEls = {
    name: form.elements.name,
    email: form.elements.email,
    subject: form.elements.subject,
    message: form.elements.message,
  };
  const errorEls = {
    name: document.getElementById('err-name'),
    email: document.getElementById('err-email'),
    subject: document.getElementById('err-subject'),
    message: document.getElementById('err-message'),
  };

  const setError = (key, msg) => {
    if (errorEls[key]) errorEls[key].textContent = msg || '';
    if (fieldEls[key]) fieldEls[key].setAttribute('aria-invalid', msg ? 'true' : 'false');
  };

  const validateField = (key) => {
    const ok = RULES[key].validate(fieldEls[key].value);
    setError(key, ok ? '' : RULES[key].message);
    return ok;
  };

  // Clear an error as soon as the user fixes the field.
  Object.keys(fieldEls).forEach((key) => {
    fieldEls[key].addEventListener('input', () => {
      if (fieldEls[key].getAttribute('aria-invalid') === 'true') validateField(key);
    });
  });

  const setStatus = (msg, type) => {
    if (!status) return;
    status.textContent = msg;
    status.className = `form-status${type ? ` is-${type}` : ''}`;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setStatus('', null);

    let firstInvalid = null;
    Object.keys(RULES).forEach((key) => {
      const ok = validateField(key);
      if (!ok && !firstInvalid) firstInvalid = fieldEls[key];
    });
    if (firstInvalid) {
      firstInvalid.focus();
      setStatus('Please fix the highlighted fields.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const original = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }
    setStatus('Sending your message…', null);

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        form.reset();
        Object.keys(fieldEls).forEach((k) => setError(k, ''));
        setStatus('Thanks — your message has been sent. I’ll get back to you soon.', 'success');
      } else {
        setStatus('Something went wrong. Please email me directly instead.', 'error');
      }
    } catch (err) {
      setStatus('Network error. Please try again or email me directly.', 'error');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = original;
      }
    }
  });
}
