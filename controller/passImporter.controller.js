const readXlsxFile = require("read-excel-file/node");

const schema = require("./schema")();

var ObjectID = require("mongodb").ObjectID;

const RegionaisService = require("../services/regionais.service");
// const PessoasService = require("../services/pessoas.service");

const regionaisService = new RegionaisService();
// const pessoasService = new PessoasService();

module.exports = class PassImporterContoller {
  constructor(fileName) {
    this.fileName = fileName;
  }

  async import() {
    console.log("---START READING XLSX--");
    let excel = await readXlsxFile(this.fileName, { schema });
    let objects = excel.rows;
  }
};
