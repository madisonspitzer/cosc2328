// IC11 - COSC 2328 - Professor McCurry
// Implemented by: Madison Spitzer

console.log("--- Function Declarations ---");

function greet(name) {
    return "Hello, " + name + "!";
}

function area(width, height) {
    return width * height;
}

console.log(greet("Madison"));
console.log("Area: " + area(5, 4));


console.log("--- Function Expressions & Arrow Functions ---");

const multiply = function(a, b) {
    return a * b;
};

const divide = (a, b) => {
    return a / b;
};

const square = x => x * x;

console.log("Multiply: " + multiply(4, 3));
console.log("Divide: " + divide(10, 2));
console.log("Square: " + square(5));


console.log("--- Default Parameters & Rest Operator ---");

function greetUser(name, greeting = "Hello") {
    return greeting + ", " + name + "!";
}

console.log(greetUser("Madison"));
console.log(greetUser("Madison", "Hi"));

function sumAll(...numbers) {
    let total = 0;

    for (const number of numbers) {
        total += number;
    }

    return total;
}

console.log("Sum: " + sumAll(1, 2, 3));
console.log("Sum: " + sumAll(5, 10, 15, 20));


console.log("--- Callback Functions ---");

function processNumber(value, callback) {
    console.log("Processing...");
    return callback(value);
}

const double = number => number * 2;
const triple = number => number * 3;

console.log("Double: " + processNumber(5, double));
console.log("Triple: " + processNumber(5, triple));


console.log("--- Object Methods ---");

const product = {
    brand: "Apple",
    price: 10,
    quantity: 3,

    total() {
        return this.price * this.quantity;
    },

    describe() {
        return this.brand + " costs $" + this.price +
            " each and has a quantity of " + this.quantity;
    }
};

console.log("Total: $" + product.total());
console.log(product.describe());