import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    itemname: String,
    price: String,
    description: String,
    img: String,
    userId : {
        reuired : true,
        type: mongoose.Schema.Types.ObjectId
    }
})

const cartItem = new mongoose.model("cartItem", cartSchema);

export default cartItem
