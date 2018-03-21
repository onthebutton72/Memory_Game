// Array of cards
var cards = [1,1,2,2,3,3,4,4,5,5,6,6];




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

function mapToCards(){
  $('.card').each(function(index){
    $(this).attr('data-card-value', cards[index]);
  });
}

// Shuffle deck
shuffle(cards);
console.log(cards);
mapToCards();
