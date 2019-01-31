const express = require('express');
const router = express.Router();
const {
     Contact
} = require('../models/contact-model');
const loggedin = require('../middleware/loggedin');
const Joi = require('joi');
const lodash = require('lodash');

function validateContact(Contact) {
     const schema = {
          name: Joi.string().min(5).max(50).required(),
          email: Joi.string().min(5).max(50).required(),
          phone: Joi.string().min(5).max(255).required(),
          address: Joi.string().min(5).max(255).required()
     };
     return Joi.validate(Contact, schema);

}


router.put('/update', async (req, res) => {
     const {
          error
     } = validateContact({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
     });
     if (error) return res.status(400).send(error.details[0].message);

     const contact = new Contact({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          // creator: req.userData.userId

     }, {
          new: true
     });

     Contact.findOne({
          _id: req.body._id,
          //  creator: req.userData.userId
     }).then(result => {
          if (result) {
               console.log(result);
          } else {
               return res.status(401).json({
                    message: 'not authorized'
               });

          }
     })


     Contact.updateOne({
               _id: req.body._id,
               // creator: req.userData.userId
          }, contact)
          .then(result => {
               console.log('result modified: ', result.nModified)
               if (result.nModified > 0) {
                    res.status(200).json({
                         message: 'update sucessfully'
                    });
               } else {
                    res.status(401).json({
                         message: 'not authorized'
                    });


               }
          })

     // if (!contact) return res.status(404).send('The customer with the given ID was not found.');

     // contact.save()
     // .then(result=>{
     // })
     // .catch(err=>{
     //      res.status(500).json({message: err+ '  update failed'});
     // })
     //res.send(lodash.pick(contact , ['_id','name' , 'email' , 'phone','address']));


});


router.post('/post', async (req, res) => {

     const {
          error
     } = validateContact({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,

     });
     if (error) return res.status(400).send(error.details[0].message);

     let contact = new Contact({

          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          // creator: req.userData.userId

     });
     // console.log(req.userData);
     // return res.status(200).json({});
     contact.save();
     res.send(lodash.pick(contact, ['_id', 'name', 'email', 'phone', 'address']));

});



router.delete('/delete/:id', async (req, res) => {


     Contact.deleteOne({
               _id: req.params.id,
               //  creator: req.userData.userId
          })
          .then(result => {
               console.log(result);
               if (result.n > 0) {
                    res.status(200).json({
                         message: 'deletion sucessfully'
                    });
               } else {
                    res.status(401).json({
                         message: 'not authorized'
                    });

               }
          }).catch(err => {
               res.status(400).json({
                    message: 'error found'
               });

          });
});


router.get('/get', async (req, res) => {
     Contact.find({}, (err, contact) => {
          if (err)
               return res.status(500).json({
                    errmsg: err
               });
          return res.status(200).json({
               msg: contact
          });
     });
})

module.exports = router;