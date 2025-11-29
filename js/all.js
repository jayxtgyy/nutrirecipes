/* ===== dom ===== */
const container = document.getElementById("allMealsContainer");

// letter a-z
const letters = "abcdefghijklmnopqrstuvwxyz".split("");

/* ===== fetch meal by letter ===== */
function fetchMealsByLetter(letter) {
    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(res => res.json())
        .then(data => data.meals || []); // return an empty array if no meals found
}

/* ===== load all meals and display ===== */
async function loadAllMeals() {
    for (const letter of letters) {
        const meals = await fetchMealsByLetter(letter);

        // skip letters with no meals
        if (meals.length === 0) continue;

        // create block for each letter section
        const block = document.createElement("div");
        block.classList.add("letter-block");

        // build html for that letter section
        block.innerHTML = `
            <div class="letter-label">${letter.toUpperCase()}</div>
            <div class="meal-list">
                ${meals.map(m => `
                    <div class="meal-card" data-id="${m.idMeal}">
                        <img src="${m.strMealThumb}" alt="${m.strMeal}">
                        <h4>${m.strMeal}</h4>
                    </div>
                `).join("")}
            </div>
        `;

        container.appendChild(block);
    }

    // click events for modals, attached after all cards added
    addMealCardClickEvents();
}

// load all meals when page loads
loadAllMeals();

// all meal card click event
function addMealCardClickEvents() {
    document.querySelectorAll(".meal-card").forEach(card => {
        card.addEventListener("click", () => {
            const mealID = card.getAttribute("data-id");
            openRecipeModal(mealID);
        });
    });
}

//
const modal = document.getElementById("recipeModal");
const modalBody = document.getElementById("modalBody");
const closeBtn = document.querySelector(".modal .close");

/* ===== open modal with full recipe details ===== */
async function openRecipeModal(id) {
    // Fetch the full recipe details by ID
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    const meal = data.meals[0];

    // build ingredients list
    let ingredientsHTML = "<ul>";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
            ingredientsHTML += `<li>${ingredient} - ${measure}</li>`;
        }
    }
    ingredientsHTML += "</ul>";

    const steps = meal.strInstructions
        .split(/\r?\n/) // split string at each line break
        .map(step => step.trim()) // remove extra spaces at start or end of each line 
        .filter(step => step !== '' && !/^step\s*\d+/i.test(step)); // remove blank lines and "step 1", "step 2"

    const instructionsHTML = `
        <ol>
            ${steps.map(step => `<li>${step}</li>`).join("")}
        </ol>
    `;

    // fill the modal content
    modalBody.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

        <h3>Ingredients</h3>
        ${ingredientsHTML}

        <h3>Instructions</h3>
        ${instructionsHTML}
    `;

    // show modal
    modal.style.display = "flex";
}

/* ===== modal close logic ===== */
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

/* ===== newsletter form logic ===== */
const newsletterForm = document.getElementById("newsletter-form");
const newsletterEmail = document.getElementById("newsletter-email");
const newsletterMessage = document.getElementById("newsletter-message");

newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = newsletterEmail.value.trim();

    if(!email) {
        newsletterMessage.style.color = "red";
        newsletterMessage.textContent = "Please enter a valid email address";
        return;
    }

    newsletterMessage.style.color = "green";
    newsletterMessage.textContent = "Thank you for subscribing!";

    newsletterForm.reset();
});