const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordStrength = document.getElementById("passwordStrength");

// EMAIL CHECK
emailInput.addEventListener("keyup", () => {
    const email = emailInput.value;
    const atIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");

    if (
        atIndex === -1 ||
        dotIndex === -1 ||
        dotIndex < atIndex + 1 ||
        email.length - dotIndex - 1 < 2
    ) {
        emailError.textContent =
            "იმეილი უნდა შეიცავდეს @ და . სიმბოლოებს";
    } else {
        emailError.textContent = "";
    }


    
});

// PASSWORD STRENGTH
passwordInput.addEventListener("keyup", () => {
    const value = passwordInput.value;

    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const onlyLetters = /^[A-Za-z]+$/.test(value);

    if (onlyLetters) {
        passwordStrength.textContent = "Weak password";
        passwordStrength.style.color = "red";
    } else if (hasLower && hasUpper && hasNumber) {
        passwordStrength.textContent = "Strong password";
        passwordStrength.style.color = "green";
    } else if ((hasLower || hasUpper) && hasNumber) {
        passwordStrength.textContent = "Medium password";
        passwordStrength.style.color = "orange";
    } else {
        passwordStrength.textContent = "";
    }
});

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // save user data
    localStorage.setItem("authEmail", emailInput.value);
    localStorage.setItem("authPassword", passwordInput.value);

    // go to main page
    window.location.href = "main.html";
});




