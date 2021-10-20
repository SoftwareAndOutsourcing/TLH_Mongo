(function () {
  document.addEventListener('DOMContentLoaded', () => {
    // const log = /*console.debug;*/ () => { };
    const form = document.getElementById('inputForm');
    const submit = form.getElementsByTagName('button')[0];
    const cards = form.getElementsByClassName('card-body');
    let id;
    let currentCard = 0;

    // setup cards
    cards[1].style.display = 'none';
    cards[2].style.display = 'none';
    cards[3].style.display = 'none';

    submit.addEventListener('click', () => {
      cards[currentCard].classList.add('was-validated');
      if (!form.checkValidity()) {
        for (let i = 0; i <= currentCard; i++) {
          if (cards[i].querySelectorAll(':invalid').length) {
            return;
          }
        }
      }

      const data = new URLSearchParams(new FormData(form));
      let url = '/input1';
      if (id) {
        url += '/' + id;
      }
      fetch(url, {
        method: 'post',
        body: data,
      })
        .then(response => response.json())
        .then(data => {
          id = data.id;
          currentCard++;
          if (currentCard <= 3) {
            cards[currentCard].style.display = 'block';
            if (currentCard === 3) {
              submit.innerHTML = 'Save and Finish';
            }
          } else {
            window.location.href = "/";
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      return false;
    });
  })
})();
