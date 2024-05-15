const router = require('express').Router();
const withAuth = require("../../utils/auth")
require('dotenv').config();
const { Games } = require('../../models');

router.post('/', withAuth, async (req, res) => {
    try {
        console.log('creating game', req.body)
      const newGame = await Games.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newGame);
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;