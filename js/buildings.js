class Building {

  constructor(name, speed, hasGatherers, gathererName, img_url) {
    
    // TODO: add some validation
    
    this.name = name;
    this.speed = speed; // in days
    this.hasGatherers = hasGatherers; // has fields, pumps, etc.
    this.gathererName = gathererName;
    this.img_url = img_url;
  }

//  sayHi() {
//    alert(this.name);
//  }

}

// Gatherers
let waterSiphon = new Building("Water Siphon",10,true,"Siphon(s)");
let fishermanDock = new Building("Fisherman Dock",10,true,"Boat(s)");
let sandCollector = new Building("Sand Collector",10,true,"Collector(s)");
let ironMine = new Building("Iron Mine",10,true,"Miner(s)");
let coalMine = new Building("Coal Mine",10,true,"Miner(s)");
let copperMine = new Building("Copper Mine",10,true,"Miner(s)");
let oilDrill = new Building("Oil Drill",10,true,"Pump(s)");
let gasPump = new Building("Gas Pump",10,true,"Pump(s)");
let lumberYard = new Building("Lumber Yard",10,true,"Logger(s)");

// Farms
let cropFarm = new Building("Crop Farm",30,true,"Farm(s)");
let orchard = new Building("Orchard",40,true,"Farm(s)");
let plantation = new Building("Plantation",30,true,"Farm(s)");
let livestockFarm = new Building("Livestock Farm",45,true,"Farm(s)");

// Factories
let distellery = new Building("Brewery and Distillery",25,false,"");
let foodFactory = new Building("Food Factory",40,false,"");
let drinksFactory = new Building("Drinks Factory",35,false,"");
let preservationFactory = new Building("Preservation Factory",30,false,"");
let petrochemicalPlant = new Building("Petrochemical Plant",30,false,"");
let glassWorksSmelter = new Building("Glassworks & Smelter",35,false,"");
let textileFactory = new Building("Textile Factory",20,false,"");
let carpentryCenter = new Building("Carpentry Center",35,false,"");
let papermill = new Building("Papermill",35,false,"");
let homegoodsFactory = new Building("Home Goods Factory",45,false,"");
let automotiveFactory = new Building("AutomotiveFactory",60,false,"");

// Prototyping
let carPrototypeFacility = new Building("Car Prototype Facility",360,false,"");

let buildings = [
  waterSiphon,
  fishermanDock,
  sandCollector, 
  ironMine,
  coalMine,
  oilDrill,
  gasPump,
  lumberYard,
  cropFarm,
  orchard,
  plantation,
  livestockFarm,
  distellery,
  foodFactory,
  drinksFactory,
  preservationFactory,
  petrochemicalPlant,
  glassWorksSmelter,
  textileFactory,
  carpentryCenter,
  papermill,
  homegoodsFactory,
  automotiveFactory,
  carPrototypeFacility
];

//let user = new User("John");
//user.sayHi();