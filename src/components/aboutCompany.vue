<template>
  <div class="aboutCompany">
    <div class="aboutCompany__content">
      <div class="aboutCompany__title">О компании</div>
      <div class="aboutCompany__inside">
        <div class="aboutCompany__hello"></div>
        <div class="aboutCompany__description">
          <p>Мы юридическая legal tech компания. Наша программа “антиколлекор” является инновационной социальной программой. Именно поэтому мы защищаем людей от коллекторов, частных сюдебных приставов и микрофинансовых организаций <span>БЕСПЛАТНО</span>,  заставляем соблюдать законы и наказаываем влодь до лишения лицензии.</p>
          <p>У нас огромный опыт в защите людей от коллекторов - мы на рынке уже 12 лет и 95% дел с коллекторами, частными судебными приставами, микрофинансовыми оргназинациями мы вы играли <span>УСПЕШНО</span>.</p>
          <p>Наши специалисты создали продукт, благодаря которому Вам предосталвяется эксклюзиваная возможность в онлайн режиме, из любой точки РК, общаться с юристами, которые помогут Вам избавиться от навязчивых коллекторов. Также у Вас есть возможность заказывать и получать услуги бесплатно или почти бесплатно, ведь у нас низкие цены по сравнению с другими компаниями.</p>
          <p>Вам не придется ломать голову как защитить себя от коллекторов,  к кому обратиться и куда пожаловаться - ведь <span>МЫ СДЕЛАЕМ ЭТО ЗА ВАС!</span></p>
        </div>
      </div>
      <div class="aboutCompany__order-service">
        <button type="button">Заказать услугу</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      asd: ''
    }
  },
  created () {
    this.mobileVersion();
    window.addEventListener('resize', this.mobileVersion);
  },
  methods: {
    mobileVersion() {
      if (window.innerWidth < 1160) {
        this.asd = '';
      }
      else {
        this.asd = '';
      }
    }
  },
}
</script>

<style>
@import url('/css/aboutCompany.css');
@import url('/css/mobile/aboutCompany.css');
</style>
