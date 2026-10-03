'use strict';

const profileUrl = 'https://github.com/akmalzokirjonov';
const toast = document.querySelector('.toast');
let toastTimeout;

function notify(message) {
  window.clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimeout = window.setTimeout(() => toast.classList.remove('visible'), 4200);
}

document.querySelector('#year').textContent = String(new Date().getFullYear());

document.querySelector('#copy-contact').addEventListener('click', async () => {
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(profileUrl);
    notify('Copied GitHub profile link.');
  } catch {
    notify('Copy unavailable. Select the profile link to copy it.');
    const link = document.querySelector('.contact-command > a');
    const range = document.createRange();
    range.selectNodeContents(link);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    link.focus();
  }
});

document.querySelector('#print-profile').addEventListener('click', () => window.print());

fetch('build-info.json')
  .then(response => response.ok ? response.json() : null)
  .then(info => {
    if (info && /^[a-f0-9]{7,40}$/.test(info.commit) && /^\d{4}-\d{2}-\d{2}$/.test(info.updated)) {
      document.querySelector('#build-info').textContent = `main@${info.commit.slice(0, 7)} · updated ${info.updated}`;
    }
  })
  .catch(() => {});
