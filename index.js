const http = require("http");
const express = require("express");
const app = express();
const shell = require("shelljs");
const config = require("./env.json");

app.post("/import", async function (req, res) {
  const Controller = require("./controller/dbImport.controller");
  const controller = new Controller("./resources/Cadastro 2020 _v2.xlsx");
  let { success, errors } = await controller.import();
  res.json({
    success: success,
    errors: errors,
  });
});

app.post("/import_cadastros", async function (req, res) {
  const Controller = require("./controller/cadastroImporter.controller");
  const controller = new Controller("./resources/Cadastro 2020 _v2.xlsx");
  let { success, errors } = await controller.import();
  res.json({
    success: success,
    errors: errors,
  });
});

app.post("/import_pass", async function (req, res) {
  const Controller = require("./controller/passImporter.controller");
  const controller = new Controller("./resources/Senhas.xlsx");
  let { success, errors } = await controller.import();
  res.json({
    success: success,
    errors: errors,
  });
});

app.post("/", async function (req, res) {
  let pipeline = req.query.project;

  if (pipeline) {
    console.log("-----Rodando a pipeline " + pipeline);
    await shell.exec(`./${pipeline}/setup.sh`);
  } else {
    await shell.exec("./setup.sh");
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
