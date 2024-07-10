// URL base de la API
const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";

// Función para obtener y mostrar pokemons
async function fetchAndDisplayPokemons(offset = 0, limit = 20) {
  try {
    // Obteniendo la lista inicial de pokemons con parámetros de paginación
    const response = await fetch(
      `${API_BASE_URL}?offset=${offset}&limit=${limit}`
    );
    const data = await response.json();
    const pokemons = data.results; // Array de objetos pokemon

    // Seleccionando el contenedor para añadir detalles de pokemons
    const pokemonList = document.querySelector(".pokemon-list");
    const filtrarBtn = document.querySelector(".pokemom-box");

    // Limpiando la lista de pokemons existente (filtrarBtns del HTML) antes de añadir nuevos
    while (pokemonList.firstChild) {
      pokemonList.removeChild(pokemonList.firstChild);
    }

    // Iterando sobre cada pokemon para obtener datos detallados
    pokemons.forEach(async (pokemon) => {
      try {
        const detailsResponse = await fetch(pokemon.url);
        const detailsData = await detailsResponse.json();
        const pokemonElement = createPokemonElement(
          detailsData,
          filtrarBtn.cloneNode(true)
        );
        pokemonList.appendChild(pokemonElement);
      } catch (error) {
        console.error("Error al obtener detalles del pokemon:", error);
      }
    });
  } catch (error) {
    console.error("Error al obtener datos iniciales de pokemons:", error);
  }
}

// Función para crear un elemento DOM para un pokemon
function createPokemonElement(pokemonData, elementfiltrarBtn) {
  const { sprites, id, name, base_experience, types } = pokemonData;

  // Estableciendo fuente de imagen y atributos
  const pokeImg = elementfiltrarBtn.querySelector("img");
  pokeImg.src = sprites.other["official-artwork"].front_default;

  // Estableciendo ID de pokemon
  const pokeId = elementfiltrarBtn.querySelector(".idPokemon");
  pokeId.textContent = `ID: #${id}`;
  const pokeIdBack = elementfiltrarBtn.querySelector(".pokemon-id-back");
  pokeIdBack.textContent = `#${id}`;

  // Estableciendo nombre de pokemon
  const pokemonName = elementfiltrarBtn.querySelector(".name-poke");
  pokemonName.textContent = `Name: ${name}`;

  // Estableciendo experiencia de pokemon
  const pokeExp = elementfiltrarBtn.querySelector(".experencia");
  pokeExp.textContent = `EXP: ${base_experience}`;

  // Estableciendo tipo de pokemon
  const pokeTypes = elementfiltrarBtn.querySelector(".poke-tipos");
  pokeTypes.innerHTML = types
    .map(
      (type) => `<div class="${type.type.name} tipo">${type.type.name}</div>`
    )
    .join("");

  return elementfiltrarBtn;
}

/* -------------------------------------input de buscar y lupita  --------------------------------------*/
// Estableciendo filtro de busqueda por el nombre
//seleccionando los botones y el input
const input = document.getElementById("buscar");
const btnLupita = document.getElementById("lupa");

input.addEventListener("keyup", () => {
  let buscador = input.value.toLocaleLowerCase();
  const pokemonBox = document.querySelectorAll(".pokemom-box");

  pokemonBox.forEach((e) => {
    let names = document.querySelectorAll(".name-poke");

    names.forEach((name, index) => {
      if (name.textContent.includes(buscador)) {
        pokemonBox[index].classList.add("activo");
      } else {
        pokemonBox[index].classList.remove("activo");
      }
    });
  });
  if (input.value === "") {
    btnLupita = location.reload();
  }
});

/*----------------------------------------boton de pokemon ramdon*---------------------------------------------------*/

const btnRandom = document.getElementById("btn-random");
const pokemonList = document.querySelector(".pokemon-list");

btnRandom.addEventListener("click", function () {
  // Obtener la cantidad de elementos dentro de pokemonList
  const numPokemons = pokemonList.children.length;

  // Generar un índice aleatorio válido
  const randomIndex = Math.floor(Math.random() != numPokemons);

  // Seleccionar el Pokémon aleatorio
  const randomPokemon = pokemonList.children[randomIndex];

  pokemonList.appendChild(randomPokemon);
});

/*------------------------------------------------------filtro de busqueda por tipo-------------------------------------- */

function filterPoke(value) {
  let buttons = document.querySelectorAll(".fitro-btn");
  let pokemons = document.querySelectorAll(".pokemom-box");

  buttons.forEach((button) => {
    if (value === "all") {
      button.classList.toggle(
        "activo",
        button.id.toUpperCase() === "VER TODOS"
      );
    } else {
      button.classList.toggle("activo", button.id.toLowerCase() === value);
    }
  });

  pokemons.forEach((pokemon) => {
    const pokemonTypes = pokemon.querySelectorAll(".tipo");
    const hasType =
      value === "all" ||
      Array.from(pokemonTypes).some(
        (type) => type.textContent.toLowerCase() === value
      );
    pokemon.style.display = hasType ? "block" : "none";
  });
}


/*--------------------------------------------------------boton ver mas----------------------------------------------------*/
const btnVerMas = document.querySelector(".btn-mas");

btnVerMas.addEventListener("click", showMorePokemon);


const pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon";


let offset = 20;
let limit = 20;
let shownPokemonIds = [];

async function fetchDataFromAPI(apiUrl, requestParams = {}, offset = 0, limit = 20, responseFormat = "json") {
  const response = await fetch(`${apiUrl}?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  return data.results; // Return only the results array
}

async function showMorePokemon() {
  try {
    const newPokemons = await fetchDataFromAPI(pokemonApiUrl, {}, offset, limit);

    // Filter out already shown Pokemon
    const filteredPokemons = newPokemons.filter((pokemon) => !shownPokemonIds.includes(pokemon.id));
    shownPokemonIds = [...shownPokemonIds, ...filteredPokemons.map((pokemon) => pokemon.id)]; // Update shownPokemonIds
    

    const pokemonBoxes = document.querySelectorAll('.pokemom-box');
    // Update existing Pokemon boxes directly using spread syntax with await
    pokemonBoxes.forEach(async (box) => {
      const pokemon = await filteredPokemons.find((p) => p.id === Number(box.dataset.pokeId)); // Convert dataset.pokeId to number for comparison
   // Limpiando la lista de pokemones existente
      
      if (pokemon)
        
        {while(pokemonBoxes.firstChild){
        pokemonBoxes.removeChild(pokemonBoxes.firstChild);
        }
        //datos actualizados 
        box.querySelector(".img-poke").src = pokemon.sprites.other["official-artwork"].front_default;
        box.querySelector(".idPokemon").textContent = pokemon.id;
        box.querySelector(".name-poke").textContent = pokemon.name;
        box.querySelector(".experiencia").textContent = pokemon.base_experience;

        // Update types (assuming there's a `pokeTypes` element within the box)
        const types = pokemon.types;
        box.querySelector(".poke-tipos").innerHTML = types.map((type) => `<div class="${type.type.name} tipo">${type.type.name}</div>`).join("");
      }
    });

    offset += limit;
  } catch (error) {
    console.error("Error fetching more Pokemon:", error);
  }
}





// Inicializar el código luego de que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  fetchAndDisplayPokemons();
  filterPoke("all");
});