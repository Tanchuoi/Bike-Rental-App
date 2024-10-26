import knex from "../database/knex.js";

// getBikes
const getBikes = async (req, res) => {
  try {
    const bikes = await knex("bike").select("*");
    res.json(bikes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getBikeById
const getBikeById = async (req, res) => {
  try {
    const bike = await knex("bike").where({ id: req.params.id }).first();
    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }
    res.json(bike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getBikes, getBikeById };
