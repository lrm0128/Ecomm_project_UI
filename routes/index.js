var express = require('express');
var router = express.Router();

var books = require('../data').books;
// convert countries to a hashmap
var index_names = {};
for (var i = 0, len = books.length; i < len; i++) {
  var book_name = books[i].name.toLowerCase();
  // console.log(countryname);
  if (!( book_name in index_names )) {
    index_names[book_name] = i;
  }
}

console.log(index_names);

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/books/:name', function(req, res) {
  console.log(req.params.name);
  if ( req.params.name in index_names ) {
    res.status(200).json({ books: books[index_names[req.params.name]] });
  } else {
    res.status(400).json({ message: 'info not found' });
  }
});



var reviews = [];

router.post('/books/reviews', function (req, res) {

  reviews.push(req.body);
  res.body=reviews;
  res.status(201).json(res.body);
});

module.exports = router;