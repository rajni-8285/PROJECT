let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');
let cityInput = document.getElementById('city');

// Get the form and the next button
let form = document.querySelector('form');
let nextButton = document.querySelector('a[href$="next"] button');

// Add event listener to the next button
nextButton.addEventListener('click', function (e) {
    if (!nameInput.value || !emailInput.value || !passwordInput.value || !cityInput.value.trim()) {
        e.preventDefault(); // prevent redirection
        alert("Please fill in all the fields before proceeding.");
    } else {
        form.submit(); // if all fields are filled, submit the form
    }
});