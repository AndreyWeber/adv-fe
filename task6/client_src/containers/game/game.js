var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var UserWealth = require('containers/user-wealth/user-wealth.js');
var Resource = require('models/resource.js');

module.exports = function Game() {
    var elem = $('<div></div>');

    const BASE_HATE = 50;

    // create resources 
    // e.g {count: 10, name: gold}
    var userGoldResource = new Resource({
        count: 10,
        minCount: 0,
        maxCount: 10,
        name: 'Gold'
    });
    var userCopperResource = new Resource({
        count: 15,
        minCount: 0,
        maxCount: 15,
        name: 'Copper'
    });
    var resources = [userGoldResource, userCopperResource];

    // create GodGiftForm
    var giftForm = new GodGiftForm({
        resources: resources,
        baseHate: BASE_HATE
    });

    // create UserWealth
    var userWealth = new UserWealth({
        resources: resources
    });

    function render() {
        elem.html(App.templates['game']({}));

        elem.find('.game__god-gift-form').html(giftForm.render().elem);
        elem.find('.game__wealth').html(userWealth.render().elem);

        return this;
    }

    return {
        render: render,
        elem: elem
    }
};
