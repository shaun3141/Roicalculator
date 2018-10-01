var init = function() {
  
  // Initialize Desired Products
  let desiredProductHTML = "";
  let categories = productBook.getCategories();
  for (var catIndex in categories) {
    desiredProductHTML += '<div class="productCategoryName">' + categories[catIndex].name + '</div>';
    for (let prodIndex in categories[catIndex].products) {
      desiredProductHTML += '<div class="productWrapper"><div class="productName">';
      desiredProductHTML += categories[catIndex].products[prodIndex].name;
      desiredProductHTML += '</div><div class="productQty" contenteditable="true" p_id=';
      desiredProductHTML += categories[catIndex].products[prodIndex].id;
      desiredProductHTML += '>0</div></div>';
    }
  }

  $("#desiredProductsWrapper").html(desiredProductHTML);
};