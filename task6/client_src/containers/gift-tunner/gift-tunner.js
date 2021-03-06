var Bar = require('components/bar/bar.js');
var TuneControls = require('components/tune-controls/tune-controls.js');

module.exports = function GiftTuner(options) {
    var elem = $('<div></div>');

    var resource = options.resource;
    var name = options.name;

    var bar = new Bar({
        model: resource
    });
    var controls = new TuneControls({
        model: resource
    });
 
    function render() {
        elem.html(App.templates['gift-tunner']({}));

        elem.find('.gift-tunner__name').html(name);
        elem.find('.gift-tunner__bar').html(bar.render().elem);
        elem.find('.gift-tunner__controls').html(controls.render().elem);

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
