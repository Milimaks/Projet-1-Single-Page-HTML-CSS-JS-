let facts = ["Ikue Otani est la voix universelle de Pikachu","Au départ, Arcanin devait être un Pokémon légendaire","Tygnon et Kicklee sont inspirés de champions sportifs","Les 3 oiseaux légendaires de la 1ère génération portent des noms de dieux"]

const displayPopup = (isDisplay) => {
    const popup = document.querySelector('.modal-popup');
    switch (isDisplay){
        case true:
            displayFact(facts);
            popup.classList.add('modal-popup-display'); 
            setTimeout(() => {
                popup.classList.remove('modal-popup-display');
            }, 8000);
            break;
        case false:
            popup.classList.remove('modal-popup-display');
    } 
}

const displayFact = (facts) => {
    const fact = document.querySelector('.modal-popup-fact');
    fact.innerHTML = facts[Math.floor(Math.random() * facts.length)];
}

const buttonClosePopup = document.querySelector('.modal-popup-header-closebutton');
buttonClosePopup.addEventListener('click', () => {
    displayPopup(false);
});



