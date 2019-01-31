const express = require('express');
const loginSchema = require('../models/login-model');
const {
   Register
} = require('../models/register-model');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const lodash = require('lodash');
const loggedin = require('../middleware/loggedin');


function validate(req) {
   const schema = {
      email: Joi.string().min(5).max(50).required(),
      password: Joi.string().min(5).max(255).required()
   };
   return Joi.validate(req, schema);

}

router.post('/', async (req, res) => {

   const {
      error
   } = validate(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   let user = await Register.findOne({
      email: req.body.email
   });
   if (!user) return res.status(400).send('invalid email');


   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if (!validPassword) return res.status(400).send('invalid password');

   const token = user.generateAuthToken();
   //res.send(lodash.pick(user , ['_id','email' , 'password']));
   // res.header('x-login-token', token).status(200).json({token: token});

   //const token = jwt.sign({email: this.email , this: user._id}, "iloveyou",{expiresIn: "1h"} );
   res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: user
   });





   // res.send(true);


});

// router.get('/get', (req, res)=>{
//       loginSchema.find({}, (err, logins)=>{
//           if(err)
//              return res.status(500).json({errmsg: err});
//              console.log({logins});
//              return res.status(200).json({msg: logins});
//       })

// });



module.exports = router;