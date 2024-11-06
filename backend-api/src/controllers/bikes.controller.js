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

const deleteBike = async (req, res) => {
  try {
    await knex("rental").where({ bike_id: req.params.id }).del();
    await knex("bike").where({ id: req.params.id }).del();
    res.json({ message: "Bike deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new bike
const addBike = async (req, res) => {
  console.log(req.body); // Log the bike details
  console.log(req.file); // Log the uploaded file object

  const image = req.file ? `/uploads/${req.file.filename}` : null; // Get the uploaded file's path

  try {
    const bikeData = {
      bike_name: req.body.bike_name,
      brand: req.body.brand,
      type: req.body.type,
      status: req.body.status,
      description: req.body.description,
      overview: req.body.overview,
      price_by_day: req.body.price_by_day,
      max_engine: req.body.max_engine,
      gas_capacity: req.body.gas_capacity,
      image, // Store the image path
    };

    await knex("bike").insert(bikeData);
    console.log("File received by multer:", req.file);
    console.log("Image path:", image);
    res.status(201).json({ message: "Bike added successfully" });
  } catch (error) {
    console.error("Error adding bike:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Failed to add bike", error: error.message });
  }
};

// Update bike by ID
const updateBike = async (req, res) => {
  const {
    bike_name,
    brand,
    type,
    status,
    description,
    overview,
    price_by_day,
    max_engine,
    gas_capacity,
  } = req.body;

  const image = req.file ? `/uploads/${req.file.filename}` : undefined; // Only set if a new file is uploaded

  try {
    const updateData = {
      bike_name,
      brand,
      type,
      status,
      description,
      overview,
      price_by_day,
      max_engine,
      gas_capacity,
    };

    // Only include image in updateData if a new image was uploaded
    if (image) updateData.image = image;

    const updatedRows = await knex("bike")
      .where({ id: req.params.id })
      .update(updateData);

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Bike not found" });
    }

    res.json({ message: "Bike updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update bike", error: error.message });
  }
};

export {
  getBikes,
  getBikeById,
  getFilteredBikes,
  deleteBike,
  addBike,
  updateBike,
};
