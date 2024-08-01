// Inicializa la información del Pokémon
export function initializePokemonInfo() {
  const infoContainer = document.getElementById("infoContainer");
  infoContainer.style.display = "none";

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
  infoContainer.style.display = "flex";

  updateInfoContent(clickedBox);
}

// Oculta la información del Pokémon
function hideInfo() {
  document.getElementById("infoContainer").style.display = "none";
}

// Actualiza el contenido de la información del Pokémon
function updateInfoContent(clickedBox) {
  const name = clickedBox.querySelector("[data-pokemon-name]").textContent;
  const id = clickedBox.querySelector("[data-pokemon-id]").textContent;
  const img = clickedBox.querySelector("[data-pokemon-image]").src;
  const types = Array.from(
    clickedBox.querySelectorAll("[data-pokemon-type]")
  ).map((type) => type.textContent);

  document.querySelector("#infoContainer [data-info-image]").src = img;
  document.querySelector(
    "#infoContainer [data-info-name]"
  ).textContent = `${name} (${id})`;
  document.querySelector(
    "#infoContainer [data-info-types]"
  ).textContent = `Type: ${types.join(", ")}`;

  // Actualiza otros campos según sea necesario
}
