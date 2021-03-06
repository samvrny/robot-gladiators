var fightOrSkip = function() {
    var promptFight = window.prompt("Would you like the FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.");

    //Conditional recursive function call
    if (!promptFight) {
        window.alert("You need to provide a valid answer! Please try again");
        return fightOrSkip();
    }
    
    promptFight = promptFight.toLowerCase();
    if (promptFight === "skip") {
        var confirmSkip = window.confirm("Are you sure you'd like to skip the round?");

        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this round of fighting");
            playerInfo.money = Math.max(0, playerInfo.money -5);
            
            return true;
        }
    }

    return false;
};//end of fightOrSkip function

//my code for the fight
var fight = function(enemy) {

    //keep track of who goes first
    var isPlayerTurn = true;
    //randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }

    //repeat and execute as long as the enemy-robot is alive
    while(playerInfo.health > 0 && enemy.health > 0) {

        if(isPlayerTurn) {

    //Ask the player if they would like to fight or skip the round
        if (fightOrSkip()) {
            break;
        }

        // generate random damage value based on players attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        //Subtract the value of playerInfo.attack from the value of enemy.health and use that result to update the value in the enemy.health variable
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " +enemy.name + " now has " + enemy.health + " health remaining."
        );

        //Check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died! :)");
            //award player money for winning
            playerInfo.money = playerInfo.money + 20;
            window.alert("You have gained 20 coins from your battle. Your wallet now has " + playerInfo.money + " coins.");
            console.log("player money is " + playerInfo.money);
            break;
        }
        else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        } //end of "if player health" if conditional statement"
        else {
        //generate random damage value based on enemys attack power
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        //Subtract the value of enemy.attack from the value of playerInfo.health and use that result to update the value in the playerInfo.health variable
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " +playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        //Check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died :(");
            break;
        }
        else {
            window.alert(playerInfo.name + " still has " +playerInfo.health + " health left.");
        }
    } //end of "else" part of isPlayerTurn conditional statement
    //switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
    } //end of while loop
}; //end of fight function

//start game function
var startGame = function() {
    //reset player stats
    playerInfo.reset();

    //fight for loop
    for(var i = 0; i < enemyInfo.length; i++) {
        if(playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            //pick a new enemy to fight based on array
            var pickedEnemyObj = enemyInfo[i];
            //reset enemy health before start of round
            pickedEnemyObj.health = randomNumber(40, 60);
            //call to fight function
            fight(pickedEnemyObj);

            //if we're not at the last enemy in the array, and player still has health, we go to the shop
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                //ask player if they'd like to enter the store
                var storeConfirm = window.confirm("The fight is over, would you like to visit the shop before the next round?");
                if (storeConfirm) {
                    shop();
                }
            } 
        }
        else {
            window.alert("Your robot has died in battle. Game over. :(");
            break;
        }
    } //end of fight for loop
    //after the loop ends, player is either out of health or enemies to fight
    endGame();
}; //end of start game function

//function to end the entire game
var endGame = function() {
    window.alert("The game has ended. Let's see how you did!");

    //check localStorage for ghigh score, if it's not there use 0
    var highScore = localStorage.getItem("highscore")
    if (highScore === null) {
        highScore = 0;
    }

    //if player has more money than the high score, player has new high score!
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);
    

    alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    }

    else { 
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Better luck next time!");
    }
    //local variable; Ask the player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

        if (playAgainConfirm) {
            startGame();
        }

        else {
            window.alert("Thank you for playing. See you again soon! :)");
        }
};//end of end game function

//shop function
var shop = function() {
    console.log(playerInfo.name + " entered the shop.");
    window.alert(playerInfo.name + " entered the shop");
    //ask the player what they'd like to do in the shop
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the shop? (Please enter 1 for REFILL, 2 for UPGRADE, or 3 to LEAVE)"
    );

    shopOptionPrompt = parseInt(shopOptionPrompt);

    switch (shopOptionPrompt) {
        //for the refill of health
        case 1:
            playerInfo.refillHealth();
        break;

        //for upgrading attack
        case 2:
            playerInfo.upgradeAttack();
        break;

        //for leaving the shop
        case 3:
            window.alert(playerInfo.name + " is leaving the shop");

        break;

        //if inproper input is given
        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();

        break;

    }// end of switch for shop
}; //end shop function

//function to generate a random number
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min +1) + min);

    return value;
}; //end random number function

//player and enemy information

var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;

}; //end getPlayerName function

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 20,
    money: 10,
    reset: function() {
        this.health = 100; //this is shorthand for saying this.health = 100
        this.money = 10;
        this.attack = 20;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling " + playerInfo.name + "'s health by 20 for 7 coins.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >=7) {
            window.alert("Upgrading " + playerInfo.name + "'s attack by 6 for 7 coins.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

console.log(playerInfo.name, playerInfo.attack, playerInfo.health, playerInfo.money);

var enemyInfo = [
    {
        name: "Morbin",
        attack: randomNumber(10, 14)
    },
    {
        name: "Ohio",
        attack: randomNumber(10, 14)
    },
    {
        name: "Vegan Lasagna",
        attack: randomNumber(10, 14)
    }
];

//call to start game function
startGame();
