var express = require('express');
var router = express.Router();


//-------------------------------------------------

var thingsApi = require('./api/companies');

router.use('/companies', thingsApi);

router.get('/API', fuction(req, res, next){
  res.render('/API', {});
});

//-----------------------------------------------


module.exports = router;
