const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255

    },
    address: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }

    // ,
    // creator: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Login",
    //     required: true
    // }




});

const Contact = mongoose.model('contact', contactSchema);
exports.Contact = Contact;
//module.exports = mongoose.model('contact', contactSchema);