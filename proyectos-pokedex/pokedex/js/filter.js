// Inicializa el filtro de Pokémon
export function initializeFilter() {
  const filterContainer = document.getElementById("filterContainer");
  filterContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("filterButton")) {
      filterPokemon(event.target.id.toLowerCase());
    }
  });

  const searchSelect = document.getElementById("searchA-Z");
  searchSelect.addEventListener("change", (event) => {
    sortPokemon(event.target.value);
  });
}

// Filtra los Pokémon según el valor seleccionado
export function filterPokemon(value) {
  const buttons = document.querySelectorAll(".filterButton");
  const pokemons = document.querySelectorAll(".pokemonBox");

  // Actualiza el estado activo de los botones de filtro
  buttons.forEach((button) => {
    button.classList.toggle("activo", button.id.toLowerCase() === value);
  });

  // Muestra u oculta los Pokémon según el filtro aplicado
  pokemons.forEach((pokemon) => {
    if (value === "all") {
      pokemon.style.display = "block";
    } else {
      const pokemonTypes = pokemon.querySelectorAll(".type");
      const hasType = Array.from(pokemonTypes).some(
        (type) => type.textContent.toLowerCase() === value
      );
      pokemon.style.display = hasType ? "block" : "none";
    }
  });
}

// Ordena los Pokémon según el criterio seleccionado
export function sortPokemon(criteria) {
  const pokemonList = document.getElementById("pokemonList");
  const pokemons = Array.from(pokemonList.children);

  pokemons.sort((a, b) => {
    const idA = parseInt(
      a.querySelector("[data-pokemon-id]").textContent.replace("#", "")
    );
    const idB = parseInt(
      b.querySelector("[data-pokemon-id]").textContent.replace("#", "")
    );
    const nameA = a
      .querySelector("[data-pokemon-name]")
      .textContent.toLowerCase();
    const nameB = b
      .querySelector("[data-pokemon-name]")
      .textContent.toLowerCase();

    switch (criteria) {
      case "id-asc":
        return idA - idB;
      case "id-desc":
        return idB - idA;
      case "name-asc":
        return nameA.localeCompare(nameB);
      case "name-desc":
        return nameB.localeCompare(nameA);
      default:
        return 0;
    }
  });

  // Reorganiza los elementos en el DOM
  pokemons.forEach((pokemon) => pokemonList.appendChild(pokemon));
}
