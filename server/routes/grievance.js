const { Router } = require("express");
const express = require("express");
const router = express.Router();
const grievance = require("../Modals/grievance");
const users = require("../Modals/users");
const verifyToken = require("../MiddileWare/Auth");
let multi_upload = require("../MiddileWare/Multer");

router.post(
  "/send/grievance/:id",
  multi_upload.fields([
    {
      name: "file",
      maxCount: 1,
    },
  ]),

  async (req, res) => {
    let today = new Date();

    let result = await users.findOne({
      _id: req.params.id,
    });
    const files = req.files["file"];
    // console.log(files, "files");
    // console.log(req.body, "body");
    let path = [];
    if (result) {
      if (files) {
        for (var i = 0; i < files.length; i++) {
          path.push(files[i].path);
        }
      }

      let Grievance = new grievance({
        mobile: result.mobile,
        name: result.name,
        user_id: result._id,
        u_type: result.u_type,
        gender: result.gender,
        Class: result.Class,
        semester: result.semester,
        registration: result.registration,
        address: result.address,
        message: req.body.msg,
        subject: req.body.sub,
        status: "pending",
        date: today,
        file: path,
      });
      let save = Grievance.save();
      if (save) {
        res.status(200).send({ msg: "successfully query raised" });
      } else {
        res.status(201).send({ msg: "something went wrong" });
      }
    }
  }
);



router.post("/get/grievance", verifyToken, async (req, res) => {

  // console.log(req.body.sort,"sort")
  if (req.body.sort === "All") {
    let result = await grievance.find();
    if (result) {
      res.status(200).send({ result: result });
    } else {
      res.status(201).send("no data found");
    }
  }
else{
  let result = await grievance.find({
    status:req.body.sort
  });
    if (result) {
      res.status(200).send({ result: result });
    } else {
      res.status(201).send("no data found");
    }
}

});

router.get("/resolved/query", verifyToken, async (req, res) => {
  let result = await grievance.find({
    status: "resolved",
  });
  if (result) {
    res.status(200).send({ result: result });
  } else {
    res.status(201).send("no data found");
  }
});

router.post("/delete/grievance/:id", async (req, res) => {
  let result = await grievance.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: {
        status: "rejected",
      },
    },
    {
      returnNewDocument: true,
    }
  );

  if (result) {
    res.status(200).send("success");
  } else {
    res.status(201).send({ msg: "something went wrong" });
  }
});

router.get("/details/grievance/:id", verifyToken, async (req, res) => {
  let result = await grievance.findOne({
    _id: req.params.id,
  });
  if (result) {
    res.status(200).send({ result: result });
  } else {
    res.status(201).send({ msg: "something went wrong" });
  }
});

router.post("/resolve/grievance/:id", verifyToken, async (req, res) => {
  let result = await grievance.findByIdAndUpdate(
    {
      _id: req.params.id,
    },
    {
      $set: {
        reply: req.body.reply_msg,
        status: "resolved",
      },
    }
  );
  if (result) {
    res.status(200).send({ msg: "successfully resolved" });
  } else {
    res.status(201).send({ msg: "something wrong" });
  }
});

router.get("/History/grievance/student/:id", verifyToken, async (req, res) => {


  let result = await grievance.find({
    user_id: req.params.id,
  });

  if (result) {
    // console.log(result)
    res.status(200).send({result:result});
  }else{
    res.status(201).send({result:"no data "});
  }
});

router.delete("/delete/grievance/student/:id", async (req, res) => {
  let result = await grievance.findByIdAndDelete({
    _id: req.params.id,
  });
  if (result) {
    res.status(200).send({ msg: "successfuly deleted" });
  } else {
    res.status(201).send({ msg: "something wrong" });
  }
});

router.post("/view/grievance/student/:id", async (req, res) => {
  let result = await grievance.findOne({
    _id: req.params.id,
  });
  if (result) {
    res.status(200).send({ result: result });
  } else {
    res.status(201).send({ result: "something Went Wrong" });
  }
});

module.exports = router;
