// DOM Elements
let mainContent = document.getElementById("mainContent");
let subContent = document.getElementById("subContent");
let xBtn = document.getElementById("x-btn");
let Searchform = document.getElementById("Searchform")
let recipes = document.getElementById("recipes");
let searchByName = document.getElementById("searchByName")
let searchByFirstLetter = document.getElementById("searchByFirstLetter")
let data = [];
let value = ``

// Function to fetch and display data from API based on search value
async function getAllData(value) {
    let mainLoader = document.querySelector('.mainLoader');
    if (mainLoader) {
        mainLoader.style.display = 'flex';
    }
    try {
        let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`, {
            method: 'GET'
        });
        let apiData = await apiResponse.json();

        if (!apiData.meals) {
            console.error('No meals found for the given value.');
            // Display error message if no meals found
            let errorMessage = document.createElement('h1');
            errorMessage.style.color = 'white';
            errorMessage.style.fontWeight = 'bold';
            errorMessage.style.textAlign = 'center';
            errorMessage.textContent = 'No meals found for the given value.';
            mainContent.innerHTML = '';
            mainContent.appendChild(errorMessage);
            return;
        }

        let datOfApI = ``;
        for (let index = 0; index < apiData.meals.length; index++) {
            // Construct HTML for each meal item
            datOfApI += `<div class="col-md-3 gallary">
                            <div class="gallaryItem rounded position-relative overflow-hidden">
                                <div class="overlayer rounded align-items-center justify-content-center"> 
                                    <span class="p-3 fw-bolder fs-3 text-danger">${apiData.meals[index].strMeal}</span>
                                </div>
                                <img src="${apiData.meals[index].strMealThumb}" alt="${apiData.meals[index].strMeal}" class="w-100 rounded">
                            </div>
                        </div>`;
        }
        mainContent.innerHTML = datOfApI;
        displaySubContent(apiData.meals);

    } catch (error) {
        console.error('Error fetching data:', error);
        // Display error message if fetch fails
        let errorMessage = document.createElement('h1');
        errorMessage.style.color = 'white';
        errorMessage.style.fontWeight = 'bold';
        errorMessage.style.textAlign = 'center';
        errorMessage.textContent = 'No meals found for the given value.';
        mainContent.innerHTML = '';
        mainContent.appendChild(errorMessage);
    } finally {
        if (mainLoader) {
            mainLoader.style.display = 'none';
        }
    }
}

// Function to display detailed content when a meal item is clicked
function displaySubContent(meals) {
    let gallary = document.querySelectorAll('.gallary');
    for (let index = 0; index < gallary.length; index++) {
        gallary[index].addEventListener('click', function () {
            let meal = meals[index];
            // Construct HTML for detailed meal information
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

            subContent.innerHTML = subData;
            mainContent.classList.add('d-none');
            subContent.classList.remove('d-none');

            // Populate recipes section with ingredients and measurements
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
            document.getElementById("recipes").innerHTML = recipeData;

            // Event listener for close button in detailed view
            document.getElementById("x-btn").addEventListener('click', function () {
                mainContent.classList.remove('d-none');
                subContent.classList.add('d-none');
            });
        });
    }
}

// Event listeners for input changes in search fields
searchByFirstLetter.addEventListener('input', function () {
    getAllData(this.value)
})
searchByName.addEventListener('input', function () {
    getAllData(this.value)
})

// Function to handle aside panel animations and interactions
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

// Initialize aside functionality
aside();
