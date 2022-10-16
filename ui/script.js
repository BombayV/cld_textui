window.addEventListener('load', () => {
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