const express = require("express");
const router = express.Router();

console.log("hello")
// return console.log(`\n\n
// -----------------------------
// -----------------------------
//      wax on / wax off !
// -----------------------------
// -----------------------------\n\n`
// );


router.get('/', function(req, res, next) {
  res.render('index');
});

router.get("/sneakers/:cat", (req, res) => {
  console.log(req.params.cat)
  res.render("products");
});

router.get("/one-product/:id", (req, res) => {
  res.render("one_product");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});


module.exports = router;
