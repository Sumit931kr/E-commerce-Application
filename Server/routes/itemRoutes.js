import express from 'express'
import fetchUser from '../Middleware/fetchUser.js';
import cartItem from '../Modal/cartSchema.js';
import Item from '../Modal/itemSchema.js'

const router = express.Router();


// Creating the item

router.post('/createitem', async (req, res) => {
    try {
        const { itemname, description, img, price } = req.body;
        const newItem = await Item.create({
            itemname,
            price,
            description,
            img,
        });
        res.status(200).json(newItem)

    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }

})


// Get all the items

router.get('/items', async (req, res) => {

    try {

        const Items = await Item.find({});
        res.status(200).send(Items)

    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }

})


// Get a particular Item
router.get('/items/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findById(id)
        res.status(200).json(item);

    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
})

// Add the item under User id in cart
router.post('/items/:id', fetchUser, async (req, res) => {
    try {

        const userId = req.user;

        const product = await Item.findById(req.params.id)
        const {itemname, price, description, img} = product;
        const newcartItem = await cartItem.create({
            itemname,
            price,
            description,
            img,
            userId:userId.id
        })


        res.status(200).json({newcartItem})

    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);

    }

})

// Creating a APi to get all the item from cart

router.get('/cartitem',fetchUser, async (req, res) => {

    try {
        const userId = req.user;

        const AllcartItem = await cartItem.find({userId: userId.id});

        res.status(200).json(AllcartItem);

    } catch (error) {
        res.status(402).send({"Error": error.message});
        console.log(error.message);
    }
})

// Search the Product in the database

router.get('/searchitem/:text', async (req, res) => {

    try {
        var regex = new RegExp(req.params.text, 'i');
        const result = await Item.find({ itemname: regex });
        res.json(result)

    } catch (error) {
        res.json({ message: 'some error occured ' + error })
        console.log("eror occured here");
    }

})




export default router;