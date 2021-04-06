const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadPokemon')

loadButton.addEventListener('click', () => {
    loadPage()
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
    getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=25`).then(
        (data) => {
            console.log(data)
        }
    )
}