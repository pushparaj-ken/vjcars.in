const express = require('express');
const route = express.Router()

/**
 *  @description Root Route
 *  @method GET /
 */
 route.get('/', function(req, res, next) {
    res.send({
        message: "Welcome"
    })
});


// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);


module.exports = route