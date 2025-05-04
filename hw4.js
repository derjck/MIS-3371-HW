/******************************************
 * Hw4.js – Patient Registration Form Validation
 ******************************************/

// Display the current date in header
function displayDate() {
    const today = new Date();
    document.getElementById("date").innerText = today.toLocaleDateString("en-US");
}

// Helper functions
function showError(elementId, message) {
    var errorElement = document.getElementById(elementId + "Error");
    if (errorElement) {
        errorElement.innerText = message;
    } else {
        console.error("Error element for " + elementId + " not found.");
    }
}

function clearError(elementId) {
    var errorElement = document.getElementById(elementId + "Error");
    if (errorElement) {
        errorElement.innerText = "";
    }
}

/******************************************
 * Field Validation Functions
 ******************************************/

// First Name: Required, 1–30 characters, letters, apostrophes, and dashes only.
function validateFirstName() {
    var fn = document.getElementById("firstName");
    var pattern = /^[A-Za-z'-]{1,30}$/;
    if(fn.value.trim() === "") {
        showError("firstName", "First name is required.");
        return false;
    }
    if(!pattern.test(fn.value)) {
        showError("firstName", "Use only letters, apostrophes, and dashes (1–30 chars).");
        return false;
    }
    clearError("firstName");
    return true;
}

// Middle Initial: Optional; if entered must be exactly one letter.
function validateMiddleInitial() {
    var mi = document.getElementById("middleInitial");
    var pattern = /^[A-Za-z]?$/;  // empty or one letter only
    if(mi.value !== "" && !pattern.test(mi.value)) {
        showError("middleInitial", "Middle initial must be a single letter (no numbers).");
        return false;
    }
    clearError("middleInitial");
    return true;
}

// Last Name: Required, 1–30 characters, letters, apostrophes, and dashes only.
function validateLastName() {
    var ln = document.getElementById("lastName");
    var pattern = /^[A-Za-z'-]{1,30}$/;
    if(ln.value.trim() === "") {
        showError("lastName", "Last name is required.");
        return false;
    }
    if(!pattern.test(ln.value)) {
        showError("lastName", "Use only letters, apostrophes, and dashes (1–30 chars).");
        return false;
    }
    clearError("lastName");
    return true;
}

// Date of Birth: Required, must not be in the future, and cannot be more than 100 years old.
function validateDOB() {
    var dob = document.getElementById("DOB");
    if (dob.value.trim() === "") {
        showError("DOB", "Date of Birth is required.");
        return false;
    }
    var dobDate = new Date(dob.value);
    var today = new Date();
    
    // Check that DOB is not in the future.
    if (dobDate > today) {
        showError("DOB", "Date of Birth cannot be in the future.");
        return false;
    }
    
    // Check that DOB is at least 100 days old.
    var hundredDaysAgo = new Date(today);
    hundredDaysAgo.setDate(today.getDate() - 100);
    if (dobDate > hundredDaysAgo) {
        showError("DOB", "Date of Birth must be at least 100 days old.");
        return false;
    }
    
    // Check that DOB is not older than 100 years.
    var hundredYearsAgo = new Date(today);
    hundredYearsAgo.setFullYear(today.getFullYear() - 100);
    if (dobDate < hundredYearsAgo) {
        showError("DOB", "Date of Birth cannot be more than 100 years old.");
        return false;
    }
    
    clearError("DOB");
    return true;
}


// SSN: Required, exactly 9 digits; auto-format as XXX-XX-XXXX.
function validateSSN() {
    var ssn = document.getElementById("ssn");
    var value = ssn.value.trim();
    if(value === "") {
        showError("ssn", "SSN is required.");
        return false;
    }
    var digits = value.replace(/\D/g, "");
    if(digits.length !== 9) {
        showError("ssn", "SSN must be exactly 9 digits.");
        return false;
    }
    ssn.value = digits.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3");
    clearError("ssn");
    return true;
}

// Address Line 1: Required, 2–30 characters.
function validateAddress1() {
    var addr1 = document.getElementById("address");
    var value = addr1.value.trim();
    if(value === "") {
        showError("address", "Address is required.");
        return false;
    }
    if(value.length < 2 || value.length > 30) {
        showError("address", "Address must be 2–30 characters.");
        return false;
    }
    clearError("address");
    return true;
}

function attachSSNListener() {
    var ssnField = document.getElementById("ssn");
    if(!ssnField) {
        console.error("SSN field not found.");
        return;
    }
    ssnField.addEventListener("input", function() {
        var original = this.value;
        // Allow dash because the formatted output may include them.
        if (/[^\d-]/.test(original)) {
            showError("ssn", "Please enter numbers only.");
        } else {
            clearError("ssn");
        }
        var digits = original.replace(/\D/g, "");
        if(digits.length > 9) {
            digits = digits.substring(0, 9);
        }
        // Update the field.
        this.value = digits;
        // Auto-format when exactly 9 digits are entered.
        if (digits.length === 9) {
            this.value = digits.replace(/(\d{3})(\d{2})(\d{4})/, "$1-$2-$3");
        }
        validateSSN();
    });
}


// Address Line 2: Optional; if entered, 2–30 characters.
function validateAddress2() {
    var addr2 = document.getElementById("address2");
    var value = addr2.value.trim();
    if(value !== "" && (value.length < 2 || value.length > 30)) {
        showError("address2", "Address Line 2 must be 2–30 characters if provided.");
        return false;
    }
    clearError("address2");
    return true;
}

// City: Required, 2–30 characters.
function validateCity() {
    var city = document.getElementById("city");
    var value = city.value.trim();
    if(value === "") {
        showError("city", "City is required.");
        return false;
    }
    if(value.length < 2 || value.length > 30) {
        showError("city", "City must be 2–30 characters.");
        return false;
    }
    clearError("city");
    return true;
}

// State: Required.
function validateState() {
    var state = document.getElementById("state");
    if(state.value === "") {
        showError("state", "State is required.");
        return false;
    }
    clearError("state");
    return true;
}

// ZIP Code: Required, exactly 5 digits.
function validateZip() {
    var zip = document.getElementById("zip");
    var value = zip.value.trim();
    var pattern = /^[0-9]{5}$/;
    if(value === "") {
        showError("zip", "Zip Code is required.");
        return false;
    }
    if(!pattern.test(value)) {
        showError("zip", "Zip Code must be exactly 5 digits.");
        return false;
    }
    clearError("zip");
    return true;
}

// Email: Required, proper format; force lowercase.
function validateEmail() {
    var email = document.getElementById("email");
    var value = email.value.trim().toLowerCase();
    email.value = value;
    var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(value === "") {
        showError("email", "Email is required.");
        return false;
    }
    if(!pattern.test(value)) {
        showError("email", "Email must be in the format name@domain.tld.");
        return false;
    }
    clearError("email");
    return true;
}

// Phone Number: Required, format XXX-XXX-XXXX.
function validatePhone() {
    var phone = document.getElementById("phone");
    var value = phone.value.trim();
    var pattern = /^\d{3}-\d{3}-\d{4}$/;
    if(value === "") {
        showError("phone", "Phone number is required.");
        return false;
    }
    if(!pattern.test(value)) {
        showError("phone", "Phone must be in the format XXX-XXX-XXXX.");
        return false;
    }
    clearError("phone");
    return true;
}

// User ID: Required, 5–20 characters; must start with a letter; no spaces or special characters except dash and underscore.
function validateUserID() {
    var uid = document.getElementById("userID");
    var value = uid.value.trim();
    var pattern = /^[A-Za-z][A-Za-z0-9_-]{4,19}$/;
    if(value === "") {
        showError("userID", "User ID is required.");
        return false;
    }
    if(!pattern.test(value)) {
        showError("userID", "User ID must start with a letter, be 5–20 chars long, and only include letters, numbers, '-' and '_'.");
        return false;
    }
    clearError("userID");
    return true;
}

// Password: Required, at least 8 characters; at least one uppercase, one lowercase, one digit; cannot equal User ID.
function validatePassword() {
    var pwd = document.getElementById("password");
    var uid = document.getElementById("userID");
    var value = pwd.value;
    if(value.length < 8) {
        showError("password", "Password must be at least 8 characters long.");
        return false;
    }
    if(!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/[0-9]/.test(value)) {
        showError("password", "Password must include uppercase, lowercase, and a digit.");
        return false;
    }
    if(uid.value.trim() !== "" && value.toLowerCase() === uid.value.trim().toLowerCase()) {
        showError("password", "Password cannot be the same as the User ID.");
        return false;
    }
    clearError("password");
    return true;
}

// Confirm Password: Must match Password.
function validateConfirmPassword() {
    var pwd = document.getElementById("password").value;
    var cpwd = document.getElementById("confirmpassword").value;
    if(pwd !== cpwd) {
        showError("confirmPassword", "Passwords do not match.");
        return false;
    }
    clearError("confirmPassword");
    return true;
}

// Gender: Required. (Radio buttons with name="gender")
function validateGender() {
    var radios = document.getElementsByName("gender");
    for(var i = 0; i < radios.length; i++) {
        if(radios[i].checked) {
            clearError("gender");
            return true;
        }
    }
    showError("gender", "Please select a gender.");
    return false;
}

// Illnesses: Required; at least one checkbox should be checked.
function validateIllnesses() {
    var boxes = document.getElementsByName("illness");
    var count = 0;
    for(var i = 0; i < boxes.length; i++) {
        if(boxes[i].checked) {
            count++;
        }
    }
    if(count < 1) {
        showError("illness", "Please select at least one past illness.");
        return false;
    }
    clearError("illness");
    return true;
}

/******************************************
 * Form-Level Validation and Submission
 ******************************************/

// Run all individual validations; return true if all pass.
function validateForm() {
    var errors = 0;
    if(!validateFirstName()) errors++;
    if(!validateMiddleInitial()) errors++;
    if(!validateLastName()) errors++;
    if(!validateDOB()) errors++;
    if(!validateSSN()) errors++;
    if(!validateAddress1()) errors++;
    if(!validateAddress2()) errors++;
    if(!validateCity()) errors++;
    if(!validateState()) errors++;
    if(!validateZip()) errors++;
    if(!validateEmail()) errors++;
    if(!validatePhone()) errors++;
    if(!validateUserID()) errors++;
    if(!validatePassword()) errors++;
    if(!validateConfirmPassword()) errors++;
    if(!validateGender()) errors++;
    if(!validateIllnesses()) errors++;

    if(errors === 0) {
        return true;
    } else {
        alert("There are errors in your form. Please correct them before submitting.");
        return false;
    }
}

// When the Validate button is pressed, run all validations and reveal the Submit button if valid.
function validateAndRevealSubmit() {
    // Force email to lowercase (already done in validateEmail, but just in case)
    var emailField = document.getElementById("email");
    if(emailField) {
        emailField.value = emailField.value.toLowerCase();
    }
    
    if(validateForm()) {
        var submitButton = document.getElementById("finalSubmit");
        if(submitButton) {
            submitButton.style.display = "inline-block";
            submitButton.disabled = false;
        }
    } else {
        var submitButton = document.getElementById("finalSubmit");
        if(submitButton) {
            submitButton.style.display = "none";
            submitButton.disabled = true;
        }
        alert("There are errors in your form. Please correct them before submitting.");
    }
}

/******************************************
 * Utility Functions
 ******************************************/

// Attach a listener to the ZIP code field that restricts input to digits and limits to 5 characters.
function attachZipListener() {
    var zipField = document.getElementById("zip");
    if(!zipField) {
        console.error("Zip field not found.");
        return;
    }
    zipField.addEventListener("input", function() {
        var digits = this.value.replace(/\D/g, "");
        if(digits.length > 5) {
            digits = digits.substring(0, 5);
        }
        this.value = digits;
        validateZip();
    });
}

function attachPhoneListener() {
    var phoneField = document.getElementById("phone");
    if(!phoneField) {
        console.error("Phone field not found.");
        return;
    }
    phoneField.addEventListener("input", function() {
        var original = this.value;
        // Allow dashes as they may be added via formatting.
        if (/[^\d-]/.test(original)) {
            showError("phone", "Please enter numbers only.");
        } else {
            clearError("phone");
        }
        var digits = original.replace(/\D/g, "");
        if(digits.length > 10) {
            digits = digits.substring(0, 10);
        }
        // Format based on length.
        if(digits.length > 6) {
            this.value = digits.slice(0,3) + "-" + digits.slice(3,6) + "-" + digits.slice(6);
        } else if(digits.length > 3) {
            this.value = digits.slice(0,3) + "-" + digits.slice(3);
        } else {
            this.value = digits;
        }
        validatePhone();
    });
}


// Update the salary value display.
function updateSalary(value) {
    var salDisp = document.getElementById("salaryValue");
    if(salDisp) {
        salDisp.innerText = "$" + parseInt(value).toLocaleString();
    }
}

/******************************************
 * Cookie Management Functions
 ******************************************/

// Cookie management functions
function setCookie(name, cvalue, expiryDays) {
    var day = new Date();
    day.setTime(day.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + day.toUTCString();
    document.cookie = name + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(name) {
    var cookieName = name + "=";
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

function deleteAllCookies() {
    document.cookie.split(";").forEach(function (cookie) {
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    });
}

// Inputs to track
const inputs = [
    { id: "firstName", cookieName: "firstName" },
    { id: "middleInitial", cookieName: "middleInitial" },
    { id: "lastName", cookieName: "lastName" },
    { id: "DOB", cookieName: "DOB" },
    { id: "ssn", cookieName: "ssn" },
    { id: "email", cookieName: "email" },
    { id: "phone", cookieName: "phone" },
    { id: "address", cookieName: "address" },
    { id: "address2", cookieName: "address2" },
    { id: "city", cookieName: "city" },
    { id: "state", cookieName: "state" },
    { id: "zip", cookieName: "zip" },
    { id: "userID", cookieName: "userID" }
];

// Prefill inputs from cookies
inputs.forEach(function (input) {
    var inputElement = document.getElementById(input.id);

    // Prefill input fields
    var cookieValue = getCookie(input.cookieName);
    if (cookieValue !== "") {
        inputElement.value = cookieValue;
    }

    // Set a cookie when the input field changes
    inputElement.addEventListener("input", function () {
        const rememberMe = document.getElementById("remember-me").checked;
        if (rememberMe) {
            setCookie(input.cookieName, inputElement.value, 30);
        }
    });
});

// Handle 'Remember Me' checkbox
const rememberMeCheckbox = document.getElementById("remember-me");
rememberMeCheckbox.addEventListener("change", function () {
    const rememberMe = this.checked;

    if (!rememberMe) {
        deleteAllCookies();
    } else {
        inputs.forEach(function (input) {
            const inputElement = document.getElementById(input.id);
            if (inputElement.value.trim() !== "") {
                setCookie(input.cookieName, inputElement.value, 30);
            }
        });
    }
});

// Welcome message if cookies exist
var firstName = getCookie("firstName");
if (firstName !== "") {
    document.getElementById("welcome1").innerHTML = "Welcome back, " + firstName + "!<br>";
    document.getElementById("welcome2").innerHTML =
        "<a href='#' id='new-user'>Not " + firstName + "? Click here to start a new form.</a>";

    document.getElementById("new-user").addEventListener("click", function () {
        inputs.forEach(function (input) {
            setCookie(input.cookieName, "", -1);
        });
        location.reload();
    });
}

// Clear cookies on page load if 'Remember Me' is unchecked
document.addEventListener("DOMContentLoaded", function () {
    const rememberMe = document.getElementById("remember-me").checked;

    if (!rememberMe) {
        deleteAllCookies();
    }
});

/******************************************
 * Event Listeners Setup
 ******************************************/
document.addEventListener("DOMContentLoaded", function() {
    displayDate();
    document.getElementById("firstName").addEventListener("input", validateFirstName);
    document.getElementById("middleInitial").addEventListener("input", validateMiddleInitial);
    document.getElementById("lastName").addEventListener("input", validateLastName);
    document.getElementById("DOB").addEventListener("change", validateDOB);
    document.getElementById("ssn").addEventListener("input", validateSSN);
    attachSSNListener();
    document.getElementById("address").addEventListener("input", validateAddress1);
    document.getElementById("address2").addEventListener("input", validateAddress2);
    document.getElementById("city").addEventListener("input", validateCity);
    document.getElementById("state").addEventListener("change", validateState);
    attachZipListener();
    document.getElementById("email").addEventListener("input", validateEmail);
    document.getElementById("phone").addEventListener("input", validatePhone);
    attachPhoneListener();
    document.getElementById("userID").addEventListener("input", validateUserID);
    document.getElementById("password").addEventListener("input", validatePassword);
    document.getElementById("confirmpassword").addEventListener("input", validateConfirmPassword);
    
    var genderRadios = document.getElementsByName("gender");
    Array.from(genderRadios).forEach(function(radio) {
        radio.addEventListener("change", validateGender);
    });
    
    var illnessBoxes = document.getElementsByName("illness");
    Array.from(illnessBoxes).forEach(function(box) {
        box.addEventListener("change", validateIllnesses);
    });
});

