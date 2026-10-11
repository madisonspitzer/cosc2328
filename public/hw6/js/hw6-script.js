// HW6 - COSC 2328 - Professor McCurry
// Implemented by: Madison Spitzer


// Product prices
const productPrices = {
    laptop: 999.99,
    tablet: 499.99,
    phone: 699.99,
    monitor: 299.99
};


// Discount codes
const discountCodes = {
    SAVE10: 0.10,
    SAVE20: 0.20,
    STUDENT: 0.15
};


// Calculate tax
const calculateTax = subtotal => subtotal * 0.0825;


// Apply discount
const applyDiscount = function(subtotal, code) {

    if (!code) {
        return 0;
    }

    const cleanCode = code.toUpperCase();

    if (discountCodes[cleanCode]) {
        return subtotal * discountCodes[cleanCode];
    }

    return 0;
};


// Select DOM elements
const orderForm = document.getElementById("orderForm");

const productInput = document.getElementById("product");
const quantityInput = document.getElementById("quantity");
const discountCodeInput = document.getElementById("discountCode");

const results = document.getElementById("results");

const resultProduct = document.getElementById("resultProduct");
const resultQuantity = document.getElementById("resultQuantity");
const resultSubtotal = document.getElementById("resultSubtotal");
const resultDiscount = document.getElementById("resultDiscount");
const resultTax = document.getElementById("resultTax");
const resultTotal = document.getElementById("resultTotal");


// Form submit event
orderForm.addEventListener("submit", function(event) {

    event.preventDefault();


    // Read form values
    const selectedProduct = productInput.value;

    const quantity = Number(quantityInput.value);

    const discountCode = discountCodeInput.value.trim();


    // Bracket notation price lookup
    const price = productPrices[selectedProduct];


    // Validation
    if (!selectedProduct) {
        alert("Please select a product.");
        return;
    }

    if (quantity < 1) {
        alert("Quantity must be at least 1.");
        return;
    }


    // Calculations
    const subtotal = price * quantity;

    const discountAmount =
        applyDiscount(subtotal, discountCode);

    const discountedSubtotal =
        subtotal - discountAmount;

    const tax =
        calculateTax(discountedSubtotal);

    const total =
        discountedSubtotal + tax;


    // Display results
    resultProduct.textContent = selectedProduct;

    resultQuantity.textContent = quantity;

    resultSubtotal.textContent =
        "$" + subtotal.toFixed(2);

    resultDiscount.textContent =
        "-$" + discountAmount.toFixed(2);

    resultTax.textContent =
        "$" + tax.toFixed(2);

    resultTotal.textContent =
        "$" + total.toFixed(2);


    // Reveal results
    results.classList.remove("results-hidden");
});