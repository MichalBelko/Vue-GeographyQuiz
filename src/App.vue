<template>
  <h1>Another Vue Quiz</h1>
  <div class="container" v-if="displayIsStarted">
    <Answers />

    <Buttons />
    <div class="details">
      <p class="score">Score: {{ displayScore }}</p>
      <p class="score">Question : {{ displayIndex + 1 }} / 10</p>
    </div>
  </div>
  <Start />
</template>

<script>
import Buttons from "@/components/Buttons.vue";
import Answers from "@/components/Answers.vue";
import Start from "@/components/Start.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "App",

  computed: mapState({
    displayIsStarted: "isStarted",
    displayScore: "score",
    displayIndex: "index",
  }),
  components: { Answers, Buttons, Start },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
::selection {
  color: orangered;
  background-color: transparent;
}
html {
  scroll-behavior: smooth;
}
body {
  background-color: #1c1d23;
  overflow-x: hidden;
  color: #fff;
  font-size: 16px;
}

h1 {
  font-size: 55px;
  background: linear-gradient(to right, yellow, red);
  background-size: 80%;
  -webkit-background-clip: text;
  -webkit-text-stroke: 5px transparent;
  text-align: center;
  color: #1c1d23;
  margin-block: 50px;
  letter-spacing: 3px;
  font-weight: bold;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  align-items: center;
  border: 1px solid red;
  max-width: 70%;
  margin-inline: auto;
  padding: 30px;
}
.container :where(.question) {
  font-size: 1.8rem;
  margin: 5px;
  font-weight: bold;
  letter-spacing: 1px;
}
.container :is(.question, .answers, .submit-btn) {
  line-height: 1.6;
}
.container .answers {
  margin-block: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.answer {
  border: 1px solid red;
  padding: 5px;
  padding-inline: 30px;
  margin: 5px;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  font-size: 1.3rem;
}
.answers .answer:focus,
.answers .answer:active {
  border: 1px solid yellow !important;
}
.answers .answer:hover {
  transform: scale(1.02);
}
button {
  all: unset;
  outline: 1px solid #1c1d23;
  padding: 10px 25px;
  background-color: #ff0000;
  outline-offset: -5px;
  margin-block-start: 30px;
  cursor: pointer;
  line-height: 1.6;
}
.score {
  font-weight: bold;
  letter-spacing: 1px;
  text-align: center;
  font-size: 1.5rem;
  padding: 20px;
  align-items: center;
}
.ban {
  pointer-events: none;
}
.details {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}
.answers .incorrectAnswer {
  background-color: red;
  border: none;
}

.answers .correctAnswer {
  background-color: limegreen;
  border: none;
}
.answers .correctAnswer:focus,
.answers .incorrectAnswer:focus {
  border: none;
}
</style>
