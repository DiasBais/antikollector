<template>
  <div class="LoginShow">
    <div class="LoginShow__content">
      <div class="LoginShow__title">Войти в личный кабинет</div>
      <div class="LoginShow__body">
        <div class="LoginShow__error" v-if="error">Ошибка: <span v-html="error"></span></div>
        <div class="LoginShow__input">
          <p class="LoginShow__input-name">
            ИИН
            <span class="LoginShow__input-name-require">*</span>
          </p>
          <input class="LoginShow__input-value" type="text" v-model="iin">
        </div>
        <div class="LoginShow__input">
          <p class="LoginShow__input-name">
            Введите пароль
            <span class="LoginShow__input-name-require">*</span>
          </p>
          <input class="LoginShow__input-value" type="password" v-model="password">
        </div>
        <div class="LoginShow__links">
          <p>Нет аккаунта?
            <router-link to="/step1show">
              <span>Зарегестрируйтесь</span>
            </router-link>
          </p>
          <p>
            <router-link to="/forgotPassword">Забыли пароль?</router-link>
          </p>
        </div>
      </div>
      <div class="LoginShow__footer">
        <input class="LoginShow__input-submit" type="button" value="Войти" v-on:click="submitRequestLogin">
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
      /*
      let formData = new FormData();
      formData.append('iin', this.iin);
      formData.append('password', this.password);
      axios().post('signIn', formData, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      })
      */
      this.error = '';
      if (this.validateLogin()) return;
      const axios = require('axios');
      axios.post('https://crediter.kz/api/signIn', { 'iin': this.iin, 'password': this.password })
          .then(async response => {
            if (response.data.success) {
              await localStorage.setItem('token', this.token);
              await localStorage.setItem('logged', 'true');
              this.$router.push({path: '/notifications'});
              console.log(response.data);
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
@import url('/css/block/LoginShow.css');
@import url('/css/block/mobile/LoginShow.css');
</style>
