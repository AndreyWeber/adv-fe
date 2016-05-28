// expects model with getCount method
module.exports = function Bar(options) {
    var elem = $('<div></div>');

    var model = options.model;
    var progress = model.getCount();

    model.subscribe(function() {
        progress = model.getCount();
        if (progress < 0) {
            progress = 0;
        }
        render();
    });

    function render() {
        elem.html(App.templates['bar']({
            progress: Array(progress)
        }));
        return this;
    }

    return {
        render: render,
        inc: function (count) {
            model.inc(count);
        },
        dec: function (count) {
            model.dec(count);
        },
        getCount: function() {
            return progress;
        },
        elem: elem
    }
};