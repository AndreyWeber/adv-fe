var GiftTuner = require('containers/gift-tunner/gift-tunner.js');
var GodHateIndicator = require('containers/god-hate-indicator/god-hate-indicator.js');
var UserWealth = require('containers/user-wealth/user-wealth.js');

module.exports = function GodGiftForm() {
    var elem = $('<div></div>');

    var userWealth = new UserWealth({});
    var godHateIndicator = new GodHateIndicator({
        hate: 32
    });
    var goldTuner = new GiftTuner({
        resource: userWealth.gold,
        hateIndicator: godHateIndicator
    });
    var copperTuner = new GiftTuner({
        resource: userWealth.copper,
        hateIndicator: godHateIndicator
    });

    function render() {
        elem.html(App.templates['god-gift-form']({}));

        elem.find('.god-gift-form__user-wealth').html(userWealth.render().elem);
        elem.find('.god-gift-form__gold-tuner').html(goldTuner.render().elem);
        elem.find('.god-gift-form__copper-tuner').html(copperTuner.render().elem);
        elem.find('.god-gift-form__hate').html(godHateIndicator.render().elem);

        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers(elem) {
        elem.find('.god-gift-form__send').click(function() {
            console.log('send gift [gold: ' + goldTuner.getCount() + ', copper:' + copperTuner.getCount() + ']');
        });
    }

    return {
        render: render,
        elem: elem
    }
};
