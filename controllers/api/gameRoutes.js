const router = require('express').Router();
const withAuth = require("../../utils/auth")
require('dotenv').config();
console.log(process.env.DB_APIKEY)

router.get('/:name', withAuth, async (req,res)=> {
    try{
        const newGame = await axios.get(`https://api.rawg.io/api/games?key=${process.env.DB_APIKEY}&${req.params.name}`)
        console.log(newGame)
        // res.render('profile', newGame, userData, loggedIn)
    } catch (err){
        res.status(400).json(err)
    }
})

module.exports = router;