const form = document.querySelector("form");
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmInput = document.querySelector('#confirmPassword'); // confirm password
const emailError = document.createElement("small");
emailError.style.color = "red";
emailError.style.display = "block";
emailInput.after(emailError);

const passwordStrength = document.createElement("small");
passwordStrength.style.display = "block";
passwordInput.after(passwordStrength);

const confirmError = document.createElement("small");
confirmError.style.color = "red";
confirmError.style.display = "block";
confirmInput.after(confirmError);

// Email validation
function checkEmail(email) {
    const atIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");
    return atIndex !== -1 && dotIndex !== -1 && dotIndex > atIndex + 1 && email.length - dotIndex - 1 >= 2;
}

// Password strength
function checkPasswordStrength(password) {
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const onlyLetters = /^[A-Za-z]+$/.test(password);

    if (onlyLetters) return "Weak";
    if (hasLower && hasUpper && hasNumber) return "Strong";
    if ((hasLower || hasUpper) && hasNumber) return "Medium";
    return "Weak";
}

// Live checks
emailInput.addEventListener("keyup", () => {
    emailError.textContent = checkEmail(emailInput.value) ? "" : "იმეილი უნდა შეიცავდეს @ და . სიმბოლოებს და მინ. 2 სიმბოლო შემდეგ";
});

passwordInput.addEventListener("keyup", () => {
    const strength = checkPasswordStrength(passwordInput.value);
    passwordStrength.textContent = strength + " password";
    passwordStrength.style.color = strength === "Weak" ? "red" : strength === "Medium" ? "orange" : "green";
});

confirmInput.addEventListener("keyup", () => {
    confirmError.textContent = confirmInput.value !== passwordInput.value ? "პაროლები არ ემთხვევა" : "";
});

// Submit
form.addEventListener("submit", function(e) {
    e.preventDefault();

    if (!checkEmail(emailInput.value)) {
        emailError.textContent = "იმეილი არასწორია";
        return;
    }

    if (passwordInput.value !== confirmInput.value) {
        confirmError.textContent = "პაროლები არ ემთხვევა";
        return;
    }

    // collect all input data
    const inputs = form.querySelectorAll("input:not([type=submit])");
    const data = {};
    inputs.forEach(input => {
        const key = input.previousElementSibling.textContent || input.placeholder;
        data[key] = input.value;
    });

    // save to localStorage to use in main page
    localStorage.setItem("regData", JSON.stringify(data));

    // redirect to main.html
    window.location.href = "main.html";
});
