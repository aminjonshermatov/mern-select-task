const sql = require("./db.js");

class Countries {
  get(count = 10, lasID = 0, cb) {
    sql.query(
      `
              SELECT id, sortname, name
              FROM countries
              ORDER BY name
              LIMIT ${lasID}, ${count}
      `,
      (err, res) => {
        if (err) {
          return cb(err, null);
        }

        if (res.length) {
          return cb(null, res);
        }

        cb({ message: "Something went wrong" }, null);
      }
    );
  }

  getById(id, cb) {
    sql.query(
      `
              SELECT id, sortname, name
              FROM countries
              WHERE id=${id}
      `,
      (err, res) => {
        if (err) {
          return cb(err, null);
        }

        if (res.length) {
          return cb(null, res);
        }

        cb({ message: "Something went wrong" }, null);
      }
    );
  }
}

module.exports = Countries;
