const readXlsxFile = require("read-excel-file/node");

const schema = require("./schema")();

const AtividadeService = require("../services/atividades.service");
const RegionaisService = require("../services/regionais.service");
const PessoasService = require("../services/pessoas.service");

const atividadesService = new AtividadeService();
const regionaisService = new RegionaisService();
const pessoasService = new PessoasService();

module.exports = class DBImportContoller {
  constructor(fileName) {
    this.fileName = fileName;

    this.success = {
      regional: [],
      centro: [],
      atividade_centro: [],
    };
    this.errors = {
      regional: [],
      centro: [],
      atividade_centro: [],
    };
  }

  async import() {
    console.log("---START READING XLSX--");
    let excel = await readXlsxFile(this.fileName, { schema });
    let objects = excel.rows;

    console.log("---Importing Atividades");
    let atividades = require("../resources/atividades.json");

    try {
      atividades = await this.insertAtividades(atividades);
    } catch (error) {
      console.log(error);
    }

    console.log("----START IMPORTING---");

    for (let index = 0; index < objects.length; index++) {
      const centroInfo = objects[index].centro;
      let centro;

      try {
        centro = await this.insertCentroAndRegional(centroInfo);
      } catch (error) {
        console.log("Error adding Centro", error);
      }

      // try {
      //   await this.importAtividades(centroInfo, atividades, centro);
      // } catch (error) {
      //   console.log("Error adding atividades", error);
      // }
    }

    return {
      success: this.success,
      errors: this.errors,
    };
  }

  async insertCentroAndRegional(centroInfo) {
    let centro = await regionaisService.getCentro(centroInfo.Name);

    if (!centro || centro.length == 0) {
      let regional = await regionaisService.getRegional(
        centroInfo.regional,
        centroInfo.local.pais
      );
      if (!regional) {
        try {
          regional = await regionaisService.postRegional(
            centroInfo.regional,
            centroInfo.local.pais
          );
          console.log("Regional Added: ", regional.NOME_REGIONAL);
          this.success.regional.push(regional.NOME_REGIONAL);
        } catch (error) {
          console.log("Error Regional Added: ", regional.NOME_REGIONAL);
          this.errors.regional.push(regional.NOME_REGIONAL);
        }
      }

      try {
        centroInfo.regional_id = regional.ID;
        centro = await regionaisService.postCentro(centroInfo);
        console.log("Centro Added: ", centroInfo.Name);
        this.success.centro.push(centroInfo.Name);
      } catch (error) {
        console.log("Error Centro Added: ", centroInfo.Name, error);
        this.errors.centro.push(centro.NOME_CENTRO);
      }
    }
    return centro;
  }

  async importAtividades(centroInfo, atividades, centro) {
    const atividades_centro_info = {};

    atividades_centro_info["cb"] = centroInfo.CB;
    atividades_centro_info["eae"] = centroInfo.EAE;
    atividades_centro_info["ei"] = centroInfo.EI;
    atividades_centro_info["cm"] = centroInfo.CM;
    atividades_centro_info["moc"] = centroInfo.MOC;

    const keys = Object.keys(atividades_centro_info);
    const values = Object.values(atividades_centro_info);

    for (let index = 0; index < keys.length; index++) {
      const atividade_key = keys[index];
      const atividade_value = values[index];

      if (atividade_value) {
        const propertyName = `dh_${atividade_key}`;
        const activity_array = atividade_value.hasOwnProperty(
          `dh_${atividade_key}`
        )
          ? atividade_value[propertyName]
          : [];
        for (let index = 0; index < activity_array.length; index++) {
          const activity = activity_array[index];

          const add_hour_to_end = activity.time.split(":");
          const horfim = `${(parseInt(add_hour_to_end[0]) + 1).toString()}:${
            add_hour_to_end[1]
          }`;

          if (activity.day) {
            let atividadeInfo = {
              ATIVIDADE: atividades[atividade_key].ID,
              CENTRO_ID: centro.ID,
              HORINI: activity.time,
              HORFIM: horfim,
              DIA_SEMANA: activity.day,
              NUMERO_TURMA: 0,
            };

            try {
              let atividade_centro =
                await atividadesService.postAtividadeCentro(atividadeInfo);
              console.log("Atividade Centro Added: ", atividadeInfo);
              this.success.atividade_centro.push(atividadeInfo);
            } catch (error) {
              console.log("Error Atividade Centro Added: ", error);
              this.errors.atividade_centro.push(atividadeInfo);
            }
          }
        }
      }
    }
  }

  async insertAtividades(atividades) {
    let atividades_keys = Object.keys(atividades);
    let atividades_values = Object.values(atividades);

    for (let index = 0; index < atividades_values.length; index++) {
      let atividade_key = atividades_keys[index];
      let atividade_value = atividades_values[index];

      let atividade = await atividadesService.getAtividade(
        atividade_value.NOME_ATIVIDADE
      );

      if (!atividade) {
        try {
          let atividade_info = {
            NOME_ATIVIDADE: atividade_value.NOME_ATIVIDADE,
            RECEIVER_ALIAS: atividade_value.RECEIVER_ALIAS,
            ATOR_ALIAS: atividade_value.ATOR_ALIAS,
            COORDENADOR_ALIAS: atividade_value.COORDENADOR_ALIAS,
          };
          atividade = await atividadesService.postAtividade(atividade_info);
        } catch (error) {
          console.log("error adding", error);
        }
      }

      atividades[atividade_key].ID = atividade.ID;
    }

    return atividades;
  }
};
