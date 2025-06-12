class Movie {
    constructor(title, rating, genre, url) {
        this.title = title;
        this.rating = rating
        this.genre = genre;
        this.url = url;
    }
}

export const TLOC = new Movie(
    'The Life of Chuck',
    3.7,
    'Drama',
    'https://dcmstories.com/wp-content/uploads/2025/04/Affiche-teaser-jpg.jpg'
    );

export const laSamurai = new Movie(
    'Le Samouraï',
    4.2,
    'Thriller',
    'https://m.media-amazon.com/images/I/61ieF3gZ4EL._AC_UF894,1000_QL80_DpWeblab_.jpg'
    );

export const sinners = new Movie(
    'Sinners',
    4.2,
    'Horror',
    'https://i.ebayimg.com/images/g/4OAAAOSwpgJnfE0L/s-l1200.jpg');

export const TDA = new Movie(
    'The Disaster Artist',
    3.6,
    'Comedy',
    'https://m.media-amazon.com/images/M/MV5BMmZlMjUxZDktNGNjYS00NmI2LWFhYTAtOGY2MjQwNTM1M2U4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg');