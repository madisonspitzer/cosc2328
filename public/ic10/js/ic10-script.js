/* IC10 - COSC 2328 - Professor McCurry
   Implemented by: Madison Spitzer */

// Step 5 - Variables and Concatenation
const city = "Austin";
const country = "USA";
let population = 9800000;

console.log("Location: " + city + ", " + country);
console.log("Population: " + population);


// Step 6 - A Decision
if (population > 1000000) {
    console.log(city + " is a metropolis");
} else {
    console.log(city + " is a growing city");
}


// Step 7 - Boolean
let isLoggedIn = true;
if (isLoggedIn) {
    console.log("Username accepted: " + username);
} else {
    console.log("Username is required");
}


// Step 8 - Truthy / falsy
let username = 123; 

if (username) {
    console.log("Username accepted: " + username);
} else {
    console.log("Username is required");
}

// Step 9 - Combined logic
const hasAccount = false;
const isEmailVerified = false;
const agreedToTerms = true;

if ((hasAccount && agreedToTerms) || isEmailVerified) {
    console.log("Registration allowed");
} else {
    console.log("Registration blocked");
}