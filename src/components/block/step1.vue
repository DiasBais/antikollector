<template>
  <div class="step1">
    <div class="step1__content">
      <div class="step1__loading">
        <div class="step1__loading-title">Шаг 1</div>
        <div class="step1__loading-show">
          <div class="step1__loading-show-filled"></div>
        </div>
      </div>
      <div class="step1__body">
        <div class="step1__error" v-if="error"><span>{{ error }}</span></div>
        <div class="step1__input">
          <p class="step1__input-name">
            ФИО
            <span class="step1__input-name-require">*</span>
          </p>
          <input :class="'step1__input-value '+(this.errorFIO?'step1__error-input':'')" type="text" v-model="fio" v-on:keyup="onKeyUpInput($event, 'fio')">
          <div class="step1__error" v-if="errorFIO"><span>{{ errorFIO }}</span></div>
        </div>
        <div class="step1__input">
          <p class="step1__input-name">
            ИИН
            <span class="step1__input-name-require">*</span>
          </p>
          <input :class="'step1__input-iin step1__input-value '+(this.errorIIN?'step1__error-input':'')" type="text" v-model="iin" v-on:keyup="onKeyUpInput($event, 'iin')">
          <div class="step1__error" v-if="errorIIN"><span>{{ errorIIN }}</span></div>
        </div>
        <div class="step1__input">
          <p class="step1__input-name">
            Номер телефона
            <span class="step1__input-name-require">*</span>
          </p>
          <input :class="'step1__input-phone step1__input-value '+(this.errorPhone?'step1__error-input':'')" type="text" v-model="phoneNumber" v-on:keydown="onKeyDownPhoneNumber($event)" v-on:keyup="onKeyUpInput($event, 'phone')">
          <div class="step1__error" v-if="errorPhone"><span>{{ errorPhone }}</span></div>
        </div>
        <div class="step1__input">
          <p class="step1__input-name">
            Электронная почта
            <span class="step1__input-name-require">*</span>
          </p>
          <input :class="'step1__input-email step1__input-value '+(this.errorEmail?'step1__error-input':'')" type="text" v-model="email" v-on:keyup="onKeyUpInput($event, 'email')">
          <div class="step1__error" v-if="errorEmail"><span>{{ errorEmail }}</span></div>
        </div>
        <div class="step1__input">
          <p class="step1__input-name">
            Придумайте пароль
            <span class="step1__input-name-require">*</span>
          </p>
          <div class="step1__input-passwords">
            <input :class="'step1__input-password step1__input-value '+(this.errorPassword?'step1__error-input-password':'')"
                   :type="passwordType"
                   v-model="password"
                   v-on:keyup="onKeyUpInput($event, 'password')"
            >
            <div :class="'step1__input-password-icon '+(errorPassword?'step1__error-input-password-icon':'')">
              <img :src="passwordIcon" v-on:click="onClickPasswordIcon">
            </div>
          </div>
          <div class="step1__error" v-if="errorPassword"><span>{{ errorPassword }}</span></div>
        </div>
      </div>
      <div class="step1__footer">
        <input class="step1__submit" type="button" value="Следующий шаг >" v-on:click="submitRequestFirstStep()">
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
        { number: '706' },
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
      error: '',
      errorFIO: '',
      errorIIN: '',
      errorPhone: '',
      errorEmail: '',
      errorPassword: '',
      passwordType: 'password',
      passwordIcon: '/images/show-password.png',
      goesLoading: '',
    }
  },
  mounted() {
    if (localStorage.getItem('logged')) {
      this.$router.push({path: '/notifications'});
    }
    localStorage.setItem('token', '');
    localStorage.setItem('logged', '');
  },
  methods: {
    onClickPasswordIcon() {
      if (this.passwordIcon === '/images/show-password.png') {
        this.passwordType = 'text';
        this.passwordIcon = '/images/show-hide-password.png';
      }
      else {
        this.passwordType = 'password';
        this.passwordIcon = '/images/show-password.png';
      }
    },
    onKeyUpInput(e, name) {
      if (e.key === 'Enter') {
        if (name === 'fio') {
          document.getElementsByClassName('step1__input-iin')[0].focus();
        }
        else if (name === 'iin') {
          document.getElementsByClassName('step1__input-phone')[0].focus();
        }
        else if (name === 'phone') {
          document.getElementsByClassName('step1__input-email')[0].focus();
        }
        else if (name === 'email') {
          document.getElementsByClassName('step1__input-password')[0].focus();
        }
        else if (name === 'password') {
          this.submitRequestFirstStep();
        }
      }
      if (name === 'fio') {
        if (e.key.toUpperCase() >= 'А' && e.key.toUpperCase() <= 'Я' || e.key.toUpperCase() === 'Ё') {
          if (this.fio.length === 1 || this.fio[this.fio.length-2] === ' ') {
            this.fio = (this.fio.split('').splice(0,this.fio.length-1).join('')+e.key.toUpperCase());
          }
        }
        if (!this.fio) {
          this.errorFIO = 'Поле ФИО обязательно для заполнения';
        } else if (!this.validateFIO(this.fio)) {
          this.errorFIO = 'Введите ФИО только на киррилице';
        } else if (!this.validateFullFIO(this.fio)) {
          this.errorFIO = 'Введите полное имя ( Например: Абаев Абылай)';
        } else {
          this.errorFIO = '';
        }
      } else if (name === 'iin') {
        if (!this.iin) {
          this.errorIIN = 'Поле ИИН обязательно для заполнения';
        } else if (!this.validateIIN(this.iin)) {
          this.errorIIN = 'Неправильный ИИН';
        } else {
          this.errorIIN = '';
        }
      } else if (name === 'phone') {
        if (!this.phoneNumberOriginal) {
          this.errorPhone = 'Поле номер телефон обязательно для заполнения';
        } else if (!this.validatePhoneNumber(this.phoneNumberOriginal)) {
          this.errorPhone = 'Нет соответствующего оператора номер телефона';
        } else if (!(this.phoneNumberOriginal.length === 10)) {
          this.errorPhone = 'Неверный номер телефона';
        } else {
          this.errorPhone = '';
        }
      } else if (name === 'email') {
        if (!this.email) {
          this.errorEmail = 'Поле электронная почта обязательно для заполнения';
        } else if (!this.validateEmail(this.email)) {
          this.errorEmail = 'Неправильный email';
        } else {
          this.errorEmail = '';
        }
      } else if (name === 'password') {
        if (!this.password) {
          this.errorPassword = 'Поле пароль обязательно для заполнения';
        } else if (!(this.password.length > 5)) {
          this.errorPassword = 'Минимальная длина пароля должна быть не менее 6 символов';
        } else if (this.checkPassword(this.password)) {
          this.errorPassword = 'Нельзя ввести пароль на киррилице';
        } else {
          this.errorPassword = '';
        }
      }
    },
    checkPassword(password) {
      for (let i = 0; i < password.length; i++) {
        if (password[i].toUpperCase() >= 'А' && password[i].toUpperCase() <= 'Я' || password[i].toUpperCase() === 'Ё') {
          return true;
        }
      }
      return false;
    },
    async submitRequestFirstStep() {
      if (this.goesLoading) return;
      this.goesLoading = true;
      this.error = '';
      if (this.validateStep1()) return;
      await axios.post('https://crediter.kz/api/firstStep', {
        'fio': this.fio,
        'iin': this.iin,
        'phone': ('7'+this.phoneNumberOriginal),
        'email': this.email,
        'password': this.password,
      })
          .then(async response => {
            if (response.data.success) {
              await this.$session.set('fio', this.fio);
              await this.$session.set('iin', this.iin);
              await this.$session.set('email', this.email);
              await this.$session.set('password', this.password);
              await this.$session.set('phoneNumber', this.phoneNumberOriginal);
              this.$router.push({path: '/confirm'});
              this.goesLoading = false;
            }
            else {
              this.error = response.data.message;
              this.goesLoading = false;
            }
          })
          .catch(error => {
            this.error = error;
            this.goesLoading = false;
          });
    },
    validateStep1() {
      this.onKeyUpInput({key:'Enter'},'fio');
      this.onKeyUpInput({key:'Enter'},'iin');
      this.onKeyUpInput({key:'Enter'},'email');
      this.onKeyUpInput({key:'Enter'},'phone');
      this.onKeyUpInput({key:'Enter'},'password');
      if (!this.error && !this.errorFIO && !this.errorIIN && !this.errorEmail && !this.errorPhone && !this.errorPassword) {
        return false;
      }
      else return true;
    },
    validateFIO(fio) {
      fio = fio.split(' ').join('').split('').map((e) => {if(e.toUpperCase() >= 'А' && e.toUpperCase() <= 'Я' || e.toUpperCase() === 'Ё')return true;else return false});
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
        if (!(fio[i][0] >= 'А' && fio[i][0] <= 'Я' || fio[i][0] === 'Ё') && (fio[i][0] >= 'а' && fio[i][0] <= 'я' || fio[i][0] === 'ё')) fioValidate = true;
      }
      if (fioValidate) return false;
      else return true;
    },
    validateIIN(iin) {
      return (12 === iin.length && typeof parseInt(iin) === 'number' && this.isChecksumValid(iin));
    },
    isChecksumValid(iin) {
      let weights = [];
      for (let i=1;i<12;i++) weights.push(i);
      let weights2 = [];
      for (let i=3;i<12;i++) weights2.push(i);
      weights2 = [...weights2, 1, 2];

      let checksum = this.calc(iin, weights);

      if (checksum === 10) {
        checksum = this.calc(iin, weights2);
      }

      return checksum < 10 ? parseInt(iin.substr(11, 1)) === checksum : false;
    },
    calc(iin, weights) {
      let convolution = 0;
      for (let i = 0; i < 11; i++) {
        convolution += iin[i] * weights[i];
      }
      return convolution % 11;
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
      if (e.key === 'Enter') {
        document.getElementsByClassName('step1__input-email')[0].focus();
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
    checkCyrillic(text) {
      for (let i = 0; i < text.length; i++) if (text[i] >= 'А' && text[i] <= 'Я' || text[i] === 'Ё') return false;
      return true;
    },
    checkLatin(text) {
      for (let i = 0; i < text.length; i++) if (text[i] >= 'A' && text[i] <= 'Z') return false;
      return true;
    },
  },
}
</script>

<style>
@import url('/css/block/step1.css');
@import url('/css/block/mobile/step1.css');
</style>
