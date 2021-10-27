const form = document.getElementById('inputForm');
const cards = form.getElementsByClassName('card-body');
const submit = form.getElementsByTagName('button')[0];
let saleId;
let currentCard;

const setupEditSale = (id) => {
  submit.innerHTML = 'Save Changes';
  saleId = id;
  currentCard = 3;  
  setupSaveButton();  
}

const setupNewSale = () => {
  cards[1].style.display = 'none';
  cards[2].style.display = 'none';
  cards[3].style.display = 'none';
  currentCard = 0;
  setupSaveButton();
}

const setupSaveButton = () => {
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
