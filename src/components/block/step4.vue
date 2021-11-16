<template>
  <div class="blockAlert-step4" :style="'display: '+blockAlertDisplay">
    <div class="blockAlert-step4__pos">
      <div class="blockAlert-step4__background" v-on:click="blockAlertClose"></div>
      <div class="blockAlert-step4__content" ref="infoBlockAlert" :style="'margin: '+blockAlertMarginTop+'px 0px 0px 0px'">
        <div class="blockAlert-step4__loading">
          <div class="blockAlert-step4__loading-title">Шаг 4</div>
          <div class="blockAlert-step4__loading-view">
            <div class="blockAlert-step4__loading-view-filled"></div>
          </div>
        </div>
        <form action="#">
          <div class="blockAlert-step4__services">
            <div class="blockAlert-step4__free">
              <ul>
                <li v-for="(service,index) in freeServices"
                    :class="'blockAlert-step4__service '+(service.advantage?'blockAlert-step4__service-advantage':'blockAlert-step4__service-flaw')"
                    :key="'M'+index"
                >
                  <img v-if="service.advantage" src="/images/block-success.svg">
                  <img v-if="!service.advantage" src="/images/block-defeat.svg">
                  <p>{{ service.title }}</p>
                </li>
              </ul>
            </div>
            <div class="blockAlert-step4__pay">
              <ul>
                <li v-for="(service,index) in payServices"
                    :class="'blockAlert-step4__service '+(service.advantage?'blockAlert-step4__service-advantage':'blockAlert-step4__service-flaw')"
                    :key="'M'+index"
                >
                  <img v-if="service.advantage" src="/images/block-success.svg">
                  <img v-if="!service.advantage" src="/images/block-defeat.svg">
                  <p>{{ service.title }}</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="blockAlert-step4__active">
            <input class="blockAlert-step4__active-free" type="submit" value="Бесплатно">
            <input class="blockAlert-step4__active-pay" type="submit" value="20 000 тг">
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
      freeServices: [
        { title: 'Отградим от незаконных действий МФО', advantage: true },
        { title: 'Отградим от незаконных действий Коллекторов', advantage: true },
        { title: 'Отградим от незаконных действий ЧСИ', advantage: false },
        { title: 'Отменим исполнительный лист/надпись', advantage: false },
        { title: 'Улучшаем кредитную историю', advantage: false },
        { title: 'Письмо о нарушении Законодательства РК в АФФР', advantage: false },
        { title: 'Подготовим ИСК', advantage: false },
        { title: 'Письмо в Юстиции', advantage: false },
        { title: 'Письмо в палату ЧСИ', advantage: false },
      ],
      payServices: [
        { title: 'Отградим от незаконных действий МФО', advantage: true },
        { title: 'Отградим от незаконных действий Коллекторов', advantage: true },
        { title: 'Отградим от незаконных действий ЧСИ', advantage: true },
        { title: 'Отменим исполнительный лист/надпись', advantage: true },
        { title: 'Улучшаем кредитную историю', advantage: true },
        { title: 'Письмо о нарушении Законодательства РК в АФФР', advantage: true },
        { title: 'Подготовим ИСК', advantage: true },
        { title: 'Письмо в Юстиции', advantage: true },
        { title: 'Письмо в палату ЧСИ', advantage: true },
      ],
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
@import url('/css/block/step4.css');
/*@import url('/css/block/mobile/step4.css');*/
</style>

