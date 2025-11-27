/* ===== dom ===== */ 
// region dropdown select
const regionFilter = document.getElementById("regionFilter");
// cuisine card container
const cuisineContainer = document.getElementById("cuisineContainer");
// modal & content container
const cuisineModal = document.getElementById("cuisineModal");
const cuisineModalBody = document.getElementById("cuisineModalBody");
// modal close
const cuisineModalClose = cuisineModal.querySelector(".close");

/* ===== region dropdown ===== */
// list of available cuisine regions
const regions = [
    "American", "British", "Canadian", "Chinese", "Croatian",
    "Dutch", "Egyptian", "Filipino", "French", "Greek",
    "Indian", "Irish", "Italian", "Jamaican", "Japanese",
    "Kenyan", "Malaysian", "Mexican", "Moroccan", "Polish",
    "Portuguese", "Russian", "Spanish", "Thai", "Tunisian",
    "Turkish", "Vietnamese"
];

// populate region dropdown
regions.forEach(region => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionFilter.appendChild(option);
});

// region select listener
regionFilter.addEventListener("change", () => {
    const chosen = regionFilter.value;

    if (chosen === "none") {
        cuisineContainer.innerHTML = `<p>Please choose a region.</p>`;
        return;
    }

    fetchByRegion(chosen);
});

/* ===== fetch meals by region ===== */
function fetchByRegion(region) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${region}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals, region))
        .catch(err => console.error("Error fetching meals :", err));
}

/* ===== display cuisines ===== */
function displayMeals(meals, region) {
    // region heading
    cuisineContainer.innerHTML = `
        <h2>${region} Cuisine</h2>
    `;

    if (!meals) {
        cuisineContainer.innerHTML += `<p>No meals found.</p>`;
        return;
    }

    // grid container for cuisine cards
    const grid = document.createElement("div");
    grid.classList.add("cuisine-grid");

    meals.forEach(meal => {
        const card = document.createElement("div");
        card.classList.add("cuisine-card");

        // card content : thumbnail, meal name
        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
        `;

        // click listener to open modal with full details
        addCardClickListener(card, meal);
        grid.appendChild(card);
    });
    cuisineContainer.appendChild(grid);
}

/* ===== cuisine modal ===== */
function addCardClickListener(card, meal) {
    card.addEventListener("click", () => {
        // fetch meal details by ID
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
            .then(res => res.json())
            .then(data => {
                const fullMeal = data.meals[0];
                const ingredients = getIngredientsList(fullMeal);

                // filter instructions
                const steps = fullMeal.strInstructions
                    .split(/\r?\n/) // split string at each line break
                    .map(line => line.trim()) // remove extra spaces at start or end of each line
                    .filter(line => line.length > 0) // remove empty lines
                    .map(line => line.replace(/^Step\s*\d+[:.-]?\s*/i, '')); // remove step prefixes from each line

                // convert ingredients and steps arrays into html lists
                const ingredientsHTML = ingredients.map(ing => `<li>${ing}</li>`).join('');

                const stepsHTML = steps.map(step => `<li>${step}</li>`).join('');

                // populate modal content
                cuisineModalBody.innerHTML = `
                    <img src="${fullMeal.strMealThumb}" alt="${fullMeal.strMeal}">
                    <h3>${fullMeal.strMeal}</h3>
                    <h4>Ingredients:</h4>
                    <ul>
                        ${ingredientsHTML}
                    </ul>
                    <h4>Instructions:</h4>
                    <ol>
                        ${stepsHTML}
                    </ol>
                `;

                cuisineModal.style.display = "flex";
            })
            .catch(err => console.error("Error fetching meal details:", err));
    });
}

/* ===== ingredients extractor ===== */
function getIngredientsList(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }
    return ingredients;
}

/* ===== modal close logic ===== */
cuisineModalClose.addEventListener("click", () => {
    cuisineModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === cuisineModal) {
        cuisineModal.style.display = "none";
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