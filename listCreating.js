import {thinking, aggressive, authorian, comedy} from "./data/movies.js";
import {listCreatingStyle} from "./styles.js"

export class ListCreating extends HTMLElement {
    constructor() {
        	super();
		this.allMovies = [];
		this.attachShadow({mode: 'open'})
	}

	connectedCallback() {
		this.render();
		this.shadowRoot.adoptedStyleSheets = [listCreatingStyle]
		this.setupEventListeners();
		}

		render() {
		this.shadowRoot.innerHTML = `
                <button id="openList" data-open-modal>Создать подборку</button>
            <ul id="tableList"></ul>
            <dialog data-modal>
                <div class="list_container">
                    <input id="listCreator" type="text" placeholder="Название Подборки">
                    <input id="movieSearch" type="text" placeholder="Фильм для Подборки">
                    <ul id="result"></ul>
                    <button id="createButton" type="submit">Создать Подборку</button>
                    <button id="closeDialog" data-close-modal>Выйти</button>
                </div>
`
		}

	setupEventListeners() {
	const allMovies = [...thinking, ...aggressive, ...authorian, ...comedy];
	const openList = this.shadowRoot.getElementById('openList');
	const dialog = this.shadowRoot.querySelector('[data-modal]')
	const closeList = this.shadowRoot.querySelector('[data-close-modal]');
	const resultList = this.shadowRoot.getElementById('result');
	const tableList = this.shadowRoot.getElementById('tableList')
	const searchMovie = this.shadowRoot.getElementById('movieSearch');
	const listCreator = this.shadowRoot.getElementById('listCreator');
	const createButton = this.shadowRoot.getElementById('createButton')

    openList.addEventListener('click', () => {
        listCreator.value = '';
        searchMovie.value = '';
        dialog.showModal()
     })

   closeList.addEventListener('click', () => {
       dialog.close()
   })
        createButton.addEventListener('click', () => {
            const listName = listCreator.value;
            tableList.innerHTML = '';
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
                tableList.appendChild(li);
                li.appendChild(choiceButton);
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

	}

customElements.define('list-creating', ListCreating)
