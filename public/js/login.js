let APIKey = 'bde9a5a84a684b019b42aab0edf6645c'
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
    gameElement.classList.add('game');
    gameElement.innerHTML = `
      <h2>${game.name}</h2>
      <img src="${game.background_image}" alt="${game.name}" width="200px">
      <p>Released: ${game.released}</p>
      <p>Rating: ${game.rating}</p>
      <p>ID: ${game.id}</p>
      <button data-gamename="${game.name}" data-gameimg="${game.background_image}" data-gamerating="${game.rating}" data-gamereleased="${game.released}" type="button" class="wishButton"> Add to Wishlist </button>
      <button id="${game.name}" type="button" class="collection"> Add to My Games </button>
    `;
    resultsContainer.appendChild(gameElement);
  });
}

const gameListener = async function (event) {
  if (event.target.matches(".wishButton")) {
    const name = event.target.dataset.gamename;
    const gameImg = event.target.dataset.gameimg;
    const rating_count = event.target.dataset.gamerating;
    const date_released = event.target.dataset.gamereleased;
    console.log(name, rating_count, gameImg, date_released)

    const response = await fetch(`/api/games`, {
      method: 'POST',
      body: JSON.stringify({ name, date_released, rating_count }),
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































const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
