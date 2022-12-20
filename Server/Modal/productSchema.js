import mongoose  from "mongoose";

const productSchema = mongoose.Schema({
    itemname: String,
    price: String,
    description: String,
    img:String,
})

const Product = new mongoose.model("Product", productSchema)

export default Product

