let xp = 0;
let Health = 100;
let Gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"]; 
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [ 
    {
        name: "stick",
        power: 5
},
   {
        name: "dagger",
        power: 30
},
{
    name: "claw hammer",
    power: 50
},
{
    name: "sword",
    power: 100
},
];
const monsters = [
    {
        name: "slime",
        level: 8,
        health:15,
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];
const locations = [
    {
        name: "town squre",
        "button text": ["go to store"," go to cave"," fight the dragon"],
        "button functions": [goStore, goCave ,fightDragon], 
        text: "you are in town square , you see a sign that says you should visit the \"store\""
    },
    {
        name: "store",
        "button text": ["buy 10 hp (10 gold)"," buy a weapon (30 gold)","go to town square"],
        "button functions": [buyHealth, buywepons ,goTown], 
        text: " welcome to the store"
    },
    {
        name: "cave",
        "button text": ["fight a slime"," fight fanged beast","go to town square"],
        "button functions": [fightSlime, fightBeast ,goTown], 
        text: " you enter the cave, you see a monsters"
    },
    {
        name:"fight",
        "button text": ["Attack" ,"Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "you are fighting a monsters"
    },
    {
        name: "defeatMonster",
        "button text": ["go to town","go to town","go to town"],
        "button functions": [goTown,goTown,goTown],
        text: "you have defeated the monsters you gain xp and gold ",
    },
    {
        name: "lose" ,
        "button text":["Replay","Replay","Replay"],
        "button functions": [restart,restart,restart],
        text:"you died"
    },
    {
        name: "win" ,
        "button text":["Replay","Replay","Replay"],
        "button functions": [restart,restart,restart],
        text:"you won the game",
    }
];
// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon; 
function update(locations) {
    monsterStats.style.display = "none";
    button1.innerText = locations["button text"][0];
    button2.innerText = locations["button text"][1];
    button3.innerText = locations["button text"][2];
    button1.onclick = locations["button functions"][0];
    button2.onclick = locations["button functions"][1];
    button3.onclick = locations["button functions"][2];
    text.innerText = locations.text;
}
function goTown() {
update(locations[0]);
};

function goStore() {
 update(locations[1]);
};
function goCave() {
    update(locations[2])
};
function fightDragon() {
    console.log ("fighting Dragon");
};
function buyHealth() {
if (Gold >= 10) {
    Gold -=10,
    Health +=10,
    goldText.innerText = Gold;
    healthText.innerText = Health;
}
else {
    text.innerText = "you don't have enough gold";
}
   
};
function buywepons() {
    if(currentWeapon < weapons.length - 1) {
        if(Gold >= 30) {
            Gold -= 30;
            currentWeapon += 1;
            goldText.innerText = Gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = " you have a " + newWeapon + ".";
            inventory.push(newWeapon);
            text.innerText += " in your inventory you have: " + inventory;
        
        } else {
            text.innerText = "you don't have enough gold";
        }
        
      } else{
        text.innerText = "you already have the most powerfull weapon"
        button2.innerText = "sell weapon for 15 gold"
        button2.onclick = sellWeapon;
        
    } {

    }

};
function fightSlime() {
    fighting = 0;
goFight();
};
function fightBeast() {
    fighting = 1
    goFight ();
};
function fightDragon() {
    fighting = 2;
goFight();
};
function goFight() {
update(locations[3]);
monsterHealth = monsters[fighting].health;
monsterStats.style.display = "block";
monsterNameText.innerText = monsters[fighting].name;
monsterHealthText.innerText = monsterHealth;
}
function sellWeapon() {
if (inventory.length > 1) {
    Gold + 15;
    goldText.innerText = Gold;
    let currentWeapon = inventory.shift();
    text.innerText = "you sold "+ currentWeapon +".";
    text.innerText += " in your inventory you have " + inventory;
}else {
    text.innerText = "Don't sell your only weapon"
}
};
function attack() {
text.innerText = "the " + monsters[fighting].name + " attacks"
text.innerText += "you attacked it with your " + weapons[currentWeapon].name +" .";
Health -= monsters[fighting].level;
monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
healthText.innerText = Health;
monsterHealthText.innerText = monsterHealth;
if (Health <= 0) {
    lose();
}else if (monsterHealth <= 0) {
    if ( fighting === 2) {
        winGame();
    }
    else {
        defeatMonster();
    }
}

};
function dodge() {
 text.innerText = "you dodged attack from " + monsters[fighting].name + " .";

};
function defeatMonster() {
Gold += Math.floor(monsters[fighting].level * 6.7)
xp += monsters[fighting].level; 
goldText.innerText = Gold;
xpText.innerText = xp;
update(locations[4])
};
function lose() {
update(locations[5]);
};
function winGame() {
    update(locations[6]);
}
function restart() {
    let xp = 0;
    let Health = 100;
    let Gold = 50;
    let currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = Gold;
    healthText.innerText = Health;
    xpText.innerText = xp;
    goTown();
}
