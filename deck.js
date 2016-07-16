function Card(symbol, value) {
    var self = this;
    this.symbol = symbol;
    this.value = value;
    this.true_value;

    if (value == 'j' || value == 'q' || value == 'k') {
        this.true_value = 10;
    } else if (value == 1) {
        this.true_value = 11;
    } else {
        this.true_value = value;
    }
}

function Deck() {
    var self = this;
    this.cards = [];
    console.log(this.cards);
    var addSuit = function(suit) {
        for (var i = 1; i <= 13; i++) {
            if (i == 11) {
                self.cards.push(new Card(suit, 'j'));
            } else if (i == 12) {
                self.cards.push(new Card(suit, 'q'));
            } else if (i == 13) {
                self.cards.push(new Card(suit, 'k'));
            } else {
                self.cards.push(new Card(suit, i));
            }
        }
    }

    var fillDeck = function() {
        addSuit('s');
        addSuit('h');
        addSuit('d');
        addSuit('c');
    }

    fillDeck();

    this.shuffle = function() {
        var currentIndex = this.cards.length;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = this.cards[currentIndex];
            this.cards[currentIndex] = this.cards[randomIndex];
            this.cards[randomIndex] = temporaryValue;
        }

        return this.cards;
    }

    this.reset = function() {
        this.cards = [];
        fillDeck();
    }

    this.deal = function() {
        return this.cards.pop();
    }
}

function Player(name, money) {
    var self = this;
    this.name = name;
    this.money = money;
    this.hand = [];

    this.takeCard = function(deck) {
        this.hand.push(deck.deal());
        return this;
    }

    this.discard = function(myCard) {
        if (contain(myCard) == false) {
            console.log('Card does not exist in hand');
            return player;
        } else {
            this.hand.splice(i, 1);
        }
    }

    var contains = function(myCard) {
        for (var i = 0; i < hand.length; i++) {
            if (myCard.symbol == hand[i].symbol && myCard.value == hand[i].value) {
                return i;
            }
        }
        return false;
    }

    this.viewHand = function() {
        return this.hand;
    }

    this.emptyHand = function() {
        this.hand = [];
    }

}


function Game(player) {
    var self = this;
    this.player = player;
    this.dealer = new Player('Dealer', 999999);
    this.deck;

    this.startDeal = function() {
        var myDeck = new Deck();
        myDeck.shuffle();
        this.deck = myDeck;

        this.player.emptyHand();
        this.dealer.emptyHand();

        this.player.takeCard(this.deck);
        this.dealer.takeCard(this.deck);
        this.player.takeCard(this.deck);
        this.dealer.takeCard(this.deck);
        console.log(this.player);
        console.log(this.dealer);
    }

    this.hit = function() {
        this.player.takeCard(this.deck);
        if (getSum(this.dealer) <= 16) {
            this.dealer.takeCard(this.deck);
        }
    }

    this.stand = function() {
        var playerSum = getSum(this.player);
        while (getSum(this.dealer) <= 16) {
            this.dealer.takeCard(this.deck);
        }
        var dealerSum = getSum(this.dealer);
        if (dealerSum > 21 || playerSum > dealerSum) {
            console.log('w');
            return 'win';
        } else if (dealerSum == playerSum) {
            console.log('t');
            return 'tie';
        } else {
            console.log('l');
            return 'lose';
        }
    }

    this.checkBust = function() {
        var playerSum = getSum(this.player);
        if (playerSum > 21) {
            return true;
        } else {
            return false;
        }
    }

    this.getPlayerImages = function() {
        player_str = "";
        for (var i = 0; i < this.player.hand.length; i++) {
            player_str += getCardImage(this.player.hand[i]);
        }
        return player_str;
    }

    this.getDealerImages = function() {
        dealer_str = "<image src='img/b1fv.png'>";
        for (var i = 1; i < this.dealer.hand.length; i++) {
            dealer_str += getCardImage(this.dealer.hand[i]);
        }
        return dealer_str;
    }

    this.getDealerResults = function() {
        dealer_str = "";
        for (var i = 0; i < this.dealer.hand.length; i++) {
            dealer_str += getCardImage(this.dealer.hand[i]);
        }
        return dealer_str;
    }



    var getSum = function(person) {
        var playerSum = 0;
        var playerAce = 0;
        for (var i = 0; i < person.hand.length; i++) {
            console.log(person.hand[i]);
            if (person.hand[i].true_value == 11) {
                playerAce++;
            }
            playerSum += person.hand[i].true_value;

            if (playerSum > 21 && playerAce > 0) {
                playerSum = playerSum - 10;
                playerAce--;
            }
        }
        return playerSum;
    }

}
