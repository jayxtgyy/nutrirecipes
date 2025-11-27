/* ===== dom ===== */
const categoriesContainer = document.getElementById("categoriesContainer");
const categoryModal = document.getElementById("categoryModal");
const categoryModalBody = document.getElementById("categoryModalBody");
const categoryModalClose = categoryModal.querySelector(".close")

/* ===== fetch categories ===== */
function fetchCategories() {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(err => console.error("Error fetching categories :", err));
}

/* ===== display categories ===== */
function displayCategories(categories) {
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
        .then(data => displayMealsModal(category, data.meals))
        .catch(err => console.error("Error fetching meals by category :", err));
}

/* ===== display meals in modal ===== */
function displayMealsModal(category, meals) {
    let html = `<h2>${category} Meals</h2><div class="cuisine-grid">`;

    meals.forEach(meal => {
        html += `
            <div class="cuisine-card">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
            </div>
        `; // add card for each meal
    });

    html += `</div>`;
    categoryModalBody.innerHTML = html;
    categoryModal.style.display = "flex";
}

/* ===== modal close logic ===== */
categoryModalClose.addEventListener("click", () => categoryModal.style.display = "none");
window.addEventListener("click", e => {
    if (e.target === categoryModal) categoryModal.style.display = "none";
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