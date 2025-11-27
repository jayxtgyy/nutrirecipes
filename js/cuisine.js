// dom
const regionFilter = document.getElementById("regionFilter");
const cuisineContainer = document.getElementById("cuisineContainer");
const cuisineModal = document.getElementById("cuisineModal");
const cuisineModalBody = document.getElementById("cuisineModalBody");
const cuisineModalClose = cuisineModal.querySelector(".close");

// region dropdown
const regions = [
    "American", "British", "Canadian", "Chinese", "Croatian",
    "Dutch", "Egyptian", "Filipino", "French", "Greek",
    "Indian", "Irish", "Italian", "Jamaican", "Japanese",
    "Kenyan", "Malaysian", "Mexican", "Moroccan", "Polish",
    "Portuguese", "Russian", "Spanish", "Thai", "Tunisian",
    "Turkish", "Vietnamese"
];

regions.forEach(region => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionFilter.appendChild(option);
});

regionFilter.addEventListener("change", () => {
    const chosen = regionFilter.value;

    if (chosen === "none") {
        cuisineContainer.innerHTML = `<p>Please choose a region.</p>`;
        return;
    }

    fetchByRegion(chosen);
});

// fetch by region
function fetchByRegion(region) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${region}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals, region))
        .catch(err => console.error("Error fetching meals :", err));
}

// display
function displayMeals(meals, region) {
    cuisineContainer.innerHTML = `
        <h2>${region} Cuisine</h2>
    `;

    if (!meals) {
        cuisineContainer.innerHTML += `<p>No meals found.</p>`;
        return;
    }

    const grid = document.createElement("div");
    grid.classList.add("cuisine-grid");

    meals.forEach(meal => {
        const card = document.createElement("div");
        card.classList.add("cuisine-card");

        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
        `;

        addCardClickListener(card, meal);
        grid.appendChild(card);
    });
    cuisineContainer.appendChild(grid);
}

// cuisine modal
function addCardClickListener(card, meal) {
    card.addEventListener("click", () => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
            .then(res => res.json())
            .then(data => {
                const fullMeal = data.meals[0];
                const ingredients = getIngredientsList(fullMeal);
                const steps = fullMeal.strInstructions
                    .split(/\r?\n/)
                    .map(line => line.trim())
                    .filter(line => line.length > 0);

                const ingredientsHTML = ingredients.map(ing => `<li>${ing}</li>`).join('');

                const stepsHTML = steps.map(step => `<li>${step}</li>`).join('');

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

// ingredients extractor
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

// modal close logic
cuisineModalClose.addEventListener("click", () => {
    cuisineModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === cuisineModal) {
        cuisineModal.style.display = "none";
    }
});

// newsletter
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