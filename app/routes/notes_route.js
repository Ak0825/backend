const CustomerTable = require("../../models/custom");
const jwt = require("jsonwebtoken");
const config = require("../../config/db");
const { getAdminByOAuthToken } = require("../../middleware/user.mw");
const { sendMail } = require('../../helpers/helper');

module.exports = function (app, db) {
  app.post("/add-custom",  async (req, res) => {
    // You'll create your note here.
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    // new user
    const userObject = {
      email: req.body.email,
      password: req.body.password,
    };
    let token = await jwt.sign(userObject, config.jwt.secretKey, {
      expiresIn: config.jwt.accessExpiryIn,
    });
    console.log(token);

    // const pass = await encryptPassword(req.body.password)

    const customers = new CustomerTable({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      contact: req.body.contact,
      address: req.body.address,
      createdOn: req.body.createdOn,
      status: req.body.status,
      token: token,
    });
    customers
      .save(customers)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while creating a create operation",
        });
      });
  });

  app.post("/login", async (req, res) => {
    // You'll create your note here.
    if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    try {
      CustomerTable.findOne({
        email: req.body.email,
        password: req.body.password,
      })
        .then((data) => {
          res.send( {
            name : data.firstName,
            email : data.email,
            token : data.token
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating a create operation",
          });
        });
    } catch (error) {
      res.send({
        message: error,
      });
    }
  });

  app.get("/custom" , (req, res) => {
    CustomerTable.find().then((data) => {
      res.send(data);
    });
  });

  app.put("/update/:id", async (req, res) => {
    if (!req.body) {
      return res
        .status(400)
        .send({ message: "Data to Update can not be empty!" });
    }
    const id = req.params.id;

    CustomerTable.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot Update user with ${id}. Maybe user not found`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error Update user information" });
      });
  });

  app.delete("/delete/:id", async (req, res) => {
    if (!req.body) {
      return res
        .status(400)
        .send({ message: "Data to Update can not be empty!" });
    }
    const id = req.params.id;

    CustomerTable.findByIdAndDelete(id, req.body, { useFindAndModify: false })
      .then((data) => {
        if (data) {
          res.send({ message: "User was deleted successfully!" });
        } else {
          res.status(404).send({
            message: `Cannot Delete user with ${id}. Maybe id is wrong`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error Update user information" });
      });
  });

  // validate token
  app.get("/user/validateToken", async (req, res) => {
    // Tokens are generally passed in the header of the request
    // Due to security reasons.

    let jwtSecretKey = config.jwt.secretKey;

    try {
      const token = req.header("token");
      const verified = jwt.verify(token, jwtSecretKey);
      console.log(verified);
      if (verified) {
        return res.send("Successfully Verified");
      } else {
        // Access Denied
        return res.status(401).send(error);
      }
    } catch (error) {
      // Access Denied
      return res.status(401).send(error);
    }
  });

  app.post("/sendmail" , async (req, res) => { 
    try {
      // let {name,email,type,message} = req.params.orderId;
      await sendMail(1,req.body)
      res.send(data = { message: 'success', status:true });
  } catch (error) {
      console.log(error,'error')
      res.send(error = { error: (error.response && error.response.data) ? error.response.data : error });
  }
  })

};
