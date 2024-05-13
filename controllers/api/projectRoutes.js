let APIKey = process.env.DB_APIKEY;
const reqURL = `https://api.rawg.io/api/games?key=${APIKey}`;
const router = require('express').Router();
const { Games } = require('../../models');
const withAuth = require('../../utils/auth');

// Get RAWG API Game data -Emanuel
function getAPI () {
  fetch(reqURL).then(function (res){
      console.log(res);
      return res.json();
  }).catch(function(err){
      console.error(err);
  })
}
//const btn = document.getElementById('games');

//btn.addEventListener('click', getAPI);



router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Games.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Games.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
