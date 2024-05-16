let APIKey = '0642c91bda6e431e9d5797ba620a8e55'
const gameList = document.querySelector(".gameList");
const loaderEl = document.getElementById("js-preloader");
const loadMoreGamesBtn = document.querySelector(".main-button")
let nextGameListUrl = null;
const url = `https://api.rawg.io/api/games?key=${APIKey}`

const resultsContainer = document.getElementById('results');

async function fetchGamesByName(query) {
  const response = await fetch(`https://api.rawg.io/api/games?key=${APIKey}&search=${query}`);
  const data = await response.json();
  console.log(data);
  return data.results;
}

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
      <button data-gamename="${game.name}" data-gameimg="${game.background_image}" data-gamerating="${game.rating}" data-gamereleased="${game.released}" type="button" class="wishButton"> Add to Wishlist </button>
      <button id="${game.name}" type="button" class="collection"> Add to My Games </button>
      </div>
    `;
    resultsContainer.appendChild(gameElement);
  });
}

const gameListener = async function (event) {
  if (event.target.matches(".wishButton")) {
    const name = event.target.dataset.gamename;
    const background_image = event.target.dataset.gameimg;
    const rating_count = event.target.dataset.gamerating;
    const date_released = event.target.dataset.gamereleased;
    console.log(name, rating_count, background_image, date_released)

    const response = await fetch(`/api/games`, {
      method: 'POST',
      body: JSON.stringify({ name, date_released, rating_count, background_image}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      // document.location.replace('/login');
      console.log('success fetch')
    } else {
      alert('Failed to create project');
    }
  }
}

resultsContainer.addEventListener('click', gameListener);
const gameButton = document.getElementById('wishButton');


const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();

  

  if (name) {
    const response = await fetch(`/api/gameRoutes`+name)
};

}

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};


document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
