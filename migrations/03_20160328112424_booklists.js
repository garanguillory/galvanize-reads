
exports.up = function(knex, Promise) {
  return knex.schema.createTable('booklists', function(table){
  	 table.increments();
  	 table.integer('authors_id');
  	 table.foreign('authors_id').references('id').inTable('authors');
  	 table.integer('books_id');
  	 table.foreign('books_id').references('id').inTable('books');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('booklists');
};