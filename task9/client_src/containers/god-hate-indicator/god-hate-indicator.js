var Bar = require('components/bar/bar.js');

module.exports = function GodHateIndicator() {
    var elem = $('<div></div>');

    var bar = new Bar();

    function render() {
        elem.html(App.templates['god-hate-indicator']({}));
        elem.find('.god-hate-indicator__bar').html(bar.render().elem);

        return this;
    }

    return {
        render: render,
        elem: elem,
        inc: function(count) {
            bar.inc(count);
        },
        dec: function(count) {
            bar.dec(count);
        },
        setHate: function (count) {
            bar.setCount(count);
        }
    }
};
