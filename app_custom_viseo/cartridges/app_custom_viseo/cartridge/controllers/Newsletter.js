'use strict';

var server = require('server');

server.post('Subscribe', function (req, res, next) {
	var newsletterModel = require('*/cartridge/models/newsletter/newsletter');
    var result = new newsletterModel(req.form);
    
    res.json({
    	status : result.subscriptionStatus.stauts,
    	message : result.subscriptionStatus.message
    })
	
    next();
});

module.exports = server.exports();
