const btnQuote = document.getElementById('newQuote');
const textQuote = document.getElementById('bodyQuote');
const authorQuote = document.getElementById('authorQuote');
const copyQuote = document.getElementById('copyQuote');
const speechBtn = document.getElementById('speechQuote');
const synth = window.speechSynthesis;

function addLoading() {
  textQuote.classList.remove('quote');
  textQuote.classList.add('loading');
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
    textQuote.classList.remove('loading');
    textQuote.innerText = newQuote.content;
    authorQuote.innerText = newQuote.author;

  } catch(error) {
    throw new Error('There has been a problem with your fetch operation:', error);
  }
}

speechBtn.addEventListener('click', () => {
  if(!textQuote.classList.contains('loading')) {
    let utterance = new SpeechSynthesisUtterance(`${textQuote.innerText} by ${authorQuote.innerText}`);
    synth.speak(utterance);
  }
});

copyQuote.addEventListener('click', () => {
  navigator.clipboard.writeText(`${textQuote.innerText} - ${authorQuote.innerText}`);
});

btnQuote.addEventListener('click', randomQuote);