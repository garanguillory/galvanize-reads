var express = require('express');
var router = express.Router();

var knex = require('../../../db/knex');
function Books() {
  return knex('books');
}


// knex.select('first_name', 'last_name','biography','portrait_url','title','genre','description','cover_url')
//     .from('authors')
//     .rightJoin('booklists','authors.id','booklists.authors_id')
//     .rightJoin('books','books.id','booklists.books_id');

// knex.select('first_name', 'last_name','biography','portrait_url','title','genre','description','cover_url')
//     .from('books')
//     .rightJoin('booklists','books.id','booklists.books_id')
//     .rightJoin('authors','authors.id','booklists.authors_id');

// SELECT first_name, last_name, title, genre  
// FROM authors
// RIGHT JOIN booklists
// ON authors.id=booklists.authors_id
// RIGHT JOIN books
// ON books.id=booklists.books_id;


// WORKS
// get ALL books
router.get('/', function(req, res, next) {
  // Books().select('*').then(function(book){
  // 	res.render('books',{programming_books: book });
  // })
  knex.select('first_name', 'last_name','books_id','authors_id','title','genre','description','cover_url')
      .from('authors')
      .rightJoin('booklists','authors.id','booklists.authors_id')
      .rightJoin('books','books.id','booklists.books_id')
      .then(function(all){
      	res.render('books', {authors_books:all});
      });
});

// WORKS
// get new book page
router.get('/new', function(req, res, next) {
	knex.select('*').from('authors').then(function(author){
		res.render('newbook',{author_list: author});
	})
});

// WORKS
// add new book
router.post('/new', function(req, res, next){
	// var id = req.body.id;
	var title = req.body.title;
	var genre = req.body.genre;
	var description = req.body.description;
	var cover_url = req.body.cover_url;
	var authorsId = req.body.authorsId;
	console.log(req.body);

		Books().insert({
			title: title,
			genre: genre,
			description: description,
			cover_url: cover_url
		})
		.returning('id')
		.then(function (bookId) {
			console.log('bookId', bookId);
			knex('booklists').insert({
				authors_id: authorsId,
				books_id: bookId[0]
			})
			.returning('authors_id')
			.then(function(authorsId){
				console.log('authors_id', authorsId)
			})
			// create new rows in booklists where book_id is "bookId"
			// and where the author id matches with the selected authors
			// in the form.

			// in order to resolve multiple promises,
			// take a look at Promise.all
		})
		.then(function(data){
			res.redirect('/books')
		})
});

// WORKS
// get delete page
router.get('/:id/delete', function(req, res, next){
	var id = req.params.id;
	Books().select('*').where('id',id).then(function(book){
		res.render('deletebook',{ book_to_delete: book });
	})
});

// WORKS
// delete a book (by id)
router.post('/:id/delete', function(req, res, next) {
	var id = req.params.id;
  Books().select('*').where('id',id).del().then(function(book){
  	res.redirect('/books');
  })
});

// get edit book page
router.get('/:id/edit', function(req, res, next) {
	var id = req.params.id;
  Books().select('*').where('id',id).then(function(book){
  	res.render('editbook',{programming_books: book });
  })
});

// edit book (by id)
router.post('/:id/edit', function(req, res, next){
	var id = req.params.id;
	var title = req.body.title;
	var genre = req.body.genre;
	var description = req.body.description;
	var cover_url = req.body.cover_url;

	Books().where('id',id).update({
		title: title,
		genre: genre,
		description: description,
		cover_url: cover_url
			}).then(function(data){
				res.redirect(`/books/${id}`);
		})
});


// 
// get book by id
router.get('/:id', function(req, res, next) {
	var id = req.params.id;
	knex.select('first_name','last_name','books_id','authors_id','title','genre','description','cover_url')
	    .from('authors')
	    .rightJoin('booklists','authors.id','booklists.authors_id')
	    .rightJoin('books','books.id','booklists.books_id')
	    .where('books.id', id)
	    .then(function(all){
	    	res.render('books', { authors_books: all });
	    });
});

module.exports = router;
