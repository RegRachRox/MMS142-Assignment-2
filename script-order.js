const sizeButtons = document.querySelectorAll(".btn_size");
sizeButtons.forEach(button => {
    button.addEventListener("click", function() {
        sizeButtons.forEach(btn => {
            btn.classList.remove("active");
        });
        this.classList.add("active");
        console.log("Selected size:", this.textContent.trim());
    });
});

const addToCartButton = document.getElementById("add-to-cart");

if (addToCartButton) {

    addToCartButton.addEventListener("click", function() {
        console.log("ORDER NOW clicked!");
        const productName = document.querySelector(".title").textContent.trim();
        const productPrice = parseFloat(
            document.querySelector(".product_price_page")
            .textContent.replace(/[^0-9.]/g, "")
        );
        const productImage = document.querySelector(".product-image").getAttribute("src");
        const quantity = parseInt(document.getElementById("number-input").value);
        const selectedSize = document.querySelector(".btn_size.active");

        if (!selectedSize) {
            alert("Please select a shirt size!");
            return;
        }

        if (isNaN(quantity) || quantity < 1 || quantity > 100) {
            alert("Please enter a quantity between 1 and 100!");
            return;
        }

        if (isNaN(productPrice)) {
            alert("Invalid product price!");
            return;
        }

        const size = selectedSize.textContent.trim();

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingItem = cart.find(item =>
            item.name === productName && item.size === size
        );


        if (existingItem) {

            if (existingItem.quantity + quantity > 100) {
                alert("Maximum quantity is 100!");
                return;
            }

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

        localStorage.setItem("cart", JSON.stringify(cart));
        console.log("Cart successfully saved:", cart);
        window.location.href = "order-form.html";

    });
} else {
    console.error("ERROR: add-to-cart button not found!");
}
