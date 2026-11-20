const sizeButtons = document.querySelectorAll(".btn_size");

sizeButtons.forEach(button => {

    button.addEventListener("click", function() {

        sizeButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

    });

});


// =====================================
// ADD TO CART
// =====================================

document.getElementById("add-to-cart").addEventListener("click", function() {

    // Product information
    const productName = document.querySelector(".title").textContent.trim();

    const productPrice = parseFloat(
        document.querySelector(".product_price_page")
        .textContent.replace(/[^0-9.]/g, "")
    );

    const productImage = document.querySelector(".col-6 img").getAttribute("src");

    const quantity = parseInt(document.getElementById("number-input").value);

    // Selected size
    const selectedSize = document.querySelector(".btn_size.active");

    // Validate size
    if (!selectedSize) {
        alert("Please select a shirt size!");
        return;
    }

    // Validate quantity
    if (isNaN(quantity) || quantity < 1 || quantity > 100) {
        alert("Please enter a valid quantity!");
        return;
    }

    const size = selectedSize.textContent.trim();

    // Get existing cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product and size already exist
    const existingItem = cart.find(item =>
        item.name === productName && item.size === size
    );

    if (existingItem) {

        existingItem.quantity += quantity;

    } else {

        cart.push({
            name: productName,
            price: productPrice,
            image: productImage,
            size: size,
            quantity: quantity
        });

    }

    // Save cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Redirect to shopping cart
    window.location.href = "order-form.html";

});





function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItems = document.getElementById("cart-items");
    const subtotalDisplay = document.getElementById("subtotal");

    cartItems.innerHTML = "";

    let subtotal = 0;

    cart.forEach((item, index) => {

        const totalPrice = item.price * item.quantity;

        subtotal += totalPrice;

        const row = document.createElement("tr");

        // PRODUCT NAME
        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        nameCell.className = "product-name";

        // SIZE
        const sizeCell = document.createElement("td");

        const sizeSelect = document.createElement("select");
        sizeSelect.className = "size-select";

        const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

        sizes.forEach(size => {

            const option = document.createElement("option");

            option.value = size;
            option.textContent = size;

            if (size === item.size) {
                option.selected = true;
            }

            sizeSelect.appendChild(option);

        });

        sizeSelect.addEventListener("change", function() {

            cart[index].size = this.value;

            localStorage.setItem("cart", JSON.stringify(cart));

        });

        sizeCell.appendChild(sizeSelect);

        // QUANTITY
        const quantityCell = document.createElement("td");

        const minus = document.createElement("button");
        minus.textContent = "-";

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;
        quantity.style.margin = "0 10px";

        const plus = document.createElement("button");
        plus.textContent = "+";

        minus.addEventListener("click", () => {
            changeQuantity(index, -1);
        });

        plus.addEventListener("click", () => {
            changeQuantity(index, 1);
        });

        quantityCell.append(minus, quantity, plus);

        // TOTAL PRICE
        const priceCell = document.createElement("td");

        priceCell.textContent = "Php " + totalPrice.toFixed(2);

        // REMOVE ITEM
        const removeCell = document.createElement("td");

        const remove = document.createElement("button");

        remove.textContent = "×";
        remove.className = "remove-btn";

        remove.addEventListener("click", () => {
            removeItem(index);
        });

        removeCell.appendChild(remove);

        // ADD ALL CELLS
        row.append(
            nameCell,
            sizeCell,
            quantityCell,
            priceCell,
            removeCell
        );

        cartItems.appendChild(row);

    });

    // UPDATE SUBTOTAL
    subtotalDisplay.textContent = subtotal.toFixed(2);

}


// =====================================
// CHANGE QUANTITY
// =====================================

function changeQuantity(index, amount) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += amount;

    // Remove item if quantity reaches zero
    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


// =====================================
// REMOVE ITEM
// =====================================

function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}


// =====================================
// INITIALIZE CART
// =====================================

displayCart();