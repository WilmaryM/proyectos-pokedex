// Importa las funciones necesarias
import { fetchAndDisplayPokemons } from "./api.js";
import { initializeSearch } from "./search.js";
import { initializeFilter } from "./filter.js";
import { initializeSort } from "./sort.js";
import { initializeRandomPokemon } from "./randomPokemon.js";
import { initializeLoadMore } from "./loadMore.js";
import { initializePokemonInfo } from "./pokemonInfo.js";

// Ejecuta las funciones cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Obtiene y muestra los primeros 20 Pokémon
  fetchAndDisplayPokemons(0, 20, false);
  // Inicializa la búsqueda
  initializeSearch();
  // Inicializa el filtro
  initializeFilter();
  // Inicializa el ordenamiento
  initializeSort();
  // Inicializa la función de Pokémon aleatorio
  initializeRandomPokemon();
  // Inicializa la función de cargar más Pokémon
  initializeLoadMore();
  // Inicializa la información del Pokémon
  initializePokemonInfo();
});
