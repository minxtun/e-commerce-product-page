var thumbnailList = $(".thumbnail-list li");
var mainImg = $(".main-img>img");
var lightBox = $(".lightbox");
var dropdown = $(".cart-dropdown");
var name = document.querySelector(".product-name").innerHTML;
var price = (+document.querySelector(".price").innerHTML.slice(1, this.length - 1)).toFixed(2);
var pickItems = 0;
var cartItems = 0;

function nextImage(currImg) {
  let temp = currImg.slice(14, 28);
  let index = +currImg.slice(28, 29);
  index = (index % 4) + 1;
  return temp + index;
}

function prevImage(currImg) {
  let temp = currImg.slice(14, 28);
  let index = +currImg.slice(28, 29);
  index--;
  return temp + (index == 0 ? 4 : index);
}

thumbnailList.click(function() {
  if(!($(this).hasClass("selected-img"))) {
    let currImg = this.classList[0];
    mainImg.attr("src", "assets/images/" + currImg + ".jpg");
    thumbnailList.removeClass("selected-img");
    $("." + currImg).addClass("selected-img");
  }
});

mainImg.click(function() {
  if(!(lightBox.hasClass("lightbox-open"))) {
    lightBox.addClass("lightbox-open");
  }
});

$(".lightbox .close").click(function() {
  if(lightBox.hasClass("lightbox-open")) {
    lightBox.removeClass("lightbox-open");
  }
});

$(".lightbox .prev").click(function() {
  let currImg = mainImg.attr("src");
  currImg = prevImage(currImg);
  mainImg.attr("src", "assets/images/" + currImg + ".jpg");
  thumbnailList.removeClass("selected-img");
  $("." + currImg).addClass("selected-img");
});

$(".lightbox .next").click(function() {
  let currImg = mainImg.attr("src");
  currImg = nextImage(currImg);
  mainImg.attr("src", "assets/images/" + currImg + ".jpg");
  thumbnailList.removeClass("selected-img");
  $("." + currImg).addClass("selected-img");
});

$(".cart>button").click(function() {
  if(dropdown.hasClass("cart-dropdown-open")) {
    dropdown.removeClass("cart-dropdown-open");
  }
  else {
    dropdown.addClass("cart-dropdown-open");
  }
});

$(".minus").click(function() {
  pickItems = pickItems == 0 ? 0 : pickItems - 1;
  document.querySelector(".numbers").innerHTML = pickItems;
});

$(".plus").click(function() {
  pickItems++;
  document.querySelector(".numbers").innerHTML = pickItems;
});

$(".add-to-cart").click(function() {
  if (pickItems === 0) return;

  let itemPrice = "$" + price;
  let finalPrice = "$" + (pickItems * price).toFixed(2);

  const blockHTML = `
    <div class="cart-item">
      <div class="item-img"><img src="assets/images/image-product-1-thumbnail.jpg" alt=""></div>
      <div class="item-info">
        <div class="item-name">Fall Limited Edition Sneakers</div>
        <div class="item-price">
          ${itemPrice} x 
          <span class="item-quantity">${pickItems}</span>
          <span class="final-price">${finalPrice}</span>
        </div>
      </div>
      <button class="item-remove"><img src="assets/images/icon-delete.svg" alt=""></button>
    </div>
  `

  cartItems += pickItems;
  pickItems = 0;
  document.querySelector(".numbers").innerHTML = pickItems;
  document.querySelector(".cart-badge").innerHTML = cartItems;
  document.querySelector(".cart-list").insertAdjacentHTML("beforeend", blockHTML);
});

$(".cart-list").click(function(event) {
  let removeBtn = event.target.closest(".item-remove");
  if (removeBtn) {
    let cartItem = removeBtn.closest(".cart-item");
    if (cartItem) {
      cartItem.remove();
    }
  }
});