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