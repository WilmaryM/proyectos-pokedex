import { createPokemonElement } from "./pokemonElement.js";

// URL base de la API de Pokémon
const API_BASE_URL = "https://pokeapi.co/api/v2/pokemon";

// Obtiene y muestra los Pokémon desde la API
export async function fetchAndDisplayPokemons(
  offset = 0, // Offset para obtener los Pokémon (opcional)
  limit = 20, // Límite de Pokémon a obtener (opcional)
  append = false // Indica si se deben agregar los nuevos Pokémon a la lista existente (opcional)
) {
  try {
    // Realiza una solicitud GET a la API con el offset y límite especificados
    const response = await fetch(
      `${API_BASE_URL}?offset=${offset}&limit=${limit}`
    );
    const data = await response.json();
    const pokemons = data.results;

    // Obtiene los elementos HTML necesarios
    const pokemonList = document.getElementById("pokemonList");
    const templatePokemonBox = document.getElementById("pokemonBoxTemplate");

    // Limpia la lista de Pokémon si no se debe agregar a la lista existente
    if (!append) {
      pokemonList.innerHTML = "";
    }

    // Obtiene los detalles de cada Pokémon y los agrega a la lista
    for (const pokemon of pokemons) {
      try {
        // Realiza una solicitud GET para obtener los detalles del Pokémon
        const detailsResponse = await fetch(pokemon.url);
        const detailsData = await detailsResponse.json();
        const pokemonElement = createPokemonElement(
          detailsData,
          templatePokemonBox.cloneNode(true)
        );
        pokemonList.appendChild(pokemonElement);
      } catch (error) {
        console.error("Error fetching Pokemon details:", error);
      }
    }
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
  }
}
