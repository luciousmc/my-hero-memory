class MemoryMatch {
    constructor( elementsObj ){
    this.domElements = elementsObj;
    this.charData = [{
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
    this.statsObj = {};
    this.firstCard = null;
    this.secondCard = null;
    this.clickEnabled = true;
    this.gamesPlayed = 0;
    this.clicks = 0;
    this.attempts = 0;
    this.matchedCards = 0;
    this.accuracy = 0;

    //append games played counter
    this.domElements.pPlayed.text(this.gamesPlayed);
    this.domElements.playedDiv.append(this.domElements.pPlayed);

    //append attempts counter
    this.domElements.pAttempts.text(this.attempts);
    this.domElements.attemptsDiv.append(this.domElements.pAttempts);

    //append accuracy percentage counter
    this.domElements.pAccuracy.text(this.accuracy);
    this.domElements.accuracyDiv.append(this.domElements.pAccuracy);
    }
    addEventHandlers(){
        this.addResetButtonClickHandler();
        this.addCardClickHandler();
        this.addModalCloseHandler();
    }
    addResetButtonClickHandler(){
        $('button.reset').on('click', ()=>{
            if (this.clicks < 2) return;
            this.resetGame(this.domElements.dynamicArea);
        });
    }
    addModalCloseHandler(){
        $('.close-modal').on('click', ()=>{
            $('#winModal').fadeOut(300);
        });
    }
    addCardClickHandler(){
        this.domElements.dynamicArea.on('click', '.card', (event)=>{
            if (this.clickEnabled === false){
                return;
            }
            let cardBack = $(event.currentTarget.lastChild);
    
            if (this.firstCard === null){
                this.updateClicks();
                cardBack.toggleClass('back').addClass('first');
                this.firstCard = $(event.currentTarget.firstChild);
            } else {
                if (cardBack.hasClass('first')) {
                    return;
                }
                this.updateClicks();
                this.updateAttempt();
                cardBack.toggleClass('back');
                this.secondCard = $(event.currentTarget.firstChild);
    
                if (this.firstCard.attr('class') === this.secondCard.attr('class')){
                    this.triggerMatch(this.firstCard, this.secondCard);
                } else {
                    this.clickEnabled = false;
                    let prevCard = $('.first');
    
                    setTimeout( ()=> {
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
    randomize(array){
        const randomNum = Math.floor(Math.random() * array.length);
        return randomNum;
    }
    createCard(name){
        let cardContainer = $('<div>').addClass('card-container');
        let card = $('<div>').addClass('card');
        let face = $('<div>').addClass(name);
        let back = $('<div>').addClass('back');
    
        card.append(face).append(back);
        cardContainer.append(card);
    
        return cardContainer;
    }
    dealCards(gameBoard){
        let gameDeck = [...this.charData, ...this.charData];
        
        for (let char = gameDeck.length - 1; char >= 0; char--){
            let randomIndex = this.randomize(gameDeck);
            let charCard = gameDeck.splice(randomIndex, 1);
            let newCard = this.createCard(charCard[0].name);
            gameBoard.append(newCard);
        }
    }
    updateGameNumber(){
        let playedBox =  $('.playedNum');
    
        this.gamesPlayed++;
        playedBox.text(this.gamesPlayed);
    }
    updateClicks(){
        this.clicks += 1;
    }
    updateAttempt(){
        let attemptBox = $('.attemptNum');
        if (this.clicks < 2){
            attemptBox.text(0);
        }
        this.attempts = Math.round(this.clicks / 2);
        attemptBox.text(this.attempts)
    }
    updateAccuracy(){
        let accuracyBox =  $('.accuracyNum');
    
        if (this.matchedCards < 1){
            accuracyBox.text(this.accuracy + '%');
        } else {
            this.accuracy = Math.floor((this.matchedCards / this.attempts) * 100);
            accuracyBox.text(this.accuracy + '%');
        }
    }
    resetGame(gameBoard){
        let container = $('.card-container');
        this.updateGameNumber();
    
        this.statsObj['game ' + this.gamesPlayed] = {
            attempts: this.attempts,
            accuracy: this.accuracy + '%',
            matched: this.matchedCards
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
    displayWinModal(){
        $('#winModal').fadeIn();
    }
    triggerMatch(first, second){
        this.firstCard.addClass('matched').on('click', function(){ return false });
        this.secondCard.addClass('matched').on('click', function(){ return false });
        this.firstCard = null;
        this.secondCard = null;
        this.matchedCards += 1;
        this.updateAccuracy();
        if (this.matchedCards === 9){
            this.displayWinModal();
        }
    }
}