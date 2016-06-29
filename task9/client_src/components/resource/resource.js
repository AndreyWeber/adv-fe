// expects Resource model with getName and getCount methods
module.exports = function Resource() {
    var elem = $('<div></div>');

    var resName = 'something';
    var resAmount = 0;

    function render() {
        elem.html(App.templates['resource']({}));

        elem.find('.resource__name').html(resName);
        elem.find('.resource__val').html(resAmount);

        return this;
    }

    return {
        render: render,
        setName: function (name) {
            resName = name;
            render();
        },
        getName: function (name) {
            return resName;
        },
        setAmount: function (amount) {
            resAmount = amount;
            render();
        },
        elem: elem
    }
};
