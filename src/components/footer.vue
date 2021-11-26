<template>
  <div class="footer">
    <div class="footer__content">
      <div class="footer__title">Реквизиты компании</div>
      <div class="footer__composition">
        <div class="footer__company-description">
          <p v-for="(description,index) in textDescription" :key="'YY'+index" v-html="description"></p>
        </div>
        <div class="footer__links">
          <ul class="footer__link-pages">
            <li class="footer__link" v-for="(link, index) in links" :key="'K'+index">
              <router-link :to="($route.path==='/')?('#'+(link.path.slice(1,link.path.length))):'/'"
                           :style="(($route.path === link.path)?'color: #753636':'')"
              >
                {{ link.title }}
              </router-link>
            </li>
          </ul>
          <div class="footer__link-social-network">
            <a :href="linkInstagram">
              <img src="/images/footer/instagram.svg">
            </a>
            <a :href="linkFacebook">
              <img src="/images/footer/facebook.svg">
            </a>
          </div>
        </div>
      </div>
<!--      <div class="footer__company-name">TOO «Nash Company»</div>-->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      textDescription: [
          'TOO «Nash Company»',
          'БИН: 100740009653',
          'Юридический Адрес: Республика Казахстан,',
          'г. Алматы, ул. Зенкова 22 офис 107',
          'Фактический адрес: г. Алматы, ул. Толе би 101, 3 этаж, блок E',
          'Тел: +7 (700) 350 50 00',
          'Р/сч KZ728560000004207818',
          'В АО «Банк Центр Кредит»',
          'БИК KCJBKZKX',
      ],
      links: [
        { path: '/about-company', title: 'О компании' },
        { path: '/services', title: 'Услуги' },
        { path: '/our-advantages', title: 'Практика' },
        { path: '/', title: 'Пресс центр' },
        { path: '/reviews', title: 'Оставить отзыв' },
        { path: '/faq', title: 'Контакты' },
      ],
      linkInstagram: '/',
      linkFacebook: '/',
    }
  },
}
</script>

<style>
@import url('/css/footer.css');
@import url('/css/mobile/footer.css');
</style>

