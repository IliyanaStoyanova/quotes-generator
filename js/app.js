const btnQuote = document.getElementById('newQuote');
const textQuote = document.getElementById('bodyQuote');
const authorQuote = document.getElementById('authorQuote');

function addLoading() {
  textQuote.classList.remove('quote');
  textQuote.innerText = 'Loading...';
}

const randomQuote = async () => {
  let newQuote = '';
  try {
    addLoading();
    const response = await fetch('https://api.quotable.io/random');
    if(!response.ok) {
      throw new Error(`Status: ${response.status}. Error: ${response.statusText}`);
    }

    newQuote = await response.json();
    textQuote.classList.add('quote');
    textQuote.innerText = newQuote.content;
    authorQuote.innerText = newQuote.author;

  } catch(error) {
    throw new Error('There has been a problem with your fetch operation:', error);
  }
}

btnQuote.addEventListener('click', randomQuote);