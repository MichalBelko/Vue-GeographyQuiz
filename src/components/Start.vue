<template>
  <button
    class="start-btn"
    @click="displayStartgame"
    v-if="!displayIsStarted && !displayPlayAgain"
  >
    Start game
  </button>
  <div class="again" v-if="displayPlayAgain">
    <button class="again-btn" @click="displayStartgame">
      Play again
    </button>
    <p class="score">Score: {{ displayScore }}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: mapState({
    displayIsStarted: "isStarted",
    displayPlayAgain: "playAgain",
    displayScore: "score",
  }),
  methods: {
    ...mapActions({
      displayStartgame: "startGame",
    }),
  },
};
</script>

<style scoped>
:where(.start-btn, .again-btn) {
  margin-inline: auto;
  display: block;
}
</style>
