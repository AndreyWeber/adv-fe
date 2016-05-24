var Bar = require('components/bar/bar.js');
var TuneControls = require('components/tune-controls/tune-controls.js');

module.exports = function GiftTuner(options) {
    var elem = $('<div></div>');

    var hateIndicator = options.hateIndicator;
    var resource = options.resource;

    var bar = new Bar({});
    var controls = new TuneControls({
        bar: bar,
        hateIndicator: hateIndicator,
        resource: resource
    });
 
    function render() {
        elem.html(App.templates['gift-tunner']({}));

        elem.find('.gift-tuner__name').html(resource.name);
        elem.find('.gift-tuner__bar').html(bar.render().elem);
        elem.find('.gift-tuner__controls').html(controls.render().elem);

        return this;
    }

    return {
        render: render,
        getCount: function() {
            return bar.getCount();
        },
        elem: elem
    }
};
