/* ===== dom ===== */
const categoriesContainer = document.getElementById("categoriesContainer");
const modal = document.getElementById("mainModal");
const modalBody = document.getElementById("modalBody");
const modalClose = modal.querySelector(".close")

/* ===== fetch & display categories ===== */
function fetchCategories() {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => displayCategories(data.categories));
}

/* ===== display categories ===== */
function displayCategories(categories) {
    categoriesContainer.innerHTML = ""; // clear old content

    const grid = document.createElement("div");
    grid.classList.add("categories-grid");

    categories.forEach(cat => {
        const card = document.createElement("div");
        card.classList.add("category-card");

        // card content : thumbnail, category name, short description
        card.innerHTML = `
            <img src="${cat.strCategoryThumb}" alt="${cat.strCategory}">
            <h3>${cat.strCategory}</h3>
            <p>${cat.strCategoryDescription.substring(0, 80)}...</p>
        `;

        // click listener to fetch meals within category
        card.addEventListener("click", () => fetchMealsByCategory(cat.strCategory));
        grid.appendChild(card);
    });

    categoriesContainer.appendChild(grid);
}

/* ===== fetch meals by selected category ===== */
function fetchMealsByCategory(category) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(res => res.json())
        .then(data => displayMealsModal(category, data.meals));
}

/* ===== display meal list in modal ===== */
function displayMealsModal(category, meals) {
    modalBody.innerHTML = `
        <button class="back-btn" id="backToCategories">← Back</button>
        <h2>${category} Meals</h2>

        <div class="cuisine-grid">
            ${meals.map(m => `
                <div class="cuisine-card meal-card" data-id="${m.idMeal}">
                    <img src="${m.strMealThumb}" alt="${m.strMeal}">
                    <h3>${m.strMeal}</h3>
                </div>
            `).join("")}
        </div>
    `;

    modal.style.display = "flex";

    // back → category cards
    document.getElementById("backToCategories")
        .addEventListener("click", () => modal.style.display = "none");

    // each meal click → full recipe
    document.querySelectorAll(".meal-card").forEach(card => {
        card.addEventListener("click", () => {
            fetchFullRecipe(card.dataset.id, category, meals);
        });
    });
}

/* ===== fetch & display full recipe ===== */
function fetchFullRecipe(mealId, category, mealsList) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];

            const ingredients = [];
            for (let i = 1; i <= 20; i++) {
                const ing = meal[`strIngredient${i}`];
                const meas = meal[`strMeasure${i}`];
                if (ing) ingredients.push(`${meas} ${ing}`);
            }

            // filter instructions
            const steps = meal.strInstructions
                .split(/\r?\n/) // split string at each line break
                .map(line => line.trim()) // remove extra spaces at start or end of each line
                .filter(line => line.length > 0) // remove empty lines
                .map(line => line.replace(/^Step\s*\d+[:.-]?\s*/i, '')); // remove step prefixes from each line

            modalBody.innerHTML = `
                <button id="backToMealList" class="back-btn">← Back</button>

                <img src="${meal.strMealThumb}" class="full-meal-img">
                <h3>${meal.strMeal}</h3>

                <h4>Ingredients:</h4>
                <ul>
                    ${ingredients.map(i => `<li>${i}</li>`).join("")}
                </ul>

                <h4>Instructions:</h4>
                <ol>
                    ${steps.map(s => `<li>${s}</li>`).join("")}
                </ol>
            `;

            // back button returns to meal list in category modal
            document.getElementById("backToMealList")
                .addEventListener("click", () => displayMealsModal(category, mealsList));
        });
}

/* ===== modal close logic ===== */
modalClose.addEventListener("click", () => modal.style.display = "none");

window.addEventListener("click", e => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

/* ===== initialize page ===== */
fetchCategories();

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