class MemoryMatch {
    constructor( elementsObj ){
    this.domElements = elementsObj;
    this.statsObj = {};
    this.firstCard = null;
    this.secondCard = null;
    this.clickEnabled = true;
    this.gamesPlayed = 0;
    this.clicks = 0;
    this.attempts = 0;
    this.matchedCards = 0;
    this.accuracy = 0;
    }
    addCardClickHandler(){
        this.domElements.dynamicArea.on('click', '.card', function(event){
            if (this.clickEnabled === false){
                return;
            }
            let cardBack = $(event.currentTarget.lastChild);
    
            if (firstCard === null){
                this.updateClicks();
                cardBack.toggleClass('back').addClass('first');
                firstCard = $(event.currentTarget.firstChild);
            } else {
                if (cardBack.hasClass('first')) {
                    return;
                }
                this.updateClicks();
                this.updateAttempt();
                cardBack.toggleClass('back');
                secondCard = $(event.currentTarget.firstChild);
    
                if (firstCard.attr('class') === secondCard.attr('class')){
                    this.triggerMatch(firstCard, secondCard);
                } else {
                    this.clickEnabled = false;
                    let prevCard = $('.first');
    
                    setTimeout(function () {
                        cardBack.toggleClass('back');
                        prevCard.toggleClass('back').removeClass('first');
                        this.firstCard = null;
                        this.secondCard = null;
                        this.clickEnabled = true;
                    }, 1000);
                }
            }
        })
    }
    
    dealCards(gameBoard) {
        const deck = [{
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
    
        const newArray = [];
        let cards = 0;
    
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
    updateGameNumber(){
        let playedBox =  $('.playedNum');
    
        this.gamesPlayed++;
        playedBox.text(gamesPlayed);
    }
    updateClicks(){
        this.clicks += 1;
    }
    updateAttempt(){
        var attemptBox = $('.attemptNum');
        if (this.clicks < 2){
            attemptBox.text(0);
        }
        attempts = Math.round(clicks / 2);
        attemptBox.text(attempts)
    }
    updateAccuracy(){
        let accuracyBox =  $('.accuracyNum');
    
        if (this.matchedCards < 1){
            accuracyBox.text(accuracy + '%');
        } else {
            accuracy = Math.floor((matchedCards / attempts) * 100);
            accuracyBox.text(accuracy + '%');
        }
    }
    resetGame(gameBoard){
        let container = $('.card-container');
        this.updateGameNumber();
    
        this.statsObj['game ' + gamesPlayed] = {
            attempts: attempts,
            accuracy: accuracy + '%',
            matched: matchedCards
        };
        this.clicks = 0;
        this.attempts = 0;
        this.updateAttempt();
        this.matchedCards = 0;
        this.accuracy = 0;
        this.updateAccuracy();
    
        container.remove();
        this.dealCards(this.domElements.dynamicArea);
    }
    triggerMatch(first, second){
        this.firstCard.addClass('matched').on('click', function(){ return false });
        this.secondCard.addClass('matched').on('click', function(){ return false });
        this.firstCard = null;
        this.secondCard = null;
        this.matchedCards += 1;
        this.updateAccuracy();
        if (this.matchedCards === 9){

        }
    }
}