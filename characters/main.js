import { people } from '../data/people.js'
import { getLastNumber, removeChildren } from '../utils/index.js'

const mainElement = document.querySelector('#main')

const mainHeader = document.createElement('header')

document.body.insertBefore(mainHeader, mainElement)

const maleButton = document.createElement('button')
maleButton.textContent = 'Male Characters'
mainHeader.appendChild(maleButton)
maleButton.addEventListener('click', () => populateDOM(maleCharacters))

const femaleButton = document.createElement('button')
femaleButton.textContent = 'Female Characters'
mainHeader.appendChild(femaleButton)
femaleButton.addEventListener('click', () => populateDOM(femaleCharacters))

const othersButton = document.createElement('button')
othersButton.textContent = 'Other Characters'
mainHeader.appendChild(othersButton)
othersButton.addEventListener('click', () => populateDOM(otherCharacters))

const maleCharacters = people.filter(person => person.gender === 'male')
const femaleCharacters = people.filter(person => person.gender === 'female')
const otherCharacters = people.filter(person => {
    if (person.gender === 'n/a' || 
        person.gender === 'hermaphrodite' ||
        person.gender === 'none') {
            return person
        }
})

function addStarField(element, numStars) {
    element.style.setProperty('background-color', '#000')
    for (let i = 0; i < numStars; i++) {
        let star = document.createElement('div')
        star.style.setProperty('position', 'absolute')
        star.style.setProperty('width', '2px')
        star.style.setProperty('height', '2px')
        star.style.setProperty('background-color', 'white')
        let xy = getRandomPosition()
        star.style.left = `${xy[0]}px`
        star.style.top = `${xy[1]}px`
        element.appendChild(star)
    }
}

function getRandomPosition() {
    let y = document.body.scrollHeight
    let x = document.body.scrollWidth
    let randomY = Math.floor(Math.random() * y)
    let randomX = Math.floor(Math.random() * x)
    return [randomX, randomY]
}

addStarField(document.querySelector('body'), 1000)

function populateDOM(characters) {
    removeChildren(mainElement)
    characters.forEach((person, index) => {
        const charFigure = document.createElement('figure')
        const charImg = document.createElement('img')
        let charNum = getLastNumber(person.url)
        charImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
        const charCaption = document.createElement('figcaption')
        charCaption.textContent = person.name

        charFigure.appendChild(charImg)
        charFigure.appendChild(charCaption)

        mainElement.appendChild(charFigure)
    })
}







