import CONFIG from '../config.js';

window.addEventListener('load', () => {
  const notification = new Notification(CONFIG);
  notification.debug({
    message: 'Debug message',
    key: 'E'
  })
  window.addEventListener('message', (event) => {
    switch (event.data.type) {
      case 'SHOW': {
        const { message, key } = event.data.body;
        notification.show(message, key);
      }
        break;
      case 'HIDE':
        notification.hide();
        break;
      case 'UPDATE_TEXT': {
        const { message, key } = event.data.body;
        notification.setKey(key);
        notification.setText(message);
      }
    }
  });
});

class Notification {
  container = null;
  main = null
  flexCont = null;
  key = null;
  text = null;
  duration = 1.5;
  easing = 'power4.inOut';

  constructor(config) {
    this.container = document.querySelector('.container');
    this.main = document.querySelector('.ui-container');
    this.flexCont = document.querySelector('.data-flex');
    this.text = document.querySelector('.ui-text');
    this.key = document.querySelector('.ui-key');
    this.setup(config);
  }

  setup(config) {
    this.container.style.justifyContent = config.X;
    this.container.style.alignItems = config.Y;
    this.flexCont.style.backgroundColor = config.BG_COLOR;
    this.flexCont.style.borderRadius = `${config.BORDER_RADIUS}px`;
    this.flexCont.style.boxShadow = `0 0 12px 4px ${config.BOX_SHADOW}`;
    this.text.style.color = config.TEXT_COLOR;
    this.key.style.backgroundColor = config.KEY_BG_COLOR;
    this.key.style.color = config.KEY_COLOR;
    this.key.style.borderColor = config.KEY_BORDER_COLOR;
    this.duration = config.DURATION;
    this.easing = config.EASING;
  }

  show(message, key) {
    this.setText(message);
    this.setKey(key)
    this.startAnimation();
  }

  hide() {
    const position = this.getPosition();
    switch (position) {
      case 'fadeIn':
        gsap.fromTo(this.main, {
          opacity: 1,
        }, {
          opacity: 0,
          ease: this.easing,
          duration: this.duration,
          onComplete: () => {
            this.setKey('');
            this.setText('');
          }
        });
        break;
      case 'slideInLeft':
        gsap.fromTo(this.main, {
          x: 0,
          opacity: 1,
        }, {
          x: -300,
          opacity: 0,
          ease: this.easing,
          duration: this.duration,
          onComplete: () => {
            this.setKey('');
            this.setText('');
          }
        });
        break;
      case 'slideInRight':
        gsap.fromTo(this.main, {
          x: 0,
          opacity: 1,
        }, {
          x: 300,
          opacity: 0,
          ease: this.easing,
          duration: this.duration,
          onComplete: () => {
            this.setKey('');
            this.setText('');
          }
        });
        break;
      case 'slideInUp':
        gsap.fromTo(this.main, {
          y: 0,
          opacity: 1,
        }, {
          y: 300,
          opacity: 0,
          ease: this.easing,
          duration: this.duration,
          onComplete: () => {
            this.setKey('');
            this.setText('');
          }
        });
        break;
      case 'slideInDown':
        gsap.fromTo(this.main, {
          y: 0,
          opacity: 1,
        }, {
          y: -300,
          opacity: 0,
          ease: this.easing,
          duration: this.duration,
          onComplete: () => {
            this.setKey('');
            this.setText('');
          }
        });
        break;
    }
  }

  setKey(newKey) {
    this.key.textContent = newKey;
  }

  setText(newText) {
    this.text.textContent = newText;
  }

  getPosition() {
    const x = this.container.style.justifyContent;
    const y = this.container.style.alignItems;
    if (x === 'center' && y === 'center') {
      return 'fadeIn';
    } else if (x === 'left') {
      return 'slideInLeft';
    } else if (x === 'right') {
      return 'slideInRight';
    } else if (x === 'center' && y === 'start') {
      return 'slideInDown';
    } else if (x === 'center' && y === 'end') {
      return 'slideInUp';
    }
  }

  startAnimation() {
    const position = this.getPosition();
    switch (position) {
      case 'fadeIn':
        gsap.fromTo(this.main, {
          opacity: 0,
        }, {
          opacity: 1,
        });
        break;
      case 'slideInLeft':
        gsap.fromTo(this.main, {
          x: -300,
        }, {
          x: 0,
          opacity: 1,
          ease: this.easing,
          duration: this.duration,
        });
        break;
      case 'slideInRight':
        gsap.fromTo(this.main, {
          x: 300,
        }, {
          x: 0,
          opacity: 1,
          ease: this.easing,
          duration: this.duration,
        });
        break;
      case 'slideInDown':
        gsap.fromTo(this.main, {
          y: -300,
        }, {
          y: 0,
          opacity: 1,
          ease: this.easing,
          duration: this.duration,
        });
        break;
      case 'slideInUp':
        gsap.fromTo(this.main, {
          y: 300,
        }, {
          y: 0,
          opacity: 1,
          ease: this.easing,
          duration: this.duration,
        });
        break;
    }
  }

  debug(data) {
    this.setText(data.message);
    this.setKey(data.key);
    this.startAnimation();
  }
}