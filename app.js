import characterData from "./data.js";
import Character from "./character.js";

let monsterArray = ['orc', 'demon', 'goblin'];

const getNewMonster = () => {
    const nextMonsterData = characterData[monsterArray.shift()];
    return nextMonsterData ? new Character(nextMonsterData) : {};
}

const attack = () => {
    wizard.setDiceHtml();
    monster.setDiceHtml();
    wizard.takeDamage(monster.currentDiceScore);
    monster.takeDamage(wizard.currentDiceScore);
    render();

    if (wizard.isDead) {
        endGame();
    } else if (monster.isDead) {
        document.getElementById('attack-button').disabled = true;
        if (monsterArray.length > 0) {
            setTimeout(() => {
                monster = getNewMonster();
                document.getElementById('attack-button').disabled = false;
                render();
            }, 1500); 
        } else {
            endGame();
        }
    }
}

const endGame = () => {
    const endMessage = monster.health === 0 && wizard.health === 0 ? 
        'No victors - all creatures are dead' : 
        wizard.health > 0 ? 'The Wizard Wins' : 
        'The Monster is Victorious';
    const endEmoji = wizard.health > 0 ? "🔮" : "☠️";
    setTimeout(() => {
        document.body.innerHTML =
        `<div class="end-game">
            <h2>Game Over</h2>
            <h3>${endMessage}</h3>
            <p class="end-emoji">${endEmoji}</p>
        </div>`;
    }, 1500);
    document.getElementById('attack-button').disabled = true;
}

document.getElementById('attack-button').addEventListener('click', attack);

const render = () => {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml();
    document.getElementById('monster').innerHTML = monster.getCharacterHtml();
}

const wizard = new Character(characterData.hero);
let monster = getNewMonster();
render();