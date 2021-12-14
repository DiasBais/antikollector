<template>
  <div class="forgotPassword">
    <div class="forgotPassword__content">
      <div class="forgotPassword__title">Забыли пароль?</div>
      <div class="forgotPassword__body">
        <div class="forgotPassword__input">
          <p class="forgotPassword__input-name">Введите телефон</p>
          <input class="forgotPassword__phoneInput" type="text" name="phone" value="" v-model="phoneNumber" v-on:keydown="onKeyDownPhoneNumber($event)" v-on:keyup="onKeyUpInput($event, 'phone')">
          <div class="forgotPassword__error" v-if="errorPhone">Error: <span>{{ errorPhone }}</span></div>
        </div>
      </div>
      <div class="forgotPassword__footer">
        <input class="forgotPassword__back" type="button" value="Назад" v-on:click="onBack">
        <input class="forgotPassword__submit" type="button" value="Отправить" v-on:click="submitRequestForgotPassword">
      </div>
    </div>
  </div>
</template>

<script>
// const axios = require('axios');

export default {
  data() {
    return {
      phoneNumber: '+7 (',
      phoneNumberOriginal: '',
      operatorsPhoneNumber: [
        { number: '700' },
        { number: '701' },
        { number: '702' },
        { number: '705' },
        { number: '706' },
        { number: '707' },
        { number: '708' },
        { number: '709' },
        { number: '727' },
        { number: '747' },
        { number: '750' },
        { number: '751' },
        { number: '760' },
        { number: '761' },
        { number: '762' },
        { number: '763' },
        { number: '764' },
        { number: '771' },
        { number: '775' },
        { number: '776' },
        { number: '777' },
        { number: '778' },
      ],
      error: '',
      errorPhone: '',
    }
  },
  mounted() {
    this.$store.commit('SET_FOOTER',false);
  },
  methods: {
    async submitRequestForgotPassword() {
      this.error = '';
      if (this.validateForgotPassword()) return;
      console.log('true');
      this.$router.push({path: '/'});
      // await axios.post('https://crediter.kz/api/firstStep', {
      //   'fio': this.fio,
      //   'iin': this.iin,
      //   'phone': ('7'+this.phoneNumberOriginal),
      //   'email': this.email,
      //   'password': this.password,
      // })
      //     .then(async response => {
      //       if (response.data.success) {
      //         await this.$session.set('fio', this.fio);
      //         await this.$session.set('iin', this.iin);
      //         await this.$session.set('email', this.email);
      //         await this.$session.set('password', this.password);
      //         await this.$session.set('phoneNumber', this.phoneNumberOriginal);
      //         this.$router.push({path: '/confirm'});
      //         this.goesLoading = false;
      //       }
      //       else {
      //         this.error = response.data.message;
      //         this.goesLoading = false;
      //       }
      //     })
      //     .catch(error => {
      //       this.error = error;
      //       this.goesLoading = false;
      //     });
    },
    validatePhoneNumber(n) {
      let operators = this.operatorsPhoneNumber;
      let corresponds = false;
      for (let i = 0; i < operators.length; i++) {
        if (n[0] === operators[i].number[0] && n[1] === operators[i].number[1] && n[2] === operators[i].number[2]) {
          corresponds = true;
        }
      }
      if (corresponds) return true;
      else return false;
    },
    validateForgotPassword() {
      if (!this.phoneNumberOriginal) {
        this.errorPhone = 'Поле номер телефон обязательно для заполнения';
      } else if (!this.validatePhoneNumber(this.phoneNumberOriginal)) {
        this.errorPhone = 'Нет соответствующего оператора номер телефона';
      } else if (!(this.phoneNumberOriginal.length === 10)) {
        this.errorPhone = 'Неверный номер телефона';
      }
      else return false;
      return true;
    },
    onKeyDownPhoneNumber(e) {
      if (e.key === 'Enter') {
        this.submitRequestForgotPassword();
        return;
      }
      this.onKeyUpInput(e,'phone');
      if (this.phoneNumberOriginal.length > 9 && e.key !== 'Backspace') {e.preventDefault();return;}
      if (e.key >= '0' && e.key <= '9') {
        this.phoneNumberOriginal += e.key;
      }
      else if (e.key === 'Backspace') {
        this.phoneNumberOriginal = this.phoneNumberOriginal.slice(0,-1);
      }
      e.preventDefault();
      let n = this.phoneNumberOriginal.toString();
      let pn = '+7 (';
      for (let i = 0; i < n.length; i++) {
        if (i < 3) pn += n[i];
        else if (i > 2 && i < 6) {
          if (i === 3) pn += ') ';
          pn += n[i];
        }
        else if (i > 5 && i < 8) {
          if (i === 6) pn += ' ';
          pn += n[i];
        }
        else if (i > 7) {
          if (i === 8) pn += '-';
          pn += n[i];
        }
        else break;
      }
      this.phoneNumber = pn;
    },
    onKeyUpInput(e, name) {
      if (name === 'phone') {
        if (!this.phoneNumberOriginal) {
          this.errorPhone = 'Поле номер телефон обязательно для заполнения';
        } else if (!this.validatePhoneNumber(this.phoneNumberOriginal)) {
          this.errorPhone = 'Нет соответствующего оператора номер телефона';
        } else if (!(this.phoneNumberOriginal.length === 10)) {
          this.errorPhone = 'Неверный номер телефона';
        } else {
          this.errorPhone = '';
        }
      }
    },
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
