/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var unit_ = require("./unit.js"),
    legacy_ = require("../util/legacy.js"),
    subject_ = require("../util/subject.js");

var legacy = new legacy_.Legacy();


exports.UnitFactory = function(gameEngine) {
    this.gameEngine = gameEngine;

    this.currentId = 0;
    this.types = [];
}

exports.UnitFactory.prototype = {

    create: function(type, owner, cell) {

        var myUnit = new unit_.Unit();

        myUnit.id = this.currentId;
        myUnit.type = type;
        myUnit.owner = owner;
        myUnit.cell = cell;

        if (this.types[type] == null) {
            console.log("le type de l'unité que vous voulez créer n'existe pas");
        }

        else {

            myUnit.health = this.types[type].health;
            myUnit.attack = this.types[type].attack;
            myUnit.defense = this.types[type].defense;
            myUnit.view = this.types[type].view;
            myUnit.movement = this.types[type].movement;
            myUnit.range = this.types[type].range;
            myUnit.properties = this.types[type].properties;

        }
        // On doit initialiser l'emplacement par défaut de l'unite sur la carte en fonction du tour du joueur,
        // Il faut pas oublié de tester le type de case
        // var xInit = ..turn
        // var yInt = ..
        //myUnit.cell = owner.turn...;

        legacy.inherits(new subject_.Subject(), myUnit);
        myUnit.addObserver(this.gameEngine);

        this.currentId ++;
        return myUnit;
    },

    addUnitType : function(type, health, attack, defense, view, movement, range, properties) {

        var obj = {

            "health"    : health,
            "attack"    : attack,
            "defense"   : defense,
            "view"      : view,
            "movement"  : movement,
            "range"     : range,
            "properties": properties
        };

        if ( this.types[type] != null ) {
            console.log("Erreur : le type de l'unité existe déjà");
        }

        else {
            this.types[type] = obj;
        }
    },
}
