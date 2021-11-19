<template>
  <div class="Step1Show">
    <div class="Step1Show__content">
      <div class="Step1Show__loading">
        <div class="Step1Show__loading-title">Шаг 1</div>
        <div class="Step1Show__loading-show">
          <div class="Step1Show__loading-show-filled"></div>
        </div>
      </div>
      <div class="Step1Show__body">
        <div class="Step1Show__error" v-if="error">Error: <span>{{ error }}</span></div>
        <div class="Step1Show__input">
          <p class="Step1Show__input-name">
            ФИО
            <span class="Step1Show__input-name-require">*</span>
          </p>
          <input class="Step1Show__input-value" type="text" v-model="fio">
        </div>
        <div class="Step1Show__input">
          <p class="Step1Show__input-name">
            ИИН
            <span class="Step1Show__input-name-require">*</span>
          </p>
          <input class="Step1Show__input-value" type="text" v-model="iin">
        </div>
        <div class="Step1Show__input">
          <p class="Step1Show__input-name">
            Номер телефона
            <span class="Step1Show__input-name-require">*</span>
          </p>
          <input class="Step1Show__input-value" type="text" v-model="phoneNumber" v-on:keydown="onKeyDownPhoneNumber($event)">
        </div>
        <div class="Step1Show__input">
          <p class="Step1Show__input-name">
            Электронная почта
            <span class="Step1Show__input-name-require">*</span>
          </p>
          <input class="Step1Show__input-value" type="text" v-model="email">
        </div>
        <div class="Step1Show__input">
          <p class="Step1Show__input-name">
            Придумайте пароль
            <span class="Step1Show__input-name-require">*</span>
          </p>
          <input class="Step1Show__input-value" type="text" v-model="password">
        </div>
      </div>
      <div class="Step1Show__footer">
        <input class="Step1Show__submit" type="button" value="Следующий шаг >" v-on:click="submitRequestFirstStep()">
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  data() {
    return {
      fio: '',
      iin: '',
      phoneNumber: '',
      phoneNumberOriginal: '',
      operatorsPhoneNumber: [
        { number: '700' },
        { number: '701' },
        { number: '702' },
        { number: '705' },
        { number: '707' },
        { number: '708' },
        { number: '727' },
        { number: '747' },
        { number: '771' },
        { number: '775' },
        { number: '776' },
        { number: '777' },
        { number: '778' },
      ],
      email: '',
      password: '',
      token: 'f',
      smsCode: '',
      error: '',
    }
  },
  mounted() {
    localStorage.setItem('token', '');
    localStorage.setItem('smsCode', '');
    if (localStorage.getItem('logged')) {
      this.$router.push({path: '/notifications'});
    }
    localStorage.setItem('smsCode', '');
  },
  methods: {
    async submitRequestFirstStep() {
      this.error = '';
      if (this.validateStep1()) return;
      await axios.post('https://crediter.kz/api/firstStep', {
        'fio': this.fio,
        'iin': this.iin,
        'phone': ('+7'+this.phoneNumberOriginal),
        'email': this.email,
        'password': this.password,
      })
          .then(async response => {
            if (response.data.success) {
              this.token = response.data.token;
              await localStorage.setItem('token', this.token);
              await localStorage.setItem('logged', 'true');
              this.sendSMS();
            }
            else {
              this.error = response.data.message;
            }
          })
          .catch(error => {
            this.error = error;
          });
    },
    async sendSMS() {
      await axios.post('https://crediter.kz/api/sendMessage', {
        'phone': this.phoneNumberOriginal,
        'token': this.token,
      })
          .then(async response => {
            if (response.data.success) {
              this.smsCode = response.data.code;
              await localStorage.setItem('smsCode', '3333');
              await this.$session.set('smsCodeConfirmation', true);
              // this.$router.push({path: '/ConfirmShow'});
              this.$router.push({path: '/step2show'});
            }
            else {
              this.error = response.data.message;
            }
          })
          .catch(error => {
            this.error = error;
          });
    },
    validateStep1() {
      if (!this.fio) {
        this.error = 'Поле ФИО обязательно для заполнения';
      }
      else if (!this.validateFIO(this.fio)) {
        this.error = 'Введите ФИО только на киррилице';
      }
      else if (!this.validateFullFIO(this.fio)) {
        this.error = 'Введите полное имя ( Например: Абаев Абылай)';
      }
      else if (!this.iin) {
        this.error = 'Поле ИИН обязательно для заполнения';
      }
      else if (this.iin.length !== 12) {
        this.error = 'Неправильный ИИН';
      }
      else if (!this.phoneNumberOriginal) {
        this.error = 'Поле номер телефон обязательно для заполнения';
      }
      else if (!this.validatePhoneNumber(this.phoneNumberOriginal)) {
        this.error = 'Нет соответствующего оператора номер телефона';
      }
      else if (!this.email) {
        this.error = 'Поле электронная почта обязательно для заполнения';
      }
      else if (!this.validateEmail(this.email)) {
        this.error = 'Неправильный email';
      }
      else if (!this.password) {
        this.error = 'Поле пароль обязательно для заполнения';
      }
      else if (!(this.password.length > 5)) {
        this.error = 'Минимальная длина пароля должна быть не менее 6 символов';
      }
      else return false;
      return true;
    },
    validateFIO(fio) {
      fio = fio.split(' ').join('').split('').map((e) => {if(e.toUpperCase() >= 'А' && e.toUpperCase() <= 'Я')return true;else return false});
      for (let i = 0; i < fio.length; i++) {
        if (!fio[i]) return false;
      }
      return true;
    },
    validateFullFIO(fio) {
      fio = fio.split(' ').filter((elm) => { if(elm !== '') return elm; });
      let fioValidate = false;
      if (fio.length < 2) return false;
      for (let i = 0; i < fio.length; i++) {
        if (!(fio[i][0] >= 'А' && fio[i][0] <= 'Я') && (fio[i][0] >= 'а' && fio[i][0] <= 'я')) fioValidate = true;
      }
      if (fioValidate) return false;
      else return true;
    },
    validateEmail(email) {
      let emailValid = email.split('').map((elm) => {
        if (elm.toUpperCase() >= 'A' &&
            elm.toUpperCase() <= 'Z' ||
            elm >= '0' && elm <= '9' ||
            elm === '@' || elm === '.' ||
            elm === '-' || elm === '_' ||
            elm === '#' || elm === '$' ||
            elm === '%' || elm === '\'' ||
            elm === '&' || elm === '*' ||
            elm === '+' || elm === '/' ||
            elm === '^' || elm === '=' ||
            elm === '?' || elm === '`' ||
            elm === '{' || elm === '}' ||
            elm === '~' || elm === '|'
        ) return true;
        else return false;
      });
      let emailVal = true;
      for(let i=0;i<emailValid.length;i++) if(!emailValid[i]) emailVal=false;
      if (email.indexOf('@') > 0 &&
          email.split('').reverse().join('').indexOf('.') > 0 &&
          email.split('').reverse().join('').indexOf('@') > email.split('').reverse().join('').indexOf('.')-1 &&
          emailVal
      ) return true;
      else return false;
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
    onKeyDownPhoneNumber(e) {
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
  },
}
</script>

<style>
@import url('/css/block/Step1Show.css');
@import url('/css/block/mobile/Step1Show.css');
</style>
