<template>
  <div class="blockAlert-step2" :style="'display: '+blockAlertDisplay">
    <div class="blockAlert-step2__pos">
      <div class="blockAlert-step2__background" v-on:click="blockAlertClose"></div>
      <div class="blockAlert-step2__content" ref="infoBlockAlert" :style="'margin: '+blockAlertMarginTop+'px 0px 0px 0px'">
        <div class="blockAlert-step2__loading">
          <div class="blockAlert-step2__loading-title">Шаг 2</div>
          <div class="blockAlert-step2__loading-view">
            <div class="blockAlert-step2__loading-view-filled"></div>
          </div>
        </div>
        <form action="#">
          <div class="blockAlert-step2__body">
            <div class="blockAlert-step2__input">
              <p>Кому должен</p>
              <select>
                <option>Микрофинансовая организация</option>
              </select>
            </div>
            <div class="blockAlert-step2__input-amount">
              <p>Сколько должен</p>
              <div class="blockAlert-step2__input-amount-option">
                <input type="text">
                <span>тенге</span>
              </div>
            </div>
            <div class="blockAlert-step2__input-date">
              <p>Когда брал кредит</p>
              <input type="date">
            </div>
            <div class="blockAlert-step2__input-other">
              <p>Какая проблема</p>
              <select>
                <option></option>
              </select>
              <a href="#">+ Добавить МФО</a>
            </div>
          </div>
          <div class="blockAlert-step2__active">
            <input class="blockAlert-step2__active-back" type="submit" value="Назад">
            <input class="blockAlert-step2__active-go" type="submit" value="Защитить меня">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blockAlertDisplay: 'block',
      blockAlertMarginTop: 0,
    }
  },
  mounted() {
    window.addEventListener('load', () => {
      this.mobileVersion();
    })
    window.addEventListener('resize', this.mobileVersion);
  },
  methods: {
    mobileVersion() {
      if (window.innerWidth < 1160) {
        this.asd = '';
      }
      else {
        if (this.$refs.infoBlockAlert.clientHeight >= window.innerHeight) {
          this.blockAlertMarginTop = (this.$refs.infoBlockAlert.clientHeight - window.innerHeight);
        }
      }
    },
    blockAlertOpen() {
      this.blockAlertDisplay = 'block';
    },
    blockAlertClose() {
      this.blockAlertDisplay = 'none';
    },
  },
}
</script>

<style>
@import url('/css/block/step2.css');
/*@import url('/css/block/mobile/step2.css');*/
</style>

