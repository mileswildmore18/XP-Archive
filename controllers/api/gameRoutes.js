const router = require('express').Router();
const withAuth = require("../../utils/auth")
require('dotenv').config();
const { Games } = require('../../models');

router.post('/', withAuth, async (req, res) => {
    try {

        const game = req.body;
        game.user_id = req.session.user_id
        console.log('creating game', game)
        const newGame = await Games.create({
            ...req.body, 
            user_id: req.session.user_id
        });

        res.status(200).json(game);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

module.exports = router;