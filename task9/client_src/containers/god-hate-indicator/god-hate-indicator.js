var Bar = require('components/bar/bar.js');

module.exports = function GodLoveInicator(options) {
    var elem = $('<div></div>');

    var hate = options.hate;

    var bar = new Bar();

    hate.subscribe(function() {
        bar.setCount(hate.getCount());
    });

    function render() {
        elem.html(App.templates['god-hate-indicator']({}));

        elem.find('.god-hate-indicator__bar').html(bar.render().elem);
        return this;
    }

    return {
        render: render,
        elem: elem
    }
};
