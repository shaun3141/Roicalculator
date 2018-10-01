class Recipe {

  constructor(name, inputs, outputs, building) {
    
    // TODO: add some validation
    
    this.name = name;
    this.inputs = inputs; 
    this.outputs = outputs; 
    this.building = building;
  }
  
  
}

class Ingredient {
  constructor(product, qty) {
    this.product = product;
    this.qty = qty; 
  }
}

class RecipeBook {
  constructor() {
    this.recipes = [];
  }
  
  addRecipe(recipe) {
    this.recipes.push(recipe);
  }
  
  findBestRecipe(product) {
    // for now, just return first recipe that has product as an ouput
    for (let i in this.recipes) {
      for (let j in this.recipes[i].outputs) {
        if (this.recipes[i].outputs[j].product.equals(product)) {
          return [this.recipes[i], this.recipes[i].outputs[j]]; 
        }
      }
    }
  }
}

let recipeBook = new RecipeBook();

// Raw Goods
recipeBook.addRecipe(new Recipe("Water", [], [new Ingredient(productBook.getById(1),1)], waterSiphon));
recipeBook.addRecipe(new Recipe("Oil", [], [new Ingredient(productBook.getById(2),1)], oilDrill));
recipeBook.addRecipe(new Recipe("Gas", [], [new Ingredient(productBook.getById(3),1)], gasPump));
recipeBook.addRecipe(new Recipe("Iron", [], [new Ingredient(productBook.getById(4),1)], ironMine));
recipeBook.addRecipe(new Recipe("Copper", [], [new Ingredient(productBook.getById(5),1)], copperMine));
recipeBook.addRecipe(new Recipe("Coal", [], [new Ingredient(productBook.getById(6),1)], coalMine));
recipeBook.addRecipe(new Recipe("Sand", [], [new Ingredient(productBook.getById(7),1)], sandCollector));
recipeBook.addRecipe(new Recipe("Wood", [], [new Ingredient(productBook.getById(8),1)], lumberYard));
recipeBook.addRecipe(new Recipe("Fish", [], [new Ingredient(productBook.getById(9),1)], fishermanDock));

// Farm Produce
recipeBook.addRecipe(new Recipe("Hops", [new Ingredient(productBook.getById(1),2)], [new Ingredient(productBook.getById(10),2)], cropFarm));
recipeBook.addRecipe(new Recipe("Potatoes", [new Ingredient(productBook.getById(1),2)], [new Ingredient(productBook.getById(11),2)], cropFarm));
recipeBook.addRecipe(new Recipe("Vegatables", [new Ingredient(productBook.getById(1),2)], [new Ingredient(productBook.getById(12),2)], cropFarm));
recipeBook.addRecipe(new Recipe("Wheat", [new Ingredient(productBook.getById(1),2)], [new Ingredient(productBook.getById(13),2)], cropFarm));

recipeBook.addRecipe(new Recipe("Apples", [new Ingredient(productBook.getById(1),3)], [new Ingredient(productBook.getById(14),2)], orchard));
recipeBook.addRecipe(new Recipe("Grapes", [new Ingredient(productBook.getById(1),3)], [new Ingredient(productBook.getById(15),2)], orchard));
recipeBook.addRecipe(new Recipe("Organges", [new Ingredient(productBook.getById(1),3)], [new Ingredient(productBook.getById(16),2)], orchard));
recipeBook.addRecipe( new Recipe("Raw Rubber", [new Ingredient(productBook.getById(1),3)], [new Ingredient(productBook.getById(17),2)], orchard));

recipeBook.addRecipe(new Recipe("Berries", [new Ingredient(productBook.getById(1),2)], [new Ingredient(productBook.getById(18),2)], plantation));
recipeBook.addRecipe(new Recipe("Cocoas", [new Ingredient(productBook.getById(1),2)], [new Ingredient(productBook.getById(19),2)], plantation));
recipeBook.addRecipe(new Recipe("Cotton", [new Ingredient(productBook.getById(1),2)], [new Ingredient(productBook.getById(20),2)], plantation));
recipeBook.addRecipe( new Recipe("Sugar", [new Ingredient(productBook.getById(1),2)], [new Ingredient(productBook.getById(21),2)], plantation));

// Livestock
recipeBook.addRecipe(new Recipe(
  "Chickens", 
  [new Ingredient(productBook.getById(1),1), new Ingredient(productBook.getById(13),2)], 
  [new Ingredient(productBook.getById(23),1), new Ingredient(productBook.getById(24),2)],
  livestockFarm
));
recipeBook.addRecipe(new Recipe(
  "Cows", 
  [new Ingredient(productBook.getById(1),2), new Ingredient(productBook.getById(13),3)], 
  [new Ingredient(productBook.getById(22),1), new Ingredient(productBook.getById(25),1), new Ingredient(productBook.getById(26),1)], 
  livestockFarm
));
recipeBook.addRecipe(new Recipe(
  "Sheep", 
  [new Ingredient(productBook.getById(1),1), new Ingredient(productBook.getById(13),2)], 
  [new Ingredient(productBook.getById(27),1), new Ingredient(productBook.getById(28),2)], 
  livestockFarm
));