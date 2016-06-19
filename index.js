var fs = require('fs');

var Twit = require('twit');
var generator = require('./pairs');

var config = fs.existsSync('./local.config.js') ? require('./local.config.js') : require('./config.js');

var Twitter = new Twit(config.API);

var tweet = function() {
    'use strict';

    generator().then(function(tweet) {
        Twitter.post('statuses/update', {
            status: tweet
        }, function(error, data, response) {
            if (error) {
                throw new Error(error);
            }

            console.log(tweet);
        });
    });
};

//setInterval(function() {
//    'use strict';
//    try {
//        tweet();
//    } catch (e) {
//        console.log(e);
//    }
//}, 1000 * 60 * 120);

tweet();
