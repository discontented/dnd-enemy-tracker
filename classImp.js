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

// Writes enemies stored as cookies to page
var storedEnemies = JSON.parse(localStorage.getItem("storedEnemies"));

for(let i = 0;i < storedEnemies.length; i++) {
    let card = new Card(storedEnemies[i]);
    card.drawCard(body);
}

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