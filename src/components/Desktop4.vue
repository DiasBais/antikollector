<template>
  <div class="desktop4">
    <div class="desktop4__content">
      <div class="desktop4__title">Почему мы?</div>
      <div class="desktop4__attainments">
        <div class="desktop4__attainments-upper-part">
          <div class="desktop4__attainment" v-for="(attainment, index) in attainments.slice(0, 2)" :key="'G'+index">
            <img class="desktop4__attainments-image" :src="attainment.image">
            <p class="desktop4__attainments-description">
              {{ attainment.description }}
            </p>
          </div>
        </div>
        <div class="desktop4__attainments-bottom-part">
          <div class="desktop4__attainment" v-for="(attainment, index) in attainments.slice(2, 5)" :key="'G'+index">
            <img class="desktop4__attainments-image" :src="attainment.image">
            <p class="desktop4__attainments-description">
              {{ attainment.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="desktop4__block-of-protection">
        <div class="desktop4__block-of-protection-content">
          <div class="desktop4__block-of-protection-title">Мы уже защитили</div>
          <div class="desktop4__block-of-protection-block">
            <div class="desktop4__block-of-protection-num"
                 v-for="(num, index) in numPeople"
                 :key="'H'+index"
            >
              {{ num }}
            </div>
          </div>
          <div class="desktop4__block-of-protection-title-2">людей</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      attainments: [
        { image: '/images/why-us/12-years.svg', description: '12 лет защищаем людей от коллекторов' },
        { image: '/images/why-us/95-percent.svg', description: '95% успешно выйгранных дел' },
        { image: '/images/why-us/kazakhstan.svg', description: 'Работаем по всему Казахстану' },
        { image: '/images/why-us/browser.svg', description: 'Все услуги онлайн' },
        { image: '/images/why-us/free-services.svg', description: 'Оказываем бесплатные слуги' },
      ],
      numPeople: '   1010',
      hideNumPeople: '   1010',
    }
  },
  created () {
    this.desktop4MobileVersion();
    window.addEventListener('resize', this.desktop4MobileVersion);
  },
  methods: {
    desktop4MobileVersion() {
      if (window.innerWidth < 1160) {
        this.numPeople = this.hideNumPeople;
      }
      else {
        this.hideNumPeople = this.numPeople;
        this.numPeople = '';
      }
    }
  },
}
</script>

<style>
@import url('/css/desktop4.css');
@import url('/css/mobile/desktop4.css');
</style>
