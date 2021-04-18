const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadPokemon')
const chooseButton = document.querySelector('#chooseYourPokemon')
const newButton = document.querySelector('#newButton')

class Pokemon {
    constructor(name, height, weight, abilities, moves) {
        this.name = name
        this.height = height
        this.weight = weight
        this.abilities = abilities
        this.moves = moves
    }
}

newButton.addEventListener('click', () => {
    let pokeName = prompt('Name your new pokemon!')
    let pokeHeight = prompt('What is the height of your new pokemon?')
    let pokeWeight = prompt('What is the weight of your pokemon?')
    let newPokemon = new Pokemon(
        pokeName,
        pokeHeight,
        pokeWeight,
        ['eat', 'sleep'],
        ['slap', 'punch']
    )
    console.log((newPokemon))
    populatePokeCard(newPokemon)
})

chooseButton.addEventListener('click', () => {
    let pokeNameOrId = prompt("Enter Pokemon ID or Name:").toLowerCase()
    console.log(pokeNameOrId)
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeNameOrId}`).then(
        (data) => populatePokeCard(data)
    )
})

async function getAPIData(url) {
    try {
        const response = await fetch(url) //gets data from site
        const data = await response.json() // converts to json
        return data // spits it out
    } catch (error) {
        console.log(error)
    }
} 

function loadPage() {
    getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=25&offset=150`).then(
        async (data) => {
            for (const singlePokemon of data.results) {
                await getAPIData(singlePokemon.url).then(
                    (pokeData) => populatePokeCard(pokeData)
                )
            }
            
        }
    )
}

function populatePokeCard(singlePokemon) {
    console.log(singlePokemon)
    let pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    let pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () => {
        pokeCard.classList.toggle('is-flipped')
    })
    pokeCard.appendChild(populateCardFront(singlePokemon))
    pokeCard.appendChild(populateCardBack(singlePokemon))
    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
    console.log(pokemon)
    let pokeFront = document.createElement('div')
    pokeFront.className = 'card__face card__face--front'
    let frontLabel = document.createElement('p')
    frontLabel.textContent = pokemon.name
    let frontImage = document.createElement('img')
    frontImage.src = getImageFileName(pokemon)

    pokeFront.appendChild(frontLabel)
    pokeFront.appendChild(frontImage)
    return pokeFront
}

function populateCardBack(pokemon) {
    let pokeBack = document.createElement('div')
    pokeBack.className = 'card__face card__face--back'
    let backLabel = document.createElement('p')
    backLabel.textContent = `Moves: ${pokemon.moves.length}`
    pokeBack.appendChild(backLabel)
    return pokeBack
}

function getImageFileName(pokemon) {
    let pokeId
    if (pokemon.id < 10) pokeId = `00${pokemon.id}`
    if (pokemon.id > 9 && pokemon.id < 100) pokeId = `0${pokemon.id}`
    if (pokemon.id > 99 && pokemon.id < 810) pokeId = pokemon.id
    return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeId}.png`
}
