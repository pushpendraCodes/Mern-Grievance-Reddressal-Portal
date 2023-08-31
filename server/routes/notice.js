const { Router } = require("express");
const express = require("express");
const router = express.Router();

let notice = require("../Modals/notices");
let verifyToken = require("../MiddileWare/Auth");
let multer = require("multer");
let multi_upload = require("../MiddileWare/Multer");

router.post(
  "/create/notice",
  multi_upload.fields([
    {
      name: "files",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
    // console.log(req.body);
    const files = req.files["files"];
    // console.log(files, "files");
    const no = Math.random().toString(36).substring(2, 7);
    let path = [];
    if (files) {
      for (var i = 0; i < files.length; i++) {
        path.push(files[i].path);
      }
    }

    let date = new Date();

    if (req.body.sub && req.body.user && files) {
      let notices = await new notice({
        subject: req.body.sub,
        regarding: req.body.user,
        file: path || "",
        notice: req.body.notice,
        date: date,
        notice_no: no,
      });

      notices
        .save()
        .then((result) => {
          // console.log(result);
          res.status(200).json({
            message: "Notice created successfully!",
          });
        })
        .catch((err) => {
          // console.log(err),
            res.status(201).json({
              error: err,
            });
        });
    }

    else if(req.body.sub && req.body.user){
      let notices = await new notice({
        subject: req.body.sub,
        regarding: req.body.user,

        notice: req.body.notice,
        date: date,
        notice_no: no,
      });

      notices
        .save()
        .then((result) => {
          // console.log(result);
          res.status(200).json({
            message: "Notice created successfully!",
          });
        })
        .catch((err) => {
          // console.log(err),
            res.status(201).json({
              error: err,
            });
        });

    }

    else {
      res.status(201).send({ msg: "all feild required" });
    }
  }
);

router.get("/get/notice", async (req, res) => {
  let result = await notice.find();

  if (result) {
    res.status(200).send({ result: result });
  } else {
    res.status(201).send({ result: "no data found" });
  }
});
router.delete("/remove/notice/:id", async (req, res) => {
  let result = await notice.findByIdAndDelete({
    _id: req.params.id,
  });
  // console.log(result, "result");
  if (result) {
    res.status(200).send({ result: result });
  } else {
    res.status(201).send({ msg: "no data found" });
  }
});

module.exports = router;
