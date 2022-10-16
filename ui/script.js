import CONFIG from '../config.js';

window.addEventListener('load', () => {
  const { BG_COLOR, TEXT_COLOR, KEY_COLOR, BORDER_RADIUS, BOX_SHADOW, KEY_BORDER_COLOR, KEY_BG_COLOR, X, Y } = CONFIG;
  const container = document.querySelector('.container');
  const main = document.querySelector('.ui-container')
  const text = document.querySelector('.ui-text')
  const key = document.querySelector('.ui-key')
  container.style.justifyContent = X;
  container.style.alignItems = Y;
  main.style.backgroundColor = BG_COLOR;
  main.style.borderRadius = `${BORDER_RADIUS}px`;
  main.style.boxShadow = `0 0 5px 1px ${BOX_SHADOW}`;
  text.style.color = TEXT_COLOR;
  key.style.backgroundColor = KEY_BG_COLOR;
  key.style.color = KEY_COLOR;
  key.style.borderColor = KEY_BORDER_COLOR;

  window.addEventListener('message', (event) => {
    switch (event.data.type) {
      case 'SHOW':
        const { message, key } = event.data.body;
        break;
      case 'HIDE':

        break;
    }
  });
});

class PersistentNotification {
  constructor() {
    this.key = null;
  }

  show(message, key) {
    this.key = key;
    window.postMessage({
      type: 'SHOW',
      body: {
        message,
        key,
      },
    }, '*');
  }

  hide() {
    window.postMessage({
      type: 'HIDE',
    }, '*');
  }
}