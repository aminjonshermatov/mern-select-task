const Countries = require("../models/counties.model.js");

exports.get = (req, res) => {
  const { count, lastID } = req.query;

  const counties = new Countries();

  counties.get(count, lastID, async (err, data) => {
    if (err) {
      return res
        .status(400)
        .send({ message: err.message, success: false, countries: {}, hasMore: false });
    }

    const hasMore = data.length < 10 ? false : true;

    return res.status(200).send({ success: true, countries: data, hasMore, message: "" });
  });
};

exports.getById = (req, res) => {
  const { id } = req.query;

  const counties = new Countries();

  counties.getById(id, async (err, data) => {
    if (err) {
      return res
        .status(400)
        .send({ message: err.message, success: false, country: {} });
    }

    return res.status(200).send({ success: true, country: data[0], message: "" });
  });
};