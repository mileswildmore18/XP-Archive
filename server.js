const express = require('express');
require('dotenv').config();
const routes = require('./controllers');
const sequelize = require('./config/connection');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store)//setups the beginning session of the token
const helpers = require('./utils/helpers') // login logout

// imports sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({helpers})
const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
}
//middleware for the server
app.use(morgan('combined'))
app.use(session(sess))
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public'))) //java css will be directed from public

app.use(routes);

app.get('/', function (req, res) {
  res.send('Welcome to XP Archive!')
})

// syncs sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port http://localhost:${PORT} !`);
    });
  });


  