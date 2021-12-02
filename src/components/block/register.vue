<template>
  <div class="register">
    <div class="register__content">
      <div class="register__title">
        <p>Зарегестрируйся и получи скидку на последующие услуги</p>
        <span>-50%</span>
      </div>
      <div class="register__body">
        <div class="register__error" v-if="error">Ошибка: <span v-html="error"></span></div>
        <div class="register__input">
          <p class="register__input-name">
            ИИН
            <span class="register__input-name-require">*</span>
          </p>
          <input class="register__input-value" type="text" name="iin" v-model="iin">
        </div>
        <div class="register__input">
          <p class="register__input-name">
            Введите пароль
            <span class="register__input-name-require">*</span>
          </p>
          <input class="register__input-value" type="password" name="password" v-model="password">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../core/axios";

export default {
  data() {
    return {
      registerBlockAlertDisplay: 'none',
      registerBlockAlertMarginTop: 0,
      fio: '',
      phoneNumber: '',
      email: '',
      iin: '',
      password: '',
    }
  },
  mounted() {
    window.addEventListener('load', () => {
      this.registerMobileVersion();
    })
    window.addEventListener('resize', this.registerMobileVersion);
  },
  methods: {
    submitRequestRegister() {
      let formData = new FormData();
      formData.append('fio', this.fio);
      formData.append('phoneNumber', this.phoneNumber);
      formData.append('email', this.email);
      formData.append('iin', this.iin);
      formData.append('password', this.password);
      axios().post('firstStep',formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
          .then(response => {
            this.error = response.data;
          })
          .catch(error => {
            this.error = error;
          })
    },
    registerMobileVersion() {
      if (window.innerWidth < 1160) {
        this.asd = '';
      }
      else {
        if (this.$refs.infoRegisterBlockAlert.clientHeight >= window.innerHeight) {
          this.registerBlockAlertMarginTop = (this.$refs.infoRegisterBlockAlert.clientHeight - window.innerHeight);
        }
      }
    },
    registerBlockAlertOpen() {
      this.registerBlockAlertDisplay = 'block';
    },
    registerBlockAlertClose() {
      this.registerBlockAlertDisplay = 'none';
    },
  },
}
</script>

<style>
@import url('/css/block/register.css');
@import url('/css/block/mobile/register.css');
</style>

