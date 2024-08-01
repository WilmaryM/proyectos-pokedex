// Inicializa el selector de ordenamiento
export function initializeSort() {
  const sortSelector = document.getElementById("searchA-Z");
  sortSelector.addEventListener("change", sortPokemons);
}

// Ordena los Pokémon según el tipo de orden seleccionado
function sortPokemons() {
  const pokemonList = document.getElementById("pokemonList");
  const pokemons = Array.from(pokemonList.children);
  const sortType = document.getElementById("searchA-Z").value;

  // Ordena los Pokémon según el valor de orden
  pokemons.sort((a, b) => {
    const aValue = getSortValue(a, sortType);
    const bValue = getSortValue(b, sortType);
    return sortType.includes("asc") ? aValue - bValue : bValue - aValue;
  });

  // Limpia la lista y agrega los Pokémon ordenados
  pokemonList.innerHTML = "";
  pokemons.forEach((pokemon) => pokemonList.appendChild(pokemon));
}

// Obtiene el valor de ordenamiento según el tipo de orden
function getSortValue(pokemon, sortType) {
  if (sortType.includes("id")) {
    return parseInt(
      pokemon.querySelector("[data-pokemon-id]").textContent.match(/\d+/)[0]
    );
  } else {
    return pokemon
      .querySelector("[data-pokemon-name]")
      .textContent.toLowerCase();
  }
}
