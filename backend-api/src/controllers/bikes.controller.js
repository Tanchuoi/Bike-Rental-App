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

const getFilteredBikes = async (req, res) => {
  const { type, brand, sortField, sortDirection } = req.query;

  try {
    let query = knex("bike");

    // Apply filters based on query parameters
    if (type) query = query.where("type", type);
    if (brand) query = query.where("brand", brand);

    // Apply sorting if sorting field is provided
    if (sortField) {
      const direction = sortDirection === "desc" ? "desc" : "asc";
      query = query.orderBy(sortField, direction);
    }

    const bikes = await query;
    res.json(bikes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch bikes", error: error.message });
  }
};
export { getBikes, getBikeById, getFilteredBikes };
