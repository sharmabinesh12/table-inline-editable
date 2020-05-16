var express = require("express");
var app = express();
const PORT = process.env.PORT || 5000;

app.get("/ping", function(req, res) {
  res.status(200).json({ data: "PONG" });
});

app.use(express.static('build'));

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(PORT, function() {
  console.log("listening on *:" + PORT);
});
