// Array of cards
var cards = [1,1,2,2,3,3,4,4,5,5,6,6];
var matchArray = [];
var moves = 0;
var totalSeconds = 0

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(cards) {
    var currentIndex = cards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
    return cards;
}

// Function to append a new attribute called data-card, which is the random
// number generated from the shuffle function, to each card in the container.
function mapToCards(){
  $('.card').each(function(index){
    $(this).attr('data-card', cards[index]);
  });
}

// Function to get the HTML contents of the first element in the set of matched
// elements (data-card) and display the number assigned to the card.
function onClick(){
  $('.card').click(function(){
    $(this).html('<p>' + $(this).data('card') + '</p>').addClass('chosen');
    matchCards();
  });
}

//Function to count moves.
function countMoves(){
  moves = moves + 1;
  document.getElementById('moves').innerHTML = moves;
}

// Function to check if all cards match => win game.
function allMatch(){
  if($('.unchosen').length == 0){
    $('#myModal').modal('show');
    $('#myButtons').hide();
    $('#myTitle').hide();
    document.getElementById('finalMove').innerHTML = moves;
    document.getElementById('finalTime').innerHTML = clock();
  }
}

// Function to match two cards and if match, make them disappear.
function matchCards(){
  var choices = 2;
  var hideCard = 0;
  if($('.chosen').length == choices){
    countMoves();
    if ($('.chosen').first().data('card') == $('.chosen').last().data('card')){
      // Make chosen cards disappear.
      $('.chosen').each(function(){
        $(this).animate({opacity: hideCard}).removeClass('unchosen');
      });
      $('.chosen').each(function(){
        $(this).removeClass('chosen');
      });
      allMatch();
    }else{
      // Flip cards that do not match.
      setTimeout(function(){
        $('.chosen').each(function(){
          $(this).html('').removeClass('chosen');
        })
      }, 1000);
    }
  }
}

// Function to restart the game.
function restartGame(){
  location.reload();
}

// Function to add a leading zero to the time when necessary.
function addZero(timeDisplay) {
  if (timeDisplay < 10) {
    timeDisplay = '0' + timeDisplay
  }
  return timeDisplay;
}

// Function for game timer
function clock() {
  totalSeconds = totalSeconds + 1;
  var hours = Math.floor(totalSeconds /3600);
  var minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  var seconds = totalSeconds - (hours * 3600 + minutes * 60);

  var finalTime = document.getElementById('timer').innerHTML = addZero(hours)
  + ':' + addZero(minutes) + ':' + addZero(seconds);
  return finalTime;
}

function main(){
// Run the methods
  shuffle(cards);
  mapToCards();
  onClick();
  setInterval(clock, 1000);
}

main()
