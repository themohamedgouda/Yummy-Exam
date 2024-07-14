// DOM elements
let mainContent = document.getElementById("mainContent");
let subContent = document.getElementById("subContent");
let cotogeryContent = document.getElementById("cotogeryContent");
let xBtn = document.getElementById("x-btn"); // Close button for detailed view
let recipes = document.getElementById("recipes"); // Container for recipe details
let data = []; // Array to store fetched data

// Function to fetch and display all categories
async function getAllCategories() {
    // Show main loader if available
    let mainLoader = document.querySelector('.mainLoader');
    if (mainLoader) {
        mainLoader.style.display = 'flex';
    }

    // Fetch API data for categories
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`, {
        method: 'GET'
    });
    let apiData = await apiResponse.json();
    let datOfApI = ``;

    // Loop through fetched categories and generate HTML
    for (let index = 0; index < apiData.categories.length; index++) {
        // Construct HTML for each category item
        datOfApI += `<div class="col-md-3 category" idName="${apiData.categories[index].strCategory}">
                <div class="categoryItem rounded position-relative overflow-hidden">
                    <div class="overlayer py-2 rounded justify-content-center"> 
                        <div class="centerContent">
                            <h3 class="px-2 fw-bold fs-3 m-0 text-danger text-center">${apiData.categories[index].strCategory}</h3>
                            <p class="text-body-emphasis ps-1 py-1 text-center">${(apiData.categories[index].strCategoryDescription).split(" ").slice(0, 19).join(" ")}</p>
                        </div>
                    </div>
                    <img src="${apiData.categories[index].strCategoryThumb}" alt="${apiData.categories[index].strCategory}" class="w-100 rounded">
                </div>
            </div>`;
    }
    cotogeryContent.innerHTML = datOfApI;

    // Add event listeners to each category item for click
    let category = document.querySelectorAll('.category');
    for (let i = 0; i < category.length; i++) {
        category[i].addEventListener('click', function (e) {
            let nameOfCategory = this.getAttribute('idName').toLowerCase();
            getAllCategoryItem(nameOfCategory);
        });
    }
}

// Function to fetch and display items for a specific category
async function getAllCategoryItem(meals) {
    let mainLoader = document.querySelector('.mainLoader');
    if (mainLoader) {
        mainLoader.style.display = 'flex';
    }

    // Fetch API data for specific category items
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meals}`, {
        method: 'GET'
    });
    let apiData = await apiResponse.json();
    let datOfApI = ``;

    // Loop through fetched items and generate HTML
    for (let index = 0; index < apiData.meals.length; index++) {
        datOfApI += `<div class="col-md-3 category">
                <div class="categoryItem rounded position-relative overflow-hidden">
                    <div class="overlayer rounded justify-content-center align-items-center"> 
                        <div class="centerContent">
                            <h3 class="px-2 fw-bold fs-3 m-0 text-danger text-center">${(apiData.meals[index].strMeal).split(" ").slice(0, 3).join(" ")}</h3>
                        </div>
                    </div>
                    <img src="${apiData.meals[index].strMealThumb}" alt="${(apiData.meals[index].strMeal).split(" ").slice(0, 3).join(" ")}" class="w-100 rounded">
                </div>
            </div>`;
    }
    cotogeryContent.innerHTML = datOfApI;

    // Add event listeners to each item for click
    let categoryMeal = document.querySelectorAll('.category');
    for (let index = 0; index < categoryMeal.length; index++) {
        categoryMeal[index].addEventListener('click', function () {
            let idMeal = apiData.meals[index].idMeal;
            getDataByIdMeal(idMeal);
        });
    }
}

// Function to fetch and display detailed data for a specific item
async function getDataByIdMeal(idMeal) {
    let mainLoader = document.querySelector('.mainLoader');
    if (mainLoader) {
        mainLoader.style.display = 'flex';
    }

    // Fetch API data for specific item details
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`, {
        method: 'GET'
    });
    let apiData = await apiResponse.json();
    let meal = apiData.meals[0];

    // Construct HTML for detailed view of item
    let subData = `<div class="col-md-4">
                    <div class="photoContainer rounded">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="w-100 rounded">
                        <h4 class="pt-3 fw-bold fs-3 text-danger">${meal.strMeal}</h4>
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

    // Update subContent with detailed view HTML
    subContent.innerHTML = subData;

    // Hide category content and show detailed view
    cotogeryContent.classList.add('d-none');
    subContent.classList.remove('d-none');

    // Generate HTML for ingredients and measurements
    let recipeData = ``;
    for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            recipeData += `<div class="col-md-4 col-12">
                            <div class="rounded bg-info p-2 fs-6"><span>${measure} ${ingredient}</span></div>
                        </div>`;
        }
    }
    // Update recipes container with ingredients HTML
    document.getElementById("recipes").innerHTML = recipeData;

    // Add event listener to close button to return to category content view
    document.getElementById("x-btn").addEventListener('click', function () {
        cotogeryContent.classList.remove('d-none');
        subContent.classList.add('d-none');
    });
}

// Function to handle aside navigation functionality
function aside() {
    // Cache selectors for better performance
    const $mainAside = $('#mainAside');
    const $subAside = $('#subAside');
    const $openAside = $('#openAside');
    const $closeAside = $('#clodeAside');

    // Function to open the side navigation
    function openSideNav() {
        $mainAside.animate({ marginLeft: '0' }, 500);
        $subAside.animate({ marginLeft: '250px' }, 500);

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
        $mainAside.animate({ marginLeft: '-250px' }, 500);
        $subAside.animate({ marginLeft: '0px' }, 500, function () {
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
    $mainAside.css({ marginLeft: '-250px' });
    $subAside.css({ marginLeft: '0px' });
    $openAside.show();
    $closeAside.hide();

    // Ensure search elements are initially hidden
    $('.searchLink, .searchCategories, .searchArea, .SearchIngredients, .ContactUs').css({ top: '1000px' });
}

// Initial function calls
getAllCategories(); // Fetch and display categories
aside(); // Initialize aside navigation functionality
