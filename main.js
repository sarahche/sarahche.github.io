
// onload functions
function onloadProducts() {
	var shoppingCartCount = sessionStorage.getItem("shoppingCartCount");
	var selectedProductinCart = null;
    shoppingCartCount = parseInt(shoppingCartCount);
    console.log ("onload");
	if (shoppingCartCount) {
		sessionStorage.setItem("shoppingCartCount", JSON.stringify(shoppingCartCount));
	} else {
		var shoppingCartCount = 0;
		sessionStorage.setItem("shoppingCartCount", 0);}
	document.getElementById("shoppingCartCount").textContent = shoppingCartCount;
	var cartCost = sessionStorage.getItem("sumCost");
	if (cartCost == null) {
		let sumCost = JSON.stringify(0);
		sessionStorage.setItem("sumCost", 0);
	} else {
		
	}
	displayCart();
	cartDetailsSetter();
}

function onloadCart() {
	var shoppingCartCount = sessionStorage.getItem("shoppingCartCount");
	var selectedProductinCart = null;
    shoppingCartCount = parseInt(shoppingCartCount);
    if (shoppingCartCount) {
		sessionStorage.setItem("shoppingCartCount", JSON.stringify(shoppingCartCount));
	} else {}
	document.getElementById("shoppingCartCount").textContent = shoppingCartCount;
    console.log ("cartonload");
	displayCart();
	cartDetailsSetter();
}

// Setting images and sizes
var imageList = [
  "assets/catharnessstrawberry.png",
  "assets/catharnessblack.png",
  "assets/catdonut.jpeg",
  "assets/catharnessorange.jpeg"
   ]

 var sizes = [
 	"tiny",
 	"small",
 	"medium",
 	"large"]

// Sets an array of products
 let products = [
	{name: 'Strawberry',
	tag: 'strawberry',
	price: 20,
	inCart: 0,
	picture: 'catharnessstrawberry.png',
	size: "Tiny"},
	{name: 'Blackberry',
	tag: 'blackberry',
	price: 20,
	inCart: 0,
	picture: 'catharnessblack.png'},
	{name: 'Crazyberry',
	tag: 'crazyberry',
	price: 20,
	inCart: 0,
	picture: 'catdonut.jpeg'},
	{name: 'FireOrange',
	tag: 'fireorange',
	price: 20,
	inCart: 0,
	picture: 'catharnessorange.jpeg'}
	]

var currentColor = "strawberry"
var currentSize = "tiny"


// Changes main product image and size
function switchImage() {
    document.mainProductImg.src = imageList[document.colorDropdown.color.options[document.colorDropdown.color.selectedIndex].value];
    var chosenColor = products[document.colorDropdown.color.options[document.colorDropdown.color.selectedIndex].value].tag;

    currentColor = chosenColor;
}

function switchSize () {
	var chosenSize = document.sizeDropdown.size.options[document.sizeDropdown.size.selectedIndex].value;
	currentSize = chosenSize;
	console.log(currentSize);
}

// To allow user to change number of items in product details
var itemCount = 1
function onClickPlus() {
  itemCount += 1;
  console.log(itemCount);
  document.getElementById("itemCount").textContent = itemCount;
}

function onClickMinus() {
  if (itemCount > 1) {
    itemCount -= 1;
    document.getElementById("itemCount").textContent = itemCount;}
}

// Reflects number of items in cart
function onClickAddCart() {
  let shoppingCartCount = sessionStorage.getItem("shoppingCartCount");
  shoppingCartCount = parseInt(shoppingCartCount);
  shoppingCartCount += itemCount; 
  if (shoppingCartCount) {
		sessionStorage.setItem("shoppingCartCount", JSON.stringify(shoppingCartCount));
	} else {
		sessionStorage.setItem("shoppingCartCount", 0);}
  document.getElementById("shoppingCartCount").innerHTML = shoppingCartCount;
  setItems();
  totalCost();
} 

// Adds item to cart

function setItems() {
	selectedProduct = products[document.colorDropdown.color.options[document.colorDropdown.color.selectedIndex].value];
	let cartItems = sessionStorage.getItem("allCartProducts");
	cartItems = JSON.parse(cartItems);
	if (cartItems != null) {
		if (cartItems[selectedProduct.tag] == undefined) {
			cartItems = {
				...cartItems,
				[selectedProduct.tag]: selectedProduct
			}
		}
		cartItems[selectedProduct.tag].inCart += itemCount;
	} 
	else {
		selectedProduct.inCart = itemCount;
		cartItems = {
		[selectedProduct.tag]: selectedProduct
	};
	}
	console.log(cartItems);
	let allCartProducts = JSON.stringify(cartItems);
	sessionStorage.setItem("allCartProducts", JSON.stringify(cartItems));
	console.log(allCartProducts);

}

// Calculates total cost

function totalCost () {
	selectedProduct = products[document.colorDropdown.color.options[document.colorDropdown.color.selectedIndex].value];
	var cartCost = sessionStorage.getItem("sumCost");
	if (cartCost != null) {
		cartCost = Number(cartCost);
		let multipleItemCost = selectedProduct.price * itemCount; 
		console.log("cart cost", cartCost);
		console.log("adding", multipleItemCost);
		sessionStorage.setItem("sumCost", cartCost + multipleItemCost);
		console.log(cartCost + multipleItemCost);
	} else {
		console.log("going in else");
		let sumCost = JSON.stringify(0);
		sessionStorage.setItem("sumCost", 0);
	}
	
}

// Removes item, changes cart number, and changes total price

function removeItem(color) {
	let cartItems = sessionStorage.getItem("allCartProducts");
	cartItems = JSON.parse(cartItems);
	var shoppingCartCount = sessionStorage.getItem("shoppingCartCount");
  	shoppingCartCount = parseInt(shoppingCartCount);
  	var cartCost = sessionStorage.getItem("sumCost");
  	cartCost = parseInt(cartCost);
	for (const [key, value] of Object.entries(cartItems)) {
		if (color == key) {
			shoppingCartCount -= cartItems[key].inCart;
			cartCost -= cartItems[key].price * cartItems[key].inCart;
			console.log(cartItems);
			sessionStorage.setItem("shoppingCartCount", shoppingCartCount);
			sessionStorage.setItem("sumCost", cartCost);
			delete cartItems[key];
		}
}
	var allCartProducts = JSON.stringify(cartItems);
	sessionStorage.setItem("allCartProducts", JSON.stringify(cartItems));
	location.reload();
}

// Shows Cart Page 

function displayCart() {
	let cartItems = sessionStorage.getItem("allCartProducts");
	cartItems = JSON.parse(cartItems);
	var productContainer = document.querySelector(".itemList"); 
	if (cartItems && productContainer) {
		productContainer.innerHTML = '';
		Object.values(cartItems).map(item => {
			productContainer.innerHTML += `
			<div class = "listItem ${item.tag}">
				<p class = "shoppingCartType"> 
				<img src = "assets/${item.picture}"> 
				<p class = "itemName"> Bond & Co. Cat Harness </p>
				<p class = "itemType">${item.name}</p>
				<button class = "itemMinus"> - </button>
                    <button class = "itemNum"> ${item.inCart} </button>
                    <button class = "itemPlus"> + </button>
                    <button class = "shoppingCartRemove" name = "${item.tag}" onclick = removeItem(this.getAttribute("name"))> Remove </button>
                    <p class = "shoppingCartItemPrice" > $20.00 </p>
			`
		});
	}

}

function cartDetailsSetter() {
	var priceContainer = document.querySelector(".totalPrice"); 
	var subPrice = document.querySelector(".subtotalPrice");
	var cartCost = sessionStorage.getItem("sumCost");
	console.log(priceContainer);
	if (priceContainer != null) { 
		console.log ('its null');
		priceContainer.innerHTML = parseInt(cartCost) + 6;
		}
	if (subPrice != null) {
		subPrice.innerHTML = cartCost;
	}
}


