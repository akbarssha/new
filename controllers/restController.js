const restaurant = require("../models/restaurant");
//AGGREGATION
//$match (filtering)
exports.updateLaFellaRating = async (req, res) => {
  try {
    const result = await restaurant.updateOne(
      {
        name: "La fella",
        cuisine: "Indian",
        rating: 2
      },
      {
        $set: { rating: 1 }
      }
    );

    res.status(200).json({
      success: true,
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
