var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 20;
var playerMoney = 10;

console.log(playerName, playerAttack, playerHealth, playerMoney);

var enemyNames = ["Morbin", "Ohio", "Vegan Lasagna"];
var enemyHealth = 50;
var enemyAttack = 12;

console.log(enemyNames, enemyHealth, enemyAttack);
for(var i=0; i < enemyNames.length; i++) {
    console.log(enemyNames[i]);
    console.log(i);
    console.log(enemyNames[i] + " is at " + i + " index");
}

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
        } //end of if skip 

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
    playerAttack = 20;
    playerMoney = 10;
    //fight loop
    for(var i = 0; i < enemyNames.length; i++) {
        if(playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyName = enemyNames[i];
            enemyHealth = 50;
            fight(pickedEnemyName);
        }
        else {
            window.alert("Your robot has died in battle. Game over. :(");
            break;
        }
    } //end of fight loop
    //after the loop ends, player is either out of health or enemies to fight
    endGame();
} //end of start game function

//function to end the entire game
var endGame = function() {
    //if player is still alive, player wins!
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! 20 coins have been added to your wallet. Your wallet now has " + playerMoney + " coins.");
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
}//end of end game function

//call to start game function (line 76)
startGame();
