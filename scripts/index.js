const searchInput = document.getElementById('searchInput');
const characterList = document.getElementById('characterList');

searchInput.addEventListener('input', searchCharacters);

function searchCharacters() {
  const searchTerm = searchInput.value.toLowerCase();

  fetch('https://hp-api.onrender.com/api/characters')
    .then(response => response.json())
    .then(data => {
      const filteredData = data.filter(character =>
        character.name.toLowerCase().includes(searchTerm)
      );

      displayCharacters(filteredData);
    })
    .catch(error => console.error('Error:', error));
}

function displayCharacters(characters) {
  characterList.innerHTML = '';

  characters.forEach(character => {
    const characterCard = document.createElement('div');
    characterCard.classList.add('character-card');

    const name = document.createElement('h2');
    name.textContent = character.name;

    const image = document.createElement('img');
    image.src = character.image;
    image.alt = `${character.name} image`;

    const house = document.createElement('p');
    house.textContent = `House: ${character.house}`;

    const patronus = document.createElement('p');
    patronus.textContent = `Patronus: ${character.patronus || 'Unknown'}`;

    const species = document.createElement('p');
    species.textContent = `Species: ${character.species || 'Unknown'}`;

    characterCard.appendChild(name);
    characterCard.appendChild(image);
    characterCard.appendChild(house);
    characterCard.appendChild(patronus);
    characterCard.appendChild(species);

    characterList.appendChild(characterCard);
  });
}

// Initial loading
searchCharacters();