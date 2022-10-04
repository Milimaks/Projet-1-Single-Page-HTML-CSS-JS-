const pokemonsImg = document.querySelectorAll(".poke-image-right,.poke-image-left");

pokemonsImg.forEach((pokemonImg) => {
    pokemonImg.addEventListener("click", () => {
        const pokemonName = pokemonImg.id.substring(5, pokemonImg.id.length);
        console.log(`lancement son ${pokemonName}`);  
    });
});
