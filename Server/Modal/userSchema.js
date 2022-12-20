import  mongoose  from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        required:true,
        type:String
    },
    email:  {
        required:true,
        type:String
    },
    password:  {
        required:true,
        type:String
    },
    address:String,
    pincode:Number,
    mobile:Number
})

const User = new mongoose.model("User", userSchema)
export default User