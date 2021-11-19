<template>
  <div class="desktop8">
    <div class="desktop8__content">
      <div class="desktop8__title">Реквизиты компании</div>
      <div class="desktop8__composition">
        <div class="desktop8__company-description">
          <p>TOO «Nash Company»</p>
          <p>БИН: 100740009653</p>
          <p>Юридический Адрес: Республика Казахстан,</p>
          <p>г. Алматы, ул. Зенкова 22 офис 107</p>
          <p>Фактический адрес: г. Алматы, ул. Толе би 101, 3 этаж, блок E</p>
          <p>Тел: +7 (700) 350 50 00</p>
          <p>Р/сч KZ728560000004207818</p>
          <p>В АО «Банк Центр Кредит»</p>
          <p>БИК KCJBKZKX</p>
        </div>
        <div class="desktop8__links">
          <ul class="desktop8__link-pages">
            <li class="desktop8__link" v-for="(link, index) in links" :key="'K'+index">
              <router-link :to="link.path">{{ link.title }}</router-link>
            </li>
          </ul>
          <div class="desktop8__link-social-network">
            <a :href="linkInstagram">
              <img src="/images/footer/instagram.svg">
            </a>
            <a :href="linkFacebook">
              <img src="/images/footer/facebook.svg">
            </a>
          </div>
        </div>
      </div>
      <div class="desktop8__company-name">TOO «Nash Company»</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      links: [
        { path: '#', title: 'О компании' },
        { path: '#', title: 'Услуги' },
        { path: '#', title: 'Практика' },
        { path: '#', title: 'Пресс центр' },
        { path: '#', title: 'Оставить отзыв' },
        { path: '#', title: 'Контакты' },
      ],
      linkInstagram: '/',
      linkFacebook: '/',
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
@import url('/css/footer.css');
@import url('/css/mobile/footer.css');
</style>
