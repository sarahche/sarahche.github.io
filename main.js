// To updated images from dropdown options 
var imageList = [
  "assets/catharnessstrawberry.png",
  "assets/catharnessblack.png",
  "assets/catdonut.jpeg",
  "assets/catharnessorange.jpeg"
   ]

function switchImage() {
    document.mainProductImg.src = imageList[document.colorDropdown.color.options[document.colorDropdown.color.selectedIndex].value];
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

var shoppingCartCount = 0

function onClickAddCart() {
  localStorage.setItem("shoppingCartCount", JSON.stringify(shoppingCartCount));
  shoppingCartCount += itemCount; 
  document.getElementById("shoppingCartCount").textContent = shoppingCartCount;
} 