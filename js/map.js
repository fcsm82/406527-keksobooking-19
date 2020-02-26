'use strict';

(function () {

  var WIDTH = 1200;
  var TOP = 130;
  var BOTTOM = 630;

  var limit = {
    TOP: TOP - window.pin.offset.MAIN_PIN.Y,
    RIGHT: WIDTH - window.pin.offset.MAIN_PIN.X,
    BOTTOM: BOTTOM - window.pin.offset.MAIN_PIN.Y,
    LEFT: -window.pin.offset.MAIN_PIN.X
  };

  var map = document.querySelector('.map');

  var activate = function () {
    map.classList.remove('map--faded');
  };

  var disable = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.pin.remove(pins);
    window.pin.resetMainPin();
    map.classList.add('map--faded');
  };

  window.map = {
    limit: limit,
    activate: activate,
    disable: disable
  };
})();
