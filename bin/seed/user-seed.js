// create a test data set of valid users
require("dotenv").config();
require("../../config/mongodb"); // fetch the db connection
const UserModel = require("../../models/Sneaker"); // fetch the model to validate our user document before insertion (in database)

const sneakers = [


];

(async function insertLabels() {
  try {
    await ArtistModel.deleteMany(); // empty the styles db collection
    const inserted = await ArtistModel.insertMany(artists); // insert docs in db
    console.log(`seed artists done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
})();
