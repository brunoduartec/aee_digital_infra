const http = require("http");
const express = require("express");
const app = express();
const shell = require("shelljs");
const config = require("./env.json");

app.post("/", async function (req, res) {
  let pipeline = req.query.project;

  if (pipeline) {
    console.log("-----Rodando a pipeline " + pipeline);
    shell.exec(`./${pipeline}/setup.sh`);
  } else {
    shell.exec("./setup.sh");
  }

  let runInfo = {
    status: 200,
    data: "event triggered",
  };

  res.json(runInfo);
});

let server_http = http.Server(app);
server_http.listen(config.port, "0.0.0.0", function () {
  console.log("API is running on port: " + config.port);
});
