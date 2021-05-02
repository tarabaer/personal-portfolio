const pokeGrid = document.querySelector(".pokeGrid");
const loadButton = document.querySelector(".loadPokemon");
const chooseButton = document.querySelector("#chooseYourPokemon");
const newButton = document.querySelector("#newButton");

class Pokemon {
  constructor(name, height, weight, abilities, types) {
    this.id = 900;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.abilities = abilities;
    this.types = types;
  }
}

loadButton.addEventListener("click", () => loadPage());

newButton.addEventListener("click", () => {
  let pokeName = prompt("Name your new pokemon!");
  let pokeHeight = prompt("What is the height of your new pokemon?");
  let pokeWeight = prompt("What is the weight of your pokemon?");
  let pokeAbilities = prompt("What abilities does your pokemon have? (use a comma separated list pls)")
  let abilitiesArray = getAbilitiesArray(pokeAbilities)
  let newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    abilitiesArray,
    [
      {
        type: {
          name: "normal",
        },
      },
    ],
  );
  console.log(newPokemon);
  populatePokeCard(newPokemon);
});

function getAbilitiesArray(commaString) {
  let tempArray = commaString.split(',')
  return tempArray.map((abilityName) => {
      return {
        ability: {
          name: abilityName
        }
      }
  })
}

chooseButton.addEventListener("click", () => {
  let pokeNameOrId = prompt("Enter Pokemon ID or Name:").toLowerCase();
  console.log(pokeNameOrId);
  getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeNameOrId}`).then((data) =>
    populatePokeCard(data)
  );
});

async function getAPIData(url) {
  try {
    const response = await fetch(url); //gets data from site
    const data = await response.json(); // converts to json
    return data; // spits it out
  } catch (error) {
    console.log(error);
  }
}

function loadPage() {
  getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=25&offset=150`).then(
    async (data) => {
      for (const singlePokemon of data.results) {
        await getAPIData(singlePokemon.url).then((pokeData) =>
          populatePokeCard(pokeData)
        );
      }
    }
  );
}

function populatePokeCard(singlePokemon) {
  console.log(singlePokemon);
  let pokeScene = document.createElement("div");
  pokeScene.className = "scene";
  let pokeCard = document.createElement("div");
  pokeCard.className = "card";
  pokeCard.addEventListener("click", () => {
    pokeCard.classList.toggle("is-flipped");
  });
  pokeCard.appendChild(populateCardFront(singlePokemon));
  pokeCard.appendChild(populateCardBack(singlePokemon));
  pokeScene.appendChild(pokeCard);
  pokeGrid.appendChild(pokeScene);
}

function populateCardFront(pokemon) {
  console.log(pokemon);
  let pokeFront = document.createElement("div");
  pokeFront.className = "card__face card__face--front";
  let frontImage = document.createElement("img");
  frontImage.src = `pokeimages/pokemon_card.jpeg`;

  pokeFront.appendChild(frontImage);
  return pokeFront;
}

function populateCardBack(pokemon) {
  let pokeBack = document.createElement("div");
  pokeBack.className = "card__face card__face--back";
  let backImage = document.createElement("img");
  backImage.src = getImageFileName(pokemon);
  backImage.addEventListener('error', (err) => {
    console.log(`Broken Image: ${err}`)
    backImage.src = 'pokeimages/pokeball.png'
  })
  pokeBack.appendChild(backImage);

  let pokeName = document.createElement('p')
  pokeName.className = "pokeName"
  pokeName.textContent = pokemon.name
  pokeBack.appendChild(pokeName)

let typeLabel = document.createElement('p')
  typeLabel.textContent = "Type(s):"
  pokeBack.appendChild(typeLabel) 
  pokemon.types.forEach((pokeType) => {
    let backType = document.createElement("p");
    backType.textContent = pokeType.type.name;
    pokeBack.appendChild(backType);
  });

  let abilityLabel = document.createElement('p')
  abilityLabel.textContent = "Abilities:"
  pokeBack.appendChild(abilityLabel)
  pokemon.abilities.forEach((pokeAbility) => {
    let backAbility = document.createElement("p");
    backAbility.textContent = pokeAbility.ability.name;
    pokeBack.appendChild(backAbility);
  });  

  let backHeight = document.createElement("p");
  backHeight.textContent = `Height: ${pokemon.height}`
  pokeBack.appendChild(backHeight);
  let backWeight = document.createElement("p");
  backWeight.textContent = `Weight: ${pokemon.weight}`;
  pokeBack.appendChild(backWeight);

  return pokeBack;
}

function getImageFileName(pokemon) {
  let pokeId;
  if (pokemon.id < 10) pokeId = `00${pokemon.id}`;
  if (pokemon.id > 9 && pokemon.id < 100) pokeId = `0${pokemon.id}`;
  if (pokemon.id > 99 && pokemon.id < 810) pokeId = pokemon.id;
  if (pokemon.id === 900) {
    return `pokeimages/pokeball.png`;
  }
  return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeId}.png`;
}
