const express = require("express");

const {
  insertOne,
  insertMany,
  getRestaurants,
  findOne,
  operatorsDemo,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
  advancedFind,
  updateLaFellaRating
} = require("../controllers/restaurantController");

const restController = require("../controllers/updateLaFellaRating");

const router = express.Router();




/* CREATE */
router.post("/insertone", insertOne);
router.post("/insertmany", insertMany);

/* READ */
router.get("/all", getRestaurants);
router.get("/one/:name", findOne);
router.get("/operators", operatorsDemo);
router.get("/advanced", advancedFind);

/* UPDATE */
router.put("/updateone/:id", updateOne);
router.put("/updatemany", updateMany);

/* DELETE */
router.delete("/deleteone/:id", deleteOne);
router.delete("/deletemany", deleteMany);

//$match
router.put("/rating", updateLaFellaRating);

module.exports = router;
