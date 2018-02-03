const Habitat = require('habitat');

const habitat = new Habitat();

module.exports = function env(variable, defaultValue) {
  return habitat.get(variable, defaultValue);
};
