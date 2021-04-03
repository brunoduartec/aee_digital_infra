const http = require("http");
const express = require("express");
const app = express();
const shell = require("shelljs");

const port = 50100;

app.post("/", async function (req, res) {
  shell.exec("./setup.sh");

  let runInfo = {
    status: 200,
    data: "event triggered",
  };

  res.json(runInfo);
});

let server_http = http.Server(app);
server_http.listen(port, "0.0.0.0", function () {
  console.log("API is running on port: " + port);
});
