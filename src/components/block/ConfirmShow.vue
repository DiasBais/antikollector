<template>
  <div class="ConfirmShow">
    <div class="ConfirmShow__content">
      <div class="ConfirmShow__title">Подтвердите номер телефона</div>
      <div class="ConfirmShow__body">
        <p class="ConfirmShow__description">Введите код из СМС</p>
        <input class="ConfirmShow__code" type="text" v-model="smsCode" v-on:keydown="onKeyDownSMSCode($event)">
      </div>
      <div class="ConfirmShow__footer">
        <input class="ConfirmShow__submit" type="text" value="Защитить меня">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      smsCode: '_ _ _ _',
      smsCodeNum: '',
    }
  },
  methods: {
    onKeyDownSMSCode(e) {
      e.preventDefault();
      console.log(e.key);
      if (this.smsCodeNum.length === 4) {
        console.log();
      }
      else if (e.key >= '0' && e.key <= '9') {
        this.smsCodeNum += e.key;
      }
      else if (e.key === 'Backspace') {
        this.smsCodeNum += e.key;
      }
      else {
        console.log();
      }
      console.log();
    }
  }
}
</script>

<style>
@import url('/css/block/ConfirmShow.css');
@import url('/css/block/mobile/ConfirmShow.css');
</style>
