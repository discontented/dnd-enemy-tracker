var enemy1 = new Enemy();
var card1 = new Card(enemy1);
var enemies = new Array();

var body = document.getElementById("container");

var pageForm = document.getElementById("options");

pageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    var formEnemy = new Enemy();
    var freshCard = new Card(formEnemy);
    body.appendChild(freshCard.formSubmission(pageForm));
    updateAllCheckboxes();
    
    enemies.push(formEnemy);
    localStorage.setItem("storedEnemies", JSON.stringify(enemies));
});

updateAllCheckboxes();

// Saving state

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

var clearMemory = document.querySelector("button[value='Clear Memory']")
clearMemory.addEventListener("click", function() {
    localStorage.clear();
})

// Today's session
var slavers = new Array();

slavers[0] = new Enemy(40, 15);
slavers[0].name = "Robert";

slavers[1] = new Enemy(40, 15);
slavers[1].name = "Daniel";

slavers[2] = new Enemy(34, 15);
slavers[2].name = "Job";

slavers[3] = new Enemy(40, 15);
slavers[3].name = "Nathaniel";

for(let i = 0; i < slavers.length; i++) {
    slavers[i].setSpellCaster(9);
    let newCard = new Card(slavers[i]);
    newCard.drawCard(body);
}

var constructs = new Array();

constructs[0] = new Enemy(33, 16);
constructs[1] = new Enemy(33, 16);
constructs[2] = new Enemy(33, 16);

for(let i = 0; i < constructs.length; i++) {
    constructs[i].name = `Construct ${i+1}`;
    let newCard = new Card(constructs[i]);
    newCard.drawCard(body);
}

var Vhalak = new Enemy(52, 14);
Vhalak.name = "Vhalak";
var VhalakCard = new Card(Vhalak);
VhalakCard.drawCard(body);

var Nezznar = new Enemy(99, 15);
Nezznar.name = "Nezznar";
Nezznar.setSpellCaster(16);
var NezznarCard = new Card(Nezznar)
NezznarCard.drawCard(body);
