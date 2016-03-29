
var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'booklists',
  file: './data/booklists.csv'
});