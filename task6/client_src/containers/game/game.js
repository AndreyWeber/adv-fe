var GodGiftForm = require('containers/god-gift-form/god-gift-form.js');
var UserWealth = require('containers/user-wealth/user-wealth.js');
var Resource = require('models/resource.js');

module.exports = function Game() {
    var elem = $('<div></div>');

    // create resources 
    // e.g {count: 10, name: gold}

    // create GodGiftForm 
    // {resources: resources}
    
    // create UserWealth 
    // {resources: resources}

    function render() {
        elem.html(App.templates['game']({}));
//         elem.find('.game__god-gift-form').html(giftForm.render().elem)
//         elem.find('.game__wealth').html(userWealth.render().elem)
        return this;
    }

    return {
        render: render,
        elem: elem
    }
};
