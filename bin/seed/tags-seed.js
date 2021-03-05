
// create a test data set of valid users
require("dotenv").config();
require("../../config/mongodb"); // fetch the db connection
const TagsModel = require("../../models/Tag"); // fetch the model to validate our user document before insertion (in database)

const tags = [
{
  label: "basketball"
},
{
  label: "football"
},
{
  label: "running"
},
{
  label: "casual"
},
{
  label: "rare"
},
{
  label: "celebrity"
}
];

(async function insertTags() {
  try {
    await TagsModel.deleteMany(); // empty the styles db collection
    const inserted = await TagsModel.insertMany(tags); // insert docs in db
    console.log(`seed tags done : ${inserted.length} documents inserted !`);
  } catch (err) {
    console.error(err);
  }
})();
