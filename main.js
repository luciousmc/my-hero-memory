$(document).ready(startApp);

function startApp(){
    var dynamicArea = $('.game-area');

    // DYNAMICALLY CREATE STAT INFO BOXES
    var attemptsDiv = $('.attempts');
    var playedDiv = $('.games-played');
    var accuracyDiv = $('.accuracy');
    var pAttempts = $('<p>').addClass('attemptNum');
    var pPlayed = $('<p>').addClass('playedNum');
    var pAccuracy = $('<p>').addClass('accuracyNum');


    //append games played counter
    pPlayed.text(gamesPlayed);
    playedDiv.append(pPlayed);

    //append attempts counter
    pAttempts.text(attempts);
    attemptsDiv.append(pAttempts);

    //append accuracy percentage counter
    pAccuracy.text(accuracy);
    accuracyDiv.append(pAccuracy);

    // RESET BUTTON CLICK HANDLER
    $('button.reset').on('click', function(){
        updateGameNumber();
        resetGame(dynamicArea);
    });

    // CARD CLICK HANDLER
    dynamicArea.on('click', '.card', function(event){
        updateClicks();
        updateAttempt();
        var cardBack = $(event.currentTarget.lastChild);

        if (firstCard === null){
            cardBack.toggleClass('back').addClass('first');
            firstCard = $(event.currentTarget.firstChild);
        } else {
            cardBack.toggleClass('back');
            secondCard = $(event.currentTarget.firstChild);

            if (firstCard.attr('class') === secondCard.attr('class')){
                triggerMatch(firstCard, secondCard);
            } else {
                dynamicArea.off('click', '.back');
                var prevCard = $('.first');

                setTimeout(function () {
                    cardBack.toggleClass('back');
                    prevCard.toggleClass('back').removeClass('first');
                    firstCard = null;
                    secondCard = null;
                    // dynamicArea.on('click', '.back');
                }, 1000);
            }
        }
    });
    dealCards(dynamicArea);
    updateAttempt();
    updateAccuracy();
}

var firstCard = null;
var secondCard = null;

//STATS
var gamesPlayed = 0;
var clicks = 0;
var attempts = 0;
var matchedCards = 0;
var accuracy = 0;

function triggerMatch(first, second){
    firstCard.addClass('matched').on('click', function(){ return false });
    secondCard.addClass('matched').on('click', function(){ return false });
    firstCard = null;
    secondCard = null;
    matchedCards += 1;
    updateAccuracy();
    if (matchedCards === 9){

    }

}
function updateGameNumber(){
    var playedBox =  $('.playedNum');

    gamesPlayed++;
    playedBox.text(gamesPlayed);
}
function updateClicks(){
    clicks += 1;
}
function updateAttempt(){
    var attemptBox = $('.attemptNum');
    if (clicks < 2){
        attemptBox.text(0);
    }
    attempts = Math.round(clicks / 2);
    attemptBox.text(attempts)
}
function updateAccuracy(){
    var accuracyBox =  $('.accuracyNum');

    if (matchedCards < 1){
       accuracyBox.text(accuracy + '%');
    } else {
        accuracy = Math.floor((matchedCards / attempts) * 100);
        accuracyBox.text(accuracy + '%');
    }
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

function resetGame(gameBoard){
    var container = $('.card-container');

    clicks = 0;
    attempts = 0;
    updateAttempt();
    matchedCards = 0;
    accuracy = 0;
    updateAccuracy();

    container.remove();
    dealCards(gameBoard);
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
        name: 'allmight-weak',
        imgSrc: 'images/pop_allmight_weak.jpg',
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

