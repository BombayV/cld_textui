import CONFIG from '../config.js';

window.addEventListener('load', () => {
  const notification = new Notification(CONFIG);
  window.addEventListener('message', (event) => {
    switch (event.data.type) {
      case 'SHOW':
        const { message, key } = event.data.body;
        notification.show(message, key);
        break;
      case 'HIDE':
        notification.hide();
        break;
    }
  });
});

class Notification {
  container = null;
  main = null
  key = null;
  text = null;

  constructor(config) {
    this.container = document.querySelector('.container');
    this.main = document.querySelector('.ui-container');
    this.text = document.querySelector('.ui-text');
    this.key = document.querySelector('.ui-key');
    this.setup(config);
  }

  setup(config) {
    this.container.style.justifyContent = config.X;
    this.container.style.alignItems = config.Y;
    this.main.style.backgroundColor = config.BG_COLOR;
    this.main.style.borderRadius = `${config.BORDER_RADIUS}px`;
    this.main.style.boxShadow = `0 0 5px 1px ${config.BOX_SHADOW}`;
    this.text.style.color = config.TEXT_COLOR;
    this.key.style.backgroundColor = config.KEY_BG_COLOR;
    this.key.style.color = config.KEY_COLOR;
    this.key.style.borderColor = config.KEY_BORDER_COLOR;
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
          ease: 'power4.inOut',
          duration: 1.5,
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
          ease: 'power4.inOut',
          duration: 1.5,
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
          ease: 'power4.inOut',
          duration: 1.5,
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
          ease: 'power4.inOut',
          duration: 1.5,
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
          ease: 'power4.inOut',
          duration: 1.5,
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
    console.log(position);
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
          ease: 'power4.inOut',
          duration: 1.5,
        });
        break;
      case 'slideInRight':
        gsap.fromTo(this.main, {
          x: 300,
        }, {
          x: 0,
          opacity: 1,
          ease: 'power4.inOut',
          duration: 1.5,
        });
        break;
      case 'slideInDown':
        gsap.fromTo(this.main, {
          y: -300,
        }, {
          y: 0,
          opacity: 1,
          ease: 'power4.inOut',
          duration: 1.5,
        });
        break;
      case 'slideInUp':
        gsap.fromTo(this.main, {
          y: 300,
        }, {
          y: 0,
          opacity: 1,
          ease: 'power4.inOut',
          duration: 1.5,
        });
        break;
    }
    setTimeout(() => {
      this.hide();
    }, 3000);
  }

  debug(data) {
    this.setText(data.message);
    this.setKey(data.key);
    this.startAnimation();
  }
}