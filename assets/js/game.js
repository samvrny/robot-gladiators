var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 25;
var playerMoney = 10;

console.log(playerName, playerAttack, playerHealth, playerMoney);

var enemyNames = ["Morbin", "Ohio", "Vegan Lasagna"];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames, enemyHealth, enemyAttack);

//TABLE OF CONTENTS:
//(Line 23: fight function)
//(Line 83: startGame function)
//(Line 115: endGame function)
//(Line 140: shop function)

//my code for the fight
var fight = function(enemyName) {

    //repeat and execute as long as the enemy-robot is alive
    while(playerHealth > 0 && enemyHealth > 0) {

    //Ask the player if they would like to fight or skip the round
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? enter 'FIGHT or 'SKIP' to choose.");
    console.log(promptFight);
    
    if (promptFight === "skip" || promptFight === "SKIP" || promptFight === "Skip") {
        
        //confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to skip the fight?");
        //if skip is confirmed
        if (confirmSkip) {
            window.alert(playerName + " has decided to skip the fight. 2 coins will be deducted from you wallet");
            playerMoney = playerMoney - 2;
            console.log("playerMoney", playerMoney);
            break;
        }
    } //end of if prmptFight skip 

        //Subtract the value of playerAttack from the value of enemyHealth and use that result to update the value in the enemyHealth variable
        enemyHealth = enemyHealth - playerAttack
        console.log(
            playerName + " attacked " + enemyName + ". " +enemyName + " now has " + enemyHealth + " health remaining."
        );

        //Check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died! :)");
            //award player money for winning
            playerMoney = playerMoney + 20;
            window.alert("You have gained 20 coins from your battle. Your wallet now has " + playerMoney + " coins.");
            console.log("player money is " +playerMoney);
            break;
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        //Subtract the value of enemyAttack from the value of playerHealth and use that result to update the value in the playerHealth variable
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName + " attacked " + playerName + ". " +playerName + " now has " + playerHealth + " health remaining."
        );

        //Check player's health
        if (playerHealth <= 0) {
            window.alert(playerName + " has died :(");
            break;
        }
        else {
            window.alert(playerName + " still has " +playerHealth + " health left.");
        }
    } //end of while loop (line 23)
} //end of fight function (line 20)

//start game function
var startGame = function() {
    //reset player stats
    playerHealth = 100;
    playerAttack = 25;
    playerMoney = 10;
    //fight loop
    for(var i = 0; i < enemyNames.length; i++) {
        if(playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyName = enemyNames[i];
            enemyHealth = 50;
            fight(pickedEnemyName);

            //if we're not at the last enemy in the array, and player still has health, we go to the shop
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                //ask player if they'd like to enter the store
                var storeConfirm = window.confirm("The fight is over, would you like to visit the shop before the next round?");
                if (storeConfirm) {
                    shop();
                }
            } //end of (line 91)
        }
        else {
            window.alert("Your robot has died in battle. Game over. :(");
            break;
        }
    } //end of fight loop (line 83)
    //after the loop ends, player is either out of health or enemies to fight
    endGame();
} //end of start game function (line 77)

//function to end the entire game
var endGame = function() {
    //if player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game!");
    }

    else {
        window.alert("Your robot has died in battle.");
    }

    //local variable
    var playAgainConfirm = window.confirm("Would you like to play again?");

        if (playAgainConfirm) {
            startGame();
        }

        else {
            window.alert("Thank you for playing. See you again soon! :)");
        }
}//end of end game function (line 106)

//shop function
var shop = function() {
    console.log(playerName + " entered the shop.");
    window.alert(playerName + " entered the shop");
    //ask the player what they'd like to do in the shop
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? (Please enter one: REFILL, UPGRADE, or LEAVE)"
    );

    switch (shopOptionPrompt) {
        //for the refill of health
        case "refill":
        case "REFILL":
        case "Refill":
            if (playerMoney >= 7) {
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
                window.alert("Refilling " + playerName + "'s health by 20 for 7 coins. You now have " + playerMoney + " in your wallet."); //add this sort of code to every part of the switch cases to get the proper window alerts about how much money is left
            }
            else {
                window.alert("You don't have enough money!");
            }

        break;

        //for upgrading attack
        case "upgrade":
        case "UPGRADE":
        case "Upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading " + playerName + "'s attack by 6 for 7 coins");
                playerAttack = playerAttack + 6;
                playerMoney = playerMoney -7;
            }
            else {
                window.alert("You don't have enough money");
            }

        break;

        //for leaving the shop
        case "leave":
        case "LEAVE":
        case "Leave":
            window.alert(playerName + " is leaving the shop");

        break;

        //if inproper input is given
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();

        break;

    }// end of switch for shop (line 140)
} //end shop function (line 132)

//call to start game function; starts the game when page first loads (line 76)
startGame();
