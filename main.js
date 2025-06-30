import {thinking, aggressive, authorian, comedy} from "./data/movies.js";
import {likeContainer, dislikeContainer, reset, like, dislike} from "./likeness.js";

document.addEventListener("DOMContentLoaded", () => {

    let currentMovie = null

    const allMovies = [...thinking, ...aggressive, ...authorian, ...comedy];

    const openList = document.getElementById('openList');
    const dialog = document.querySelector('[data-modal]')
    const closeList = document.querySelector('[data-close-modal]');
    const resultList = document.getElementById('result');
    const tableList = document.getElementById('tableList')
    const searchMovie = document.getElementById('movieSearch');
    const listCreator = document.getElementById('listCreator');
    const createButton = document.getElementById('createButton')

    const fun = document.getElementById('fun');
    const agro = document.getElementById('aggressive');
    const author = document.getElementById('author');
    const inspiring = document.getElementById('inspiring');

    const showTitle = document.getElementById('showTitle');
    const poster = document.getElementById('poster');
    const rating = document.getElementById('rating');
    const letterboxd = document.getElementById('letterboxd');

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

    openList.addEventListener('click', () => {
        listCreator.value = '';
        searchMovie.value = '';
        dialog.showModal()
     })

   closeList.addEventListener('click', () => {
       dialog.close()
   })

    function showMovie(genre) {
        let i = Math.floor(Math.random() * 3);
        showTitle.textContent = genre[i].title;
        showTitle.classList.add('title')
        currentMovie = genre[i].title;
        poster.src = genre[i].url
        poster.alt = `Постер: ${genre[i].title}`;
        rating.classList.remove('bad', 'average', 'good', 'masterpiece')
        if (genre[i].rating < 2.5) {
            rating.classList.add('bad')
        } else if (genre[i].rating >= 2.5 && genre[i].rating <= 3.5) {
            rating.classList.add('average')
        } else if (genre[i].rating > 3.5 && genre[i].rating <= 4.1) {
            rating.classList.add('good')
        } else if (genre[i].rating > 4.1) {
            rating.classList.add('masterpiece')
        }
        rating.textContent = genre[i].rating
        letterboxd.href = `${genre[i].urlLetterboxd}`
        localStorage.setItem('movie', genre[i].title);    listCreator.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const listName = listCreator.value;
                if (listName.length > 0) {
                    localStorage.setItem(`${listName}`,'[]')
                    const listOfList = JSON.parse(localStorage.getItem('userLists'))
                    listOfList.push(`${listName}`)
                    localStorage.setItem('userLists', JSON.stringify(listOfList))
                }
            }
        })

        createButton.addEventListener('click', () => {
            const listName = listCreator.value;
            tableList.innerHTML = '';
            tableList.forEach(listName => {
                const li = document.createElement('li')
                const choiceButton = document.createElement('button');
                if (listName.length > 0) {
                    localStorage.setItem('userLists', '[]')
                    localStorage.setItem(`${listName}`,'[]')
                    const listOfList = JSON.parse(localStorage.getItem('userLists'))
                    listOfList.push(`${listName}`)
                    localStorage.setItem('userLists', JSON.stringify(listOfList))
                    choiceButton.textContent = `${listName}`;
                }
                listCreator.appendChild(li);
                li.appendChild(choiceButton);
            })
        })

        function renderResult(results) {
            resultList.innerHTML = '';
            results.forEach(movie => {
                const li = document.createElement('li');
                const choiceButton = document.createElement('button');
                choiceButton.textContent = `${movie.title} (${movie.rating})`
                choiceButton.addEventListener('click', () => {
                    const listName = listCreator.value;
                    if (localStorage.getItem(`${listName}`)) {
                        const choose = JSON.parse(localStorage.getItem(`${listName}`))
                        choose.push(movie.title);
                        localStorage.setItem(`${listName}`, JSON.stringify(choose))
                    }
                })
                resultList.appendChild(li);
                li.appendChild(choiceButton)
            })
        }


        searchMovie.addEventListener('input', () => {
            const query = searchMovie.value.toLowerCase();
            const filtredMovies = allMovies.filter(movie =>
                movie.title.toLowerCase().includes(query));
            renderResult(filtredMovies)
        })

        renderResult(movies)
    }

        fun.addEventListener('click', () => {
            showMovie(comedy);
        })

        agro.addEventListener('click', () => {
            showMovie(aggressive);
        })

        author.addEventListener('click', () => {
            showMovie(authorian);
        })

        inspiring.addEventListener('click', () => {
            showMovie(thinking);
        })



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

    const likedSet = new Set()
    liked.forEach(item => likedSet.add(item))

    const dislikedSet = new Set()
    disliked.forEach(item => dislikedSet.add(item))

    posterRender(likedSet, likeContainer)
    posterRender(dislikedSet, dislikeContainer)

        like.addEventListener('click',() => {
            if (currentMovie) {
                saveReaction(currentMovie, 'like');
                likedSet.add(currentMovie);
                dislikedSet.delete(currentMovie)
                if (likeContainer) posterRender(likedSet, likeContainer);
                if (dislikeContainer) posterRender(dislikedSet, dislikeContainer);
            }
        })

        dislike.addEventListener('click', () => {
            if (currentMovie) {
                saveReaction(currentMovie, 'dislike')
                dislikedSet.add(currentMovie);
                likedSet.delete(currentMovie);
                if (likeContainer) posterRender(likedSet, likeContainer);
                if (dislikeContainer) posterRender(dislikedSet, dislikeContainer);
            }
        })

    reset.addEventListener('click', () => {
        localStorage.removeItem('reactions');
        likedSet.clear();
        dislikedSet.clear();
        posterRender(likedSet, likeContainer)
        posterRender(dislikedSet, dislikeContainer)
    })

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

    function findMovieByTitle(title) {
        return allMovies.find(movie => movie.title === title);
    }


    listCreator.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const listName = listCreator.value;
            if (listName.length > 0) {
                localStorage.setItem(`${listName}`,'[]')
                const listOfList = JSON.parse(localStorage.getItem('userLists'))
                listOfList.push(`${listName}`)
                localStorage.setItem('userLists', JSON.stringify(listOfList))
            }
        }
    })

    createButton.addEventListener('click', () => {
            const listName = listCreator.value;
            tableList.innerHTML = '';
            tableList.forEach(listName => {
                const li = document.createElement('li')
                const choiceButton = document.createElement('button');
                if (listName.length > 0) {
                    localStorage.setItem('userLists', '[]')
                    localStorage.setItem(`${listName}`,'[]')
                    const listOfList = JSON.parse(localStorage.getItem('userLists'))
                    listOfList.push(`${listName}`)
                    localStorage.setItem('userLists', JSON.stringify(listOfList))
                    choiceButton.textContent = `${listName}`;
                }
                listCreator.appendChild(li);
                li.appendChild(choiceButton);
            })
    })

    function renderResult(results) {
        resultList.innerHTML = '';
        results.forEach(movie => {
            const li = document.createElement('li');
            const choiceButton = document.createElement('button');
            choiceButton.textContent = `${movie.title} (${movie.rating})`
            choiceButton.addEventListener('click', () => {
                const listName = listCreator.value;
                if (localStorage.getItem(`${listName}`)) {
                    const choose = JSON.parse(localStorage.getItem(`${listName}`))
                    choose.push(movie.title);
                    localStorage.setItem(`${listName}`, JSON.stringify(choose))
                }
            })
            resultList.appendChild(li);
            li.appendChild(choiceButton)
        })
    }


    searchMovie.addEventListener('input', () => {
        const query = searchMovie.value.toLowerCase();
        const filtredMovies = allMovies.filter(movie =>
            movie.title.toLowerCase().includes(query));
        renderResult(filtredMovies)
    })

    renderResult(movies)
})