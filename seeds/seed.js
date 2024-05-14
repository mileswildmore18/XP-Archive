const sequelize = require('../config/connection');
const { User, Games } = require('../models');

const userData = require('./userData.json');
const gameData = require('./gameData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const game of gameData) {
    await Games.create({
      ...game,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
