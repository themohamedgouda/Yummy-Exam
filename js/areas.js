let areaContent = document.getElementById("areaContent");
let subContent = document.getElementById("subContent");
let xBtn = document.getElementById("x-btn");
let recipes = document.getElementById("recipes");
let data = [];

// Function to fetch and display all areas
async function getAllAreas() {
    // Show loading spinner
    let mainLoader = document.querySelector('.mainLoader');
    if (mainLoader) {
        mainLoader.style.display = 'flex';
    }
    
    // Fetch data from API
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`, {
        method: 'GET'
    });
    let apiData = await apiResponse.json();
    
    // Build HTML for each area
    let datOfApI = ``;
    for (let index = 0; index < apiData.meals.length; index++) {
        datOfApI += `<div class="col-md-3 col-6 area text-center" areaName="${apiData.meals[index].strArea}">
                        <div class="areaItem text-white">
                            <i class="fa-solid fa-house-laptop fa-4x"></i>
                            <h3 class="fw-bold py-1">${apiData.meals[index].strArea}</h3>
                        </div>
                    </div>`;
    }
    // Display areas in the UI
    areaContent.innerHTML = datOfApI;

    // Add click event listeners to each area for further details
    let area = document.querySelectorAll('.area');
    for (let i = 0; i < area.length; i++) {
        area[i].addEventListener('click', function (e) {
            let nameOfArea = this.getAttribute('areaName').toLowerCase();
            getAllAreaItem(nameOfArea);
        });
    }
}

// Function to fetch and display meals by specific area
async function getAllAreaItem(meal) {
    // Show loading spinner
    let mainLoader = document.querySelector('.mainLoader');
    if (mainLoader) {
        mainLoader.style.display = 'flex';
    }
    
    // Fetch data from API
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${meal}`, {
        method: 'GET'
    });
    let apiData = await apiResponse.json();
    
    // Build HTML for each meal
    let datOfApI = ``;
    for (let index = 0; index < apiData.meals.length; index++) {
        datOfApI += `<div class="col-md-3 area">
                        <div class="areaItem rounded position-relative overflow-hidden">
                            <div class="overlayer rounded justify-content-center align-items-center"> 
                                <div class="centerContent">
                                    <h3 class="px-2 fw-bold fs-3 m-0 text-danger text-center">${(apiData.meals[index].strMeal).split(" ").slice(0,3).join(" ")}</h3>
                                </div>
                            </div>
                            <img src="${apiData.meals[index].strMealThumb}"  alt="${(apiData.meals[index].strMeal).split(" ").slice(0,3).join(" ")}" class="w-100 rounded">
                        </div>
                    </div>`;
    }
    // Display meals in the UI
    areaContent.innerHTML = datOfApI;

    // Add click event listeners to each meal for detailed view
    let categoryMeal = document.querySelectorAll('.area');
    for (let index = 0; index < categoryMeal.length; index++) {
        categoryMeal[index].addEventListener('click', function () {
            let idMeal = apiData.meals[index].idMeal;
            getDataByIdMeal(idMeal);
        });
    }
}

// Function to fetch and display detailed meal information
async function getDataByIdMeal(idMeal) {
    // Show loading spinner
    let mainLoader = document.querySelector('.mainLoader');
    if (mainLoader) {
        mainLoader.style.display = 'flex';
    }
    
    // Fetch data from API
    let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`, { method: 'GET' });
    let apiData = await apiResponse.json();
    let meal = apiData.meals[0];

    // Build HTML for detailed meal view
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

    // Display detailed meal information in the UI
    subContent.innerHTML = subData;
    areaContent.classList.add('d-none');
    subContent.classList.remove('d-none');

    // Build HTML for ingredients and measures
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
    // Display ingredients in the UI
    document.getElementById("recipes").innerHTML = recipeData;

    // Event listener to close detailed view
    document.getElementById("x-btn").addEventListener('click', function () {
        areaContent.classList.remove('d-none');
        subContent.classList.add('d-none');
    });
}

// Function to handle aside panel animations and interactions
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
            $("ul.list-unstyled li").eq(i).animate({
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
        $("ul.list-unstyled li").animate({
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

// Call functions to initialize the page
getAllAreas();
aside();
