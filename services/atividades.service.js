const axios = require("axios");
const config = require("../env.json");

module.exports = class AtividadeService {
  async getAtividade(atividade_name) {
    try {
      let atividade = await axios.get(
        `${config.trabalhosAPI}atividades?NOME_ATIVIDADE=${atividade_name}`
      );
      return atividade.data[0];
    } catch (error) {
      console.log("Error", error);
      return null;
    }
  }

  async postAtividade(atividadeInfo) {
    let body = {
      NOME_ATIVIDADE: atividadeInfo.NOME_ATIVIDADE,
      RECEIVER_ALIAS: atividadeInfo.RECEIVER_ALIAS,
      ATOR_ALIAS: atividadeInfo.ATOR_ALIAS,
      COORDENADOR_ALIAS: atividadeInfo.COORDENADOR_ALIAS,
    };
    try {
      let info = await axios.post(`${config.trabalhosAPI}atividades`, body);
      return info.data;
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  }

  async getAtividadeCentro(atividade_id, numero_turma) {
    try {
      let atividade_centro = await axios.get(
        `${config.trabalhosAPI}atividades_centro?ATIVIDADE_ID=${atividade_id}&NUMERO_TURMA=${numero_turma}`
      );
      return atividade_centro.data[0];
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  }

  async getQuiz(category) {
    try {
      let quiz = await axios.get(
        `${config.trabalhosAPI}atividade_generic_quiz?CATEGORY=${category}`
      );
      return quiz.data[0];
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  }

  async getQuestion(question) {
    try {
      let q = await axios.get(
        `${config.trabalhosAPI}atividade_generic_question?QUESTION=${question}`
      );
      return q.data[0];
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  }

  async postQuestionAnswer(answerInfo) {
    let body = answerInfo;
    try {
      let info = await axios.post(
        `${config.trabalhosAPI}atividade_generic_quiz_answer`,
        body
      );
      return info.data;
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  }

  async postAtividadeCentro(atividadeInfo) {
    let body = atividadeInfo;
    try {
      let info = await axios.post(
        `${config.trabalhosAPI}atividades_centro`,
        body
      );
      return info.data;
    } catch (error) {
      console.log("Error", error);
      throw error;
    }
  }
};
