// Storage
localStorage.setItem

// init
updateAllCheckboxes();

// Create enemy boxes dynamically

var body = document.getElementById("container");

// test code
let monsterForm = document.getElementById("options");

monsterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let monsterForm = document.getElementById("options");

    let monEls = monsterForm.elements;

    // defaults
    let enemyName = monEls["enemyName"].value;
    let enemyHP = monEls["HP"].value;
    let enemyAC = monEls["AC"].value;
    let spellcaster = monEls["spellcasterCheck"].checked;
    let spellCasterLvl = 5;
    let legendary = monEls["legendaryCheck"].checked;
    let legendaryActions = 3;
    let lair = monEls["lairCheck"].checked;
    let lairActions = 1;

    if (spellcaster === true) {

        spellCasterLvl = parseInt(monEls["spellcasterLevel"].value);
    }
    if (legendary === true) {

        legendaryActions = parseInt(monEls["legendaryValue"].value);
    }
    if (lair === true) {

        lairActions = parseInt(monEls["lairValue"].value);
    }

    body.appendChild(createEnemyContainer(enemyName, enemyHP, enemyAC, spellcaster, spellCasterLvl, legendary, legendaryActions, lair, lairActions));

    updateAllCheckboxes();
});

