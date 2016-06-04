var Game = require('containers/game/game.js');

var game = new Game();

Promise.all([game.gamePromise]).then(function () {
    $('.content').html(game.render().elem);
});
