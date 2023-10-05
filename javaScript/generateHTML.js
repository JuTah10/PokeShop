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
                    <img class="product-rating-stars" src="../image/rating-${product.rating.stars * 10}.png">
                    <div class="product-rating-count">${product.rating.count}</div>
                </div>

                <div class="product-price">$${(product.price/100).toFixed(2)}</div>

                <div class="product-quantity-container">
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

                <div class="added-to-cart">
                    <img class="added-to-cart-image"src="../image/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button">
                    Add to Cart
                </button>
            </div>`
})

document.querySelector(".product-grid").innerHTML = productsHTML; 