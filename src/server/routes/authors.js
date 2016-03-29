var express = require('express');
var router = express.Router();

var knex = require('../../../db/knex');
function Authors() {
  return knex('authors');
}

// WORKS
// get ALL authors
router.get('/', function(req, res, next) {
  Authors().select('*').then(function(author){
  	res.render('authors',{programmers: author });
  })
});


// WORKS
// get new author page
router.get('/new', function(req, res, next) {
  res.render('newauthor');
});

// WORKS
// add new author
router.post('/new', function(req, res, next){
	// var id = req.body.id;
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var biography = req.body.biography;
	var portrait_url = req.body.portrait_url;

		Authors().insert({
			first_name: first_name,
			last_name: last_name,
			biography: biography,
			portrait_url: portrait_url
		}).then(function(data){
			res.redirect('/authors')
		})
});

// WORKS
// get delete page
router.get('/:id/delete', function(req, res, next){
	var id = req.params.id;
	Authors().select('*').where('id',id).then(function(author){
		res.render('deleteauthor',{ author_to_delete: author });
	})
});

// WORKS
// delete a author (by id)
router.post('/:id/delete', function(req, res, next) {
	var id = req.params.id;
  Authors().select('*').where('id',id).del().then(function(author){
  	res.redirect('/authors');
  })
});

// get edit author page
router.get('/:id/edit', function(req, res, next) {
	var id = req.params.id;
  Authors().select('*').where('id',id).then(function(author){
  	res.render('editauthor',{programmers: author });
  })
});

// edit author (by id)
router.post('/:id/edit', function(req, res, next){
	var id = req.params.id;
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	var biography = req.body.biography;
	var portrait_url = req.body.portrait_url;

	Authors().where('id',id).update({
			first_name: first_name,
			last_name: last_name,
			biography: biography,
			portrait_url: portrait_url
			}).then(function(data){
				res.redirect(`/authors/${id}`);
		})
});


// WORKS
// get author (by id)
router.get('/:id', function(req, res, next) {
	var id = req.params.id;
  Authors().select('*').where('id',id).then(function(author){
  	res.render('authors',{programmers: author });
  })
});

module.exports = router;
