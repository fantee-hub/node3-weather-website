const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define path for express config
const publicFolderDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

hbs.registerPartials(partialsPath);
// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

//Set up static directory to serve
app.use(express.static(publicFolderDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Tobi Faniran",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Tobi Faniran",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Welcome to the help section",
    name: "Tobi Faniran",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        return res.send({
          weatherInfo: forecastData.info,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 page",
    name: "Tobi Faniran",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 page",
    name: "Tobi Faniran",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is on port " + port);
});
