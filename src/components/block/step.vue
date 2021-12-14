<template>
  <div class="step1">
    <div class="step1__content">
      <div class="step1__loading">
        <div class="step1__loading-title">Шаг {{ stepTitle }}</div>
        <div class="step1__loading-show">
          <div class="step1__loading-show-filled" ref="stepLoading"></div>
        </div>
      </div>
      <div class="step1__body">
      </div>
      <div class="step1__footer">
<!--        <input class="step1__submit" type="button" value="Следующий шаг >" v-on:click="submitRequestFirstStep()">-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fio: '',
      iin: '',
      phoneNumber: '',
      email: '',
      password: '',
      step: 0,
      filled: 0,
      stepTitle: '',
    }
  },
  created() {
    this.$refs.stepLoading.style.width = '25%';
  },
  mounted() {
    this.$store.commit('SET_FOOTER',false);
  },
  methods: {
    sdgadf() {`
      this.$event;`
    }
  }
}
</script>

<style></style>

