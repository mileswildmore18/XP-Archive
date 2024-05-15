# The-Wild-Coders

## Description
Welcome to the XP Archive! Where you can choose games based on your favourite genre and pck out games you want to try! You will be able to get a chance to gain experience points and levels with every game you play. Whatever game you choose will be recorded into the database and you can add it to your collection of games! You can write a review right after you completed the game and let us know how you liked the experience! We learned how to apply the API Key to link to the website we added it fom where it will show all the information you from a game you are looking for! This database will allow you o archive any of the games you played and reviewed, as well as providing the library games you have received! Enjoy the world of gaming!

## Link



## Table of Contents

 * [Description](#description)
 * [Installation](#installation)
 * [Usage](#usage)
 * [License](#license)
 * [Contributing](#contributing)
 * [Tests](#tests)
 * [Questions](#questions)
 * [Resources](#resources)

## Installation

You will need these npm (Node Package Manager) along with the uuid in order to use the E-Commerce back end with these commands:
```
npm install
npm install bcrypt
npm install dotenv
npm install pg
npm install sequelize
npm install morgan
npm install express-handlebars
```
## Usage

You can use the "Node.js" terminal to check out the E-Commerce back end for information in the database.

## Contributing

All the contributions to this project is all done by Miles Wildmore,  
Anthony Muscarella, and Emanuel Velazquez

## Tests

When you enter the terminal, you will need to open up SQL to bring in the database to the main terminal. Use the following command along with your username before you type in your password:

```
psql -U 
```

After you type in the password, be sure to type the following command to get rid of an existing database and create a new one to avoid mixing different databases:

```
\i schema.sql
```

Then type in this command to leave the database:
```
\q
```
To test out the E-Commerce back end, to test the data and to see all the information featured in the database, navigate to the server js file, and use the follow commands in the terminal:
```
npm run seed
node server.js
```

If you want to leave the E-Commerce back end, hold "CTRL+C" ("CMD+C" for Mac) to stop hosting localhost 3001.

## Resources

Link to the website of the API: 

Link to npm page : https://www.npmjs.com/

Link to get node.js: https://nodejs.org/

## Questions

If you would like contact me for further information, be sure to reach out to me at mileswildmore@hotmail.com

If you would like to know how to setup dependencies, check out my repo at https://github.com/mileswildmore18