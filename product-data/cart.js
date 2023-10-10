import {products} from "../product-data/products.js";
 
 
 export let cart= JSON.parse(localStorage.getItem("cart"));

 if(!cart){
    cart= [];
 }

function saveToStorage(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId,selectedValue){
    let matchingItem;
    cart.forEach((id)=>{
        if(productId ===id.productId){
            matchingItem = id;
        }
    })

    if(matchingItem){
        matchingItem.quantity += selectedValue;
    }
    else{
        cart.push({
            productId: productId,
            quantity: selectedValue,
        })
    }
    saveToStorage();
}


export function updateCartQuantity(){
    let cartQuantity = 0;
        cart.forEach((item)=>{
            cartQuantity += item.quantity;
        })
        
    document.querySelector(".cart-quantity").textContent = cartQuantity;
}


export function removeFromCart(productId){
    const newCart=[];
    cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId){ //if cart id === to the deleted button that was clicked id the dont push it into the new array
            newCart.push(cartItem);
        }
    })
    cart=newCart;
    updateCheckOutQuantity();
    saveToStorage();
}

export function updateCheckOutQuantity(){
    let checkoutQuantity = 0;
    let quantity = 0;
    cart.forEach((item)=>{
        quantity = item.quantity;
        if(quantity!== 1){
            quantity = 1;
        }
        checkoutQuantity += quantity;
    })
    document.querySelector(".checkout-header-middle a").textContent = checkoutQuantity + " items";
}


export function calculatePrice(){
    let totalPrice =0;

    cart.forEach((itemInCart)=>{
        products.forEach((itemInProduct)=>{
             if(itemInCart.productId === itemInProduct.id){
                totalPrice += (itemInProduct.price * itemInCart.quantity)/100 //for flat fee
             }
        })
       
    })
    document.querySelector(".payment-summary-money-1").textContent = "$" + totalPrice.toFixed(2);

    document.querySelectorAll(".delivery-option-input").forEach((option)=>{
         option.addEventListener("click",()=>{
            calculateTax();
         })
    })
    
}

export function calculateTax(){
    let shippingFee = 0;
            document.querySelectorAll(".delivery-option-input").forEach((option2)=>{
                if(option2.checked){
                    shippingFee += (Number(option2.value))/100;
                }
                
            })   
            document.querySelector(".payment-summary-money-2").textContent = "$" + shippingFee.toFixed(2);  

    calculateTotal1();
}

export function calculateTotal1(){
    let total = ((Number((document.querySelector(".payment-summary-money-1").textContent).replace('$','')))*100 + 
    (Number((document.querySelector(".payment-summary-money-2").textContent).replace('$','')))*100)/100;
    
    let tax = ((total *13)/100);
    let orderTotal = total + tax;


    document.querySelector(".payment-summary-money-3").textContent = "$" + total.toFixed(2);
    document.querySelector(".payment-summary-money-4").textContent = "$" + tax.toFixed(2);
    document.querySelector(".payment-summary-money-5").textContent = "$" + orderTotal.toFixed(2);
}

