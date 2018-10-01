# Rise of Industry Calculator (Alpha 7.1)

## About this calculator
This calculator is purely a client-side, Github Pages hosted basic web application. That means it's just HTML, CSS, and Javascript powering everything and holding all of the data. 
My hope is that by requiring no specific setup or resources to get started, you can easily understand how this application works and build on top of it.

## Help Wanted
Rise of Industry is picking up more and more traction as a game, my goal for this calculator is to have a very open-source solution the community can leverage as the game matures and changes. I'd ❤️ your pull requests.
**Immediate help is needed completing the products and recipes.**

## Codebase Tour
### Libraries Used:
Currently this application only leverages jQuery and the [Materialize](https://materializecss.com/) framework.
### Javascript:
#### products.js
Products are anything that can be consumed or produced. There are three classes that manage the products:
- **ProductBook** - Contains all products and categories, along with methods to add or retrieve products.
- **Product** - Data about a specific product, for now, limited to a unique id and a name
- **ProductCategory** - Products belong to Product Categories, mostly used to render the "Desired Products" picker
#### recipes.js
Recipes combine products with buildings and store the ratios. Each recipe has
- **Name** - Recipe Name
- **Inputs**- An array of products and their ratio quantity (classified as Ingredients)
- **Outputs** - An array of products and their ratio quantity (classified as Ingredients)
- **Building** - Where this recipe is produced

There is a **RecipeBook** class as well to help manage and find recipes. 
#### buildings.js
Buildings are where items get produced from the recipes. Each building has
- **Name** - Name of building (i.e. "Crop Farm")
- **Speed** - Number of days it takes to make something
- **HasGatherers** - boolean true/false - true for everything that's not a factory
- **GathererName** - What you call the thing gathering resources (i.e. "Farm(s)")

For now, buildings don't have any wrapper object to manage them, they are for better or worse just hanging out as global vars.
#### app.js
This contains most of the logic. Today, there's only one real function called **"onDesiredProductsChage"**. This calls a bunch of other functions to calculate the production chain ratios, etc.
There is also a global **appConfig** variable defined in this file that controls the number of gatherers and "period" of days your desired production is in terms of.
I'll try to document more about how the ratio calculation works and all that soon.
#### init.js
Today, this creates the HTML for the "Desired Products" section on the left based on the productBook. There isn't really any other initilization occuring for now.
#### ui_listeners.js
There are three listeners for UI changes:
- **Quantity Chage** - Desired products were added or updated.
- **Period Length** - The length of the production period was updated
- **Number of Gatherers** - Number of Gatherers to use was changed
All listeners re-compute all current production chains and update the UI.

### HTML
There's just the index.html file today, nothign too crazy. The "Desired Products" and "Production Chain" sections are dynamically loaded in with jQuery.

### CSS
There's also just one CSS file today with 4 sections: overrides to the Materialize CSS defaults, layout, product picker, and production chains.

### Quck Reminder:
**I'd love your help building this out, ideas, issues, and PRs are all welcome**
