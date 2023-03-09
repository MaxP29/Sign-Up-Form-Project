// Elements

const claim = document.querySelector(".claim");
const form = document.querySelector(".form");
const inputs = document.querySelectorAll(".input");
const errorText = document.querySelectorAll(".error-text");
const cards = document.querySelector(`.cards`);
const icons = document.querySelectorAll(`.icons`);

// Results

let formResults = {};
let error = false;

// Functions

const results = function (firstName, lastName, email, password) {
  return (formResults = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });
};

const correct = function (inputNum) {
  inputs[inputNum].style.outline = "0.2rem solid green";
  icons[inputNum].style.display = "none";
  errorText[inputNum].style.display = "none";
};

const generalError = function (inputNum) {
  inputs[inputNum].placeholder = "";
  icons[inputNum].style.display = "flex";
  errorText[inputNum].style.display = "flex";
  inputs[inputNum].style.outline = "0.2rem solid hsl(0, 100%, 74%, 0.8)";
};

const emailError = function () {
  inputs[2].placeholder = "email@example/com";
  inputs[2].classList.add("email-error");
  icons[2].style.display = "flex";
  errorText[2].style.display = "flex";
  inputs[2].style.outline = "0.2rem solid hsl(0, 100%, 74%, 0.8)";
  inputs[2].value = "";
};

const noError = function () {
  errorText.forEach((error) => (error.style.display = "none"));
  icons.forEach((icon) => (icon.style.display = "none"));
  inputs.forEach((input) => {
    input.value = "";
    input.style.outline = "none";
    input.style.border = "0.5px solid hsl(246, 25%, 77%, 0.5)";
    input.classList.remove("email-error");
    input.placeholder = input.id;
  });
  claim.style.opacity = 1;
  cards.style.height = "60vh";
};

// Event Listener

claim.addEventListener(`click`, function (e) {
  e.preventDefault();

  // Stores Results
  results(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value);

  // Error Check
  if (
    formResults.firstName === "" ||
    formResults.lastName === "" ||
    formResults.email === "" ||
    !formResults.email.includes("@") ||
    formResults.password === ""
  ) {
    error = true;
    cards.style.height = "70vh";
    form.style.gap = "2rem";
  } else {
    error = false;
  }

  // Form Queries

  if (!error) {
    return noError();
  }

  // First Name - Error Handling
  if (formResults.firstName === "") {
    generalError(0);
  } else {
    correct(0);
  }

  // Last Name - Error Handling
  if (formResults.lastName === "") {
    generalError(1);
  } else {
    correct(1);
  }

  // Email - Error Handling
  if (
    formResults.email.length <= 8 ||
    !formResults.email.includes("@") ||
    !formResults.email.includes(".com")
  ) {
    emailError();
  } else {
    correct(2);
  }

  // Password - Error Handling
  if (formResults.password === "") {
    generalError(3);
  } else {
    correct(3);
  }
});
