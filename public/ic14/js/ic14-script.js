/* IC14 - COSC 2328 - Professor McCurry
   Implemented by: Madison Spitzer */

// --- Product Constructor ---
function Product(name, price, category, inStock) {
    this.name = name;
    this.price = price;
    this.category = category;
    this.inStock = inStock;
}

Product.prototype.getInfo = function() {
    const stockStatus = this.inStock ? "In Stock" : "Out of Stock";

    return this.name + " - $" +
        this.price.toFixed(2) + " - " +
        this.category + " - " +
        stockStatus;
};

Product.prototype.isExpensive = function() {
    return this.price > 50;
};


// --- Catalog Array ---
let catalog = [
    new Product("Wireless Mouse", 24.99, "Electronics", true),
    new Product("Mechanical Keyboard", 89.99, "Electronics", true),
    new Product("Desk Lamp", 34.50, "Home", false),
    new Product("Standing Desk", 249.99, "Furniture", true),
    new Product("Notebook Set", 12.99, "Office", true),
    new Product("Noise-Cancelling Headphones", 159.00, "Electronics", false)
];


// --- Page Elements ---
const productContainer =
    document.getElementById("product-container");

const statsContainer =
    document.getElementById("stats-container");

const showAllButton =
    document.getElementById("btn-show-all");

const sortButton =
    document.getElementById("btn-sort-price");

const filterButton =
    document.getElementById("btn-filter-expensive");

const totalButton =
    document.getElementById("btn-calculate-total");


// --- Render Products ---
function renderProducts(products) {
    productContainer.innerHTML = "";

    products.forEach(function(product) {
        const card = document.createElement("div");

        card.classList.add("product-card");

        const stockClass =
            product.inStock ? "in-stock" : "out-of-stock";

        card.innerHTML =
            "<h3>" + product.name + "</h3>" +
            "<p class='product-price'>$" +
            product.price.toFixed(2) + "</p>" +
            "<p class='product-category'>" +
            product.category + "</p>" +
            "<p class='" + stockClass + "'>" +
            product.getInfo() + "</p>";

        productContainer.appendChild(card);
    });
}


// --- Show All Products ---
showAllButton.addEventListener("click", function() {
    renderProducts(catalog);

    statsContainer.textContent =
        "Showing all " + catalog.length + " products.";
});


// --- Sort by Price ---
sortButton.addEventListener("click", function() {
    const sortedProducts = [...catalog];

    sortedProducts.sort(function(a, b) {
        return a.price - b.price;
    });

    renderProducts(sortedProducts);

    statsContainer.textContent =
        "Products sorted by price.";
});


// --- Filter Expensive Products ---
filterButton.addEventListener("click", function() {
    const expensiveProducts =
        catalog.filter(function(product) {
            return product.isExpensive();
        });

    renderProducts(expensiveProducts);

    statsContainer.textContent =
        expensiveProducts.length +
        " products cost more than $50.";
});


// --- Calculate Total Value ---
totalButton.addEventListener("click", function() {
    const total = catalog.reduce(function(sum, product) {
        return sum + product.price;
    }, 0);

    statsContainer.textContent =
        "Total catalog value: $" +
        total.toFixed(2);
});