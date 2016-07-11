var Resource = require('components/resource/resource.js');

module.exports = function UserWealth(options) {
    var elem = $('<div></div>');

    var resources = options.resources || [];

    // create resource components
    var ctResources = resources.map(function (r) {
        var resource = new Resource();
        resource.setName(r.getName());
        resource.setAmount(r.getCount());

        return resource;
    });

    function render() {
        elem.html(App.templates['user-wealth']({}));
        elem.find('.user-wealth__resources').html(ctResources.map(function(r) {
            return r.render().elem;
        }));
        return this;
    }

    return {
        render: render,
        update: function () {
            ctResources.forEach(function (ctRes) {
                var res = resources.filter(function (r) {
                    return r.getName().toLowerCase() === ctRes.getName().toLowerCase();
                });
                ctRes.setAmount(res[0].getCount());
            });
            render();
        },
        elem: elem
    }
};
