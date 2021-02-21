const express = require("express");
const pool = require("./src/microservices/Database/db");
//package to convert state abbreviations to full name
const states = require("us-state-converter");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

//route
app.get("/api/:id", async (req, res) => {
  try {
    if (req.params.id == "US") {
      const stateData = await pool.query(
        "select sum(people_vaccinated) as people_vaccinated from vaccinations where date=(select MAX(date) from vaccinations)",
        []
      );
      console.log(stateData.rows);
      res.json(stateData.rows);
    } else {
      const state = states.fullName(req.params.id);

      const stateData = await pool.query(
        "select * from vaccinations where location=$1",
        [state]
      );
      res.json(stateData.rows);
    }
    //console.log(stateData);
  } catch (error) {
    console.error(error.message);
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log("Listening on port " + port));
