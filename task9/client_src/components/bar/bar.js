// expects model with getCount method
module.exports = function Bar() {
    var elem = $('<div></div>');

    var count = 0;

    function render() {
        elem.html(App.templates['bar']({
            progress: Array(count)
        }));
        return this;
    }

    return {
        render: render,
        getCount: function () {
            return count;
        },
        setCount: function (c) {
            count = (!c || c < 0) ? 0 : c;
            render();
        },
        inc: function (c) {
            count += c;
            render();
        },
        dec: function (c) {
            count = (count - c) >= 0 ? count - c : 0;
            render();
        },
        elem: elem
    }
};