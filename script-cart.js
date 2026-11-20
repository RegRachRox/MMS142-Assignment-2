function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItems = document.getElementById("cart-items");
    const subtotalDisplay = document.getElementById("subtotal");
    const emptyMessage = document.getElementById("empty-cart");

    cartItems.innerHTML = "";

    let subtotal = 0;

    emptyMessage.style.display = cart.length === 0 ? "block" : "none";

    cart.forEach((item, index) => {

        const totalPrice = item.price * item.quantity;
        subtotal += totalPrice;
        const row = document.createElement("tr");


        const nameCell = document.createElement("td");
        nameCell.textContent = item.name;
        nameCell.className = "product-name";

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

        const quantityCell = document.createElement("td");
        const minus = document.createElement("button");
        minus.textContent = "-";
        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;
        quantity.style.margin = "0 10px";
        const plus = document.createElement("button");
        plus.textContent = "+";
        minus.addEventListener("click", function() {
            changeQuantity(index, -1);
        });
        plus.addEventListener("click", function() {
            changeQuantity(index, 1);
        });
        quantityCell.append(minus, quantity, plus);

        const priceCell = document.createElement("td");
        priceCell.textContent = "PHP " + totalPrice.toFixed(2);

        const removeCell = document.createElement("td");
        const remove = document.createElement("button");
        remove.textContent = "×";
        remove.className = "remove-btn";
        remove.addEventListener("click", function() {
            removeItem(index);
        });
        removeCell.appendChild(remove);
        row.append(
            nameCell,
            sizeCell,
            quantityCell,
            priceCell,
            removeCell
        );
        cartItems.appendChild(row);
    });

    subtotalDisplay.textContent = subtotal.toFixed(2);
}

function changeQuantity(index, amount) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += amount;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

displayCart();


const diplayCart = displayCart();


const TO_ADDRESS = "hello@examplewebsite142.com";

const form = document.querySelector("#order-form");

function buildMailto() {
    const name = document.querySelector("displayCart").value;

    const subject = "Order Forms "
    const body =
        name

    return (
        "mailto:" + TO_ADDRESS +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body)
    );
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    window.location.href = buildMailto();
});