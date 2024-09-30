const mongoose = require('mongoose');

async function main() {
  console.log('Connecting to DB');
  try {

    await mongoose.connect('mongodb://localhost:27017/Tufcon');
    // await mongoose.connect('mongodb://coverkraft:Bytes%400701@52.52.154.65:27017/coverKraft?authSource=admin');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // You can handle the error here, log it, or perform any necessary actions.
  }
}

// Call the main function
main();
