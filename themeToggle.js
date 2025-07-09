export class ThemeToggle extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: 'open'})
	}

	connectedCallback() {
	this.render();
	this.setupEventListeners();
	}

	render() {
		this.shadowRoot.innerHTML = `
	<link href="styles.css" rel="stylesheet">
            <button type="button" id="theme_changer" data-theme-toggle>
		    <img src="https://img.icons8.com/?size=100&id=nNtT9r4dDsaU&format=png&color=000000" width="24" height="24">
	    </button>
`
	}

	setupEventListeners() {
		const themeChanger = this.shadowRoot.getElementById('theme_changer');

		themeChanger.addEventListener('click', () => {
		const currentTheme = document.documentElement.getAttribute('data-theme')
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        	const themeIcon = this.shadowRoot.querySelector('img');
        	document.documentElement.setAttribute('data-theme', newTheme);
        	localStorage.setItem('theme', newTheme);
        	if (currentTheme === 'dark') {
        	    themeIcon.src = 'https://www.iconpacks.net/icons/2/free-sun-icon-3337-thumb.png'
        	} else if (currentTheme === 'light') {
        	    themeIcon.src = 'https://img.icons8.com/?size=100&id=nNtT9r4dDsaU&format=png&color=000000'
        	            }
		})
	}

}

customElements.define('theme-toggle', ThemeToggle)
