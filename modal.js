function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const form = document.querySelector('form[name="reserve"]');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// TO CLOSE MODAL

// DOM Element to close modal
const closeModalBtn = document.querySelector(".close");

// Close modal event
closeModalBtn.addEventListener("click", closeModal);
window.addEventListener("click", outsideClick);

// Close modal if click on cross
function closeModal() {
  modalbg.style.display = "none";
}

// Close modal if outside click
function outsideClick(e) {
  if (e.target == modalbg) {
    modalbg.style.display = "none";
  }
}

// TO SHOW OR HIDE AN ERROR MESSAGE

// Function for displaying an error message
function showErrorMessage(element, message) {
	element.parentElement.setAttribute('data-error-visible', 'true');
	element.parentElement.setAttribute('data-error', message);
}

// Function to hide an error message
function hideErrorMessage(element) {
	element.parentElement.removeAttribute('data-error-visible');
	element.parentElement.removeAttribute('data-error');
}

// TO VALIDATE THE FORM

// DOM Elements for the form

const firstname = document.getElementById('first');
const lastname = document.getElementById('last');
const email = document.getElementById('email');
const birthdate = document.getElementById('birthdate');
const quantity = document.getElementById('quantity');
const cities = document.querySelectorAll("input[name='location']");
const conditions = document.getElementById('checkbox1');

// Form variables

const regexFirstLast = new RegExp('^[A-ZÀ-ÖØ-Ý][a-zà-öø-ý]*(?:[- ][A-ZÀ-ÖØ-Ý][a-zà-öø-ý]*)?$');
const regexEmail = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-z]{2,4}$');

// Checking the first name

function checkFirstName(firstname) {
	if (!regexFirstLast.test(firstname.value) || firstname.value.length < 2 || firstname.value.length > 50) {
		showErrorMessage(
			firstname,
			'Le prénom doit contenir entre 2 et 50 caractères et commencer par une majuscule.',
		);
		return false;
	} 

	hideErrorMessage(firstname);
	return true;
}

// Checking the last name

function checkLastName(lastname) {
	if (!regexFirstLast.test(lastname.value) || lastname.value.length < 2 || lastname.value.length > 50) {
		showErrorMessage(
			lastname,
			'Le nom doit contenir entre 2 et 50 caractères et commencer par une majuscule.',
		);
		return false;
	}

	hideErrorMessage(lastname);
	return true;
}

// Checking the email

function checkEmail(email) {
	if (!regexEmail.test(email.value)) {
		showErrorMessage(
			email,
			'Veuillez renseigner une adresse mail valide.',
		);
		return false;
	} 
  
	hideErrorMessage(email);
	return true;
}

// Validate the form

function validate() {
	const isFirstNameValid = checkFirstName(firstname);
	const isLastNameValid = checkLastName(lastname);
	const isEmailValid = checkEmail(email);

	return (
		isFirstNameValid &&
		isLastNameValid &&
		isEmailValid
	);
}

form.onsubmit = (e) => {
  e.preventDefault();

  if (validate()) {
    modalbg.style.display = 'none';
    form.reset();
  }

  return false;
};
