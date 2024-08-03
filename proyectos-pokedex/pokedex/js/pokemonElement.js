// Crea un elemento de Pokémon con los datos proporcionados
export function createPokemonElement(pokemonData, elementTemplate) {
  const { sprites, id, name, base_experience, types } = pokemonData;

  // Actualiza la imagen del Pokémon
  const pokeImg = elementTemplate.querySelector("[data-pokemon-image]");
  pokeImg.src = sprites.other["official-artwork"].front_default;

  // Store sprite data in dataset
  elementTemplate.dataset.sprites = JSON.stringify({
    front_default: sprites.front_default,
    back_default: sprites.back_default,
    front_shiny: sprites.front_shiny,
    back_shiny: sprites.back_shiny,
  });

  // Actualiza el ID del Pokémon
  const pokeId = elementTemplate.querySelector("[data-pokemon-id]");
  pokeId.textContent = `#${id.toString().padStart(3, "0")}`;
  const pokeIdBack = elementTemplate.querySelector("[data-pokemon-id-back]");
  pokeIdBack.textContent = `#${id.toString().padStart(3, "0")}`;

  // Actualiza el nombre del Pokémon
  const pokemonName = elementTemplate.querySelector("[data-pokemon-name]");
  pokemonName.textContent = name;

  // Actualiza la experiencia base del Pokémon
  const pokeExp = elementTemplate.querySelector("[data-pokemon-exp]");
  pokeExp.textContent = `Exp: ${base_experience}`;

  // Actualiza los tipos del Pokémon
  const pokeTypes = elementTemplate.querySelector("[data-pokemon-types]");
  pokeTypes.innerHTML = types
    .map(
      (type) =>
        `<div class="${type.type.name} type" data-pokemon-type>${type.type.name}</div>`
    )
    .join("");

  return elementTemplate;
}
