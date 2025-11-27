const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const recipesContainer = document.getElementById('recipesContainer');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();
    if (query) {
        fetchRecipes(query);
    }
});

function fetchRecipes(query) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    fetch(url)
        .then(response => response.json())
        .then (data => {
            displayRecipes(data.meals);
        })
        .catch(err => console.error(`Error fetching recipes :`, err));
}

function displayRecipes(meals) {
    recipesContainer.innerHTML = '';

    if (!meals) {
        recipesContainer.innerHTML = '<p>No recipes found.</p>';
        return;    
    }

    meals.forEach(meal => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');

        card.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
            <p>${meal.strInstructions.slice(0, 100)}...</p>
            <button onclick = "getNutrition('${meal.idMeal}')">Show Nutrition</button>
            `;

        recipesContainer.appendChild(card);
    });
}

function getNutrition(mealId) {
    alert(`Here we will fetch nutrition info for meal ID : ${mealId}`);
}

const icons = document.querySelectorAll('.icon');

icons.forEach((icon) => {
    const startDelay = Math.random() * 5000;

    setTimeout(() => {
        startFloating(icon);
    }, startDelay);
});

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
    newsletterMessage.textContent = "Thank you for subscreibing!";

    newsletterForm.reset();
});