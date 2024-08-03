// Importa la función para obtener y mostrar los Pokémon
import { fetchAndDisplayPokemons } from "./api.js";

// Inicializa la función de cargar más Pokémon
export function initializeLoadMore() {
  // Obtiene el botón de cargar más
  const loadMoreButton = document.getElementById("loadMoreButton");
  // Inicializa el offset en 0
  let offset = 0;
  // Establece el límite de Pokémon a obtener en 20
  const limit = 20;

  // Agrega un evento al botón de cargar más
  loadMoreButton.addEventListener("click", async () => {
    // Incrementa el offset en el límite
    offset += limit;
    // Obtiene y muestra los Pokémon con el nuevo offset y límite
    await fetchAndDisplayPokemons(offset, limit, true);

    // Desplaza la página suavemente hacia el botón de cargar más
    loadMoreButton.scrollIntoView({ behavior: "smooth" });
  });
}
