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

//_____________________________________________________PUT
router.put('/done/:companyId', function(req, res, next){
  var _companyId = req.params.companyId;
  var _companyUpds = req.body;
  var _companyUpdated = null;
  var newData = data.map(
    function(doc, i){
      if (doc._id == _companyId){
        _companyUpdated = Object.assign(
          {},
          doc,
          {"done":true},
          _companyUpds
          );
        return _companyUpdated;
      }
      return doc;
    }
  );// end map
  data = newData;
  fileModel.write(data, function (err) {
    if (err) {
      console.log(err);
      return res..json({ 'error': 'Error al Guardar Data' });
    }
    return res.s.json(_companyUpdated);
  });
});

//_____________________________________________________DELETE
router.delete('/delete/:thingId', function(req, res, next){
  var _thingId = req.params.companyId;
  var newData = data.filter(
    function (doc, i) {
      if (doc._id == _companyId) {
        return false;
      }
      return true;
    }
  );


  data = newData;
  fileModel.write(data, function (err) {
    if (err) {
      console.log(err);
      return res.json({ 'error': 'Error al Guardar Data' });
    }
    return res.json({"delete": _companyId});
  });
});

module.exports = router;
