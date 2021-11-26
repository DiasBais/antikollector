<template>
  <div class="step__loading">
    <div class="step__loading-title">Шаг {{ step }}</div>
    <div class="step__loading-show">
      <div class="step__loading-show-filled"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 0,
      filled: 0,
    }
  }
}
</script>

<style></style>
