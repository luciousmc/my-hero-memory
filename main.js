$(window).resize(responsiveLayout);

$(document).ready(startApp);

function startApp(){
    responsiveLayout();
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
function responsiveLayout(){
    if ($(window).width() < 1000){
        $('.game-info').insertAfter('.game-container');
    }
    else {
        $('.game-container').insertAfter('.game-info');
    }
}