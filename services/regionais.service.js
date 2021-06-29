const axios = require("axios");
const config = require("../env.json");

module.exports = class RegionaisServices {
  async getRegional(name, pais) {
    try {
      let regional;
      if (pais) {
        regional = await axios.get(
          `${config.regionaisAPI}regionais?NOME_REGIONAL=${name}&PAIS=${pais}`
        );
      } else {
        regional = await axios.get(
          `${config.regionaisAPI}regionais?NOME_REGIONAL=${name}`
        );
      }

      return regional.data[0];
    } catch (error) {
      console.log("Error", error);
      return null;
    }
  }

  async postRegional(name, pais) {
    let body = {
      NOME_REGIONAL: name,
      PAIS: pais,
    };
    try {
      let regionalInfo = await axios.post(
        `${config.regionaisAPI}regionais`,
        body
      );

      return regionalInfo.data;
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  }

  async getCentro(name) {
    try {
      let regional = await axios.get(
        `${config.regionaisAPI}centros?NOME_CENTRO=${name}`
      );
      return regional.data[0];
    } catch (error) {
      console.log("Error", error);
      return null;
    }
  }

  async postCentro(centroInfo) {
    let body = {
      NOME_CENTRO: centroInfo.Name,
      NOME_CURTO: centroInfo.short,
      CNPJ_CENTRO: centroInfo.cnpj,
      DATA_FUNDACAO: centroInfo.fundacao,
      ENDERECO: centroInfo.local.endereco,
      CEP: centroInfo.local.cep,
      BAIRRO: centroInfo.local.bairro,
      CIDADE: centroInfo.local.cidade,
      ESTADO: centroInfo.local.uf,
      PAIS: centroInfo.local.pais,
      REGIONAL_ID: centroInfo.regional_id,
    };
    try {
      let centroInfo = await axios.post(`${config.regionaisAPI}centros`, body);
      return centroInfo.data;
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  }
};
