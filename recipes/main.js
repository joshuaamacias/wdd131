import recipes from "./recipes.js";

function random(num) {
    return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
    return list[random(list.length)];
}

function tagsTemplate(tags) {
    return `<ul class="recipe__tags">${tags.map(tag => `<li>${tag}</li>`).join("")}</ul>`;
}

function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    for (let i = 1; i <= 5; i++) {
        html += i <= rating ? `<span aria-hidden="true" class="icon-star">⭐</span>` 
                            : `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
    html += `</span>`;
    return html;
}

function recipeTemplate(recipe) {
    return `<figure class="recipe">
        <img src="${recipe.image}" alt="image of ${recipe.name}" />
        <figcaption>
            ${tagsTemplate(recipe.tags)}
            <h2><a href="#" data-recipe-name="${recipe.name}">${recipe.name}</a></h2>
            <p class="recipe__ratings">${ratingTemplate(recipe.rating)}</p>
            <p class="recipe__description">${recipe.description}</p>
        </figcaption>
    </figure>`;
}

function renderRecipes(recipeList) {
    const outputElement = document.querySelector("main");
    outputElement.innerHTML = recipeList.map(recipeTemplate).join("");
    addRecipeClickListeners(); // Add listeners after rendering
}

function filterRecipes(query) {
    query = query.toLowerCase();
    return recipes
        .filter(recipe => 
            recipe.name.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(query)) ||
            recipe.recipeIngredient.some(ingredient => ingredient.toLowerCase().includes(query))
        )
        .sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(e) {
    e.preventDefault();
    const query = document.querySelector("#search-input").value.trim().toLowerCase();
    renderRecipes(filterRecipes(query));
}

function displayFullRecipe(recipe) {
    const outputElement = document.querySelector("main");
    outputElement.innerHTML = `
        <section class="recipe-card">
            <img src="${recipe.image}" alt="${recipe.name}">
            <div class="recipe-info">
                ${tagsTemplate(recipe.tags)}
                <h2>${recipe.name}</h2>
                <p class="recipe__ratings">${ratingTemplate(recipe.rating)}</p>
                <p class="description">${recipe.description}</p>
                <h3>Ingredients:</h3>
                <ul>
                    ${recipe.recipeIngredient.map(ingredient => `<li>${ingredient}</li>`).join("")}
                </ul>
                <h3>Instructions:</h3>
                <ol>
                    ${recipe.recipeInstructions.map(instruction => `<li>${instruction}</li>`).join("")}
                </ol>
            </div>
        </section>
    `;
}

function addRecipeClickListeners() {
    document.querySelectorAll("main figure.recipe a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const recipeName = e.target.getAttribute("data-recipe-name");
            const selectedRecipe = recipes.find(recipe => recipe.name === recipeName);
            if (selectedRecipe) {
                displayFullRecipe(selectedRecipe);
            }
        });
    });
}

function init() {
    //Find the apple crisp recipe.
    const appleCrisp = recipes.find(recipe => recipe.name === 'Apple Crisp')
    renderRecipes([appleCrisp]);
}

document.addEventListener("DOMContentLoaded", () => {
    init();
    document.querySelector(".search-form").addEventListener("submit", searchHandler);
});