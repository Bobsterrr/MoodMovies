import {
  likeContainer,
  dislikeContainer,
  reset,
  like,
  dislike,
} from './likeness.js';
import { thinking, aggressive, authorian, comedy } from './data/movies.js';
import './listCreating.js';
import './themeToggle.js';

document.addEventListener('DOMContentLoaded', () => {
  const reactions = JSON.parse(localStorage.getItem('reactions')) || {};

  const liked = Object.entries(reactions)
    .filter(([title, reaction]) => reaction === 'like')
    .map(([title]) => title);

  const disliked = Object.entries(reactions)
    .filter(([title, reaction]) => reaction === 'dislike')
    .map(([title]) => title);

  const likedSet = new Set();
  liked.forEach((item) => likedSet.add(item));

  const dislikedSet = new Set();
  disliked.forEach((item) => dislikedSet.add(item));

  const allMovies = [...thinking, ...aggressive, ...authorian, ...comedy];

  function findMovieByTitle(title) {
    return allMovies.find((movie) => movie.title === title);
  }

  function posterRender(set, container) {
    container.innerHTML = '';
    set.forEach((title) => {
      const movie = findMovieByTitle(title);
      if (movie) {
        const img = document.createElement('img');
        img.src = movie.url;
        img.alt = movie.title;
        img.classList.add('poster_thumb');
        container.appendChild(img);
      }
    });
  }

  posterRender(likedSet, likeContainer);
  posterRender(dislikedSet, dislikeContainer);
});
