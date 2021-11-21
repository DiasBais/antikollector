<template>
  <div class="forgotPassword">
    <div class="forgotPassword__content">
      <div class="forgotPassword__title">Забыли пароль?</div>
      <div class="forgotPassword__body">
        <div class="LoginShow__input">
          <p class="LoginShow__input-name">Введите телефон</p>
          <input class="forgotPassword__phoneInput" type="text" value="" v-model="phone">
        </div>
      </div>
      <div class="forgotPassword__footer">
        <input class="forgotPassword__back" type="button" value="Назад" v-on:click="onBack">
        <input class="forgotPassword__submit" type="button" value="Отправить" v-on:click="onSubmit">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      phone: '',
    }
  },
  methods: {
    onBack() {
      window.history.back();
    },
    onSubmit() {
      this.$router.push('/');
    },
  }
}
</script>

<style>
@import url('/css/block/forgotPassword.css');
@import url('/css/block/mobile/forgotPassword.css');
</style>
