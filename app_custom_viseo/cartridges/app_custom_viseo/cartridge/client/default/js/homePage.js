var multiSrc = require('./components/img-multiSrc');
var newsletter = require('./components/newsletter')

$(document).ready(function() {
	newsletter.initalizeNewsletter();
    $('.js-multiSrc').multisrc();
})