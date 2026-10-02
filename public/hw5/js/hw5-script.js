// HW5 - COSC 2328 - Professor McCurry
// Implemented by: Madison Spitzer

console.log("=== BOOKSTORE INVENTORY CALCULATOR ===");


// 5.2 - Book Inventory
console.log("--- Book Inventory ---");

const book1 = {
    title: "The Hunger Games",
    author: "Suzanne Collins",
    price: 12.99
};

const book2 = {
    title: "The Outsiders",
    author: "S. E. Hinton",
    price: 10.99
};

const book3 = {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 11.99
};

const TAX_RATE = 0.0825;
let isMember = true;

console.log(book1.title + " by " + book1.author + " - $" + book1.price);
console.log(book2.title + " by " + book2.author + " - $" + book2.price);
console.log(book3.title + " by " + book3.author + " - $" + book3.price);


// 5.3 - Function Declarations
console.log("--- Function Declarations Test ---");

function calculateSubtotal(price, quantity) {
    return price * quantity;
}

function formatCurrency(amount) {
    return "$" + amount.toFixed(2);
}

const subtotalTest = calculateSubtotal(book1.price, 2);

console.log("Subtotal: " + formatCurrency(subtotalTest));


// 5.4 - Arrow Functions
console.log("--- Arrow Functions Test ---");

const calculateTax = subtotal => subtotal * TAX_RATE;

const applyMemberDiscount = (subtotal, member) => {
    return member ? subtotal * 0.9 : subtotal;
};

const arrowSubtotal = calculateSubtotal(book2.price, 2);
const arrowTax = calculateTax(arrowSubtotal);
const memberTotal = applyMemberDiscount(arrowSubtotal, true);
const nonMemberTotal = applyMemberDiscount(arrowSubtotal, false);

console.log("Tax: " + formatCurrency(arrowTax));
console.log("Member subtotal: " + formatCurrency(memberTotal));
console.log("Non-member subtotal: " + formatCurrency(nonMemberTotal));


// 5.5 - Function Expression with Default Parameters
console.log("--- Function Expression with Defaults ---");

const calculateTotal = function(price, quantity = 1, member = false) {
    const subtotal = calculateSubtotal(price, quantity);
    const discountedSubtotal = applyMemberDiscount(subtotal, member);
    const tax = calculateTax(discountedSubtotal);

    return discountedSubtotal + tax;
};

console.log(
    "Full arguments: " +
    formatCurrency(calculateTotal(book1.price, 2, true))
);

console.log(
    "Default membership: " +
    formatCurrency(calculateTotal(book2.price, 2))
);

console.log(
    "Default quantity and membership: " +
    formatCurrency(calculateTotal(book3.price))
);


// 5.6 - Rest Operator
console.log("--- Rest Operator Test ---");

function calculateBulkOrder(...prices) {
    let total = 0;

    for (const price of prices) {
        total += price;
    }

    return total;
}

console.log(
    "Three prices: " +
    formatCurrency(calculateBulkOrder(10.99, 12.99, 11.99))
);

console.log(
    "Five prices: " +
    formatCurrency(calculateBulkOrder(5.99, 7.99, 9.99, 11.99, 13.99))
);


// 5.7 - Callback Functions
console.log("--- Callback Functions ---");

function processOrder(book, quantity, callback) {
    const total = callback(book.price, quantity);

    return book.title + " total: " + formatCurrency(total);
}

const standardPricing = (price, quantity) => {
    return price * quantity;
};

const memberPricing = (price, quantity) => {
    return price * quantity * 0.9;
};

console.log(processOrder(book1, 2, standardPricing));
console.log(processOrder(book1, 2, memberPricing));


// 5.8 - Object Methods
console.log("--- Object Methods ---");

const orderSummary = {
    customerName: "Madison Spitzer",
    items: [],

    addItem(book, quantity) {
        this.items.push({
            book: book,
            quantity: quantity
        });
    },

    getTotal() {
        let total = 0;

        for (const item of this.items) {
            total += item.book.price * item.quantity;
        }

        return total;
    },

    displaySummary() {
        let summary = "Customer: " + this.customerName + "\n";

        for (const item of this.items) {
            summary +=
                item.book.title +
                " x " +
                item.quantity +
                " = " +
                formatCurrency(item.book.price * item.quantity) +
                "\n";
        }

        summary += "Total: " + formatCurrency(this.getTotal());

        return summary;
    }
};

orderSummary.addItem(book1, 2);
orderSummary.addItem(book2, 1);

console.log("Order total: " + formatCurrency(orderSummary.getTotal()));
console.log(orderSummary.displaySummary());


// 5.9 - Truthy/Falsy Validation
console.log("--- Truthy/Falsy Validation ---");

function validateDiscount(code) {
    if (code) {
        const cleanedCode = code.toUpperCase();

        if (cleanedCode === "MEMBER10") {
            return 0.10;
        }

        if (cleanedCode === "SAVE20") {
            return 0.20;
        }
    }

    return 0;
}

console.log("MEMBER10: " + validateDiscount("MEMBER10"));
console.log("SAVE20: " + validateDiscount("SAVE20"));
console.log("Empty code: " + validateDiscount(""));
console.log("INVALID: " + validateDiscount("INVALID"));


// 5.10 - Nested Functions and Closures
console.log("--- Nested Functions & Closures ---");

function createOrderProcessor(storeName) {
    const storeTaxRate = 0.0825;

    function processStoreOrder(book, quantity) {
        const subtotal = book.price * quantity;
        const tax = subtotal * storeTaxRate;
        const total = subtotal + tax;

        return (
            storeName +
            " - " +
            book.title +
            " x " +
            quantity +
            " - Total: " +
            formatCurrency(total)
        );
    }

    return processStoreOrder;
}

const bookstoreProcessor = createOrderProcessor("Madison's Bookstore");

console.log(bookstoreProcessor(book1, 2));
console.log(bookstoreProcessor(book3, 3));