// Inicializa la información del Pokémon
export function initializePokemonInfo() {
  const infoContainer = document.getElementById("infoContainer");
  infoContainer.close();

  // Agrega un evento a la lista de Pokémon para mostrar la información
  document.getElementById("pokemonList").addEventListener("click", (event) => {
    const clickedBox = event.target.closest(".pokemonBox");
    if (clickedBox) {
      showInfo(clickedBox);
    }
  });

  // Agrega un evento al botón de cerrar para ocultar la información
  document.getElementById("closeButton").addEventListener("click", hideInfo);
}

// Muestra la información del Pokémon seleccionado
function showInfo(clickedBox) {
  if (!clickedBox) {
    console.error("clickedBox is undefined");
    return;
  }

  const infoContainer = document.getElementById("infoContainer");
  updateInfoContent(clickedBox);
  infoContainer.showModal();
}

// Oculta la información del Pokémon
function hideInfo() {
  document.getElementById("infoContainer").close();
}

// Actualiza el contenido de la información del Pokémon
function updateInfoContent(clickedBox) {
  const name = clickedBox.querySelector("[data-pokemon-name]").textContent;
  const id = clickedBox.querySelector("[data-pokemon-id]").textContent;
  const img = clickedBox.querySelector("[data-pokemon-image]").src;
  const types = Array.from(
    clickedBox.querySelectorAll("[data-pokemon-type]")
  ).map((type) => type.textContent);

  // Update images
  const sprites = clickedBox.dataset.sprites
    ? JSON.parse(clickedBox.dataset.sprites)
    : {};
  document.querySelector("#infoContainer .img").innerHTML = `
    <img src="${sprites.front_default}" alt="Front Default">
    <img src="${sprites.back_default}" alt="Back Default">
    <img src="${sprites.front_shiny}" alt="Front Shiny">
    <img src="${sprites.back_shiny}" alt="Back Shiny">
  `;

  document.querySelector(
    "#infoContainer [data-info-name]"
  ).textContent = `${name} (${id})`;
  document.querySelector(
    "#infoContainer [data-info-types]"
  ).textContent = `Type: ${types.join(", ")}`;

  // Actualiza otros campos según sea necesario
}
