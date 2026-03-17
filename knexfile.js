// Update with your config settings.

const { config } = require("./config/db");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: config,
  staging: config,
  production: config
};
