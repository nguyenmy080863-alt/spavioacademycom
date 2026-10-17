/* Language menu dismissal + the reservation form. No dependencies. */
(function () {
  // Close open language menus on outside click / Escape.
  document.addEventListener('click', function (e) {
    document.querySelectorAll('details.lang[open]').forEach(function (d) {
      if (!d.contains(e.target)) d.removeAttribute('open');
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('details.lang[open]').forEach(function (d) {
      d.removeAttribute('open');
    });
  });

  // Lesson preview carousel: buttons, counter and arrow keys over a scroll-snap track.
  var deck = document.querySelector('[data-deck]');
  if (deck) {
    var track = deck.querySelector('.deck-track');
    var slides = track.children;
    var prevBtn = deck.querySelector('[data-deck-prev]');
    var nextBtn = deck.querySelector('[data-deck-next]');
    var count = deck.querySelector('[data-deck-count]');
    var current = function () {
      return Math.max(0, Math.min(slides.length - 1, Math.round(track.scrollLeft / track.clientWidth)));
    };
    var go = function (i) {
      var target = Math.max(0, Math.min(slides.length - 1, i));
      track.scrollTo({ left: target * (slides[0].offsetWidth + 16), behavior: 'smooth' });
    };
    var sync = function () {
      var i = current();
      count.textContent = i + 1 + ' / ' + slides.length;
      prevBtn.disabled = i === 0;
      nextBtn.disabled = i === slides.length - 1;
    };
    prevBtn.addEventListener('click', function () {
      go(current() - 1);
    });
    nextBtn.addEventListener('click', function () {
      go(current() + 1);
    });
    track.addEventListener('scroll', sync, { passive: true });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(current() + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(current() - 1);
      }
    });
    sync();
  }

  var form = document.getElementById('reserve-form');
  if (!form) return;
  var msg = {};
  try {
    msg = JSON.parse(form.getAttribute('data-messages') || '{}');
  } catch (_) {}
  var button = form.querySelector('button[type=submit]');
  var buttonHtml = button.innerHTML;
  var success = document.getElementById('reserve-success');

  function setError(key, text) {
    var el = form.querySelector('[data-err="' + key + '"]');
    if (el) el.textContent = text || '';
  }
  function clearErrors() {
    form.querySelectorAll('[data-err]').forEach(function (el) {
      el.textContent = '';
    });
    form.querySelectorAll('[aria-invalid]').forEach(function (el) {
      el.removeAttribute('aria-invalid');
    });
  }

  // Where the visitor came from, for judging which channel brings signups.
  function source() {
    var p = new URLSearchParams(location.search);
    var out = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'ref'].forEach(function (k) {
      if (p.get(k)) out[k] = p.get(k).slice(0, 100);
    });
    if (document.referrer) {
      try {
        out.referrer = new URL(document.referrer).hostname;
      } catch (_) {}
    }
    return out;
  }

  // Drop the "choose Zalo or WhatsApp" hint as soon as one is ticked.
  form.querySelectorAll('input[name=via]').forEach(function (el) {
    el.addEventListener('change', function () {
      setError('via', '');
    });
  });

  // "Something else" reveals a field for the visitor's own goal (required while shown).
  var goalSelect = form.elements.goal;
  var goalOtherField = document.getElementById('goal-other-field');
  var goalOther = form.elements.goalOther;
  goalSelect.addEventListener('change', function () {
    var other = goalSelect.value === 'other';
    goalOtherField.hidden = !other;
    goalOther.required = other;
    if (other) {
      goalOther.focus();
    } else {
      goalOther.value = '';
      setError('goalOther', '');
      goalOther.removeAttribute('aria-invalid');
    }
  });

  goalOther.addEventListener('input', function () {
    setError('goalOther', '');
    goalOther.removeAttribute('aria-invalid');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();
    var email = form.elements.email;
    var consent = form.elements.consent;
    var name = form.elements.name;
    var ok = true;
    if (!name.value.trim()) {
      setError('name', msg.required);
      name.setAttribute('aria-invalid', 'true');
      ok = false;
    }
    if (!email.value.trim()) {
      setError('email', msg.required);
      email.setAttribute('aria-invalid', 'true');
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
      setError('email', msg.invalidEmail);
      email.setAttribute('aria-invalid', 'true');
      ok = false;
    }
    var phone = form.elements.phone;
    var via = Array.prototype.map.call(form.querySelectorAll("input[name=via]:checked"), function (el) {
      return el.value;
    });
    var phoneValue = phone.value.trim();
    if (phoneValue) {
      var digits = phoneValue.replace(/\D/g, "");
      if (!/^\+?[0-9 ()\-.]{6,30}$/.test(phoneValue) || digits.length < 7 || digits.length > 15) {
        setError("phone", msg.phoneInvalid);
        phone.setAttribute("aria-invalid", "true");
        ok = false;
      } else if (!via.length) {
        setError("via", msg.viaRequired);
        ok = false;
      }
    }
    if (goalSelect.value === 'other' && !goalOther.value.trim()) {
      setError('goalOther', msg.required);
      goalOther.setAttribute('aria-invalid', 'true');
      ok = false;
    }
    if (!consent.checked) {
      setError('consent', msg.required);
      ok = false;
    }
    if (!ok) {
      var bad =
        form.querySelector('[aria-invalid="true"]') ||
        (form.querySelector('[data-err="via"]').textContent ? form.querySelector('input[name=via]') : consent);
      bad.focus();
      return;
    }

    button.disabled = true;
    button.textContent = msg.sending || '...';
    var payload = {
      name: form.elements.name.value.trim(),
      email: email.value.trim(),
      phone: phoneValue,
      via: phoneValue ? via : [],
      goal: goalSelect.value,
      goalOther: goalSelect.value === 'other' ? goalOther.value.trim() : '',
      level: form.elements.level.value,
      locale: form.getAttribute('data-locale'),
      consent: true,
      website: form.elements.website.value,
      source: source(),
    };
    fetch('/api/reserve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(function (res) {
        if (res.ok) {
          success.hidden = false;
          success.focus();
          form.querySelectorAll('input,select,button').forEach(function (el) {
            el.disabled = true;
          });
          return;
        }
        setError('form', res.status === 503 ? msg.notConnected : msg.error);
        throw new Error('status ' + res.status);
      })
      .catch(function (err) {
        if (!form.querySelector('[data-err="form"]').textContent) setError('form', msg.error);
        if (window.console) console.warn('reserve failed', err);
        button.disabled = false;
        button.innerHTML = buttonHtml;
      });
  });
})();
