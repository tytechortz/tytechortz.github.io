

var cardsArrayEasy = ['1','1','2','2','3','3','4','4','5','5','6','6','7','7','8','8'];
var cardsArrayHard = ['1','1','2','2','3','3','4','4','5','5','6','6','7','7','8','8','9','9','10','10','11','11','12','12'];
var cardsArray = [];
var i = 0;
var clicks = 0;
var tries = 0;
// var best = localStorage.getItem(highScore[0]);
// console.log(best);
console.log(highScore[0]);
var z;

//Fisher-Yates shuffle
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

$(".btn-primary").click(function() {
    z = 4;
    cardsArray = cardsArrayEasy;
    //console.log(cardsArray);
    cardsArray = shuffle(cardsArray);
    //console.log(cardsArray);
    startGame();
});
console.log(cardsArray);


$(".btn-secondary").click(function() {
    z = 6;
    cardsArray = cardsArrayHard;
    //console.log(cardsArray);
    cardsArray = shuffle(cardsArray);
    //console.log(cardsArray); 
    startGame(); 
});

var startGame = function() {
    var matches = 0;
    //console.log(matches);
    for(let y = 0; y < z; y++){
        $('.game').append(`<div class='game-column game-column-${y}'></div>`)
        for(let x = 0; x < 4; x++){
            //console.log(`number: ${i} random:${cardsArray[i]}`);
            const gameSquare = $(`<div id='square-${y}-${x}'>${cardsArray[i]}</div>`)
            gameSquare.addClass('square')
            gameSquare.addClass(`square-${y}-${x}`)
            gameSquare.attr('x', x)
            gameSquare.attr('y', y)
        
            $(`.game-column-${y}`).append(gameSquare)
            // console.log(gameSquare.attr('x'));
            // console.log(gameSquare.attr('y'));


            gameSquare.click(function() {
                var highScore = [50];
                clicks += 1/2;
                tries = Math.floor(clicks);
                $('#tries').text(tries);
                if (tries <= highScore[0]) {
                    //highScore.shift();
                    highScore.unshift(tries);
                    console.log(highScore[0]);
                    
                    localStorage.setItem('highScore', highScore[0]);
                    
                }
                

                var ems = $('.selected')
                if (ems.length == 2) {
                    return
                }   
                $(`#square-${y}-${x}`).css('background-color', 'black');
                $(`#square-${y}-${x}`).css('color', 'white');
                $(`#square-${y}-${x}`).addClass('selected');
            
                ems = $('.selected')
                //console.log(ems)
                if (ems.length == 2) {
                    var em1 = $(ems[0])
                    var em2 = $(ems[1])
                    //console.log(em1, em2)
                    if (em1.text() != em2.text()) {
                        window.setTimeout(function() {
                            em1.removeClass('selected');
                            em2.removeClass('selected');
                            em1.css('color', 'dodgerblue')
                            em1.css('background-color', 'dodgerblue')
                            em2.css('color', 'dodgerblue')
                            em2.css('background-color', 'dodgerblue');
                    }, 2000)
                    } else {
                        matches ++;
                        console.log(matches);
                        em1.removeClass('selected');
                        em2.removeClass('selected');
                        em1.css('color', 'white');
                        em1.css('background-color', 'red');
                        em2.css('color', 'white');
                        em2.css('background-color', 'red');
                        em1.addClass('winner')
                        em2.addClass('winner')
                        //console.log(z);
                        if((matches / z) == 2) {
                            window.setTimeout(function() {
                            alert("Righteous!");
                            document.location.reload();
                            }, 1000)
                        }
                    }
                }
            })
            i++;
        } 
    }
}
localStorage.getItem('highScore');
$('#highScore').text(localStorage.getItem('highScore'));
