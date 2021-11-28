const readXlsxFile = require("read-excel-file/node");

const schema = require("./schema")();

var ObjectID = require("mongodb").ObjectID;

const AtividadeService = require("../services/atividades.service");
const RegionaisService = require("../services/regionais.service");
// const PessoasService = require("../services/pessoas.service");

const atividadesService = new AtividadeService();
const regionaisService = new RegionaisService();
// const pessoasService = new PessoasService();

module.exports = class CadastroImporterContoller {
  constructor(fileName) {
    this.fileName = fileName;
  }

  getInfo(item, param) {
    let sub_params = param.split(".");
    if (sub_params.length > 1) {
      return item[sub_params[0]][sub_params[1]];
    } else {
      return item[param];
    }
  }

  async import() {
    console.log("---START READING XLSX--");
    let excel = await readXlsxFile(this.fileName, { schema });
    let objects = excel.rows;
    let depara = require("../resources/de-para.json");

    let quiz_cache = {};

    for (let index = 0; index < objects.length; index++) {
      const centroInfo = objects[index].centro;

      let centro = await regionaisService.getCentro(centroInfo.Name);

      if (centro) {
        console.log("Adicionando =>", centroInfo.Name);
      } else {
        console.log("Criando GUID");
        var objectId = new ObjectID();
        centro = {
          ID: objectId,
        };
      }

      for (let j = 0; j < depara.length; j++) {
        const depara_item = depara[j];

        if (!quiz_cache[depara_item.QUIZ]) {
          quiz_cache[depara_item.QUIZ] = await atividadesService.getQuiz(
            depara_item.QUIZ
          );
        }

        let question = await atividadesService.getQuestion(
          depara_item.QUESTION
        );

        let answer = this.getInfo(centroInfo, depara_item.FROM);
        let answewrInfo = {
          CENTRO_ID: centro.ID,
          QUIZ_ID: quiz_cache[depara_item.QUIZ].ID,
          QUESTION_ID: question.ID,
          ANSWER: answer,
        };

        console.log("===> ", answewrInfo);

        if (answer) {
          await atividadesService.postQuestionAnswer(answewrInfo);
          let a = 0;
        }
      }
    }
  }
};
