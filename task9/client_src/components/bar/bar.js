// espects model wiht getCount method
module.exports = function Bar(options) {
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
        getCount: function() {
            return count;
        },
        setCount: function(c) {
            count = c;
            render();
        },
        inc: function() {
            count++;
            render();
        },
        dec: function() {
            count--;
            render();
        },
        elem: elem
    }
};
