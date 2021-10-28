const form = document.getElementById('inputForm');
const cards = form.getElementsByClassName('card-body');
const submit = form.getElementsByTagName('button')[0];

let isNew;
let saleId;
let currentCard;

const setupEditSale = (id) => {
  submit.innerHTML = 'Save Changes';
  for (const card of cards) {
    card.classList.add('was-validated');
  }
  isNew = false;
  saleId = id;
  currentCard = 3;
  setupSaveButton();
}

const setupNewSale = () => {
  for (let i = 1; i <= 3; i++) {
    cards[i].style.display = 'none';
  }
  isNew = true;
  currentCard = 0;
  setupSaveButton();
}

const setupSaveButton = () => {
  submit.addEventListener('click', () => {
    if (isNew) {
      cards[currentCard].classList.add('was-validated');
    }

    for (let i = 0; i <= currentCard; i++) {
      if (cards[i].querySelectorAll(':invalid').length) {
        return;
      }
    }

    const data = new URLSearchParams(new FormData(form));
    let url = '/sale';
    if (saleId) {
      url += '/' + saleId;
    }
    fetch(url, {
      method: 'post',
      body: data,
    })
      .then(response => response.json())
      .then(data => {
        saleId = data.id;
        currentCard++;
        if (currentCard <= 3) {
          cards[currentCard].style.display = 'block';
          if (currentCard === 3) {
            submit.innerHTML = 'Save and Finish';
          }
        } else {
          window.location.href = "/sales";
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    return false;
  });
}

export { setupEditSale, setupNewSale }
