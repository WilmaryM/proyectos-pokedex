// Inicializa la función de Pokémon aleatorio
export function initializeRandomPokemon() {
  // Obtiene el botón de Pokémon aleatorio y la lista de Pokémon
  const randomButton = document.getElementById("randomButton");
  const pokemonList = document.getElementById("pokemonList");

  // Agrega un evento al botón de Pokémon aleatorio
  randomButton.addEventListener("click", () => {
    // Obtiene los hijos de la lista de Pokémon (los elementos de Pokémon)
    const pokemons = pokemonList.children;
    // Genera un índice aleatorio dentro del rango de los elementos de Pokémon
    const randomIndex = Math.floor(Math.random() * pokemons.length);
    // Obtiene el elemento de Pokémon aleatorio correspondiente al índice generado
    const randomPokemon = pokemons[randomIndex];
    // Agrega el elemento de Pokémon aleatorio al final de la lista de Pokémon
    pokemonList.appendChild(randomPokemon);
  });
}
