var express= require('express');
var router = express.Router();
var fileModel = require('./jsonmodel');

//RTN, Empresa, Correo, Rubro, Dirección, Teléfono
var company = {
  '_id':'',
  'RTN':'',
  'empresa':'',
  'rubro':'',
  'direccion':'',
  'telefono':'',
};

//GET
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
    }});

module.exports = router;
