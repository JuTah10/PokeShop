import {addToCart,updateCartQuantity} from "../product-data/cart.js";
import {products} from "../product-data/products.js";
let productsHTML = ``;

products.forEach((product)=>{
            productsHTML += `
            <div class="product-container">
                <div class="image-container">
                    <img class="image" src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${[product.name]}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars" src="./image/rating-${product.rating.stars * 10}.png">
                    <div class="product-rating-count">${product.rating.count}</div>
                </div>

                <div class="product-price">$${(product.price/100).toFixed(2)}</div>

                <div class="product-quantity-container-${product.id}">
                    <select>
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>

                <div class="empty-space"></div>

                <div class="added-to-cart added-to-cart-${product.id}">
                    <img class="added-to-cart-image"src="./image/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button"
                data-product-id = "${[product.id]}">
                    Add to Cart
                </button>
            </div>`
})

document.querySelector(".product-grid").innerHTML = productsHTML; 
updateCartQuantity(); 
document.querySelectorAll(".add-to-cart-button").forEach((button) =>{
    button.addEventListener("click",function(){
        
        const productId = button.dataset.productId;
        const selectedValue = Number(document.querySelector(`.product-quantity-container-${productId} select`).value);
        document.querySelector(`.added-to-cart-${productId}`).style.opacity = 1;
        setTimeout(()=>{
            document.querySelector(`.added-to-cart-${productId}`).style.opacity = 0}
            ,1500)
        addToCart(productId,selectedValue);
        updateCartQuantity(); 
    })
})

