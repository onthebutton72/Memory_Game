// Array of cards
var cards = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

// Variable to count the number of moves.
var moves = 0;

// Variable used in clock function that gives total seconds elapsed.
var totalSeconds = 0;

// First click of the game.
var startClick = 0;

// Variable used in clock function that sets the interval of timer by 1 second.
// var interval = setInterval(clock, 1000);

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
  })
}

//Function to remove stars based on move count.
function removeStars(){
  // Variable to get elements under id=myStars.
  var list = document.getElementById("myStars");

  // Variables for rating levels.
  var highStar = 12;
  var mediumStar = 15;
  var lowStar = 18;

  if (moves < highStar){
  }else if (moves === mediumStar){
    list.removeChild(list.firstChild);
  }else if (moves === lowStar){
    list.removeChild(list.firstChild);
  }else{
  }
}

//Function to count moves.
function countMoves(){
  moves = moves + 1;
  document.getElementById('moves').innerHTML = moves;
  if(moves == 1){
    var interval = setInterval(clock, 1000);
  }
}

// Function to check if all cards match => win game.
function allMatch(){
  if($('.unchosen').length == 0){
    // Hide the buttons and counters on index.html.
    $('#myModal').modal('show');
    $('#myButtons').hide();
    $('#myCounters').hide();
    $('#myTitle').hide();
    // Send counters to index.html with Id='final...'
    document.getElementById('finalMove').innerHTML = moves;
    document.getElementById('finalTime').innerHTML = clock();
    document.getElementById('finalStars').innerHTML = $('#myStars i').length;
    // stop the clock timer.
    clearInterval(interval);
  }
}

// Function to match two cards and if match, make them disappear.
function matchCards(){
  // Variable to choose two cards in a move.
  var choices = 2;

  // Variable to hide card by setting to opacity zero.
  var hideCard = 0;

  if($('.chosen').length == choices){
    countMoves();
    removeStars();
    if ($('.chosen').first().data('card') == $('.chosen').last().data('card')){
      // Make chosen cards disappear.
      $('.chosen').each(function(){
        $(this).animate({opacity: hideCard}).removeClass('unchosen');
      });
      $('.chosen').each(function(){
        $(this).removeClass('chosen');
      });
//      clearInterval(clock);
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
  // Variable to identify all numbers below 10.
  var singleDigit = 10;

  // Variable to add a number in front of single digit numbers.
  var addZero = 0;

  if (timeDisplay < singleDigit) {
    timeDisplay = '' + addZero + '' + timeDisplay;
  }
  return timeDisplay;
}

// Function for game timer
function clock() {
  totalSeconds++;

  //Variables for hours, minutes and seconds calculated.
  var hours = Math.floor(totalSeconds /3600);
  var minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  var seconds = totalSeconds - (hours * 3600 + minutes * 60);

  // Send clock timer data to html id=finalTime.
  var finalTime = document.getElementById('timer').innerHTML = addZero(hours)
  + ':' + addZero(minutes) + ':' + addZero(seconds);

  return finalTime;
}

// Run the methods.
function main(){
  shuffle(cards);
  mapToCards();
  onClick();
  }

main()
