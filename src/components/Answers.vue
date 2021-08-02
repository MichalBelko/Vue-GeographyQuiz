<template>
  <div class="question">
    {{ displayQuestion[displayIndex] }}
  </div>
  <div class="answers">
    <!-- <div
      class="answer"
      tabindex="0"
      :class="{
        correctAnswer: displayShowCorrectAnswer,
        ban: hideCssPointer,
      }"
      @click="clickCorrectAnswer"
    >
      {{ displayCorrectAnswer[displayIndex] }}
    </div> -->
    <!-- <div
      @click="clickInCorrectAnswer"
      tabindex="0"
      class="answer"
      :class="{
        incorrectAnswer: displayShowCorrectAnswer,
        ban: hideCssPointer,
      }"
      v-for="(incorrectanswer, i) in displayInCorrectAnswer[displayIndex]"
      :key="i"
    >
      {{ displayInCorrectAnswer[displayIndex][i] }}
    </div> -->

    <div
      class="answer"
      v-for="(answer, index) in answers"
      :key="index"
      tabindex="0"
      :class="{
        ban: hideCssPointer,
        correctAnswer: answer.correct && displayShowCorrectAnswer,
        incorrectAnswer: !answer.correct && displayShowCorrectAnswer,
      }"
      @click="clickOnAnswer($event)"
    >
      {{ answer.answered }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import store from "../store/index";

export default {
  name: "Answers",
  computed: mapState({
    displayQuestion: "questions",
    displayIndex: "index",
    displayCorrectAnswer: "correctAnswers",
    displayInCorrectAnswer: "incorrectAnswers",
    displayShowCorrectAnswer: "showCorrectAnswer",
    hideCssPointer: "hidePointer",
    displayScore: "score",
  }),
  data() {
    return {
      answers: [],
    };
  },
  methods: {
    ...mapMutations(["getData"]),
    ...mapActions(["fetchData", "moreScore", "next"]),
    clickOnAnswer(e) {
      const element = e.target;
      const el = this.answers.find((el) => {
        return el.correct;
      });

      store.state.hidePointer = true;
      if (e.target.innerHTML === el.answered && !store.state.showNextButton) {
        this.moreScore();
      }
    },
  },
  created() {
    this.fetchData();
  },
  beforeUpdate() {
    const answers = [
      this.displayCorrectAnswer[this.displayIndex],
      ...this.displayInCorrectAnswer[this.displayIndex],
    ];
    const newAnswers = answers.map(function(answer, index) {
      if (index == 0) {
        return {
          answered: answer,
          correct: true,
        };
      } else
        return {
          answered: answer,
          correct: false,
        };
    });
    if (store.state.showSubmitButton && store.state.hidePointer == false) {
      this.answers = _.shuffle(newAnswers);
    }
  },
};
</script>

<style></style>
