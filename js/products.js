class Product {
  constructor(id, name, img_url) {
    this.id = id;
    this.name = name;
    this.img_url = img_url;
  }
  
  equals(anotherProduct) {
    return this.id == anotherProduct.id;
  }
}

class ProductCategory {
  constructor(name, products) {
    this.name = name;
    this.products = products;
  }
}

class ProductBook {
  constructor() {
    this.products = new Map();
    this.categories = [];
  }
  
  addProduct(product) {
    this.products.set(product.id, product);
  }
  
  addCategory(category) {
    this.categories.push(category);
    console.log(category);
    for (let prodInd in category.products) {
      this.addProduct(category.products[prodInd]);
    }
  }
  
  getCategories() {
    return this.categories; 
  }
  
  getProducts() {
    return this.products; 
  }
  
  getById(id) {
    return this.products.get(parseInt(id));
  }
}

let productBook = new ProductBook();

productBook.addCategory(new ProductCategory("Raw Resources",[
  new Product(1, "Water",""),
  new Product(2, "Oil",""),
  new Product(3, "Gas",""),
  new Product(4, "Iron",""),
  new Product(5, "Copper",""),
  new Product(6, "Coal",""),
  new Product(7, "Sand",""),
  new Product(8, "Wood",""),
  new Product(9, "Fish","")
]));

productBook.addCategory(new ProductCategory("Farm Produce",[
  new Product(10, "Hops",""),
  new Product(11, "Potatoes",""),
  new Product(12, "Vegetables",""),
  new Product(13, "Wheat",""),
  new Product(14, "Apples",""),
  new Product(15, "Grapes",""),
  new Product(16, "Oranges",""),
  new Product(17, "Raw Rubber",""),
  new Product(18, "Berries",""),
  new Product(19, "Cocoas",""),
  new Product(20, "Cotton",""),
  new Product(21, "Sugar","")
]));

productBook.addCategory(new ProductCategory("Livestock",[
  new Product(22, "Beef",""),
  new Product(23, "Chicken Meat",""),
  new Product(24, "Eggs",""),
  new Product(25, "Leather",""),
  new Product(26, "Milk",""),
  new Product(27, "Mutton",""),
  new Product(28, "Wool","")
]));
