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
        // console.log(sneakers);
        res.render("products_manage", {sneakers});
    })
    .catch(err=>console.error(err))    
});

// update sneaker
router.get("/product-edit/:id", (req, res, next) => {
    SneakerModel.findById(req.params.id)
    .then(sneaker => {
        // console.log(sneaker.name)
        res.render("product_edit", {sneaker})
    })
    .catch(err=>console.error(err))
})

router.post("/product-edit/:id", (req, res, next) => {
    SneakerModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(sneaker=> {
        // console.log("req.params.id: ", req.params.id)
        // console.log("sneaker:", sneaker);
        // console.log("req.body: ",req.body);
        res.redirect("/dashboard_sneaker");
    })
    .catch(err=>console.error(err))
})

//create a new sneaker
router.get("/add", (req, res, next) => {
    res.render("products_add")
})

router.post("/add", (req, res, next) => {
    SneakerModel.create(req.body)
    .then(sneaker=> {
        res.redirect("/dashboard_sneaker");
    })
    .catch(err=>console.error(err))
})

//delete a sneaker
router.get("/delete/:id", (req, res, next) => {
    SneakerModel.findByIdAndDelete(req.params.id)
    .then(res.redirect("/dashboard_sneaker"))
    .catch(next)
})

module.exports = router;
