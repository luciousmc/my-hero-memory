class MemoryMatch {
  constructor( elementsObj ){
    this.domElements = elementsObj;
    this.charData = [{
      name: 'allmight',
      imgSrc: 'images/pop_allmight.jpg',
    }, {
      name: 'deku',
      imgSrc: 'images/pop_deku.jpg',
    }, {
      name: 'katsuki',
      imgSrc: 'images/pop_katsuki.png',
    }, {
      name: 'endeavor',
      imgSrc: 'images/pop_endeavor.jpg',
    }, {
      name: 'ochaco',
      imgSrc: 'images/pop_ochaco.jpg',
    }, {
      name: 'allmight-weak',
      imgSrc: 'images/pop_allmight_weak.jpg',
    }, {
      name: 'shota-glasses',
      imgSrc: 'images/pop_shota_glasses.jpg',
    }, {
      name: 'todoroki',
      imgSrc: 'images/pop_todoroki.jpg',
    }, {
      name: 'tsuyu',
      imgSrc: 'images/pop_tsuyu.jpg',
    }];

    // Sets initial variables for stats
    this.statsObj = {};
    this.firstCard = null;
    this.secondCard = null;
    this.clickEnabled = true;
    this.gamesPlayed = 0;
    this.clicks = 0;
    this.attempts = 0;
    this.matchedCards = 0;
    this.accuracy = 0;

    //appends games played counter
    this.domElements.pPlayed.text(this.gamesPlayed);
    this.domElements.playedDiv.append(this.domElements.pPlayed);

    //appends attempts counter
    this.domElements.pAttempts.text(this.attempts);
    this.domElements.attemptsDiv.append(this.domElements.pAttempts);

    //appends accuracy percentage counter
    this.domElements.pAccuracy.text(this.accuracy);
    this.domElements.accuracyDiv.append(this.domElements.pAccuracy);
  }

  addEventHandlers(){
    this.addResetButtonClickHandler();
    this.addCardClickHandler();
    this.addModalCloseHandler();
  }

  // Click handler to reset the game. If the user has not attempted to make a match, do nothing
  addResetButtonClickHandler(){
    $('button.reset').on('click', ()=>{
      if (this.clicks < 2) return;
      this.resetGame(this.domElements.dynamicArea);
    });
  }

  // Click handler to close modal
  addModalCloseHandler(){
    $('.close-modal').on('click', ()=>{
      $('#winModal').fadeOut(300);
    });
  }
  addCardClickHandler(){

    // Adds click handler to the play area which delegate the event to the cards
    this.domElements.dynamicArea.on('click', '.card', (event)=>{

      // Does nothing if click is not enabled
      if (this.clickEnabled === false){
          return;

      // If the currently clicked card has already been matched, do nothing
      } else if (event.currentTarget.firstChild.className.includes('matched')){
        return;
      }

      // Assigns the element with card back image to a variable
      const cardBack = $(event.currentTarget.lastChild);
        
      // If 1st card has not been set, increases clicks by 1 and hide cardBack
      // Reveals the face card
      // Sets 1st card to the currently shown card
      if (this.firstCard === null){
        this.updateClicks();
        cardBack.toggleClass('back').addClass('first');
        this.firstCard = $(event.currentTarget.firstChild);
      } else {

        // If 1st card has been set and is the same card the user is clicking, do nothing
        if (cardBack.hasClass('first')) {
            return;
        }

        // Otherwise if user clicks another card, continue
        // Updates the clicks and attempts
        // Removes the cardBack, revealing the face card
        // Sets 2nd card the currently clicked card
        this.updateClicks();
        this.updateAttempt();
        cardBack.toggleClass('back');
        this.secondCard = $(event.currentTarget.firstChild);
        
        // Checks if the cards match
        // If they do trigger a match
        // IF they don't match, disable the click
        if (this.firstCard.attr('class') === this.secondCard.attr('class')){
          this.triggerMatch();
        } else {

          this.clickEnabled = false;
          const prevCard = $('.first');
          
          // Toggles the cardBack onto 1st and second card before re-enabling the click
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
  createCard(char){
    // Creates a container where the card will be placed
    const cardContainer = $('<div>').addClass('card-container');

    // Creates a div element with a class of "card"
    const card = $('<div>').addClass('card');

    // Creates the face card with a div element with the class of the characters name
    // Sets the background image to the image of the characer
    const face = $('<div>').addClass(char.name)
                        .css({ background: `url(${char.imgSrc}) #fff no-repeat center/contain` });

    // Creates the back face element with a div element
    const back = $('<div>').addClass('back');
    
    // Appends the face and back elements to the card element
    card.append(face).append(back);

    // Appends the card with its appended front and back to the card container
    cardContainer.append(card);
    
    // Returns the entire card container with the card
    return cardContainer;
  }
  dealCards(gameBoard){
    // Double the original deck of cards and set it to the deck variable
    const gameDeck = [...this.charData, ...this.charData];
    
    // Loops through the deck and randomly picks a card to be created and placed onto the DOM
    for (let char = gameDeck.length - 1; char >= 0; char--){
        const randomIndex = this.randomize(gameDeck);
        const charCard = gameDeck.splice(randomIndex, 1);
        const newCard = this.createCard(charCard[0]);
        gameBoard.append(newCard);
    }
  }

  // Increases the game counter by 1 when called
  updateGameNumber(){
    const playedBox =  $('.playedNum');

    this.gamesPlayed++;
    playedBox.text(this.gamesPlayed);
  }

  // Increases click value by 1
  updateClicks(){
    this.clicks += 1;
  }

  // Increases attempts every 2 clicks
  updateAttempt(){
    const attemptBox = $('.attemptNum');
    if (this.clicks < 2){
        attemptBox.text(0);
    }
    this.attempts = Math.round(this.clicks / 2);
    attemptBox.text(this.attempts)
  }

  // Updates the Accuracy stat by dividing amount of matched cards by the amount of attempts
  updateAccuracy(){
    const accuracyBox =  $('.accuracyNum');

    if (this.matchedCards < 1){
        accuracyBox.text(this.accuracy + '%');
    } else {
        this.accuracy = Math.floor((this.matchedCards / this.attempts) * 100);
        accuracyBox.text(this.accuracy + '%');
    }
  }

  // Resets all stats and variables to their default values
  // Removes the cards that are currently on the DOM
  // Deals a new set of cards to the DOM
  resetGame(gameBoard){
    const container = $('.card-container');
    this.updateGameNumber();

    this.clicks = 0;
    this.attempts = 0;
    this.updateAttempt();
    this.matchedCards = 0;
    this.accuracy = 0;
    this.updateAccuracy();

    container.remove();
    this.dealCards(this.domElements.dynamicArea);
    $('#winModal').fadeOut(300);
  }
  displayWinModal(){
    $('#winModal').fadeIn();
  }
  triggerMatch(){

    // Sets the cards to have the class of match and disables clicking on them any further
    this.firstCard.addClass('matched').on('click', function(){ return false });
    this.secondCard.addClass('matched').on('click', function(){ return false });

    // Resets 1st and 2nd card values and increases the matched card stat
    this.firstCard = null;
    this.secondCard = null;
    this.matchedCards += 1;

    // Updates the Accuracy stat
    this.updateAccuracy();

    // If all cards have been matched shows the win modal
    if (this.matchedCards === 9){
        this.displayWinModal();
    }
  }
}
