const express = require("express"); // import express in this module
const SneakerModel = require("./../models/Sneaker");
const router = new express.Router(); // create an app sub-module (router)

// logged in users are able to create new products
// logged in users are able to update a product
// logged in users are able to delete some products

// show all sneakers in dashboard
router.get("/", (req, res, next) => {
    SneakerModel.find()
    .then(sneakers => {
        console.log(sneakers);
        res.render("products_manage", {sneakers});
    })
    .catch(err=>console.error(err))    
});

router.get("/product-edit/:id", (req, res, next) => {
    SneakerModel.findById(req.params.id)
    .then(sneaker => {
        console.log(sneaker.name)
        res.render("product_edit", {sneaker})
    })
    .catch(err=>console.error(err))
})

router.post("/product-edit/:id", (req, res, next) => {
    
})

module.exports = router;
