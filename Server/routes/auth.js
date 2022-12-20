
import express from 'express';
import jwt from 'jsonwebtoken'
import {body, validationResult} from 'express-validator'
import User from '../Modal/userSchema.js'

const router = express.Router()

// ROUIE 1:- Create a User using: POST "/api/auth/createUser" Doesn't require authentication

router.post('/createUser', [
  body('name', 'Enter a Valid Name').isLength({ min: 3 }),
  body('email', 'Enter a Valid Email ').isEmail(),
  body('password', 'Password Must be atleast 5 character').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  // If there are errros, return Bad request and the error

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }


  // Check Wheater the user with this email exists already
  try {

    let user = await User.findOne({ email: req.body.email })
    // console.log(user);
    if (user) {
      return res.status(400).json({ success, error: " 34 Sorry a User with email already exits" })
    }

    // Making Password  Vauranable
    const secPass = req.body.password;


    // Create a new user
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
      address: req.body.address,
      pincode: req.body.pincode,
      mobile:req.body.mobile
    })

    const data = {
      user: {
        id: user.id,
      },
    }


    const authtoken = jwt.sign(data,process.env.JWT_SECRET);

    // res.json(user)
    success = true;
    res.status(200).json({ success,name:user.name, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).json({" 64 Internal Server ERROR": error.message})
  }

})


// ROUTE 2 :- Aunthenticate a User using: POST "/api/auth/loginUser" No login required

router.post('/loginUser', [

  body('email', 'Enter a Valid Email ').isEmail(),
  body('password', 'Cannot be Blank ').exists(),

], async (req, res) => {
  let success = false;

  // If there are error return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: " 89 Please 1 try with Correct Credentials" })
    }

    // const passwordCompare = await bcrypt.compare(password, user.password)
    // if (!passwordCompare) 
    console.log(user.password);
    console.log(password);
    console.log( !password == user.password)
    if ( password == user.password == false) {
      success = false;
      return res.status(400).json({ success, error: " 96 Please try with Correct Credentials" })
    }

    const data = {
      user: {
        id: user.id,
      }
    }
    const authtoken = jwt.sign(data, process.env.JWT_SECRET);
    success = true
    res.json({ success, name: user.name, authtoken })



  } catch (error) {

    console.error(error.message);
    res.status(505).send(" 102 Internal Server ERROR");

  }

})

// ROUTES 3 :- Get loggedIn User Detials using : POST "/api/auth/getUser" . Login Required 

// router.get('/getUser', fetchUser, async (req, res) => {

//   try {

//     const user = req.user
//     let userr = await User.findById(user.id)
//     if (userr === null) {
//       userr = await googleUser.findById(user.id)
//     }
//     res.json(userr.name);
//   }
//   catch (error) {
//     console.error(error.message);
//     res.status(500).send(" 119 Internal Server ERROR");
//   }


// })




export default router;
