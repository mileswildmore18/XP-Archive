const gameList = document.querySelector(".gameList");
const loaderEl = document.getElementById("js-preloader");
const loadMoreGamesBtn = document.querySelector(".main-button")
const wishButton = document.getElementById('wishButton');
let nextGameListUrl = null;


const resultsContainer = document.getElementById('results');
const collectionContainer = document.getElementById('content-container');

async function fetchGamesByName(query) {
  const key =  await fetchKey();
  const secretKey = key.apiKey;
  console.log(secretKey);
  
  const response = await fetch(`https://api.rawg.io/api/games?key=${secretKey}&search=${query}`);
  const data = await response.json();
  console.log(data);
  return data.results;
}


// This calls the API, just update the url to have your key's name.
async function fetchKey() {
  const url = 'https://yorkieportunus.herokuapp.com/store/My Archive'
  const response = await fetch(url);
  const key = await response.json();
  return key;
}
// Call this wherever you need your key.




document.getElementById('searchBar').addEventListener('input', async (event) => {
  const query = event.target.value.trim();

  if (query.length > 2) {
    const games = await fetchGamesByName(query);
    displayResults(games);
  } else {
    document.getElementById('results').innerHTML = '';
  }
});

function displayResults(games) {
  resultsContainer.innerHTML = '';

  games.forEach(game => {
    const gameElement = document.createElement('div');
    gameElement.classList.add('game', 'card');
    gameElement.innerHTML = `
      <h2 class="card-header">${game.name}</h2>
      <div class="card-body">
      <img src="${game.background_image}" alt="${game.name}" width="200px">
      <p>Released: ${game.released}</p>
      <p>Rating: ${game.rating}</p>
      <p>ID: ${game.id}</p>
      <button data-gamename="${game.name}" data-gameimg="${game.background_image}" data-gamerating="${game.rating}" data-gamereleased="${game.released}" data-boolean="false" type="button" class="addGame"> Add to Wishlist </button>
      <button data-gamename="${game.name}" data-gameimg="${game.background_image}" data-gamerating="${game.rating}" data-gamereleased="${game.released}" data-boolean="true" type="button" class="addGame"> Add to Collection </button>
      </div>
    `;
    resultsContainer.appendChild(gameElement);
  });
}

const gameListener = async function (event) {
  if (event.target.matches(".addGame")) {
    const name = event.target.dataset.gamename;
    const background_image = event.target.dataset.gameimg;
    const rating_count = event.target.dataset.gamerating;
    const date_released = event.target.dataset.gamereleased;
    const status = event.target.dataset.boolean;
    console.log(name, rating_count, background_image, date_released, status)

    const response = await fetch(`/api/games`, {
      method: 'POST',
      body: JSON.stringify({ name, background_image, date_released, rating_count, status }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('/profile');
      console.log('success fetch')
    } else {
      alert('Failed to create game');
    }
  }
}

resultsContainer.addEventListener('click', gameListener);

const buttonHandler = async (event) => {
  if (event.target.matches('.remove') || event.target.matches('.delete')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/games/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete game');
    }
  } else if (event.target.matches('.addto')) {
    const id = event.target.getAttribute('data-id');
    const bool = 'true'

    const response = await fetch(`/api/games/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ bool }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response)
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to update game');
    }
  }
};

collectionContainer.addEventListener('click', buttonHandler);