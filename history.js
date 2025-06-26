import {likeContainer, dislikeContainer, reset, like, dislike} from "./likeness.js";

document.addEventListener('DOMContentLoaded', () => {
    localStorage.getItem('theme')

    const themeChanger = document.getElementById('theme_changer');

    themeChanger.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        const themeIcon = document.getElementsByTagName('img')[0];
        document.documentElement.setAttribute('data-theme', newTheme);
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

    posterRender(likedSet, likeContainer)
    posterRender(dislikedSet, dislikeContainer)
})