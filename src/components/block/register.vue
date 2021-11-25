<template>
  <div class="blockAlert-register" :style="'display: '+registerBlockAlertDisplay">
    <div class="blockAlert-register__pos">
      <div class="blockAlert-register__background" v-on:click="registerBlockAlertClose"></div>
      <div class="blockAlert-register__content" ref="infoRegisterBlockAlert" :style="'margin: '+registerBlockAlertMarginTop+'px 0px 0px 0px'">
        <div class="blockAlert-register__title"><p>Зарегестрируйся и получи скидку на последующие услуги</p><span>-50%</span></div>
        <form action="#">
          <div class="blockAlert-register__body">
            <div class="blockAlert-register__input">
              <p>ФИО<span>*</span></p>
              <input value="" v-model="fio">
            </div>
            <div class="blockAlert-register__input">
              <p>Телефонный номер<span>*</span></p>
              <input value="" v-model="phoneNumber">
            </div>
            <div class="blockAlert-register__input">
              <p>ИИН<span>*</span></p>
              <input value="" v-model="iin">
            </div>
            <div class="blockAlert-register__input">
              <p>E-mail<span>*</span></p>
              <input value="" v-model="email">
            </div>
            <div class="blockAlert-register__input">
              <p>Придуйате пароль<span>*</span></p>
              <input value="" v-model="password">
            </div>
          </div>
          <div class="blockAlert-register__active">
            <input v-on:click="submitRequestRegister" type="button" value="Получить скидку">
          </div>
        </form>
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

