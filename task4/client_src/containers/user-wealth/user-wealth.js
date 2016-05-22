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

    function render () {
        elem.html(App.templates['user-wealth']({}));

        // A.W: I wish to pass data to template to use {{#each}} inside,
        //      but don't know how to do this
        elem.find('.user-wealth__gold').html(goldRes.render().elem);
        elem.find('.user-wealth__copper').html(copperRes.render().elem);

        return this;
    }

    return {
        render: render,
        gold: goldRes,
        copper: copperRes,
        elem: elem
    };
};
