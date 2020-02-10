'use strict';

var OFFERS_NUMBER = 8;
var PROPERTIES_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

/*
var PROPERTIES_TYPE_RU = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
*/

var AMOUNT = {
  ROOM: {
    MAX: 100,
    MIN: 1
  },
  GUEST: {
    MAX: 3,
    MIN: 1
  }
};

var MAP_WIDTH = 1200;
var MAP_TOP_Y = 130;
var MAP_BOTTOM_Y = 630;

var CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

var CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

/*
var FEATURES_RU = {
  wifi: 'Беспроводной интернет',
  dishwasher: 'Посудомойка',
  parking: 'Парковка',
  washer: 'Стиральная машина',
  elevator: 'Лифт',
  conditioner: 'Кондиционер',
};
*/

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var PIN_OFFSET_X = -25;
var PIN_OFFSET_Y = -35;

// var LENGTH_OF_SLICE = 2;
var PX_CUT = -2;

var ENTER_KEY = 'Enter';

var VALIDITY_TEXT = {
  1: '1 комната — «для 1 гостя»',
  2: '2 комнаты — «для 2 гостей» или «для 1 гостя»',
  3: '3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»',
  100: AMOUNT.ROOM.MAX + ' комнат — «не для гостей»'
};

var map = document.querySelector('.map');
var mapPin = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
// var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
// var mapFiltersContainer = map.querySelector('.map__filters-container');
var notice = document.querySelector('.notice');
var adForm = document.querySelector('.ad-form');
var fieldsets = notice.querySelectorAll('fieldset');
var inputs = adForm.querySelectorAll('input');
var selects = adForm.querySelectorAll('select');
var mapPinMain = document.querySelector('.map__pin--main');
var mapFilters = document.querySelector('.map__filters');
var address = document.querySelector('#address');
var numberOfRoomsSelect = notice.querySelector('#room_number');
var numberOfGuestsSelect = notice.querySelector('#capacity');
var submitButton = notice.querySelector('.ad-form__submit');
var roomsNumber = numberOfRoomsSelect.value;
var guestsNumber = numberOfGuestsSelect.value;


var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};


var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateFeatures = function () {
  var numberOfFeatures = getRandomIntInclusive(1, FEATURES.length);
  var features = [];
  var feature = getRandomElement(FEATURES);

  for (var i = 0; i < numberOfFeatures; i++) {

    while (features.includes(feature)) {
      feature = getRandomElement(FEATURES);
    }

    features[i] = feature;
  }

  return features;
};

var createOffer = function (offerNumber) {
  var locationX = getRandomIntInclusive(0, MAP_WIDTH);
  var locationY = getRandomIntInclusive(MAP_TOP_Y, MAP_BOTTOM_Y);
  var offer = {
    author: {
      avatar: 'img/avatars/user0' + (offerNumber + 1) + '.png'
    },
    offer: {
      title: 'строка, заголовок предложения',
      address: locationX + ', ' + locationY,
      price: 1000,
      type: getRandomElement(PROPERTIES_TYPE),
      rooms: getRandomIntInclusive(AMOUNT.ROOM.MIN, AMOUNT.ROOM.MAX),
      guests: getRandomIntInclusive(AMOUNT.GUEST.MIN, AMOUNT.GUEST.MAX),
      checkin: getRandomElement(CHECKIN_TIME),
      checkout: getRandomElement(CHECKOUT_TIME),
      features: generateFeatures(),
      description: 'строка с описанием',
      photos: PHOTOS
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return offer;
};

var getListOfOffers = function () {
  var offers = [];
  for (var i = 0; i < OFFERS_NUMBER; i++) {
    offers[i] = createOffer(i);
  }
  return offers;
};

var activateMap = function (element) {
  element.classList.remove('map--faded');
  var offers = getListOfOffers();
  renderPins(offers);
};



var activateMapFilters = function (element) {
  element.classList.remove('ad-form--disabled');
};

var createPin = function (offer) {
  var pin = pinTemplate.cloneNode(true);
  var pinX = offer.location.x + PIN_OFFSET_X;
  var pinY = offer.location.y + PIN_OFFSET_Y;
  pin.style = 'left: ' + pinX + 'px; top: ' + pinY + 'px;';

  var pinAvatar = pin.querySelector('img');
  pinAvatar.src = offer.author.avatar;
  pinAvatar.alt = offer.offer.title;

  return pin;
};

var renderPins = function (offers) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < offers.length; j++) {
    fragment.appendChild(createPin(offers[j]));
  }
  mapPin.appendChild(fragment);
};

/*
var translateArray = function (words, dictionary) {
  var translatedString = '';

  for (var i = 0; i < words.length; i++) {
    translatedString += dictionary[words[i]] + ', ';
  }
  return translatedString.slice(0, -LENGTH_OF_SLICE);
};
*/

/*
var getEndingsRooms = function (number) {
  if (number === 1) {
    return 'a';
  }
  return (number >= 2 && number <= 4) ? 'ы' : '';
};

var getEndingsGuests = function (number) {
  return number === 1 ? 'я' : 'ей';
};


var generateText = function (rooms, guests) {
  var endingWordRooms = getEndingsRooms(rooms);
  var endingWordGuests = getEndingsGuests(guests);

  var text = rooms + ' комнат' + endingWordRooms + ' для ' + guests + ' гост' + endingWordGuests;

  return text;
};

var generatePhotos = function (photos) {
  var imgTags = '';

  for (var i = 0; i < photos.length; i++) {
    imgTags += '<img src="' + photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  }

  return imgTags;
};
*/


/*
  var createCard = function (advertisement) {
  var card = cardTemplate.cloneNode(true);

  var title = card.querySelector('.popup__title');
  title.textContent = advertisement.offer.title;

  var address = card.querySelector('.popup__text--address');
  address.textContent = advertisement.offer.address;

  var price = card.querySelector('.popup__text--price');
  price.textContent = advertisement.offer.price + ' ₽/ночь';

  var type = card.querySelector('.popup__type');

  // type.textContent = getPropertiesType(advertisement.offer.type);
  var offerType = [];
  offerType.push(advertisement.offer.type);
  type.textContent = translateArray(offerType, PROPERTIES_TYPE_RU);

  var capacity = card.querySelector('.popup__text--capacity');
  var textRoomsAndGuests = generateText(advertisement.offer.rooms, advertisement.offer.guests);
  capacity.textContent = textRoomsAndGuests;

  var time = card.querySelector('.popup__text--time');
  time.textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;

  var features = card.querySelector('.popup__features');
  features.textContent = translateArray(advertisement.offer.features, FEATURES_RU);

  var description = card.querySelector('.popup__description');
  description.textContent = advertisement.offer.description;

  var photos = card.querySelector('.popup__photos');
  photos.innerHTML = generatePhotos(advertisement.offer.photos);

  var avatar = card.querySelector('.popup__avatar');
  avatar.src = advertisement.author.avatar;

  return card;
};
*/

/*
  var renderCard = function (card) {
  map.insertBefore(card, mapFiltersContainer);
};
*/

/*
var card = createCard(offers[0]);
renderCard(card);
*/

var disableForm = function () {
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].setAttribute('disabled', 'disabled');
  }
  for (i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute('disabled', 'disabled');
  }
  for (i = 0; i < selects.length; i++) {
    selects[i].setAttribute('disabled', 'disabled');
  }
  mapFilters.setAttribute('disabled', 'disabled');
};

var activateForm = function () {
  adForm.classList.remove('ad-form--disabled');
  for (var i = 0; i < fieldsets.length; i++) {
    fieldsets[i].removeAttribute('disabled');
  }
  for (i = 0; i < inputs.length; i++) {
    inputs[i].removeAttribute('disabled');
  }
  for (i = 0; i < selects.length; i++) {
    selects[i].removeAttribute('disabled');
  }
  mapFilters.removeAttribute('disabled');
};


var setAddress = function (x, y) {
  address.value = x + ', ' + y;
};

var activatePage = function () {
  activateMap(map);
  activateForm();
};

var getPinCoordinateX = function () {
  return mapPinMain.style.left.slice(0, PX_CUT) - PIN_OFFSET_Y;
};

var getPinCoordinateY = function () {
  return mapPinMain.style.top.slice(0, PX_CUT) - PIN_OFFSET_X;
};

var validateRoomsCapacity = function (rooms, guests) {

  if ((guests > rooms && rooms !== AMOUNT.ROOM.MAX) || (rooms !== AMOUNT.ROOM.MAX && guests === 0) || (rooms === 100 && guests > 0)) {
    numberOfGuestsSelect.setCustomValidity(VALIDITY_TEXT[rooms]);
  } else {
    numberOfGuestsSelect.setCustomValidity('');
  }
};

disableForm();

mapPinMain.addEventListener('mousedown', function (e) {
  if (e.button === 0) {
    activatePage();

    var x = getPinCoordinateX();
    var y = getPinCoordinateY();

    setAddress(x, y);
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePage();

    var x = getPinCoordinateX();
    var y = getPinCoordinateY();

    setAddress(x, y);
  }
});

numberOfRoomsSelect.addEventListener('change', function () {
  roomsNumber = parseInt(numberOfRoomsSelect.value, 10);
});

numberOfGuestsSelect.addEventListener('change', function () {
  guestsNumber = parseInt(numberOfGuestsSelect.value, 10);
  numberOfGuestsSelect.setCustomValidity('');
});


submitButton.addEventListener('click', function () {
  validateRoomsCapacity(roomsNumber, guestsNumber);
});
