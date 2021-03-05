// create a test data set of valid users
require("dotenv").config();
require("./../../config/mongodb"); // fetch the db connection
const SneakerModel = require("./../../models/Sneaker"); // fetch the model to validate our user document before insertion (in database)

const sneakers = [
{
  name: "fooSneaks",
  ref: "foo",
  size: 15,
  description: "big foo sneaks",
  price: 1000,
  category: "men",
  id_tags: []
}
];

(async function insertSneakers() {
  try {
    await SneakerModel.deleteMany(); // empty the styles db collection
    const inserted = await SneakerModel.insertMany(sneakers); // insert docs in db
    console.log(`seed sneakers done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
})();
