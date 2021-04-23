const pokeGrid = document.querySelector(".pokeGrid");
const loadButton = document.querySelector(".loadPokemon");
const chooseButton = document.querySelector("#chooseYourPokemon");
const newButton = document.querySelector("#newButton");

class Pokemon {
  constructor(name, height, weight, abilities, moves, types) {
    this.id = 900;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.abilities = abilities;
    this.moves = moves;
    this.types = types;
  }
}

loadButton.addEventListener("click", () => loadPage());

newButton.addEventListener("click", () => {
  let pokeName = prompt("Name your new pokemon!");
  let pokeHeight = prompt("What is the height of your new pokemon?");
  let pokeWeight = prompt("What is the weight of your pokemon?");
  let newPokemon = new Pokemon(
    pokeName,
    pokeHeight,
    pokeWeight,
    [
        {
            ability: {
                name: "aggressive sleep",
            },
        },
    ],
    ["slap", "punch"],
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
  pokeBack.appendChild(backImage);

  pokemon.types.forEach((pokeType) => {
    let backType = document.createElement("p");
    backType.textContent = `Type: ${pokeType.type.name}`;
    pokeBack.appendChild(backType);
  });
  pokemon.abilities.forEach((pokeAbility) => {
    let backAbility = document.createElement("p");
    backAbility.textContent = `Ability: ${pokeAbility.ability.name}`;
    pokeBack.appendChild(backAbility);
  });
  let backHeight = document.createElement("p");
  backHeight.textContent = `Height: ${pokemon.height}`;
  let backWeight = document.createElement("p");
  backWeight.textContent = `Weight: ${pokemon.weight}`;
  pokeBack.appendChild(backHeight);
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
