var express = require('express');
var router = express.Router();


// Get Homepage
router.get('/', ensureAuthenticated, function(req, res,username){
	var resultArray = [];
	var cursor = db.collection('users').find({username: username,websites:true});
  cursor.forEach(function(doc, err) {
      resultArray.push(doc);
    }, function() {
      res.render('index', {items: resultArray});
    });
  });

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
