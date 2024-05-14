let APIKey = 'bde9a5a84a684b019b42aab0edf6645c';
const reqURL = `https://api.rawg.io/api/games?key=${APIKey}`;
const router = require('express').Router();
const { Games } = require('../../models');
const withAuth = require('../../utils/auth');
const gameList = document.querySelector(".gameList");
const loaderEl = document.getElementById("js-preloader");
const loadMoreGamesBtn = document.querySelector(".main-button")
let nextGameListUrl = null;

const getPlatformStr = (platforms) => {
  const platformStr = platforms.map(pl => pl.platform.name).join(", ");
  if (platformStr.length > 30) {
      return platformStr.substring(0, 30) + "...";
  }
  return platformStr;
}

function loadGames(url){
  loaderEl.classList.remove("loaded");
  
  // Fetch recently released games from RAWG API
  fetch(url)
      .then(response => response.json())
      .then(data => {
          nextGameListUrl = data.next ? data.next : null;
          const games = data.results;
  
          games.forEach(game => {
              const gameItemEl = `
              <div class="col-lg-3 col-md-6 col-sm-12">
                      <div class="item">
                      <img src="${game.background_image}" alt="${game.name} image">
                          <h4 class="game-name">${game.name}<br><span class="platforms">${getPlatformStr(game.parent_platforms)}</span></h4>
                          <ul>
                          <li><i class="fa fa-star"></i> <span class="rating">${game.rating}</span></li>
                              <li><i class="fa-regular fa-calendar"></i> <span class="date">${game.released}</span></li>
                              </ul>
                      </div>
                      </div>
              `
              gameList.insertAdjacentHTML("beforeend", gameItemEl)
          });
          loaderEl.classList.add("loaded");
          if (nextGameListUrl) {
              loadMoreGamesBtn.classList.remove("hidden");
          } else {
              loadMoreGamesBtn.classList.add("hidden");
          }
      })
      .catch(error => {
          console.log("An error occurred:", error);
      });
}


// load games
loadGames(url);

loadMoreGamesBtn.addEventListener("click", ()=>{
  if(nextGameListUrl){
      loadGames(nextGameListUrl);
  }
})



module.exports = router;

// router.post('/', withAuth, async (req, res) => {
//   try {
//     const newProject = await Games.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });

//     res.status(200).json(newProject);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.delete('/:id', withAuth, async (req, res) => {
//   try {
//     const projectData = await Games.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!projectData) {
//       res.status(404).json({ message: 'No project found with this id!' });
//       return;
//     }

//     res.status(200).json(projectData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });