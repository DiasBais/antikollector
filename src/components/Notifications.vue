<template>
  <div class="Notifications">
    <div class="Notifications__content">
      <div class="Notifications__title">Состояние дела:</div>
      <div class="Notifications__body">
        <div :class="'Notifications__item '+ ((index===0)?'Notifications__item-current':'')" v-for="(request,index) in requests" :key="'N'+index">
          <div :class="'Notifications__condition '+ request.condition"></div>
          <span class="Notifications__direction">{{ request.direction }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      requests: [
        { direction: 'Мы подали заявку в НацБанк', condition: 'Notifications__condition-agree' },
        { direction: 'Пришел ответ от МФО', condition: 'Notifications__condition-agree' },
        { direction: 'Заявка на обработке в НацБанке', condition: 'Notifications__condition-onProgress' },
        { direction: 'Мы подали заявку в НацБанк', condition: 'Notifications__condition-agree' },
      ]
    }
  },
  created () {
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
  }
}
</script>

<style>
@import '/css/notifications.css'
</style>

