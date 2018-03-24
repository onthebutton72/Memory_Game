// Array of cards
var cards = [1,1,2,2,3,3,4,4,5,5,6,6];
var matchArray = [];

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

// Function to check if all cards match => win game.
function allMatch(){
  if($('.unchosen').length == 0){
    $('.container').html('<h1>You Won the Game!</h1>');
  }
}

// Function to match two cards and if match, make them disappear.
function matchCards(){
  var choices = 2;
  var hideCard = 0;
  if($('.chosen').length == choices){
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

// Run the methods
shuffle(cards);
mapToCards();
onClick();
