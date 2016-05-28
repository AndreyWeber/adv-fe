var GiftTuner = require('containers/gift-tunner/gift-tunner.js');
var GodHateIndicator = require('containers/god-hate-indicator/god-hate-indicator.js');
var Resource  = require('models/resource.js');
var Hate = require('models/hate.js');

module.exports = function GodGiftForm(options) {
    var elem = $('<div></div>');

    var baseHate = options.baseHate || 10; // propagated from game
    var resources = options.resources || [];

    // use it as map of gift impact
    var godPrefer = {
        'gold': 6,
        'copper': 2
    };

    // initial user resource values
    var userHas = {};

    // create hate resource
    var hate = new Hate(baseHate);
    // create tuner resources (resource model) tunerResources
    var tunerResources = resources.map(function (r) {
        userHas[r.getName().toLowerCase()] = r.getCount(); // preserve initial user resource value
        return new Resource({
            count: 0,
            name: r.getName()
        });
    });

    // create hate indicator
    var godHateIndicator = new GodHateIndicator({
        hate: hate 
    });
    // create gift components (gift-tuner) with tunerResources
    var tuners = tunerResources.map(function (r) {
        return new GiftTuner({
            name: r.getName(),
            resource: r
        });
    });

    // subscribe on tuner resources
    // onChange -> set changes in resource
    tunerResources.forEach(function (tr) {
        tr.subscribe(function (r) {
            var userRes = $.grep(resources, function (ur) {
                return ur.getName().toLowerCase() === r.getName().toLowerCase();
            })[0];
            var initCount = userHas[userRes.getName().toLowerCase()];
            var count = initCount - r.getCount();
            if (count <= initCount){
                userRes.setCount(count);
            }
        });
    });

    // subscribe on tuner resources
    // onChange -> recalculate and set hate count
    tunerResources.forEach(function (tr) {
        tr.subscribe(function (r) {
            var resCount = r.getCount() * godPrefer[r.getName().toLowerCase()];
            var count = baseHate - resCount;
            if (count <= baseHate) {
                hate.setCount(baseHate - resCount);
            }
        });
    });

    function render() {
        elem.html(App.templates['god-gift-form']({}));

        elem.find('.god-gift-form__tunners').html(tuners.map(function(tuner) {
            return tuner.render().elem;
        }));
        elem.find('.god-gift-form__hate').html(godHateIndicator.render().elem);

        subscribeHandlers(elem);

        return this;
    }

    function subscribeHandlers(elem) {
        elem.find('.god-gift-form__send').click(function() {
            console.log(
                'send gift [' + 
                tunerResources.map(function(resource) {
                    return resource.getName() + ':' + resource.getCount()
                }) +
                ']'
            );
        });
    }

    return {
        render: render,
        elem: elem
    }
};
