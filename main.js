import {TLOC, laSamurai, sinners, TDA} from "./data/movies.js";

document.addEventListener("DOMContentLoaded", () => {
    const fun = document.getElementById('fun');
    const aggressive = document.getElementById('aggressive');
    const author = document.getElementById('author');
    const inspiring = document.getElementById('inspiring');

    const showTitle = document.getElementById('showTitle');
    const poster = document.getElementById('poster');
    const rating = document.getElementById('rating');

    function movies(film) {
        showTitle.classList.add('title');
        showTitle.textContent = film.title;
        poster.src = film.url
        poster.alt = `Постер: ${film.title}`;
        rating.classList.remove('bad', 'average', 'good', 'masterpiece')
        if (film.rating < 2.5) {
            rating.classList.add('bad')
        } else if (film.rating >= 2.5 && film.rating <= 3.5) {
            rating.classList.add('average')
        } else if (film.rating > 3.5 && film.rating <= 4.1) {
            rating.classList.add('good')
        } else if (film.rating > 4.1) {
            rating.classList.add('masterpiece')
        }
        rating.textContent = film.rating
    }

    fun.addEventListener('click', () => {
        movies(TDA)
    })
    aggressive.addEventListener('click', () => {
        movies(sinners)
    })
    author.addEventListener('click', () => {
        movies(laSamurai)
    })
    inspiring.addEventListener('click', () => {
        movies(TLOC)
    })

})