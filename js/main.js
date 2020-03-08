$(document).ready(startApp);

function startApp(){
    const domElements = {
        dynamicArea: $('.game-area'),
        attemptsDiv: $('.attempts'),
        playedDiv: $('.games-played'),
        accuracyDiv: $('.accuracy'),
        pAttempts: $('<p>').addClass('attemptNum'),
        pPlayed: $('<p>').addClass('playedNum'),
        pAccuracy: $('<p>').addClass('accuracyNum')
    }
    //Instantiate new game and fill stats
    const Game = new MemoryMatch( domElements );

    // Deal cards and show default stats
    Game.dealCards(domElements.dynamicArea);
    Game.updateAttempt();
    Game.updateAccuracy();
    Game.addEventHandlers();
}