const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("Email");
const pass = document.getElementById("Password");
const pass2 = document.getElementById("password2");

// show the error
const showError = (input, msg) => {
  const formcontrol = input.parentElement;
  formcontrol.className = "form-control error";
  const small = formcontrol.querySelector("small");
  small.innerText = msg;
};

// show the success
const showSuccess = (input) => {
  const formcontrol = input.parentElement;
  formcontrol.className = "form-control success";
};

// check if the email valid
const isValidEmail = (input) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email Is Not Valid");
  }
};

// check required field
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is Required`);
    } else {
      showSuccess(input);
    }
  });
}

// check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} Characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} Characters`
    );
  } else {
    showSuccess(input);
  }
}

// check password match
function checkPass(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "password Do Not Match");
  }
}

// get Field Name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkRequired([username, email, pass, pass2]);
  checkLength(username, 3, 15);
  checkLength(pass, 6, 25);
  isValidEmail(email);
  checkPass(pass, pass2);
});
