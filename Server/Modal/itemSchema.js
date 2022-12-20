import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    itemname: String,
    price: String,
    description: String,
    img: String,
})

const Item = new mongoose.model("Item", itemSchema);

export default Item

