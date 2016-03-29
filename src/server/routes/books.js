var express = require('express');
var router = express.Router();

var knex = require('../../../db/knex');
function Books() {
  return knex('books');
}

// WORKS
// get ALL books
router.get('/', function(req, res, next) {
  Books().select('*').then(function(book){
  	res.render('books',{programming_books: book });
  })
});

// WORKS
// get new book page
router.get('/new', function(req, res, next) {
  res.render('newbook');
});

// WORKS
// add new book
router.post('/new', function(req, res, next){
	// var id = req.body.id;
	var title = req.body.title;
	var genre = req.body.genre;
	var description = req.body.description;
	var cover_url = req.body.cover_url;

		Books().insert({
			title: title,
			genre: genre,
			description: description,
			cover_url: cover_url
		}).then(function(data){
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


// WORKS
// get book by id
router.get('/:id', function(req, res, next) {
	var id = req.params.id;
  Books().select('*').where('id',id).then(function(book){
  	res.render('books',{ programming_books: book });
  })
});

module.exports = router;
