import { films } from '../data/films.js'

console.log(films[6])

let filmlist = document.querySelector('#filmlist')

for (let i = 0; i < films.length; i++) {
    const foundFilm = films.find(film => getLastNumber(film.url) === (i + 1).toString())
    let filmItem = document.createElement('li')
    filmItem.textContent = foundFilm.title
    filmlist.appendChild(filmItem)
}

function getLastNumber(url) {
    let end = url.lastIndexOf('/')
    return url.charAt(end - 1)
}