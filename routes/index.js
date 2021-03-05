const express = require("express");
const router = express.Router();
const SneakerModel = require("./../models/Sneaker");


console.log("hello");

router.get('/', function(req, res, next) {
  console.log("------------------THERE-------------");
  res.render('index');
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

console.log("----------------1----------------");

//find sneakers collection
router.get("/sneakers/collection", (req, res, next) => {
  console.log("---------------2-----------------");
  SneakerModel.find()
    .then((dbRes) => {
      res.render("products", {
        sneakers: dbRes
      });
    })
    .catch((dbError) => {
      next(dbError);
    });
});


// create sneaker
router.post ("/products_add", async (req, res, next) => {
  const { name, ref, size, descriprion, price, category, id_tags } = req.body;
  
  console.log("+++------------+++++++++++++---------------+++");
  console.log(req.body);
  console.log("+++------------+++++++++++++---------------+++")
  
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
router.get("/sneakers/:cat", (req, res) => {
  SneakerModel.find({category : req.params.cat})
  .then((dbRes) => {
      res.render("products", {
        sneakers: dbRes
      });
    })
    .catch((dbError) => {
      next(dbError);
    });
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
