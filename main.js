import { thinking, aggressive, authorian, comedy } from './data/movies.js';
import {
  likeContainer,
  dislikeContainer,
  reset,
  like,
  dislike,
} from './likeness.js';
import './listCreating.js';
import './themeToggle.js';
import './moodButton.js';

document.addEventListener('DOMContentLoaded', () => {
  let currentMovie = null;

  const allMovies = [...thinking, ...aggressive, ...authorian, ...comedy];

  function saveReaction(title, reaction) {
    const stored = JSON.parse(localStorage.getItem('reactions')) || {};
    stored[title] = reaction;
    localStorage.setItem('reactions', JSON.stringify(stored));
  }

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

  posterRender(likedSet, likeContainer);
  posterRender(dislikedSet, dislikeContainer);

  like.addEventListener('click', () => {
    if (localStorage.getItem('movie')) {
      saveReaction(localStorage.getItem('movie'), 'like');
      likedSet.add(localStorage.getItem('movie'));
      dislikedSet.delete(localStorage.getItem('movie'));
      if (likeContainer) posterRender(likedSet, likeContainer);
      if (dislikeContainer) posterRender(dislikedSet, dislikeContainer);
    }
  });

  dislike.addEventListener('click', () => {
    if (localStorage.getItem('movie')) {
      saveReaction(localStorage.getItem('movie'), 'dislike');
      dislikedSet.add(localStorage.getItem('movie'));
      likedSet.delete(localStorage.getItem('movie'));
      if (likeContainer) posterRender(likedSet, likeContainer);
      if (dislikeContainer) posterRender(dislikedSet, dislikeContainer);
    }
  });

  reset.addEventListener('click', () => {
    localStorage.removeItem('reactions');
    likedSet.clear();
    dislikedSet.clear();
    posterRender(likedSet, likeContainer);
    posterRender(dislikedSet, dislikeContainer);
  });

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

  function findMovieByTitle(title) {
    return allMovies.find((movie) => movie.title === title);
  }
});
