function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements to open and close modal form
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const input = document.querySelectorAll("input");
const closeModalBtn = document.querySelector(".close");
const body = document.querySelector("body");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  body.style.overflow = "hidden";
}

// TO CLOSE MODAL

// Close modal event
closeModalBtn.addEventListener("click", closeModal);
window.addEventListener("click", closeModal);

// Close modal if outside click or click on cross
function closeModal(e) {
  if (e.target == modalbg || e.target == closeModalBtn) {
    modalbg.style.display = "none";
	body.style.overflow = "auto";
	input.forEach((input) => {
        hideErrorMessage(input);
    });
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
const form = document.querySelector('form[name="reserve"]');

// Form variables

const regexFirstLast = new RegExp('^[A-ZÀ-ÖØ-Ý][a-zà-öø-ý]*(?:[- ][A-ZÀ-ÖØ-Ý][a-zà-öø-ý]*)?$');
const regexEmail = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\\.[a-z]{2,4}$');

// First and last name check function

function checkName(name, inputType) {
	switch (true) {
	  case !regexFirstLast.test(name.value):
		showErrorMessage(
		  name,
		  `Le ${inputType} doit commencer par une majuscule et ne pas avoir de caractère spécial.`
		);
		return false;
	  case name.value.length < 2:
		showErrorMessage(
		  name,
		  `Le ${inputType} doit avoir au moins deux lettres.`
		);
		return false;
	  case name.value.length > 50:
		showErrorMessage(
		  name,
		  `Le ${inputType} doit être moins long.`
		);
		return false;
	  default:
		hideErrorMessage(name);
		return true;
	}
}
  
// Checking the first name
  
function checkFirstName(firstname) {
	return checkName(firstname, 'prénom');
}
  
// Checking the last name
  
function checkLastName(lastname) {
	return checkName(lastname, 'nom');
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

// Checking the birthdate

function checkBirthdate(birthdate) {
	const userAge = calculateUserAge(birthdate);
  
	switch (true) {
		case !birthdate.value:
			showErrorMessage(
				birthdate,
				'Veuillez entrer votre date de naissance'
			);
			return false;
		case userAge < 18:
			showErrorMessage(
				birthdate,
				'Vous devez avoir plus de 18 ans pour participer'
			);
			return false;
		case userAge > 130:
			showErrorMessage(
				birthdate,
				"Vous n'êtes plus de ce monde pour participer"
			);
			return false;
		default:
			hideErrorMessage(birthdate);
			return true;
	}
}
  
// Calculation of the user's age

function calculateUserAge(birthdate) {
	const birthDate = new Date(birthdate.value);
	const today = new Date();
	
	let age = today.getFullYear() - birthDate.getFullYear();
	
	// Check if the user hasn't had their birthday yet this year
	if (today.getMonth() < birthDate.getMonth() || 
		(today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
		age--;
	}
	
	return age;
}
  
// Checking quantity

function checkQuantity(quantity) {
	if (quantity.value < 0 || quantity.value > 99 || quantity.value === "") {
		showErrorMessage(
			quantity,
			'Veuillez renseigner un nombre entre 0 et 99',
		);
		return false;
	}
  
	hideErrorMessage(quantity);
	return true;
}
  
// Checking cities

function checkCity(cities) {
	for (let i = 0; i < cities.length; i++) {
		if (cities[i].checked) {
			hideErrorMessage(cities[0]);
			return true;
		}
	}

	showErrorMessage(cities[0],'Veuillez sélectionner une ville');
	return false;
}
  
// Checking the terms of use

function checkConditions(conditions) {
	if (!conditions.checked) {
		showErrorMessage(
			conditions,
			"Vous devez accepter les conditions d'utilisation",
		);
		return false;
	}
  
	hideErrorMessage(conditions);
	return true;
}

// Validate the form

function validate() {
	const isFirstNameValid = checkFirstName(firstname);
	const isLastNameValid = checkLastName(lastname);
	const isEmailValid = checkEmail(email);
	const isBirthdateValid = checkBirthdate(birthdate);
	const isQuantityValid = checkQuantity(quantity);
  	const isCitySelected = checkCity(cities);
	const isConditionsValid = checkConditions(conditions);

	return (
		isFirstNameValid &&
		isLastNameValid &&
		isEmailValid &&
		isBirthdateValid &&
		isQuantityValid &&
    	isCitySelected &&
		isConditionsValid
	);
}

form.onsubmit = (e) => {
  e.preventDefault();

  if (validate()) {
	showSuccessModal();
    modalbg.style.display = 'none';
    form.reset();
  }

  return false;
};

// TO CREATE, DISPLAY AND REMOVE SUCCESS MODAL

function showSuccessModal() {
	const main = document.querySelector('main');
	const container = document.createElement('div');
	container.classList.add('bground');
	container.style.display = "block";
	body.style.overflow = "hidden";
	main.appendChild(container);
	container.innerHTML = `
		<div class="content content-success">
    		<span class="close close-btn"></span>
			<div class="modal-content">
				<h2>Merci pour <br> votre inscription</h2>
				<button class="btn-submit modal-btn close-btn">Fermer</button>
			</div>
		</div>
    `;

	const closeBtns = container.querySelectorAll('.close-btn');
	closeBtns.forEach((closeBtn) => {
		closeBtn.addEventListener('click', () => {
			body.style.overflow = "auto";
			container.remove();
		});
	});

}