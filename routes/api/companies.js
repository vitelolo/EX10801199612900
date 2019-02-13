var express= require('express');
var router = express.Router();
var fileModel = require('./jsonmodel');
var data = null;

//RTN, Empresa, Correo, Rubro, Dirección, Teléfono
var company = {
  '_id':'',
  'RTN':'',
  'empresa':'',
  'rubro':'',
  'direccion':'',
  'telefono':'',
};

//_____________________________________________________GET
router.get('/', function( req, res, next) {
  if(!data){
            fileModel.read(function(err, filedata){

              if(err){
                  console.log(err);
                  data = [];
                  return res.json({'error':'Vacìo'});
                  }
            data = JSON.parse(filedata);
            return res.json(data);
    });}
        else {
            return res.json(data);
    }
});

//_____________________________________________________POST

router.post('/new', function(req, res, next){
  var _thingsData = Object.assign({} , company, req.body);
  _thingsData._id = uuidv4();

  if(!data){
    data = [];
  }
  data.push(_thingsData);
  fileModel.write(data, function(err){
    if(err){
      console.log(err);
      return res.json({ 'error': 'Vacìo' });
    }
    return res.json(_thingsData);
  });
});

module.exports = router;
