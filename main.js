
function onload() {
	let shoppingCartCount = sessionStorage.getItem("shoppingCartCount");
	let selectedProductinCart = null;
    shoppingCartCount = parseInt(shoppingCartCount);
	if (shoppingCartCount) {
		sessionStorage.setItem("shoppingCartCount", JSON.stringify(shoppingCartCount));
	} else {
		let shoppingCartCount = 0;
		sessionStorage.setItem("shoppingCartCount", 0);
		console.log("elsesecond", shoppingCartCount);}
	document.getElementById("shoppingCartCount").textContent = shoppingCartCount;
}

// To updated images from dropdown options 
var imageList = [
  "assets/catharnessstrawberry.png",
  "assets/catharnessblack.png",
  "assets/catdonut.jpeg",
  "assets/catharnessorange.jpeg"
   ]

// Sets an array of products
 let products = [
	{name: 'Strawberry',
	tag: 'strawberry',
	price: 20,
	inCart: 0},
	{name: 'Blackberry',
	tag: 'blackberry',
	price: 20,
	inCart: 0},
	{name: 'Crazyberry',
	tag: 'crazyberry',
	price: 20,
	inCart: 0},
	{name: 'FireOrange',
	tag: 'fireorange',
	price: 20,
	inCart: 0}
	]

var currentColor = "strawberry"


// Changes main product image
function switchImage() {
    document.mainProductImg.src = imageList[document.colorDropdown.color.options[document.colorDropdown.color.selectedIndex].value];
    var chosenColor = products[document.colorDropdown.color.options[document.colorDropdown.color.selectedIndex].value].tag;
    currentColor = chosenColor;
}

// To allow user to change number of items 
var itemCount = 1
function onClickPlus() {
  itemCount += 1;
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
		sessionStorage.setItem("shoppingCartCount", 0);
		console.log("elsesecond", shoppingCartCount);}
  document.getElementById("shoppingCartCount").innerHTML = shoppingCartCount;
  setItems();
} 


function setItems() {
	selectedProduct = products[document.colorDropdown.color.options[document.colorDropdown.color.selectedIndex].value]
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
		selectedProduct.inCart = 1;
		cartItems = {
		[selectedProduct.tag]: selectedProduct
	};
	}
	console.log(cartItems);
	//let allCartProducts = JSON.stringify(cartItems);
	sessionStorage.setItem("allCartProducts", JSON.stringify(cartItems));
	console.log(allCartProducts);

}