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

var Vhalak = new Enemy(52, 14);
Vhalak.name = "Vhalak";
var VhalakCard = new Card(Vhalak);
VhalakCard.drawCard(body);

var Gundren = new Enemy(75, 16);
Gundren.name = "Gundren";
var GundrenCard = new Card(Gundren);
GundrenCard.drawCard(body);

var soldiers = new Array();

for(let i = 0; i < 3; i++) {
    soldiers[i] = new Enemy(27, 16);
    soldiers[i].name = `Soldier ${i + 1}`
    var soldierCard = new Card(soldiers[i]);
    soldierCard.drawCard(body);
}

var Champ = new Enemy(18, 14);
Champ.name = "Tristan";
var champCard = new Card(Champ);
champCard.drawCard(body);