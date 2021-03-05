const express = require("express");
const router = express.Router();
const SneakerModel = require("./../models/Sneaker");
const TagsModel = require("./../models/Tag");


console.log("hello");

router.get('/', function(req, res, next) {
 
  res.render('index');
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});



//find sneakers collection
router.get("/sneakers/collection", async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.find().populate("id_tags");
    const tags = await TagsModel.find();

    res.render("products", {sneakers, tags})

  } catch (err) {
    next(err)
  }
});


// create sneaker
router.post ("/products_add", async (req, res, next) => {
  const { name, ref, size, descriprion, price, category, id_tags } = req.body;
  
  try {
      await SneakerModel.create({
        name,
        ref,
        size,
        descriprion,
        price,
        category,
        id_tags
      });
  } catch (err) {
      next(err);
  }
  res.redirect('/');
});


// update sneakers
router.get("one-product/:id", async (req, res, next) => {
  try {
    res.render("one-product", await SneakerModel.findById(req.params.id));
  } catch (err) {
    next(err);
  }
});

// uploader.single("sneaker"),
router.post("/sneaker-collection/:id",
  async (req, res, next) => {
    try {
      const sneakerToUpdate = { ...req.body };

      await SneakerModel.findByIdAndUpdate(req.params.id, sneakerToUpdate);
      res.redirect("/sneakers/collection");
    } catch (err) {
      next(err);
    }
  }
);


//filter the category (men,women,kid)
router.get("/sneakers/:cat", async (req, res, next) => {
  try {
    const sneakers = await SneakerModel.find({category: req.params.cat});
    const tags = await TagsModel.find();

    res.render("products", {sneakers, tags})
    
  } catch (err) {
    next(err)
  }
});


//get sneakers by id
router.get("/one-product/:id",
  async (req, res, next) => {
    try {
      const oneSneaker = await SneakerModel.findByIdAndUpdate(req.params.id);
      res.render("one_product", {sneaker : oneSneaker});
    } catch (err) {
      next(err);
    }
  }
);

//find a product with the id and remove it
router.get("/one-product/:id", async (req, res, next) => {
  try {
    await SneakerModel.findByIdAndRemove(req.params.id);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
