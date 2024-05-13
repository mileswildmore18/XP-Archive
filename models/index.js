const User = require('./User');
const Games = require('./Games');

User.hasMany(Games, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Games.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Games };
