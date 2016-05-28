// expects Resource model with getName and getCount methods
module.exports = function Resource(options) {
    var elem = $('<div></div>');

    var resource = options.resource;
    var amount = resource.getCount();

    // subscribe on resource
    resource.subscribe(function () {
        amount = resource.getCount();
        if (amount < 0) {
            amount = 0;
        }
        render();
    });

    function render() {
        elem.html(App.templates['resource']({}));

        elem.find('.resource__name').html(resource.getName());
        elem.find('.resource__val').html(amount);

        return this;
    }

    return {
        render: render,
        elem: elem
    }
};
