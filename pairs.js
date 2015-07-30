var fs = require('fs');
var _ = require('underscore');
_.mixin(require('underscore.deferred'));

var S = require('string');

var wordList = require('./words.json');

var config = fs.existsSync('./local.config.js') ? require('./local.config.js') : require('./config.js');

var getPair = function(initial) {
    'use strict';

    var matches = wordList.filter(function(word) {
        return initial.word.slice(config.characters) === word.word.slice(config.characters);
    });

    var result = _.sample(matches);

    if (result && result.word !== initial.word) {
        return result;
    }

    return false;
};

var generate = function() {
    'use strict';
    var defer = new _.Deferred();

    var initial = _.sample(wordList);
    var final = getPair(initial);

    if (final) {
        var values = {
            start: config.det.initial[initial.gender] + initial.word,
            end: config.det.final[final.gender] + final.word,
        };

        defer.resolve(S(config.template).template(values).s);
    } else {
        return generate();
    }


    return defer.promise();
};


module.exports = generate;
