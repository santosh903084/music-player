const termsCheckbox = document.getElementById('terms');
const signupButton = document.getElementById('signup-button');

// Add an event listener to the checkbox for changes
termsCheckbox.addEventListener('change', function () {
    // Check if the checkbox is checked
    if (termsCheckbox.checked) {
        // If checked, enable the signup button
        signupButton.removeAttribute('disabled');
    } else {
        // If not checked, disable the signup button
        signupButton.setAttribute('disabled', 'disabled');
    }
});

// Add an event listener to the signup form for submission (just for demonstration)
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from actually submitting
    alert('Signup form submitted!');
    // Here, you can perform further form submission actions.
});