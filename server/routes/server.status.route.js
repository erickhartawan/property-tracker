var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/status', function(req, res, next) {
  res.json({
    status: "Success",
    status_code: "200",
    message : "API BACKEND INDEX"
  })

});

module.exports = router;