var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({ title: req.app.mainBase });
});

router.get('/send', function(req, res, next) {
  res.json({ title: 'Express!' });
});

module.exports = router;
