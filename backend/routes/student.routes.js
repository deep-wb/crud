const mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();

// Student Model
let studentSchema = require('../models/Student');

// CREATE Student
router.route('/create-student').post((req, res, next) => {
  studentSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log(data)
      res.json(data)
    }
  })
});

// READ Students
router.route('/').get((req, res) => {
  studentSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Student
router.route('/edit-student/:id').get((req, res) => {
  studentSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return(error)
    } else {
      res.json(data)
    }
  })
})


// Update Student
router.route('/update-student/:id').put((req, res, next) => {
  studentSchema.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Student updated successfully !')
    }
  })
})

// Delete Student
router.route('/delete-student/:id').delete((req, res, next) => {
  studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

router.route('/sendmail').post((req, res, next)=> {

  "use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'aylin.mayer@ethereal.email',
        pass: 'XrjGSrzRZDV4eduqUd'
    }
});

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"deep " <deepupadhyay147@gmail.com>', // sender address
    to: "deep@webcluesinfotech.com", // list of receivers
    subject: "Hello from deep", // Subject line
    html: "<b>Hello world?</b>", // html body
  });
  if(info.messageId){
    res.send("email sent");
  }else{
    res.send("Error with email sending");
  }
}

main().catch(console.error);
  
});

module.exports = router;