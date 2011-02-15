/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/


var player_ = require("./player.js"),
    legacy_ = require("../util/legacy.js"),
    subject_ = require("../util/subject.js");

var legacy = new legacy_.Legacy();

exports.PlayerFactory = function(gameEngine) {
    this.gameEngine = gameEngine;

    this.unitFactory = null;
}

exports.PlayerFactory.prototype = {

    create: function(id, name) {
        var myPlayer = new player_.Player();
        myPlayer.name = name;
        myPlayer.id = id;

        // For testing purpose
        myPlayer.units[0] = this.unitFactory.create("alpha",myPlayer);
    myPlayer.play = true;

        legacy.inherits(new subject_.Subject(), myPlayer);
        myPlayer.addObserver(this.gameEngine);

        return myPlayer;
    },

    createFromUser: function(user) {
        return this.create(user.id, user.login);
    },

}
