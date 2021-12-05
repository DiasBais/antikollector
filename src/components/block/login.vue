<template>
  <div class="login">
    <div class="login__content">
      <div class="login__title">Войти в личный кабинет</div>
      <div class="login__body">
        <div class="login__error" v-if="error">Ошибка: <span v-html="error"></span></div>
        <div class="login__input">
          <p class="login__input-name">
            ИИН
            <span class="login__input-name-require">*</span>
          </p>
          <input class="login__input-value" type="text" name="iin" v-model="iin">
        </div>
        <div class="login__input">
          <p class="login__input-name">
            Введите пароль
            <span class="login__input-name-require">*</span>
          </p>
          <input class="login__input-value" type="password" name="password" v-model="password">
        </div>
        <div class="login__links">
          <p>Нет аккаунта?
            <router-link to="/step-1">
              <span>Зарегестрируйтесь</span>
            </router-link>
          </p>
          <p>
            <router-link to="/forgot-password">Забыли пароль?</router-link>
          </p>
        </div>
      </div>
      <div class="login__footer">
        <input class="login__input-submit" type="button" value="Войти" v-on:click="submitRequestLogin">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      iin: '',
      password: '',
      error: '',
      errorIIN: '',
      errorPassword: '',
    }
  },
  mounted() {
    if (localStorage.getItem('logged')) {
      this.$router.push({path: '/notifications'});
    }
  },
  methods: {
    submitRequestLogin() {
      this.error = '';
      if (this.validateLogin()) return;
      const axios = require('axios');
      axios.post('https://crediter.kz/api/signIn', { 'iin': this.iin, 'password': this.password })
          .then(async response => {
            if (response.data.success) {
              await localStorage.setItem('token', response.data.token);
              await localStorage.setItem('logged', 'true');
              this.$router.push({path: '/notifications'});
            }
            else {
              this.error = response.data.message;
            }
          })
          .catch(error => {
            this.error = error;
          })
    },
    validateLogin() {
      if (!this.iin) {
        this.error = 'Поле ИИН обязательно для заполнения';
      }
      else if (this.iin.length !== 12) {
        this.error = 'Неправильный ИИН';
      }
      else if (!this.password) {
        this.error = 'Поле пароль обязательно для заполнения';
      }
      else return false;
      return true;
    },
  },
}
</script>

<style>
@import url('/css/block/login.css');
@import url('/css/block/mobile/login.css');
</style>
