import {likeContainer, dislikeContainer, reset, like, dislike} from "./likeness.js";
import {thinking, aggressive, authorian, comedy} from "./data/movies.js";

document.addEventListener('DOMContentLoaded', () => {
    const themeChanger = document.getElementById('theme_changer');

    themeChanger.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        const themeIcon = document.getElementsByTagName('img')[0];
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        if (currentTheme === 'dark') {
            themeIcon.src = 'https://www.iconpacks.net/icons/2/free-sun-icon-3337-thumb.png'
        } else if (currentTheme === 'light') {
            themeIcon.src = 'https://img.icons8.com/?size=100&id=nNtT9r4dDsaU&format=png&color=000000'
        }
    })

    const reactions = JSON.parse(localStorage.getItem('reactions')) || {};

    const liked = Object.entries(reactions)
        .filter(([title, reaction]) => reaction === 'like')
        .map(([title]) => title);

    const disliked = Object.entries(reactions)
        .filter(([title, reaction]) => reaction === 'dislike')
        .map(([title]) => title);

    const likedSet = new Set()
    liked.forEach(item => likedSet.add(item))

    const dislikedSet = new Set()
    disliked.forEach(item => dislikedSet.add(item))

    const allMovies = [...thinking, ...aggressive, ...authorian, ...comedy];

    function findMovieByTitle(title) {
        return allMovies.find(movie => movie.title === title);
    }

    function posterRender(set, container) {
        container.innerHTML = '';
        set.forEach(title => {
            const movie = findMovieByTitle(title);
            if (movie) {
                const img = document.createElement('img');
                img.src = movie.url;
                img.alt = movie.title;
                img.classList.add('poster_thumb');
                container.appendChild(img);
            }
        })
    }

    posterRender(likedSet, likeContainer)
    posterRender(dislikedSet, dislikeContainer)
})