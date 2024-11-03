const { User } = require('./user');
const { Pet } = require('./pet');
const { Adopter } = require('./user/adopter');
const { Rehomer } = require('./user/rehomer');

module.exports = {
  User,
  Pet,
  Adopter,
  Rehomer
};
