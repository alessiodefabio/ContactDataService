var express = require('express');
var router = express.Router();
var dataservice = require('../modules/contactdataservice');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/:number', function(request, response){
   var Contact = request.app.get('Contact');
   console.log(request.params.number);
   console.log(request.url + ' : querying for ' + request.params.number);
   dataservice.findByNumber(Contact, request.params.number, response);
});

router.post('/', function(request, response){
   var Contact = request.app.get('Contact');
   dataservice.update(Contact, request.body, response);
});

router.put('/', function(request, response){
    console.log('pluto');
    var Contact = request.app.get('Contact');
    console.log(JSON.stringify(Contact));
    dataservice.create(Contact, request.body, response);
});

router.delete('/:primarycontactnumber', function(request, response){
    var Contact = request.app.get('Contact');
    dataservice.remove(Contact, request.params.primarycontactnumber, response);
})

router.get('/', function(request, response){
   console.log('List all contacts with ' + request.params.key + request.params.value);
    var Contact = request.app.get('Contact');
    dataservice.list(Contact, response);
});

module.exports = router;