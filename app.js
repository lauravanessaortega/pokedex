// Fetch the Pokemon data from the PokeAPI
const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=150';
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Render the Pokemon cards
    const pokedex = document.getElementById('pokedex');
    data.results.forEach(pokemon => {
      const li = document.createElement('li');
      li.textContent = pokemon.name;
      li.addEventListener('click', () => {
        showModal(pokemon.url);
      });
      pokedex.appendChild(li);
    });
  })
  .catch(error => {
    console.error('Error fetching JSON data:', error.message);
  });
// Show the modal with more information about the selected Pokemon
function showModal(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const modal = document.getElementById('modal');
        const modalName = document.getElementById('modal-name');
        const modalImage = document.getElementById('modal-image');
        const modalType = document.getElementById('modal-type');
        const modalHeight = document.getElementById('modal-height');
        const modalWeight = document.getElementById('modal-weight');
        const modalAbility = document.getElementById('modal-ability');
        modalName.textContent = data.name;
        modalImage.src = data.sprites.front_default;
        modalType.textContent = `Type: ${data.types.map(type => type.type.name).join(', ')}`;
        modalHeight.textContent = `Height: ${data.height / 10} m`;
        modalWeight.textContent = `Weight: ${data.weight / 10} kg`;
        modalAbility.textContent = `Ability: ${data.abilities.map(ability => ability.ability.name).join(', ')}`;
        modal.style.display = 'block';
        const close = document.querySelector('.close');
        close.addEventListener('click', () => {
          modal.style.display = 'none';
        });
        window.addEventListener('click', (event) => {
          if (event.target == modal) {
            modal.style.display = 'none';
          }
        });
      })
      .catch(error => {
        console.error('Error fetching JSON data:', error.message);
      });
  }
  // Filter the Pokemon cards based on the search input
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
  const filter = searchInput.value.toLowerCase();
  const lis = document.querySelectorAll('li');
  lis.forEach(li => {
    const name = li.textContent.toLowerCase();
    if (name.includes(filter)) {
      li.style.display = 'block';
    } else {
      li.style.display = 'none';
    }
  });
});