import { createStore } from "vuex";
const _ = require("lodash");

export default createStore({
  state: {
    questions: [],
    correctAnswers: [],
    incorrectAnswers: [],
    index: 0,
    isStarted: false,
    score: 0,
    showNextButton: false,
    playAgain: false,
    showCorrectAnswer: false,
    showScore: false,
    hidePointer: false,
  },
  getters: {},
  actions: {
    async fetchData({ commit }) {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=10&category=22&difficulty=hard&type=multiple"
      );

      const data = await res.json();
      const questions = data.results.map((el) => {
        return el.question;
      });
      const correct_answers = data.results.map((el) => {
        return el.correct_answer;
      });
      const incorrect_answers = data.results.map((el) => {
        return el.incorrect_answers;
      });

      const answers = [...incorrect_answers, ...correct_answers];

      const payload = [questions, correct_answers, incorrect_answers, answers];

      commit("getData", payload);
    },
    startGame({ state, commit }) {
      state.index = 0;
      state.score = 0;
      state.isStarted = !state.isStarted;
      state.playAgain = false;
      commit("start_game");
    },
    // submit({ state, commit }) {
    //   state.showNextButton = true;
    //   state.hidePointer = false;
    //   state.showCorrectAnswer = true;
    //   state.showSubmitButton = false;
    //   commit("submitButton");
    // },
    next({ state, commit }) {
      state.showNextButton = false;
      state.showCorrectAnswer = false;
      state.hidePointer = false;
      state.index++;
      if (state.index === 10) {
        state.isStarted = false;
        state.playAgain = true;
      }
      commit("nextButton");
    },
    clickOnAnswer({ state, commit }) {
      state.hidePointer = true;
    },
    moreScore({ state, commit }) {
      state.score++;
    },
  },
  mutations: {
    getData(state, payload) {
      state.questions = payload[0];
      state.correctAnswers = payload[1];
      state.incorrectAnswers = payload[2];
    },
    start_game(state) {
      return state.isStarted;
    },
    nextButton(state) {
      return state.showNextButton;
    },
  },
});
