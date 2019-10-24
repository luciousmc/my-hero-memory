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
    //Initiate new game and fill stats
    const Game = new MemoryMatch( domElements );

    Game.dealCards(domElements.dynamicArea);
    Game.updateAttempt();
    Game.updateAccuracy();
    Game.addEventHandlers();
}