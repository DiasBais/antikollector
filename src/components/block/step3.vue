<template>
  <div class="blockAlert-step3" :style="'display: '+blockAlertDisplay">
    <div class="blockAlert-step3__pos">
      <div class="blockAlert-step3__background" v-on:click="blockAlertClose"></div>
      <div class="blockAlert-step3__content" ref="infoBlockAlert" :style="'margin: '+blockAlertMarginTop+'px 0px 0px 0px'">
        <div class="blockAlert-step3__loading">
          <div class="blockAlert-step3__loading-title">Шаг 3</div>
          <div class="blockAlert-step3__loading-view">
            <div class="blockAlert-step3__loading-view-filled"></div>
          </div>
        </div>
        <form action="#">
          <div class="blockAlert-step3__body">
            <div class="blockAlert-step3__input">
              <p>Загрузить документ 1</p>
              <input id="asdasd" type="file" v-bind:model="pathFile">
            </div>
            <div class="blockAlert-step3__input">
              <p>Загрузить документ 1</p>
              <input id="asdasd" type="file" v-bind:model="pathFile">
            </div>
            <div class="blockAlert-step3__input">
              <p>Загрузить документ 1</p>
              <input id="asdasd" type="file" v-bind:model="pathFile">
            </div>
          </div>
          <div class="blockAlert-step3__active">
            <input class="blockAlert-step3__active-back" type="submit" value="Назад">
            <input class="blockAlert-step3__active-go" type="submit" value="Бесплатная услуга">
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
      pathFile: '',
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
@import url('/css/block/step3.css');
/*@import url('/css/block/mobile/step3.css');*/
</style>

