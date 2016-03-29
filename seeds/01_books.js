
var seeder = require('knex-csv-seeder').seeder.seed;

exports.seed = seeder({
  table: 'books',
  file: './data/books.csv'
});