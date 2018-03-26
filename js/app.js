// Array of cards
var cards = [1,1,2,2,3,3,4,4,5,5,6,6];
var matchArray = [];
var moves = 0;
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
  var time = new Date()
  var hours = time.getHours()
  var minutes = time.getMinutes()
  var seconds = time.getSeconds()
  var timeOfDay = hours >= 12 ? 'PM' : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12;

  document.querySelectorAll('.clock')[0].innerHTML = addZero(hours) + ":"
  + addZero(minutes) + ":" + addZero(seconds) + ' ' + timeOfDay;
}

// Run the methods
shuffle(cards);
mapToCards();
onClick();
setInterval(clock, 1000);
