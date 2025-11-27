// dom
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const recipesContainer = document.getElementById('recipesContainer');

// modal
const recipeModal = document.getElementById('recipeModal');
const modalBody = document.getElementById('modalBody');
const modalClose = recipeModal.querySelector('.close');

// search form
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();
    if (query) {
        fetchRecipes(query);
    }
});

// fetch recipes
function fetchRecipes(query) {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    fetch(url)
        .then(response => response.json())
        .then (data => {
            displayRecipes(data.meals);
        })
        .catch(err => console.error(`Error fetching recipes :`, err));
}

// display recipes
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
            <p class="short-instructions">${meal.strInstructions.slice(0, 100)}...</p>
            <div class="full-instructions" style="display:none;">
                <p>${meal.strInstructions}</p>
                <h4>Ingredients:</h4>
                <ul>
                    ${getIngredientsList(meal).map(ing => `<li>${ing}</li>`).join('')}
                </ul>
            </div>    
            <button class="show-btn">Full Recipe</button>
            `;

            const button = card.querySelector('.show-btn');

            // open modal on click
            button.addEventListener('click', () => {
                
                const steps = meal.strInstructions
                    .split(/\r?\n/)
                    .map(step => step.trim())
                    .filter(step => step !== '' && !/^step\s*\d+/i.test(step));
            
                modalBody.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <h3>${meal.strMeal}</h3>
                    <h4>Ingredients:</h4>
                    <ul>
                        ${getIngredientsList(meal).map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                    <h4>Instructions:</h4>
                    <ol>
                        ${steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                `;
                recipeModal.style.display = 'flex';
            });
            recipesContainer.appendChild(card);
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
modalClose.addEventListener('click', () => {
    recipeModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === recipeModal) {
        recipeModal.style.display = 'none';
    }
});

// icon float
function startFloating(icon) {
    const direction = Math.random() > 0.5 ? 1 : -1;

    let x = direction === 1 ? - 700 : window.innerWidth - 100;

    let baseY = Math.random() * window.innerHeight * 0.8;

    const speed = 0.5 + Math.random() * 1.5;
    const ampX = 20 + Math.random() * 40;
    const ampY = 20 + Math.random() * 40;
    const freqX = 0.5 + Math.random() * 1.5;
    const freqY = 0.5 + Math.random() * 1.5;

    let t = Math.random() * 500;

    function animate() {
        t += 0.015;

        x += direction * speed;

        const offsetX = Math.sin(t * freqX) * ampX;
        const y = baseY + Math.sin(t * freqY) * ampY;

        icon.style.transform = `translate(${x + offsetX}px, ${y}px)`;

        if (direction === 1 && x > window.innerWidth + 100)
            return restart(icon);
        if (direction === -1 && x < - 700) 
            return restart(icon);

        requestAnimationFrame(animate);
    }

    animate();
}

function restart(icon) {
    setTimeout(() => startFloating(icon), 500 + Math.random() * 2500);
}

document.querySelectorAll(".icon").forEach(icon => startFloating(icon));

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