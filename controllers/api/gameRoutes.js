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


router.delete('/:id', withAuth, async (req, res) => {
    try {
        const gameData = await Games.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!gameData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        }

        res.status(200).json(gameData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedGame = Games.update({
            status: req.body.bool
        },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },
            });
        if (!updatedGame) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        }

        res.status(200).json(updatedGame);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
})

module.exports = router;