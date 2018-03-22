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
// elements (data-card) and display the number assigned to the card inside a
// new paragraph.
function onClick(){
  $('.card').click(function(){
    $(this).html('<p>' + $(this).data('card') + '</p>');
    var cardSelected = ($(this).data('card'));
    // Check to see if array is less than 2 elements in length.  If true then
    // append the array with the card value.
    if(matchArray.length < 2){
      matchArray.push (cardSelected);
      }
    console.log (matchArray);
    // Check to see if the first card value matches the second card value.
    if(matchArray[0] == matchArray[1]){
      console.log("match");
    }else{
      console.log("no match");
    }
  });
}

// Run the methods
shuffle(cards);
mapToCards();
onClick();
