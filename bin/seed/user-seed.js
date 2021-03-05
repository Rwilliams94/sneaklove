// create a test data set of valid users
require("dotenv").config();
require("../../config/mongodb"); // fetch the db connection
const UserModel = require("../../models/User"); // fetch the model to validate our user document before insertion (in database)

const users = [
  {
  name: "Ro",
  lastname: "Snow",
  email: "ro@snow.com",
  password: "1234"
  }
];

(async function insertUsers() {
  try {
    await UserModel.deleteMany(); // empty the styles db collection
    const inserted = await UserModel.insertMany(users); // insert docs in db
    console.log(`seed artists done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
})();
