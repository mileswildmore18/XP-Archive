const router = require('express').Router();
const { User, Games } = require('../models');

router.get('/', async (req, res) => {
    try {
  
        const gameData = await Games.findAll({

            include: [
              {
                model: User,
                attributes: ['name'],
              },
            ],
          });
      
          // Serialize data so the template can read it
          const games = gameData.map((game) => game.get({ plain: true }));
  
      res.render('project', {
        games,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  module.exports = router;