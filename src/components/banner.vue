<template>
    <div>
        <div class="header">
            <div class="header__body">
                <div class="header__body-title">
                    <h1>АНТИ<span>КОЛЛЕКТОР</span></h1>
                    <p>{{ lang.we_will_protect_you_from_collectors_npi_and_mfos }}</p>
                </div>
                <div class="antiCollector__body-looper">
                    <div class="antiCollector__body-looper-content">
                        <img class="antiCollector__body-looper-image" src="/images/loopers/looper.svg">
                    </div>
                </div>
                <carousel class="header__body-sliders"
                          :autoplay="true"
                          :autoplayTimeout="4000"
                          :nav="false"
                          :items="sliderItems"
                          :loop="true"
                >
                  <div class="header__body-slider"
                       v-for="(slider, index) in sliders.src"
                       :key="'C'+index"
                  >
                    <div class="header__body-slider-circle">
                      <img :src="slider">
                    </div>
                    <div class="header__body-slider-description">
                      {{ sliders.description[index] }}
                    </div>
                  </div>
                </carousel>
                <div class="header__body-decision">
                    <div class="header__body-decision-content">
                        <router-link to="/step-1" class="header__body-protectMe">
                            <button type="button">{{ lang.protect_me }}</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import { mapGetters } from 'vuex';

export default {
    components: {
      carousel
    },
    data () {
        return {
            sliders: {
              src: [
                './images/megaphone-2.svg',
                './images/cctv-2.svg',
                './images/morally-pressured.svg',
                './images/credit-card.svg',
                './images/accounts-blocked.svg',
                './images/history-credit.svg',
              ],
              description: [
                'Вас беспокоят звонками и угрозами?',
                'Вас приследует у работы и дома коллекторы?',
                'На Вас оказывают моральное давление?',
                'Ваши счета заблокировали?',
                'Вам выплачивают зп с удержаниями?',
                'Вам испортили кредитную историю?',
              ],
            },
            sliderItems: 6,
            mobileVersion: false,
            mouseDown: { pressed: 0, lastPosLeft: 0, cursor: 'grab' },
            mouseMotion: 0,
            sliderMargin: { top: 'auto', left: 0, bottom: 'auto', right: 'auto' },
            oldSliderMargin: { top: 'auto', left: 0, bottom: 'auto', right: 'auto' },
            lang: {
              we_will_protect_you_from_collectors_npi_and_mfos: 'Мы защитим Вас от Коллекторов, ЧСИ И МФО',
              we_have_a_solution: 'У НАС ЕСТЬ РЕШЕНИЕ!',
              free: 'БЕСПЛАТНО',
              protect_me: 'Защитить меня',
            },
            mobileNavBgLeft: '0px',
            mobileNavLeft: '0px',
        }
    },
    state () {
        return {
            dataLang: [],
        }
    },
    created () {
        this.desktop2MobileVersion();
        window.addEventListener('resize', this.desktop2MobileVersion);
    },
    watch: {
      dataLang: function () {
        this.lang = this.dataLang;
        this.sliders.description = this.dataLang.banner.sliders.description;
      },
    },
    computed: {
      ...mapGetters({
        dataLang: 'getLang',
      }),
    },
    methods: {
        desktop2MobileVersion() {
          if (window.innerWidth < 500) this.sliderItems = 1;
          else if (window.innerWidth < 725) this.sliderItems = 2;
          else if (window.innerWidth < 965) this.sliderItems = 3;
          else if (window.innerWidth < 1160) this.sliderItems = 4;
          else if (window.innerWidth < 1250) this.sliderItems = 3;
          else if (window.innerWidth < 1550) this.sliderItems = 4;
          else if (window.innerWidth < 1825) this.sliderItems = 5;
          else this.sliderItems = 6;
          if (window.innerWidth < 1160) this.mobileVersion = true;
          else if (window.innerWidth > 1439) this.mobileVersion = false;
          else this.mobileVersion = false;
        },
    }
}
</script>

