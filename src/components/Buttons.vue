<template>
  <div class="buttons">
    <button class="next-btn" v-if="displayShowNext" @click="NextButton">
      Next
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: mapState({
    displayShowSubmit: "showSubmitButton",
    displayShowNext: "showNextButton",
  }),
  methods: {
    ...mapActions({
      SubmitButton: "submit",
      NextButton: "next",
    }),
  },
};
</script>

<style></style>
