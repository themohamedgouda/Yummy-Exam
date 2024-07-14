// DOM Elements
const inputName = document.getElementById('inputName');
const inputEmail = document.getElementById('inputEmail');
const inputPhone = document.getElementById('inputPhone');
const inputAge = document.getElementById('inputAge');
const inputPassword = document.getElementById('inputPassword');
const inputRepassword = document.getElementById('inputRepassword');
const alertName = document.getElementById('alertName');
const alertEmail = document.getElementById('alertEmail');
const alertPhone = document.getElementById('alertPhone');
const alertAge = document.getElementById('alertAge');
const alertPassword = document.getElementById('alertPassword');
const alertRepassword = document.getElementById('alertRepassword');
const alertSuccess = document.getElementById('alertSuccess');
const formBtn = document.getElementById('formBtn');

// Event listeners with validation, class application, and alerts
inputName.addEventListener('input', function() {
    // Regular expression to validate name (at least 2 alphabetical characters or spaces)
    const regex = /^[a-zA-Z\s]{2,}$/;
    const isValid = regex.test(inputName.value.trim());
    validateAndApplyClass(inputName, isValid);
    showAlert(alertName, isValid);
    checkFormValidity();
});

inputEmail.addEventListener('input', function() {
    // Regular expression to validate email address
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(inputEmail.value.trim());
    validateAndApplyClass(inputEmail, isValid);
    showAlert(alertEmail, isValid);
    checkFormValidity();
});

inputPhone.addEventListener('input', function() {
    // Regular expression to validate Egyptian mobile numbers
    const regex = /^(?:\+?20|20|0)?(10|11|12|15)\d{8}$/;
    const isValid = regex.test(inputPhone.value.trim());
    validateAndApplyClass(inputPhone, isValid);
    showAlert(alertPhone, isValid);
    checkFormValidity();
});

inputAge.addEventListener('input', function() {
    // Regular expression to validate age (1 to 3 digits)
    const regex = /^\d{1,3}$/;
    const isValid = regex.test(inputAge.value.trim());
    validateAndApplyClass(inputAge, isValid);
    showAlert(alertAge, isValid);
    checkFormValidity();
});

inputPassword.addEventListener('input', function() {
    // Regular expression to validate password (8+ characters, with letters, digits, and special characters)
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValid = regex.test(inputPassword.value);
    validateAndApplyClass(inputPassword, isValid);
    showAlert(alertPassword, isValid);
    checkFormValidity();
});

inputRepassword.addEventListener('input', function() {
    // Check if the re-entered password matches the original password
    const password = inputPassword.value;
    const repassword = inputRepassword.value;
    const isValid = password === repassword ? 1 : 0;
    validateAndApplyClass(inputRepassword, isValid);
    showAlert(alertRepassword, isValid);
    checkFormValidity();
});

// Function to validate and apply Bootstrap classes
function validateAndApplyClass(inputElement, isValid) {
    inputElement.classList.remove('is-valid', 'is-invalid');
    if (isValid) {
        inputElement.classList.add('is-valid');
    } else {
        inputElement.classList.add('is-invalid');
    }
}

// Function to show/hide alerts based on validation result
function showAlert(alertElement, isValid) {
    if (isValid) {
        alertElement.style.display = 'none'; // Hide the alert if input is valid
    } else {
        alertElement.style.display = 'block'; // Show the alert if input is invalid
    }
}

// Function to check form validity and enable/disable submit button
function checkFormValidity() {
    // Validate all form fields and enable/disable submit button accordingly
    const isValidName = /^[a-zA-Z\s]{2,}$/.test(inputName.value.trim());
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEmail.value.trim());
    const isValidPhone = /^(\+?20|20|0)?\d{10}$/.test(inputPhone.value.trim());
    const isValidAge = /^\d{1,3}$/.test(inputAge.value.trim());
    const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(inputPassword.value);
    const isValidRepassword = inputPassword.value === inputRepassword.value;
    
    if (isValidName && isValidEmail && isValidPhone && isValidAge && isValidPassword && isValidRepassword) {
        formBtn.removeAttribute('disabled'); // Enable submit button if all fields are valid
    } else {
        formBtn.setAttribute('disabled', 'disabled'); // Disable submit button if any field is invalid
    }
}

// Event listener for form submission
document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Remove all is-valid and is-invalid classes from form inputs
    inputName.classList.remove('is-valid', 'is-invalid');
    inputEmail.classList.remove('is-valid', 'is-invalid');
    inputPhone.classList.remove('is-valid', 'is-invalid');
    inputAge.classList.remove('is-valid', 'is-invalid');
    inputPassword.classList.remove('is-valid', 'is-invalid');
    inputRepassword.classList.remove('is-valid', 'is-invalid');

    // Disable the form button after submission
    formBtn.setAttribute('disabled', 'disabled');

    // Reset form validation alerts
    alertName.style.display = 'none';
    alertEmail.style.display = 'none';
    alertPhone.style.display = 'none';
    alertAge.style.display = 'none';
    alertPassword.style.display = 'none';
    alertRepassword.style.display = 'none';

    // Reset form and show success alert
    this.reset(); // Reset form fields
    alertSuccess.style.display = 'block'; // Show success alert

    // Optional: Hide success alert after a few seconds
    setTimeout(function() {
        alertSuccess.style.display = 'none';
    }, 5000); // Hide after 5 seconds (5000 milliseconds)
});

// Aside Panel Functionality
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

// Call the aside function to initialize sidebar functionality
aside();
