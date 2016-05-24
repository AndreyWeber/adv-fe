module.exports = function Resource (options) {
    'use strict';
    
    var elem = $('<div></div>');
    var name = options.name || '';
    var amount = options.amount || 0;
    var hateCount = options.hateCount || 1;

    function render () {
        elem.html(App.templates['resource']({
            name: name,
            amount: amount
        }));

        return this;
    }

    return {
        render: render,
        incAmount: function (val) {
            amount += val || 1;
            render();
        },
        decAmount: function (val) {
            amount -= val || 1;
            render();
        },
        getAmount: function () {
            return amount;
        },
        hateCount: hateCount,
        name: name,
        elem: elem
    };
};
