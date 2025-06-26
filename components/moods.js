export class movieShow extends HTMLElement {
       constructor() {
           super();
           this.movie = this.showMovie(genre) {
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
               localStorage.setItem('movie', genre[i].title);
           }
           this.fun = this.getElementById('fun');
           this
           this.fun.addEventListener('click', {
               movie(comedy);
           })
       }
}