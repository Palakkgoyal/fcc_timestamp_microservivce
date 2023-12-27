// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:time", function(req, res) {
  const time = req.params.time
  const date = new Date( +time || time )
  
  isValidDate(date) ? 
  res.json({unix: date.getTime(), utc: date.toGMTString()}) : 
  res.json({ error : "Invalid Date" })
})

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

app.get("/api", function(req, res) {
  const date = new Date()
  res.json({unix: date.getTime(), utc: date.toGMTString()})
})

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
