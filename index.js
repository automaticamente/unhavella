var fs = require('fs');
var _ = require('underscore');
_.mixin(require('underscore.deferred'));

var Twit = require('twit');
var generator = require('./pairs');

var config = fs.existsSync('./local.config.js') ? require('./local.config.js') : require('./config.js');

var Twitter = new Twit(config.API);

var tweet = function() {
    'use strict';

    generator().then(function(tweet) {
        Twitter.post('statuses/update', { status: tweet }, function(err, data, response) {
          console.log(data)
        });
    });
};



setInterval(function() {
    'use strict';
    try {
        tweet();
    } catch (e) {
        console.log(e);
    }
}, 1000 * 60 * 60);

// Tweet once on initialization
tweet();
