import { thinking, aggressive, authorian, comedy } from './data/movies.js';
import { moodButtonStyle } from './styles.js';

export class MoodButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.adoptedStyleSheets = [moodButtonStyle];
    this.setupEventListeners();
  }

  render() {
    const moodWord = this.getAttribute('moodWord') || '';

    this.shadowRoot.innerHTML = `
            <button class="mood_button" >${moodWord}</button>
`;
  }

  setupEventListeners() {
    let currentMovie = null;
    const fun = document.getElementById('fun');
    const agro = document.getElementById('aggressive');
    const author = document.getElementById('author');
    const inspiring = document.getElementById('inspiring');
    const showTitle = document.getElementById('showTitle');
    const poster = document.getElementById('poster');
    const rating = document.getElementById('rating');
    const letterboxd = document.getElementById('letterboxd');

    function showMovie(genre) {
      let i = Math.floor(Math.random() * 3);
      showTitle.textContent = genre[i].title;
      showTitle.classList.add('title');
      currentMovie = genre[i].title;
      poster.src = genre[i].url;
      poster.alt = `Постер: ${genre[i].title}`;
      rating.classList.remove('bad', 'average', 'good', 'masterpiece');
      if (genre[i].rating < 2.5) {
        rating.classList.add('bad');
      } else if (genre[i].rating >= 2.5 && genre[i].rating <= 3.5) {
        rating.classList.add('average');
      } else if (genre[i].rating > 3.5 && genre[i].rating <= 4.1) {
        rating.classList.add('good');
      } else if (genre[i].rating > 4.1) {
        rating.classList.add('masterpiece');
      }
      rating.textContent = genre[i].rating;
      letterboxd.href = `${genre[i].urlLetterboxd}`;
      localStorage.setItem('movie', genre[i].title);
    }

    fun.addEventListener('click', () => {
      showMovie(comedy);
    });

    agro.addEventListener('click', () => {
      showMovie(aggressive);
    });

    author.addEventListener('click', () => {
      showMovie(authorian);
    });

    inspiring.addEventListener('click', () => {
      showMovie(thinking);
    });
  }
}

customElements.define('mood-button', MoodButton);
