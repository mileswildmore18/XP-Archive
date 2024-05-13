let APIKey = "bde9a5a84a684b019b42aab0edf6645c";
const reqURL = `https://api.rawg.io/api/games?key=${APIKey}`;
const router = require('express').Router();
const { Project } = require('../../models');
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
    const newProject = await Project.create({
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
    const projectData = await Project.destroy({
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
