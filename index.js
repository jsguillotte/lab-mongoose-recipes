const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

//Method 1 : Using Async Await

const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();
    let greekSalad = {title: 'Greek Salad', cuisine: "Mediterranean", duration: 20, creator: "People"}
    let greekSaladDb = await Recipe.create(greekSalad)
    

    let someRecipe = await Recipe.find({title: 'Greek Salad'})
    console.log(someRecipe)

    let allRecipes = await Recipe.insertMany(data);
    data.forEach(el => {
      console.log(el.title)

    })

    let updateRecipe = await Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
    let riggatoni = await Recipe.find({title: "Rigatoni alla Genovese"})
    console.log(riggatoni, 'success')
    
    let deleteRecipe = await Recipe.deleteOne({title: "Carrot Cake"});
    let carrotCake = await Recipe.find({title: 'Carrot Cake'})
    console.log(carrotCake, "success")
    
    let dbDisconnect = await mongoose.connection.close(MONGODB_URI)

    // Run your code here, after you have insured that the connection was made
  } catch (error) {
    console.log(error);
  }
};

manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
