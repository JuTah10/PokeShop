import {cart,removeFromCart,updateCheckOutQuantity,calculatePrice,calculateTax,calculateTotal1} from "../product-data/cart.js";
import {products} from "../product-data/products.js";


let cartHTML ="";

cart.forEach((cartItem)=>{
    const productId = cartItem.productId;

    let matchingProduct;
    products.forEach((product)=>{
        if(product.id === productId){
            matchingProduct = product;
        }

    })
    cartHTML +=`
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
                Delivery date: Tuesday, June 21
        </div>

        <div class="cart-item-details-grid">
            <img class="image" src="${matchingProduct.image}">

            <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    ${(matchingProduct.price /100).toFixed(2)}
                </div>
                <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">
                            ${cartItem.quantity}
                        </span>
                    </span>
                        <span class="update-quantity">
                            Update
                        </span>
                        <span class="delete-quantity"
                        data-product-id="${matchingProduct.id}">
                            Delete
                        </span>
                </div>
            </div>

            <div class="delivery-option-div">
                <div class="delivery-option-title">
                    Choose a delivery option
                </div>

                <div class="delivery-option">
                        <input type="radio" checked class="delivery-option-input" name="delivery-option-${matchingProduct.id}" value ="0">
                    <div>
                        <div class="delivery-option-date">
                            Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                            FREE shipping
                        </div>
                    </div>
                </div>

                <div class="delivery-option">
                    <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}"value ="499">
                    <div>
                        <div class="delivery-option-date">
                            Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                            $4.99 - Shipping
                        </div>
                    </div>
                </div>  

                <div class="delivery-option">
                    <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}" value = "999">
                    <div>
                        <div class="delivery-option-date">
                            Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                            $9.99 - Shipping
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})

document.querySelector(".order-summary").innerHTML = cartHTML;
calculatePrice();
calculateTotal1();

document.querySelectorAll(".delete-quantity").forEach((deleteButton)=>{
    deleteButton.addEventListener("click",()=>{
        const productId = deleteButton.dataset.productId;
        removeFromCart(productId); //pass in the productId of the delete clicked button
        const container = document.querySelector(`.js-cart-item-container-${productId}`)
        container.remove();
        calculatePrice();
        calculateTax();
    })
})

updateCheckOutQuantity();




