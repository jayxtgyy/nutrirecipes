const regionFilter = document.getElementById('regionFilter');
const cuisineContainer = document.getElementById('cuisineContainer');

let allRegions = [];

// fetch cuisines
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => {
        const categories = data.categories;

        allRegions = [...new Set(categories.map(cat => cat.strCategory))];

        populateDropdown(allRegions);
        displayCuisines(categories);
    })
    .catch(err => console.error('Error fetching categories:', err));

// populate
function populateDropdown(regions) {
    regions.forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionFilter.appendChild(option);
    });
}

// display cards
function displayCuisines(cuisines) {
    cuisineContainer.innerHTML = '';

    cuisines.forEach(cuisine => {
        const card = document.createElement('div');
        card.classList,add('cuisine-card');

        card.innerHTML = `
            <img src="${cuisine.strCategoryThumb}" alt="${cuisine.strCategory}">
            <h3>${cuisine.strCategory}</h3>
            <p>${cuisine.strCategoryDescription.slice(0, 100)}...</p>
            <button class="view-btn">View Recipes</button>
        `;

        const button = card.querySelector('.view-btn');
        button.addEventListener('click', () => {
            fetchMealsByRegion(cuisine.strGategory);
        });

        cuisineContainer.appendChild(card);
    });
}

// filter by region
regionFilter.addEventListener('change', () => {
    const selected = regionFilter.value;
    if (selected === 'all') {
        fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(res => res.json())
            .then(data => displayCuisines(data.categories));
    } else {
        fetchMealsByRegion(selected);
    }
});

// fetch meals by region
function fetchMealsByRegion(region) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${region}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            cuisineContainer.innerHTML = '';
            if (!data.meals) {
                cuisineContainer.innerHTML = '<p>No recipes found for this region.</p>';
                return;
            }
            data.meals.forEach(meal => {
                const card = document.createElement('div');
                card.classList.add('cuisine-card');
                card.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                `;
                cuisineContainer.appendChild(card);
            });
        })
        .catch(err => console.error('Error fetching meals by region:', err));
}

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