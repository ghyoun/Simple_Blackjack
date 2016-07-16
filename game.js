function getCardImage(myCard) {
    image_str = ('<image src="img/' + myCard.symbol + myCard.value + '.png">');
    return image_str;
}

$(document).ready(function(){
    var player;
    var theBet;
    var game;
    var total_money;
    $("#gameFooter").hide();

    $("#startGame").click(function() {
        console.log('here');
        var playerName = $("#playerName").val();
        var playerMoney = $("#playerMoney").val();
        if (playerName == "") {
            $("#playerName").val('Please type a name');
        } else if (playerMoney < 50) {
            $("#playerMoney").attr('placeholder', 'At least $50');
        } else if (playerName == 'Please type a name' || playerName == 'Put Name Here' || playerMoney == 'At least $50') {

        } else {
            player = new Player(playerName, playerMoney);
            game = new Game(player);
            total_money = playerMoney;
            info_str = "";
            info_str += "<h3 class='info col-sm-5'>Welcome " + playerName + " !</h3>"
            info_str += "<h3 class='info col-sm-4 result'>Dealer's Hand</h3>"
            info_str += "<h3 class='info col-sm-3' id='the_money'>Your Money: $" + playerMoney + "</h3>"
            $("#playerInfo").html(info_str)
            $("#options").hide();
            $("#gameFooter").show();
            $("#moves").hide();
        }
    });

    $("#newRound").click(function() {
        var playerBet = $("#bet").val();
        if (playerBet < 5) {
            $("#playerMoney").attr('placeholder', 'Bet at least $5');
        } else if (playerBet == 'Bet at least $5' || playerBet == 'Minimum 5$') {

        } else {
            total_money = total_money - playerBet;
            theBet = playerBet;
            $("#the_money").html("Your Money: $" + total_money + " Betting: $" + playerBet);
            $("#round").hide();
            $("#moves").show();
            $("#gameMessage").html("<h2></h2>");
            game.startDeal();

            player_str = "";
            for (var i = 0; i < game.player.hand.length; i++) {
                player_str += getCardImage(game.player.hand[i]);
            }
            $("#playerCards").html(player_str);

            dealer_str = "<image src='img/b1fv.png'>";
            for (var i = 1; i < game.dealer.hand.length; i++) {
                dealer_str += getCardImage(game.dealer.hand[i]);
            }
            $("#dealer").html(dealer_str);
        }
    });

    $("#hit").click(function() {
        game.hit();
        if (game.checkBust()) {
            $("#gameMessage").html("<h2>Bust!!</h2>");
            $("#round").show();
            $("#moves").hide();

        }
        $("#playerCards").html(game.getPlayerImages());
        $("#dealer").html(game.getDealerImages());
    });

    $("#stand").click(function() {
        var result = game.stand();
        console.log(total_money);
        console.log(theBet);
        if (result == 'win') {
            $("#gameMessage").html("<h2>You won!!!</h2>");
            total_money = total_money + (theBet * 2);
            $("#the_money").html("Your Money: $" + total_money + " Betting: $" + theBet);
        } else if (result == 'lose') {
            $("#gameMessage").html("<h2>You lost!!!</h2>");
            $("#the_money").html("Your Money: $" + total_money + " Betting: $" + theBet);
        } else {
            $("#gameMessage").html("<h2>You tied!!!</h2>");
            total_money = parseInt(total_money) + parseInt(theBet);
            $("#the_money").html("Your Money: $" + total_money + " Betting: $" + theBet);
        }

        $("#playerCards").html(game.getPlayerImages());
        $("#dealer").html(game.getDealerResults());
        $("#round").show();
        $("#moves").hide();
    });
});
