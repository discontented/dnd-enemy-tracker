/**
 * Updates all checkboxes that may have been added from initialization
 */
function updateAllCheckboxes() {
    let checkboxes = document.querySelectorAll("input[type='checkbox']");

    for (let i = 0; i < checkboxes.length; i++) {

        // Initialization
        if (checkboxes[i].checked == true) {
            checkboxes[i].parentNode.classList.add("checked");
        }

        // adds event listener to all objects
        checkboxes[i].addEventListener('change', () => {
            if (checkboxes[i].checked == true) {
                checkboxes[i].parentNode.classList.add("checked");
            } else if (checkboxes[i].checked == false) {
                checkboxes[i].parentNode.classList.remove("checked");
            }
        });

    }
}

/**
 * Resets all sibling buttons
 */
function resetButtons() {
    let siblingInput = this.parentNode.getElementsByTagName("input");
    for (let i = 0; i < siblingInput.length; i++) {
        siblingInput[i].checked = true;
    }
    updateAllCheckboxes();
}

/**
 * Creates a container field with a legend label
 * @param {string} fieldName Label to appear
 * @param {string} clName Class name
 * @returns A fieldset node
 */
function generateField(fieldName, clName) {
    let field = document.createElement("fieldset");
    field.className = clName;
    let legend = document.createElement("legend");
    let title = document.createTextNode(fieldName);

    legend.appendChild(title);
    field.appendChild(legend);

    return field;
}

/**
 * Creates an empty container for the creature and returns a div
 * @param {string} name Enemy's name
 * @param {boolean} spellcaster True/false if the creature has spell slots
 * @param {boolean} legendary True/false if creature has legendary actions
 * @param {boolean} lair true/false if creature has lair actions
 * @returns A div element with an h1 tag containing the name
 */
function createEnemyContainer(name, HP, AC, spellcaster, spellCasterLvl=5, legendary, legendaryActions=3, lair, lairActions=1) {
    let enemyCon = document.createElement("div");
    enemyCon.className = "enemy";

    let enemyHeader = document.createElement("h1");
    enemyHeader.textContent = name;

    // assemble all elements to enemy container div
    enemyCon.appendChild(enemyHeader);
    enemyCon.appendChild(genStatField(HP, AC));
    if (spellcaster === true) {
        enemyCon.appendChild(genSpellSlotField(spellCasterLvl));
    }
    if (legendary === true) {
        enemyCon.appendChild(genGenericField("Legendary Actions", legendaryActions, "fa-dragon"));
    }
    if (lair === true) {
        enemyCon.appendChild(genGenericField("Lair Actions", lairActions, "fa-home"));
    }

    enemyCon.appendChild(genConditionField());

    return enemyCon;
}

/**
 * Generates a fieldset field for stats section of div
 * @param {int} HP default HP
 * @param {int} AC default AC
 */
function genStatField(HP, AC) {
    // Element creation
    let field = generateField("Stats", "stats");

    /**
     * 
     * @param {string} inputName Name given to field that will be its `name` attribute and container class
     * @param {*} inputDefaultVal Default value within input field
     */
    function adjustableField(inputName, inputDefaultVal) {

        // Create container
        let adjustCon = document.createElement("div");
        adjustCon.className = inputName;

        // Create label
        let fieldLabel = document.createElement("label");
        let fieldLabelTxt = document.createTextNode(inputName);
        fieldLabel.appendChild(fieldLabelTxt);

        // Create input
        let fieldInput = document.createElement("input");
        fieldInput.setAttribute("name", inputName);
        fieldInput.setAttribute("value", inputDefaultVal);

        fieldLabel.appendChild(fieldInput);
        adjustCon.appendChild(fieldLabel);

        // Button Creation

        /**
          * 
          * @param {string} clName class name of button
          * @param {string} innerText text to show in button
          * @param {function} eventFunction function to execute when button is clicked
          */
        function createButton(clName, innerText, eventFunction) {
            let tempButton = document.createElement("button");
            let tempButtonTxt = document.createTextNode(innerText);
            tempButton.appendChild(tempButtonTxt);

            tempButton.className = clName;
            tempButton.addEventListener("click", eventFunction);

            return tempButton;
        }

        function incrementHP() {
            fieldInput.value++;
        }

        function decrementHP() {
            fieldInput.value--;
        }

        // Increment/Decrement container
        let adjustButton = document.createElement("span");

        // Create increment and decrement buttons
        incButton = createButton("increment", "+", incrementHP);
        decButton = createButton("decrement", "-", decrementHP);

        // Construct inc/dec container
        adjustButton.appendChild(incButton);
        adjustButton.appendChild(decButton);

        adjustCon.appendChild(adjustButton);

        return adjustCon;
    }

    let health = adjustableField("HP", 10);
    let armor = adjustableField("AC", 10);

    // DOM construction
    field.appendChild(health);
    field.appendChild(armor);

    return field;
}

/**
 * 
 * @param {int} spellCasterLvl Spell caster level
 */
function genSpellSlotField(spellCasterLvl) {

    let SpellLevel = {
        "spellLvl": {
            1: [2],
            2: [3],
            3: [4, 2],
            4: [4, 3],
            5: [4, 3, 2],
            6: [4, 3, 3],
            7: [4, 3, 3, 1],
            8: [4, 3, 3, 2],
            9: [4, 3, 3, 3, 1],
            10: [4, 3, 3, 3, 2],
            11: [4, 3, 3, 3, 2, 1],
            12: [4, 3, 3, 3, 2, 1],
            13: [4, 3, 3, 3, 2, 1, 1],
            14: [4, 3, 3, 3, 2, 1, 1],
            15: [4, 3, 3, 3, 2, 1, 1, 1],
            16: [4, 3, 3, 3, 2, 1, 1, 1],
            17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
            18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
            19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
            20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
        }
    }

    // Array for spellSlots based on level to make it easier to work with than an object
    let spellSlots = SpellLevel.spellLvl[spellCasterLvl];


    let spellSlotField = generateField("Spell Slots", "spell-slots");

    // Generate spell slot rows for each spell level
    for (let i = 0; i < spellSlots.length; i++) {
        let spellLvlCon = document.createElement("div");
        spellLvlCon.className = "spell-level-container";
        let lvlLabel = document.createElement("label");
        let lvlLabelTxt = document.createTextNode(`Level ${i + 1}`)
        lvlLabel.appendChild(lvlLabelTxt);

        let spellSlotCheckboxes = createSpellSlotRow(spellSlots[i]);
        spellLvlCon.appendChild(lvlLabel);
        spellLvlCon.appendChild(spellSlotCheckboxes);

        spellSlotField.appendChild(spellLvlCon);
    }

    return spellSlotField;

    /**
     * Creates a single spell slot with an icon and checkbox
    * @param {int} number spell slot index within spell slot level
    */
    function createSpellSlot(number) {

        let spellSlot = document.createElement('label');
        spellSlot.className = "spell-slot";

        let icon = document.createElement('i');
        icon.classList.add("fas", "fa-magic");

        spellSlot.appendChild(icon);

        let checkbox = document.createElement('input');
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", `slot-${number}`);
        checkbox.checked = true;

        spellSlot.appendChild(checkbox);

        return spellSlot;
    }

    /**
     * Creates entire row of n spell slots and returns a NodeList of n input boxes
     * @param {int} spellSlotsNum number of spell slots
     * @returns NodeList of spell slot checkboxes
     */
    function createSpellSlotRow(spellSlotsNum) {
        let allSlots = document.createDocumentFragment();

        for (let i = 0; i < spellSlotsNum; i++) {
            allSlots.appendChild(createSpellSlot(i));
        }

        return allSlots;
    }

}

function genConditionField() {
    let conditionField = generateField("Conditions", "conditions");

    function Condition(name, icon) {
        this.name = name;
        this.icon = icon;

        this.genHTML = function () {
            let conditionLabel = document.createElement("label");

            let conditionIcon = document.createElement("i");
            conditionIcon.classList.add("fas", this.icon);
            conditionIcon.setAttribute("title", this.name);
            let conditionLabelTxt = document.createTextNode(this.name);
            conditionIcon.appendChild(conditionLabelTxt);

            let conditionCheck = document.createElement("input");
            conditionCheck.setAttribute("type", "checkbox");

            // Nest icon and checkbox in label
            conditionLabel.appendChild(conditionIcon);
            conditionLabel.appendChild(conditionCheck);

            return conditionLabel;
        }
    };

    let conditions = [
        new Condition("Blinded", "fa-eye-slash"),
        new Condition("Charmed", "fa-heart"),
        new Condition("Deafened", "fa-deaf"),
        new Condition("Frightened", "fa-exclamation"),
        new Condition("Grappled", "fa-fist-raised"),
        new Condition("Incapacitated", "fa-dizzy"),
        new Condition("Invisible", "fa-ghost"),
        new Condition("Paralyzed", "fa-bolt"),
        new Condition("Petrified", "fa-diagnoses"),
        new Condition("Poisoned", "fa-vial")
    ];

    for (let i = 0; i < conditions.length; i++) {
        let conditionButton = conditions[i].genHTML();
        conditionField.appendChild(conditionButton);
    }

    return conditionField;

}

function genGenericField(legend, numberIcons, faIcon) {
    let genericField = generateField(legend, "generic");
    let genericButtons = new Array();

    function genGenericIcon() {
        let genericButton = document.createElement("label");

        let genericIcon = document.createElement("i");
        genericIcon.classList.add("fas", faIcon);

        let genericCheckbox = document.createElement("input");
        genericCheckbox.setAttribute("type", "checkbox");
        genericCheckbox.checked = true;

        // Construction
        genericButton.appendChild(genericIcon);
        genericButton.appendChild(genericCheckbox);

        return genericButton;
    }

    for (let i = 0; i < numberIcons; i++) {
        genericButtons[i] = genGenericIcon();
    }

    // Create reset button
    let resetButton = document.createElement("button");
    let resetText = document.createTextNode("Reset");

    resetButton.appendChild(resetText);

    resetButton.addEventListener("click", resetButtons);

    // Construction
    for (let i = 0; i < genericButtons.length; i++) {
        genericField.appendChild(genericButtons[i]);
    }
    genericField.appendChild(resetButton);

    return genericField;
}


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
    if(legendary === true) {
        
        legendaryActions = parseInt(monEls["legendaryValue"].value);
    }
    if(lair === true) {
        
        lairActions = parseInt(monEls["lairValue"].value);
    }

    body.appendChild(createEnemyContainer(enemyName, enemyHP, enemyAC, spellcaster, spellCasterLvl, legendary, legendaryActions, lair, lairActions));

    updateAllCheckboxes();
});

