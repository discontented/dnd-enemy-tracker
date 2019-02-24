
var enemy1 = new Enemy();
var card1 = new Card();

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