// Inicializa la búsqueda de Pokémon
export function initializeSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  // Agrega eventos al input y botón de búsqueda
  searchInput.addEventListener("input", performSearch);
  searchButton.addEventListener("click", performSearch);
}

// Realiza la búsqueda de Pokémon según el término ingresado
function performSearch() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const pokemonBoxes = document.querySelectorAll(".pokemonBox");

  // Muestra u oculta los Pokémon según el término de búsqueda
  pokemonBoxes.forEach((box) => {
    const name = box
      .querySelector("[data-pokemon-name]")
      .textContent.toLowerCase();
    box.style.display = name.includes(searchTerm) ? "block" : "none";
  });
}
