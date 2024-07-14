// DOM Elements
let ingredientsContent = document.getElementById("ingredientsContent");  // Main ingredients content section
let subContent = document.getElementById("subContent");  // Sub content section
let xBtn = document.getElementById("x-btn");  // Close button element
let recipes = document.getElementById("recipes");  // Recipes section
let data = [];  // Array to store fetched data

// Function to fetch and display all ingredients
async function getAllIngredients() {
    // Display loading indicator
    let mainLoader = document.querySelector('.mainLoader');
    if (mainLoader) {
        mainLoader.style.display = 'flex';
    }
    
    // Fetch data from API
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`, {
        method: 'GET'
    });
    let apiData = await apiResponse.json();
    let datOfApI = ``;
    
    // Build HTML for ingredients list
    for (let index = 0; index < 20; index++) {
        let description = apiData.meals[index].strDescription || ""; // Fallback to empty string if description is null or undefined
        let shortDescription = description.split(" ").slice(0, 19).join(" ");
        datOfApI += `<div class="col-md-3 ingredient" ingredientName="${apiData.meals[index].strIngredient}">
                    <div class="areaIngredient text-white text-center border-1 border-secondary border py-3 px-2" style="height: 250px; overflow: hidden; display: flex; flex-direction: column; justify-content: center;">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3 class="fw-bold py-1 text-danger m-0">${apiData.meals[index].strIngredient}</h3>
                    <p>${shortDescription}</p>
                    </div>
                    </div>`;
    }
    // Update ingredientsContent with generated HTML
    ingredientsContent.innerHTML = datOfApI;

    // Add click event listeners to each ingredient item
    let ingredient = document.querySelectorAll('.ingredient');
    for (let i = 0; i < ingredient.length; i++) {
        ingredient[i].addEventListener('click', function (e) {
            let ingredientName =  this.getAttribute('ingredientName').toLowerCase();
            ingredientName = ingredientName.replace(/\s+/g, '_');
            getAllIngredientItem();
        });
    }
}

// Function to fetch and display all ingredient items based on selected ingredient
async function getAllIngredientItem(meal) {
    // Display loading indicator
    let mainLoader = document.querySelector('.mainLoader');
    if (mainLoader) {
        mainLoader.style.display = 'flex';
    }
    
    // Fetch data from API (example with fixed ingredient for demonstration)
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast`, {
        method: 'GET'
    });
    let apiData = await apiResponse.json();
    let datOfApI = ``;
    
    // Build HTML for ingredient items
    for (let index = 0; index < apiData.meals.length; index++) {
        datOfApI += `<div class="col-md-3 ingredient">
                <div class="ingredientItem rounded position-relative overflow-hidden">
                <div class="overlayer rounded justify-content-center align-items-center"> 
                <div class="centerContent ">
                <h3 class="px-2 fw-bold fs-3 m-0 text-danger text-center">${(apiData.meals[index].strMeal).split(" ").slice(0,3).join(" ")}</h3>
                </div>
                </div>
                <img src="${apiData.meals[index].strMealThumb}"  alt="${(apiData.meals[index].strMeal).split(" ").slice(0,3).join(" ")}" class="w-100  rounded">
                </div>
            </div>`;
    }
    // Update ingredientsContent with generated HTML
    ingredientsContent.innerHTML = datOfApI;

    // Add click event listeners to each ingredient item for further details
    let ingredient = document.querySelectorAll('.ingredient');
    for (let index = 0; index < ingredient.length; index++) {
        ingredient[index].addEventListener('click', function () {
            let idMeal = apiData.meals[index].idMeal;
            getDataByIdMeal(idMeal);
        });
    }
}

// Function to fetch and display detailed data of a specific meal by ID
async function getDataByIdMeal(idMeal) {
    // Display loading indicator
    let mainLoader = document.querySelector('.mainLoader');
    if (mainLoader) {
        mainLoader.style.display = 'flex';
    }
    
    // Fetch meal details from API
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`, {method: 'GET'});
    let apiData = await apiResponse.json();
    let meal = apiData.meals[0];

    // Build HTML for detailed meal information
    let subData = `<div class="col-md-4 ">
                    <div class="photoContainer rounded ">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100 rounded">
                        <h4 class="pt-3 fw-bold fs-3 text-danger ">${meal.strMeal}</h4>
                        </div>
                        </div> 
                        <div class="col-md-8 position-relative">
                        <button type="button" class="btn-close btn-close-white fs-5 position-absolute end-0 top-0 x-btn me-3 me-sm-0" id="x-btn"></button>
                         <div class="subContent text-white">
                        <h2>Instructions</h2>
                        <p>${meal.strInstructions}</p>
                        <h5 class="fw-bold">Area: <span class="fs-5 fw-normal">${meal.strArea}</span></h5>
                        <h5 class="fw-bold mt-3">Category: <span class="fs-5 fw-normal">${meal.strCategory}</span></h5>
                        <h5 class="my-3 fw-bold">Recipes:</h5>
                        <div class="Recipes row g-3 d-flex flex-wrap" id="recipes"></div>
                        <h5 class="my-3 fw-bold">Tags:</h5>
                        <span class="badge bg-opacity-75 bg-warning p-2 fs-6 my-2">${meal.strTags}</span>
                        <div class="btns pt-3">
                            <a href="${meal.strSource}" class="btn btn-success" target="_blank">Source</a>
                            <a href="${meal.strYoutube}" class="btn btn-danger ms-1" target="_blank">YouTube</a>
                        </div>
                    </div>
                 </div>`;

    // Update subContent with detailed meal information
    subContent.innerHTML = subData;

    // Hide ingredientsContent and show subContent
    ingredientsContent.classList.add('d-none');
    subContent.classList.remove('d-none');

    // Build HTML for recipes section
    let recipeData = ``;
    for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            recipeData += `<div class="col-md-4 col-12 ">
                            <div class="rounded bg-info p-2 fs-6"><span>${measure} ${ingredient}</span></div>
                           </div>`;
        }
    }
    
    // Update recipes section with generated HTML
    document.getElementById("recipes").innerHTML = recipeData;

    // Event listener for close button to return to ingredients list
    document.getElementById("x-btn").addEventListener('click', function () {
        ingredientsContent.classList.remove('d-none');
        subContent.classList.add('d-none');
    });
}

// Function to handle interactions with the aside panel
function aside() {
    // Cache selectors for better performance
    const $mainAside = $('#mainAside');
    const $subAside = $('#subAside');
    const $openAside = $('#openAside');
    const $closeAside = $('#clodeAside');

    // Function to open the side navigation
    function openSideNav() {
        $mainAside.animate({marginLeft: '0'}, 500);
        $subAside.animate({marginLeft: '250px'}, 500);

        $openAside.hide();
        $closeAside.show();

        // Example animation for ul li elements (replace with your specific selectors)
        for (let i = 0; i < 5; i++) {
            $("ul.links li").eq(i).animate({
                top: 0
            }, (i + 5) * 100);
        }

        // Animate search elements
        animateSearchElements('open');
    }

    // Function to close the side navigation
    function closeSideNav() {
        $mainAside.animate({marginLeft: '-250px'}, 500);
        $subAside.animate({marginLeft: '0px'}, 500, function() {
            $openAside.show();
            $closeAside.hide();
        });

        // Example animation for ul li elements (replace with your specific selectors)
        $("ul.links li").animate({
            top: 300
        }, 500);

        // Reverse animate search elements
        animateSearchElements('close');
    }

    // Function to animate search elements
    function animateSearchElements(action) {
        const $searchElements = $('.searchLink, .searchCategories, .searchArea, .SearchIngredients, .ContactUs');
        $searchElements.each(function (i) {
            const animationProps = (action === 'open') ? { top: '0px' } : { top: '300px' };
            $(this).animate(animationProps, (i + 1) * 150);
        });
    }

    // Event handlers for aside buttons
    $openAside.on('click', function (e) {
        openSideNav();
    });

    $closeAside.on('click', function (e) {
        closeSideNav();
    });

    // Initial setup to hide aside and set initial state
    $mainAside.css({marginLeft: '-250px'});
    $subAside.css({marginLeft: '0px'});
    $openAside.show();
    $closeAside.hide();

    // Ensure search elements are initially hidden
    $('.searchLink, .searchCategories, .searchArea, .SearchIngredients, .ContactUs').css({ top: '1000px' });
}

// Initial function calls
getAllIngredients();  // Fetch and display initial ingredients
aside();  // Initialize aside panel functionality
