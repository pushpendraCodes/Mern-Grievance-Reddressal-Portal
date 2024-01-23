const { Router } = require("express");
const express = require("express");
const router = express.Router();
const users = require("../Modals/users");
const bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
let jwtkey = process.env.REACT_JWT_KEY;
const verify_token = require("../MiddileWare/Auth");
const { getEventListeners } = require("nodemailer/lib/xoauth2");

const mailTransporter = require("../MiddileWare/nodemailer");
const validator = require("validator");

router.post("/api/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await users.findOne({
      email: req.body.email,
    });

    if (user && user.is_active === true) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            {
              username: user.username,
            },
            jwtkey
          );
          return res.status(200).send({
            token: token,
            u_type: user.u_type,
            name: user.name,
            user_id: user._id,
          });
        } else {
          res.status(203).send({
            msg: "Invalid password",
          });
        }
      });
    } else {
      return res.status(201).send({
        msg: "user not found",
      });
    }
  } else {
    return res.status(201).json({
      msg: "both fields required",
    });
  }
});
router.post("/api/demoAdmin/login", async (req, res) => {
    let user = await users.findOne({
      email: "admin@gmail.com",
    });

    if (user && user.is_active === true) {
      bcrypt.compare("1234", user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            {
              username: user.username,
            },
            jwtkey
          );
          return res.status(200).send({
            token: token,
            u_type: user.u_type,
            name: user.name,
            user_id: user._id,
          });
        } else {
          res.status(203).send({
            msg: "Invalid password",
          });
        }
      });
    } else {
      return res.status(201).send({
        msg: "user not found",
      });
    }

});
router.post("/api/demoStudent/login", async (req, res) => {
    let user = await users.findOne({
      email: "pushpendrapatel8055@gmail.com",
    });

    console.log(user,"user")
    if (user && user.is_active === true) {
      bcrypt.compare("1234", user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            {
              username: user.username,
            },
            jwtkey
          );
          return res.status(200).send({
            token: token,
            u_type: user.u_type,
            name: user.name,
            user_id: user._id,
          });
        } else {
          res.status(203).send({
            msg: "Invalid password",
          });
        }
      });
    } else {
      return res.status(201).send({
        msg: "user not found",
      });
    }

});

router.post("/resister/student", async (req, res) => {
  if (req.body) {
    let user_exist = await users.findOne({
      email: req.body.email,
    });
    let today = new Date();
    if (user_exist) {
      res.status(201).send({ result: "user already exist" });
    } else {
      let result = new users({
        name: req.body.name,
        gender: req.body.gender,
        resistration: req.body.resistration,
        mobile: req.body.mobile,
        Class: req.body.class,
        semester: req.body.semester,
        email: req.body.email,

        gaurdian: req.body.gaurdian,
        address: req.body.address,
        u_type: "student",
        is_active: false,
        date: today,
      });
      let save = result.save();
      if (save) {
        res.status(200).send({ result: "succesfully request resisterd" });
      }
    }
  } else {
    res.status(201).send({ result: "all field required" });
  }
});
router.post("/resister/staff", async (req, res) => {
  let today = new Date();
  if (req.body) {
    let user_exist = await users.findOne({
      email: req.body.email,
    });
    if (user_exist) {
      res.status(201).send({ result: "user already exist" });
    } else {
      let result = new users({
        name: req.body.name,
        gender: req.body.gender,

        mobile: req.body.mobile,

        email: req.body.email,

        employee_id: req.body.employee_id,
        designation: req.body.designation,

        date: today,

        u_type: "staff",
        is_active: false,
      });
      let save = result.save();
      if (save) {
        res.status(200).send({ result: "succesfully request resisterd" });
      }
    }
  } else {
    res.status(201).send({ result: "all field required" });
  }
});

router.get("/get/request", verify_token, async (req, res) => {
  try {
    let result = await users.find({
      is_active: false,
    });
    if (!result) {
      res.status(203).send({ result: "something went wrong" });
    }
    res.status(200).send({ result: result });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/delete/request/:id", verify_token, async (req, res) => {
  let result = await users.findByIdAndDelete({
    _id: req.params.id,
  });
  if (result) {
    res.status(200).send({ result: "successfully deleted" });
  } else {
    res.status(203).send({ result: "something went wrong" });
  }
});

router.post("/get/students/details/:id", async (req, res) => {
  let result = await users.findById({
    _id: req.params.id,
  });
  if (!result) {
    res.status(201).send({ result: "something went wrong" });
  }
  res.status(200).send({ result: result });
});

router.post("/send/details", verify_token, async (req, res) => {
  let password = `${req.body.name.split(" ").join("")}${req.body.mobile}@`;

  let pw = await bcrypt.hash(password, 10);

  validator.isEmail(req.body.email);

  let mailDetails = {
    from: process.env.REACT_EMAIL,
    to: req.body.email,
    subject: "Grivience Portal Login Details",
    html: ` <p> you are recieving because you are(someone) You have registerd to grievence portal <br/> <b> email:</b> ${req.body.email} <br/> <b>Paaword</b>: ${password}  </p>`,
  };

  mailTransporter.sendMail(mailDetails, async function (err, data) {
    if (data) {
      await users.findByIdAndUpdate(
        {
          _id: req.body._id,
        },
        {
          $set: {
            is_active: true,
            password: pw,
          },
        },
        {
          returnNewDocument: true,
        }
      );

      res.status(200).send({ result: "Email sent successfully" });
    } else {
      console.log(err, "err");
      res.status(203).send({ result: "something went wrong" });
    }
  });
});

router.get("/list/student", verify_token, async (req, res) => {
  let students = await users.find({
    u_type: "student",
    is_active: true,
  });

  if (!students) {
    res.status(203).send({ result: "error" });
  }
  res.status(200).send({ result: students });
});
router.get("/list/staffs", verify_token, async (req, res) => {
  let staff = await users.find({
    u_type: "staff",
    is_active: true,
  });

  if (!staff) {
    res.status(203).send({ result: "error" });
  }
  res.status(200).send({ result: staff });
});

router.delete("/remove/staff/:id", verify_token, async (req, res) => {
  let staff = await users.findOneAndDelete({
    u_type: "staff",
    is_active: true,
    _id: req.params.id,
  });

  if (staff) {
    res.status(200).send({ result: "success" });
  } else {
    res.status(201).send({ result: "somethig went wrong" });
  }
});

router.delete("/remove/student/:id", verify_token, async (req, res) => {
  let result = await users.deleteOne({
    _id: req.params.id,
  });
  if (result) {
    res.status(200).send({ result: "success" });
  } else {
    res.status(203).send({ result: "somwthing is wrong" });
  }
});

router.post("/check/email", async (req, res) => {
  var result = await users.find({
    email: req.body.email,
  });

  // console.log(result, "result");
  if (result.length > 0) {
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    // console.log(updateOtp, "updateotp");
    // if (result1) {
    //   let mailDetails = {
    //     from: process.env.REACT_EMAIL,
    //     to: req.body.email,
    //     subject: "E-Grivience Portal password reset otp",
    //     html: ` <p> you are recieving because you are(someone) You have request to reset the password in e- grievence portal <br/> <p> otp:</p> - <b>${otp} </b> </p>`,
    //   };

    //   mailTransporter.sendMail(mailDetails, function (err, data) {
    //     if (data && result1) {
    //       res.status(200).send({ result: "otp sent successfully" });
    //     } else {
    //       res.status(203).send({ result: "something went wrong" });
    //     }
    //   });
    // }
  } else {
    res.status(201).send({ msg: "user not found" });
  }
});

module.exports = router;
