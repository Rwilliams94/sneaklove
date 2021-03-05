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
  id_tags: ["60422d95cb92e5735cb70e33"]
},
{
  name: "wooSneaks",
  ref: "woo",
  size: 5,
  description: "lady sneaks",
  price: 2000,
  category: "women",
  id_tags: ["60422d95cb92e5735cb70e34"]
},
{
  name: "kidSneaks",
  ref: "kids",
  size: 15,
  description: "tiny sneaks",
  price: 10,
  category: "kids",
  id_tags: ["60422d95cb92e5735cb70e35"]
},
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
