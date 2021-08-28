function getDayByShort(short) {
  let dayByShort = {
    Seg: "Segunda-Feira",
    Ter: "Terça-Feira",
    Qua: "Quart-Feira",
    Qui: "Quinta-Feira",
    Sex: "Sexta-Feira",
    Sáb: "Sábado",
    Dom: "Domingo",
  };

  return dayByShort[short];
}

function parseDate(element) {
  try {
    let time = element.split("h");
    const hours = time[0];
    const minutes = time[1].trim().length > 0 ? time[1].trim() : "00";

    let date = "";

    if (hours != "-") {
      date = `${hours}:${minutes}`;
      return date;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}

function dayTimeParser(dh) {
  // Dom 9h / Qui  20h10 / Sex 20h
  let daysStripped = dh.trim().split("/");
  let daysInfo = [];

  for (let index = 0; index < daysStripped.length; index++) {
    let element = daysStripped[index];
    element = element.replace(/ +(?= )/g, "");

    let dayTimeStripped = element.trim().split(" ");
    let day = getDayByShort(dayTimeStripped[0]);
    let time = parseDate(dayTimeStripped[1]);

    let dayInfo = {
      day: day,
      time: time,
    };

    if (day && time) {
      daysInfo.push(dayInfo);
    }
  }

  return daysInfo;
}

function funcionamentoParser(funcionamento) {
  try {
    let timeFunction = [];
    let daysStripped = funcionamento.trim().split("/");

    for (let index = 0; index < daysStripped.length; index++) {
      const element = daysStripped[index];
      const date = parseDate(element);
      if (date) {
        timeFunction.push(date.toString());
      }
    }

    return timeFunction;
  } catch (error) {
    return null;
  }
}

function getSchema() {
  let schema = {
    Centro: {
      prop: "centro",
      type: {
        "Nome da Casa Espírita": {
          prop: "Name",
          type: String,
        },
        "Nome Curto": {
          prop: "short",
          type: String,
        },
        Regional: {
          prop: "regional",
          type: String,
        },
        Local: {
          prop: "local",
          type: {
            Endereço: {
              prop: "endereco",
              type: String,
            },
            Bairro: {
              prop: "bairro",
              type: String,
            },
            Cidade: {
              prop: "cidade",
              type: String,
            },
            UF: {
              prop: "uf",
              type: String,
            },
            CEP: {
              prop: "cep",
              type: String,
            },
            País: {
              prop: "pais",
              type: String,
            },
          },
        },
        "CNPJ (se houver)": {
          prop: "cnpj",
          type: String,
        },
        "Data de Fundação": {
          prop: "fundacao",
          type: (date) => {
            let day, month, year;
            let dateParsed = "";

            if (date) {
              day = date.getDate();
              month = date.getMonth();
              year = date.getFullYear();

              dateParsed = `${day}/${month}/${year}`;
            }

            return dateParsed;
          },
        },
        Funcionamento: {
          prop: "funcionamento",
          type: {
            Segunda: {
              prop: "segunda",
              type: (value) => {
                const time = funcionamentoParser(value);
                if (!time) {
                  throw new Error("Invalid");
                }
                return time;
              },
            },
            Terça: {
              prop: "terca",
              type: (value) => {
                const time = funcionamentoParser(value);
                if (!time) {
                  throw new Error("Invalid");
                }
                return time;
              },
            },
            Quarta: {
              prop: "quarta",
              type: (value) => {
                const time = funcionamentoParser(value);
                if (!time) {
                  throw new Error("Invalid");
                }
                return time;
              },
            },
            Quinta: {
              prop: "quinta",
              type: (value) => {
                const time = funcionamentoParser(value);
                if (!time) {
                  throw new Error("Invalid");
                }
                return time;
              },
            },
            Sexta: {
              prop: "sexta",
              type: (value) => {
                const time = funcionamentoParser(value);
                if (!time) {
                  throw new Error("Invalid");
                }
                return time;
              },
            },
            Sábado: {
              prop: "sabado",
              type: (value) => {
                const time = funcionamentoParser(value);
                if (!time) {
                  throw new Error("Invalid");
                }
                return time;
              },
            },
            Domingo: {
              prop: "domingo",
              type: (value) => {
                const time = funcionamentoParser(value);
                if (!time) {
                  throw new Error("Invalid");
                }
                return time;
              },
            },
          },
        },
        "Assistência Espiritual": {
          prop: "AE",
          type: {
            "DH AE": {
              prop: "dh_ae",
              type: (value) => {
                const dateTime = dayTimeParser(value);
                if (!dateTime) {
                  throw new Error("invalid");
                }
                return dateTime;
              },
            },
            "Quantidade média de assistidos em todos os dias, por semana": {
              prop: "assistidos",
              type: Number,
            },
            "Quantidade de voluntários por semana": {
              prop: "voluntarios",
              type: Number,
            },
            "Quantidade de preletores aptos da casa": {
              prop: "preletores",
              type: Number,
            },
            "Quantidade de entrevistadores aptos da casas": {
              prop: "entrevistadores",
              type: Number,
            },
          },
        },
        "Curso Básico": {
          prop: "CB",
          type: {
            "DH CB": {
              prop: "dh_cb",
              type: (value) => {
                const dateTime = dayTimeParser(value);
                if (!dateTime) {
                  throw new Error("invalid");
                }
                return dateTime;
              },
            },
            "Quantidade de alunos do Curso Básico do Espiritismo": {
              prop: "Alunos",
              type: Number,
            },
          },
        },
        "Escola de Aprendizes do Evangelho": {
          prop: "EAE",
          type: {
            "DH EAE": {
              prop: "dh_eae",
              type: (value) => {
                const dateTime = dayTimeParser(value);
                if (!dateTime) {
                  throw new Error("invalid");
                }
                return dateTime;
              },
            },
            "Das turmas de EAE que você mencionou acima, qual o número turma mais recente? Exemplo: minha casa possui três turmas de EAE e a mais recente é a 21ª turma":
              {
                prop: "turma",
                type: String,
              },
            "Quantidade de Alunos": {
              prop: "alunos",
              type: Number,
            },
            "Quantidade de Expositores aptos a dar aulas em EAE": {
              prop: "expositores",
              type: Number,
            },
            "Quantidade de dirigentes aptos a dirigir uma turma de EAE": {
              prop: "dirigentes_aptos",
              type: Number,
            },
            "Quantidade de dirigentes que estarão dirigindo turmas em 2020": {
              prop: "dirigentes",
              type: Number,
            },
          },
        },
        "Curso de Médiuns": {
          prop: "CM",
          type: {
            "DH CM": {
              prop: "dh_cm",
              type: (value) => {
                const dateTime = dayTimeParser(value);
                if (!dateTime) {
                  throw new Error("invalid");
                }
                return dateTime;
              },
            },
            "Quantidade de Alunos2": {
              prop: "alunos",
              type: Number,
            },
            "Quantidade de Expositores aptos a dar aulas em Curso de Médiuns": {
              prop: "expositores",
              type: Number,
            },
            "Quantidade de Dirigentes aptos a dirigir uma turma de Curso de Médiuns":
              {
                prop: "dirigentes_aptos",
                type: Number,
              },
            "Quantidade de dirigentes que estar dirigindo turmas em 2020": {
              prop: "dirigentes",
              type: Number,
            },
          },
        },
        "Evangelização Infantil": {
          prop: "EI",
          type: {
            "DH EI": {
              prop: "dh_ei",
              type: (value) => {
                const dateTime = dayTimeParser(value);
                if (!dateTime) {
                  throw new Error("invalid");
                }
                return dateTime;
              },
            },
            "Quantidade média de crianças na Evangelização, por semana	": {
              prop: "criancas",
              type: Number,
            },
            "Quantidade médias de pais ou responsáveis na Sala de Pais, por semana	":
              {
                prop: "responsaveis",
                type: Number,
              },
            "Quantidade Total de Evangelizadores	": {
              prop: "evangelizadores",
              type: Number,
            },
            "Evangelizadores no Maternal	": {
              prop: "evangelizadores_maternal",
              type: Number,
            },
            "Evangelizadores no Jardim	": {
              prop: "evangelizadores_jardim",
              type: Number,
            },
            "Evangelizadores no Primário	": {
              prop: "evangelizadores_primario",
              type: Number,
            },
            "Evangelizadores no Intermediário	": {
              prop: "evangelizadores_intermediario",
              type: Number,
            },
            "Evangelizadores na Escola de Pais": {
              prop: "evangelizadores_escola_de_pais",
              type: Number,
            },
          },
        },
        "Pré-Mocidade": {
          prop: "PRE",
          type: {
            "DH PRE": {
              prop: "dh_pre",
              type: (value) => {
                const dateTime = dayTimeParser(value);
                if (!dateTime) {
                  throw new Error("invalid");
                }
                return dateTime;
              },
            },
            "Quantidade de alunos na Pré-Mocidade": {
              prop: "alunos",
              type: Number,
            },
            "Quantidade de dirigentes": {
              prop: "dirigentes_aptos",
              type: Number,
            },
            "Quantidade de dirigentes que estaro dirigindo turmas em 2020": {
              prop: "dirigentes",
              type: Number,
            },
          },
        },
        Mocidade: {
          prop: "MOC",
          type: {
            "DH MOC": {
              prop: "dh_moc",
              type: (value) => {
                const dateTime = dayTimeParser(value);
                if (!dateTime) {
                  throw new Error("invalid");
                }
                return dateTime;
              },
            },
            "Quantidade total de alunos da Mocidade": {
              prop: "alunos",
              type: Number,
            },
            "Quantidade total de Expositores": {
              prop: "expositores",
              type: Number,
            },
            "Quantidade total de Dirigentes": {
              prop: "dirigentes_aptos",
              type: Number,
            },
            "Quantidade de dirigentes que estarão dirigindo turmas em 20203": {
              prop: "dirigentes",
              type: Number,
            },
          },
        },
      },
    },
  };

  return schema;
}

module.exports = getSchema;
