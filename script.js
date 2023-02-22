"use strict";
const form = document.querySelector(".card-info");
const thankYouCard = document.querySelector(".thank-you");
const btnContinue = document.querySelector(".continue");

const nameInput = document.querySelector('input[name="name"]');
const numberInput = document.querySelector('input[name="card-number"]');
const monthInput = document.querySelector('input[name="month"]');
const yearInput = document.querySelector('input[name="year"]');
const cvcInput = document.querySelector('input[name="cvc-number"]');

const cardNumber = document.querySelector("#number");
const cardHolder = document.querySelector("#cardholder");
const cardDateMonth = document.querySelector("#date-month");
const cardDateYear = document.querySelector("#date-year");
const cardCvc = document.querySelector("#cvc");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (validForm()) {
    form.classList.add("hidden");
    thankYouCard.classList.remove("hidden");
  }
});
nameInput.addEventListener("input", nameValidation);
numberInput.addEventListener("input", numberValidation);
monthInput.addEventListener("input", monthValidation);
yearInput.addEventListener("input", yearValidation);
cvcInput.addEventListener("input", cvcValidation);

btnContinue.addEventListener("click", () => document.location.reload());

// NAME
function checkName(element) {
  const patern = /^[a-zA-Z]+\s[a-zA-Z-\s]+$/;
  return patern.test(element.value);
}

function nameValidation() {
  updateName(this);
  if (!this.value) {
    displayError(this);
    return false;
  } else if (!checkName(this)) {
    displayError(this, "Invalid name");
    return false;
  } else {
    validInput(this);
    return true;
  }

  function updateName(element) {
    if (!element.value) {
      cardHolder.textContent = "jane appleseed";
    } else cardHolder.textContent = element.value;
  }
}

// CARD NUMBER
function cardNumberFormat(element) {
  element.addEventListener("keypress", function (e) {
    const backspace = e.key === "Backspace";
    if (!backspace && element.value.length === 4) {
      element.value = element.value + " ";
    } else if (!backspace && element.value.length === 9) {
      element.value = element.value + " ";
    } else if (!backspace && element.value.length === 14) {
      element.value = element.value + " ";
    }
  });
}
function checkNumber(element) {
  const pattern = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
  return pattern.test(element.value);
}
function numberValidation() {
  cardNumberFormat(this);
  updateNumber(this);
  if (!this.value) {
    displayError(this);
    return false;
  } else if (!checkNumber(this)) {
    displayError(this, "Wrong format, numbers only");
    return false;
  } else {
    validInput(this);
    return true;
  }
}

function updateNumber(element) {
  if (!element.value) {
    cardNumber.textContent = "0000 0000 0000 0000";
  } else cardNumber.textContent = element.value;
}

// DATE
function checkMonth(element) {
  const pattern = /^(0?[1-9]|1[012])$/;
  return pattern.test(element.value);
}
function monthValidation() {
  updateDate(cardDateMonth, this);
  if (!this.value) {
    displayError(this);
    return false;
  } else if (!checkMonth(this)) {
    displayError(this, "Chose between 1 - 12");
    return false;
  } else {
    validInput(this);
    return true;
  }
}

function checkYear(element) {
  const pattern = /([1-9].{0,2})/;
  return pattern.test(element.value);
}
function yearValidation() {
  updateDate(cardDateYear, this);
  if (!this.value) {
    displayError(this);
    return false;
  } else if (!checkYear(this)) {
    displayError(this, "Chose between 1 - 99");
    return false;
  } else {
    validInput(this);
    return true;
  }
}

function updateDate(out, element) {
  const formated = removeZero(element);
  if (!element.value) {
    out.textContent = "00";
  } else if (Number(element.value) <= 9) {
    out.textContent = "0" + formated;
  } else {
    out.textContent = formated;
  }
}

function removeZero(element) {
  let correct = element.value;
  while (correct.charAt(0) === "0") {
    correct = correct.substring(1);
  }
  return correct;
}

// CVC
function checkCvc(element) {
  const pattern = /\d{3}/;
  return pattern.test(element.value);
}
function cvcValidation() {
  updateCvc(this);
  if (!this.value) {
    displayError(this);
    return false;
  } else if (!checkCvc(this)) {
    displayError(this, "Inavalid CVC! Chose between 000-999");
    return false;
  } else {
    validInput(this);
    return true;
  }
}
function updateCvc(element) {
  if (!element.value) {
    cardCvc.textContent = "000";
  } else cardCvc.textContent = element.value;
}

// ERROR
function displayError(element, message = "Can't be blank") {
  element.ariaInvalid = "true";
  const inputField = element;
  const error = inputField.parentElement.querySelector(".error-msg");
  inputField.classList.remove("valid");
  inputField.classList.add("error");
  error.children[0].textContent = `${message}`;
}

//VALID
function validInput(element) {
  element.ariaInvalid = "false";
  const inputField = element;
  const error = inputField.parentElement.querySelector(".error-msg");
  inputField.classList.remove("error");
  inputField.classList.add("valid");
  error.children[0].textContent = "";
}

function validForm() {
  const nameSubmit = nameValidation.bind(nameInput)();
  const numberSumbit = numberValidation.bind(numberInput)();
  const monthSubmit = monthValidation.bind(monthInput)();
  const yearSubmit = yearValidation.bind(yearInput)();
  const cvcSubmit = cvcValidation.bind(cvcInput)();
  if (!(nameSubmit && numberSumbit && monthSubmit && yearSubmit && cvcSubmit))
    return false;
  return true;
}
