var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var UserWealth = require('containers/user-wealth/user-wealth.js');
var Resource = require('models/resource.js');

module.exports = function Game() {
    var elem = $('<div></div>');

    const BASE_HATE = 50;

    // get resources
    var giftForm = {};
    var userWealth = {};
    var gamePromise = fetch('json-server/wealth')
        .then(function(response) {
            console.log('status: ' + response.status + '; status text: ' + response.statusText +
                '; url: ' + response.url);
            return response.json()
        }, function (reason) {
            console.log('rejected with the next reason: ' + reason);
        })
        .then(function (jsonObj) {
            // create resources
            // e.g {count: 10, name: gold}
            var gold = jsonObj.resources.find(e => e.name === 'gold').count;
            var copper = jsonObj.resources.find(e => e.name === 'copper').count;
            var resources = [];
            resources.push(new Resource({
                count: gold,
                minCount: 0,
                maxCount: gold,
                name: 'Gold'
            }));
            resources.push(new Resource({
                count: copper,
                minCount: 0,
                maxCount: copper,
                name: 'Copper'
            }));

            // create GodGiftForm
            giftForm = new GodGiftForm({
                resources: resources,
                baseHate: BASE_HATE
            });

            // create UserWealth
            userWealth = new UserWealth({
                resources: resources
            });
        })
        .catch(function(ex) {
            console.log('JSON parsing failed', ex);
        });

    function render () {
        elem.html(App.templates['game']({}));

        elem.find('.game__god-gift-form').html(giftForm.render().elem);
        elem.find('.game__wealth').html(userWealth.render().elem);

        return this;
    }

    return {
        gamePromise: gamePromise,
        elem: elem,
        render: render
    }
};