const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sneakerSchema = new Schema ({
    
name: String,
ref: String,
size: Number,
description: String,
price: Number,
category: {type:String, enum:["men", "women", "kids"]},
id_tags: [{type: Schema.Types.ObjectId, ref: "tags"}],
image : {
    type : String,
    default: "https://res.cloudinary.com/adgranmous/image/upload/v1614957986/default-sneak_vrsvpg.jpg"
}});

const SneakerModel = mongoose.model("sneaker", sneakerSchema);

module.exports = SneakerModel;