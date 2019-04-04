$(document).ready(startApp);

function startApp(){
    var dynamicArea = $('.game-area');

    dynamicArea.on('click', '.card', function(event){
    $(event.currentTarget.lastChild).toggleClass('back');
    
    });
    dealCards(dynamicArea);
}

function createCard(name){
    var cardContainer = $('<div>').addClass('card-container');
    var card = $('<div>').addClass('card');
    var face = $('<div>').addClass(name);
    var back = $('<div>').addClass('back');

    card.append(face).append(back);
    cardContainer.append(card);

    return cardContainer;
}

function dealCards(gameBoard) {
    var deck = [{
        name: 'allmight',
        imgSrc: 'images/pop_allmight.jpg',
        amount: 0
    }, {
        name: 'deku',
        imgSrc: 'images/pop_deku.jpg',
        amount: 0
    }, {
        name: 'katsuki',
        imgSrc: 'images/pop_katsuki.png',
        amount: 0
    }, {
        name: 'endeavor',
        imgSrc: 'images/pop_endeavor',
        amount: 0
    }, {
        name: 'ochaco',
        imgSrc: 'images/pop_ochaco.jpg',
        amount: 0
    }, {
        name: 'shota',
        imgSrc: 'images/pop_shota.jpg',
        amount: 0
    }, {
        name: 'shota-glasses',
        imgSrc: 'images/pop_shota_glasses.jpg',
        amount: 0
    }, {
        name: 'todoroki',
        imgSrc: 'images/pop_todoroki.jpg',
        amount: 0
    }, {
        name: 'tsuyu',
        imgSrc: 'images/pop_tsuyu',
        amount: 0
    }];

    var newArray = [];
    var cards = 0;

    while (cards < 18){
        var randomIndex = randomize(deck);
        var charName = deck[randomIndex].name;
        var count = deck[randomIndex].amount;

        if (deck[randomIndex].amount < 2) {
            newArray.push(charName);
            deck[randomIndex].amount += 1;

            var newCard = createCard(charName);
            gameBoard.append(newCard);
            cards++;
        }
    }
    return newArray;
}

function randomize(array){
    var randomNum = Math.floor(Math.random() * array.length);
    return randomNum;
}

