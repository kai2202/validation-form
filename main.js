const form = document.getElementById("form");

const fields = {
  username: document.getElementById("username"),
  email: document.getElementById("useremail"),
  password: document.getElementById("password"),
  confirm: document.getElementById("confirm"),
};

Object.values(fields).forEach((input) => {
  if (!input) return;
  let timerId;

  const debounced = function () {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
        validateField(input);
    }, 1000);
  };

  input.addEventListener("input", debounced);
});

function validateField(input) {
  switch (input.id) {
    case "username":
      return checkRequired(input, "Username không được để trống");

    case "useremail":
      return checkEmail(input);

    case "password":
      return checkPassword(input);

    case "confirm":
      return checkConfirm(fields.password, input);

    default:
      return true;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid = runValidators();

  if (isValid) {
    console.log("Submit OK");
  }
});

function runValidators() {
  let isValid = true;

  const validators = [() => checkRequired(fields.username, "Username không được để trống"), () => checkEmail(fields.email), () => checkPassword(fields.password), () => checkConfirm(fields.password, fields.confirm)];

  validators.forEach((validate) => {
    const result = validate();
    if (!result) isValid = false;
  });

  return isValid;
}

function checkRequired(input, message) {
  if (input.value.trim() === "") {
    return setErrorReturn(input, message);
  }
  setSuccess(input);
  return true;
}

function checkEmail(input) {
  const value = input.value.trim();

  if (value === "") {
    return setErrorReturn(input, "Email không được để trống");
  }

  if (!isEmail(value)) {
    return setErrorReturn(input, "Email không đúng định dạng");
  }

  setSuccess(input);
  return true;
}

function checkPassword(input) {
  const value = input.value.trim();

  if (value === "") {
    return setErrorReturn(input, "Mật khẩu không được để trống");
  }

  if (value.length < 6) {
    return setErrorReturn(input, "Mật khẩu phải ít nhất 6 ký tự");
  }

  setSuccess(input);
  return true;
}

function checkConfirm(passwordInput, confirmInput) {
  const password = passwordInput.value.trim();
  const confirm = confirmInput.value.trim();

  if (confirm === "") {
    return setErrorReturn(confirmInput, "Vui lòng xác nhận mật khẩu");
  }

  if (password !== confirm) {
    return setErrorReturn(confirmInput, "Mật khẩu không khớp");
  }

  setSuccess(confirmInput);
  return true;
}

function setError(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  small.innerText = message;

  formControl.classList.add("error");
  formControl.classList.remove("success");
}

function setErrorReturn(input, message) {
  setError(input, message);
  return false;
}

function setSuccess(input) {
  const formControl = input.parentElement;

  formControl.classList.add("success");
  formControl.classList.remove("error");
}

function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
