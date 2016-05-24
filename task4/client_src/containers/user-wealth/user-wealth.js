var Resource = require('components/resource/resource.js');

module.exports = function UserWealth () {
    'use strict';

    var elem = $('<div></div>');

    var goldRes = new Resource({
        name: 'Gold',
        amount: 4,
        hateCount: 4
    });
    var copperRes = new Resource({
        name: 'Copper',
        amount: 5,
        hateCount: 1
    });

    var resources = {};
    resources[goldRes.name.toLocaleLowerCase()] = goldRes;
    resources[copperRes.name.toLocaleLowerCase()] = copperRes;

    function render () {
        elem.html(App.templates['user-wealth']({
            resources: Object.keys(resources)
        }));

        Object.keys(resources).forEach(function (key) {
            elem.find('.user-wealth__' + key + '-resource').html(resources[key].render().elem);
        });

        return this;
    }

    return {
        render: render,
        resources: resources,
        elem: elem
    };
};
