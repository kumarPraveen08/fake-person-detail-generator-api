import express from "express";
import dotenv from "dotenv";
import path from "path";

import { India, Japan, America } from "./_data/index.js";
import { usePerson } from "./utils/person.js";
import { irrn } from "./utils/functions.js";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

// ROUTES
// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/person", (req, res) => {
  let { country, gender, minAge, maxAge } = req.query;
  country = country ? country : "Japan";
  gender = gender ? gender : "male";
  country = country.toLowerCase();

  const age = minAge && maxAge ? irrn(minAge, maxAge) : irrn(25, 50);
  const data =
    country === "japan"
      ? Japan
      : country === "india"
      ? India
      : country === "america"
      ? America
      : Japan;

  const person = usePerson(data, gender, age);

  if (Object.keys(person).length === 0) {
    res.status(404).json({
      person: {},
      status: false,
      message: "Something went wrong.",
    });
  }

  res.status(200).json({
    person,
    status: true,
    message: "Single person fake details.",
  });
});

app.get("/api/persons", (req, res) => {
  let { country, gender, minAge, maxAge, limit } = req.query;
  country = country ? country : "Japan";
  gender = gender ? gender : "male";
  limit = limit ? (limit <= 100 ? limit : 100) : 1;
  country = country.toLowerCase();

  const age =
    minAge && maxAge ? irrn(Number(minAge), Number(maxAge)) : irrn(25, 50);
  const data =
    country === "japan"
      ? Japan
      : country === "india"
      ? India
      : country === "america"
      ? America
      : Japan;

  let persons = [];
  for (let i = 0; i < limit; i++) {
    persons.push(usePerson(data, gender, age));
  }

  if (persons.length === 0) {
    res.status(404).json({
      result_count: 0,
      persons: [],
      status: false,
      message: "Something went wrong.",
    });
  }

  res.status(200).json({
    result_count: persons.length,
    persons,
    status: true,
    message: "Person fake details.",
  });
});

app.listen(port, () => console.log(`Server is running on PORT: ${port}`));
