const config = require("../env.json");
const axios = require("axios");
const readXlsxFile = require("read-excel-file/node");

const schema = require("./schema")();

module.exports = class DBImportContoller {
  constructor(fileName) {
    this.fileName = fileName;
    this.regionaisAPIAddress = config.regionaisAPI;
    this.trabalhosAPIAddress = config.trabalhosAPI;

    this.success = {
      regional: [],
      centro: [],
    };
    this.errors = {
      regional: [],
      centro: [],
    };
  }

  async import() {
    let excel = await readXlsxFile(this.fileName, { schema });
    let objects = excel.rows;

    for (let index = 0; index < objects.length; index++) {
      const centroInfo = objects[index].centro;
      let centro = await this._getCentro(centroInfo.Name);
      if (centro && centro.length == 0) {
        let regional = await this._getRegional(centroInfo.regional);

        if (
          regional &&
          (regional.length == 0 ||
            regional[0].NOME_REGIONAL != centroInfo.regional)
        ) {
          await this._postRegional(centroInfo.regional, centroInfo.local.pais);
        }

        await this._postCentro(centroInfo);
        console.log("Added: ", centroInfo.Name);
      }
    }
    let errors = excel.errors;

    return {
      success: this.success,
      errors: this.errors,
    };
  }

  async _getRegional(name) {
    try {
      let regional = await axios.get(
        `${config.regionaisAPI}regionais?nome=${name}`
      );

      return regional.data;
    } catch (error) {
      console.log("Error", error);
      return null;
    }
  }

  async _postRegional(name, pais) {
    let body = {
      NOME_REGIONAL: name,
      PAIS: pais,
    };
    try {
      let regionalInfo = await axios.post(
        `${config.regionaisAPI}regionais`,
        body
      );
      this.success.regional.push(name);
      return regionalInfo.data;
    } catch (error) {
      console.log("Error", error);
      this.errors.regional.push(error);
      return null;
    }
  }

  async _getCentro(name) {
    try {
      let regional = await axios.get(
        `${config.regionaisAPI}centros?nome=${name}`
      );
      return regional.data;
    } catch (error) {
      console.log("Error", error);
      return null;
    }
  }

  async _postCentro(centroInfo) {
    let body = {
      NOME_CENTRO: centroInfo.Name,
      NOME_CURTO: centroInfo.short,
      CNPJ_CENTRO: centroInfo.cnpj,
      DATA_FUNDACAO: Date.parse(centroInfo.fundacao)
        ? centroInfo.fundacao
        : "1/1/1900",
      ENDERECO: centroInfo.local.endereco,
      CEP: centroInfo.local.cep,
      BAIRRO: centroInfo.local.bairro,
      CIDADE: centroInfo.local.cidade,
      ESTADO: centroInfo.local.uf,
      PAIS: centroInfo.local.pais,
      NOME_REGIONAL: centroInfo.regional,
    };
    try {
      let centroInfo = await axios.post(`${config.regionaisAPI}centros`, body);
      this.success.centro.push(centroInfo.Name);
      return centroInfo.data;
    } catch (error) {
      console.log("Error", error);
      this.errors.centro.push(error);
      return null;
    }
  }

  async _getTrabalho(name) {}

  async importTrabalho(trabalho) {}

  async importCentros(centro) {}

  async importRegionais(regional) {}
};
