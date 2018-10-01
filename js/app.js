let appConfig = {
  "desiredDays": 15,
  "numGatherers": 5
};

class DesiredProduct {
  constructor(product, qty) {
    this.product = product;
    this.qty = qty;
  }
}

class DeliveredProduct {
  constructor(product, qty) {
    this.product = product;
    this.qty = qty;
  }
}

class OverallOutput {
  constructor(product, qty) {
    this.product = product;
    this.qty = qty;
  }
}

class ProductionChain {
  constructor(productsRequested, steps, surplus) {
    this.productsRequested = productsRequested;
    this.steps = steps;
    this.surplus = surplus;
  }
}

class ProductionStep {
  constructor(recipe, multiple) {
    this.recipe = recipe;
    this.multiple = multiple;
  }
}

let onDesiredProductsChage = function() {
  
  // read through all desired products
  let desiredProducts = getDesiredProducts();
  
  // TODO: Have a setting to support a seperate production chain for each desired product listed
  // Default is to combine everything into one chain
  
  // determine required recipe multiples
  let productionSteps = new Map();
  let [requiredProduction, surplusProducts] = getRequiredProduction(desiredProducts, productionSteps);
  console.log("Production Determined:");
  console.log(requiredProduction);
  console.log(surplusProducts);
  
  let chain = new ProductionChain(desiredProducts, requiredProduction, surplusProducts);
  let chains = [chain]; // TODO: Support multiple / dynamic
  updateProductionChainHTML(chains);
}

let getDesiredProducts = function() {
  let productElements = $(".productQty");
  let desiredProducts = new Map();
  for (let ind in productElements) { 
    if (productElements[ind].innerText > 0) {
      let product = productBook.getById(productElements[ind].attributes.p_id.value);
      let qty = productElements[ind].innerText;
      desiredProducts.set(product.id, new DesiredProduct(product, qty));
    }
  }
  return desiredProducts;
}

let getRequiredProduction = function(desiredProducts, productionSteps) {
  
  // Are there products we need to account for?
  let hasMore = false;
  desiredProducts.forEach(function(val){
    if (val.qty > 0) {
      hasMore = true; 
    }
  });
  
  if (!hasMore) {
    // No, production steps has the building/gatherer multiples we need and each recipe
    // desiredProducts will be empty, or have products with negative values, these are surplus goods
    return [productionSteps, desiredProducts]; 
  } else {
    // There are products we need to process still
    //  - Recursively call getRequiredProduction until all desired products are accounted for
    
    // Make clone of desired products to modify
    let modifiedDesiredProducts = new Map(desiredProducts);
    
    desiredProducts.forEach(function(val, key) { 
      if (modifiedDesiredProducts.has(key) && modifiedDesiredProducts.get(key).qty > 0) { // this product is desired
        
        // find recipe and the output product (with quantity) in that recipe
        let [recipe, output] = recipeBook.findBestRecipe(val.product);
        
        // update building count
        let existingMultiple = productionSteps.has(recipe.name) ? productionSteps.get(recipe.name).multiple : 0;
        let multiple = parseFloat(existingMultiple) + recipe.building.speed / appConfig.desiredDays * val.qty / output.qty;

        // upsert the end product in our needed steps
        productionSteps.set(recipe.name, new ProductionStep(recipe, multiple));

        // upsert it's ingredients in the correct qty to process later
        for (let i in recipe.inputs) {
          let input = recipe.inputs[i];
          let existingQty = desiredProducts.has(input.product.id) ? desiredProducts.get(input.product.id).qty : 0;
          let newQty = parseFloat(existingQty) + input.qty * val.qty; // double check
          modifiedDesiredProducts.set(input.product.id, new DesiredProduct(input.product, newQty));
        }

        // remove it's outputs in the correct qty so we know it's been processed
        for (let i in recipe.outputs) {
          let output = recipe.outputs[i];
          let existingQty = desiredProducts.has(output.product.id) ? desiredProducts.get(output.product.id).qty : 0;
          let newQty = parseFloat(existingQty) - val.qty; // * output.qty
          if (newQty == 0) {
            modifiedDesiredProducts.delete(output.product.id); // keep the desiredProducts map clean
          } else {
            modifiedDesiredProducts.set(output.product.id, new DesiredProduct(output.product, newQty)); 
          }
        }
        
        console.log("Processing " + recipe.name);
        console.log("Desired Products:");
        console.log(modifiedDesiredProducts);
      }
    }); 
    
    return getRequiredProduction(modifiedDesiredProducts, productionSteps);
  }
}

let updateProductionChainHTML = function(chains) {
  console.log('Production Chains:');
  console.log(chains);
  
  let chainHTML = '';
  
  for (let i in chains) {
    let chain = chains[i];
    chainHTML += '<div class="productionChainWrapper row">';
    chainHTML += '<div class="productionChainTitle col s12">Production Chain ' + (i+1) + '</div>';
    chainHTML += '<div class="productionChainInputWrapper col s4">';
    chainHTML += '<div class="desiredOutputContainer">';
    chainHTML += '<div class="productionChainSectionTitle">Desired Output per ' + appConfig.desiredDays + ' Days:</div>';
    chain.productsRequested.forEach(function(val, key) {
      chainHTML += '<div class="desiredOutputTitle">&#8226; ' + val.qty + ' ' + val.product.name + '</div>';
    });
    chainHTML += '</div>';
    
    chainHTML += '<div style="height: 10px;"></div><div class="costContainer"><div class="productionChainSectionTitle">Cost Analysis:</div>';
    chainHTML += '<div class="costWrapper">';
    // TODO - Add For Loop to calculate cost
    chainHTML += '<div class="costSection">Initial Investment: <b>Coming Soon</b></div>';
    chainHTML += '<div class="costSection">Monthly Maintenance: <b>Coming Soon</b></div>';
    
    chainHTML += '</div></div></div>';
    
    chainHTML += '<div class="productionChainOutputWrapper col s8">';
    chainHTML += '<div class="productionChainSectionTitle">Required Production:</div>';
    chainHTML += '<div class="recipeContainer">';
    chain.steps.forEach(function(val, key) {
      chainHTML += '<div class="recipeWrapper">';
      chainHTML += '<div class="recipeTitle">Recipe: <b>' + key + '</b></div>';
      chainHTML += '<div class="buildingWrapper">' + stringifyStep(val) + '</div>';
      chainHTML += '</div>';
    });
    
    chainHTML += '<div style="height: 10px;"></div>';
    
    chainHTML += '<div class="suprlusContainer"><div class="productionChainSectionTitle">Surplus Products:</div>';
    chain.surplus.forEach(function(val, key) {
      chainHTML += '<div class="surplusWrapper"><div class="surplusTitle">';
      chainHTML += '&nbsp;&#8226; ' + (-1 * val.qty) + ' ' + val.product.name; // surplus products are negative values, don't show that in the UI
      chainHTML += '</div></div>';
    });
    chainHTML += '</div>';

    chainHTML += '</div></div>';
  }
  
  $("#productionChainContainer").html(chainHTML);
};

let stringifyStep = function(step) {
  let buildingCount = step.recipe.building.hasGatherers ? Math.ceil(step.multiple / appConfig.numGatherers) : Math.ceil(step.multiple);
  let buildingStr = buildingCount > 1 ? 'Buidlings' : 'Building';
  let buildingName = step.recipe.building.name;
  let buildingGathererName = step.recipe.building.gathererName;
  let gathererStr = step.recipe.building.hasGatherers ? ' with ' + Math.ceil(step.multiple) + ' ' + buildingGathererName : '';
  return buildingStr + ' Required: <b>' + buildingName + ' x' + buildingCount + gathererStr + '</b>'; 
};



