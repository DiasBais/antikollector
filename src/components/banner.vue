<template>
    <div>
        <div class="header">
            <div class="header__body">
                <div class="header__body-title">
                    <h1>АНТИ<span>КОЛЛЕКТОР</span></h1>
                    <p>{{ this.lang.data.we_will_protect_you_from_collectors_npi_and_mfos }}</p>
                </div>
                <div class="antiCollector__body-looper">
                    <div class="antiCollector__body-looper-content">
                        <img class="antiCollector__body-looper-image" src="/images/loopers/looper.svg">
                    </div>
                </div>
                <carousel class="header__body-sliders" :autoplay="true" :autoplayTimeout="4000" :autoplaySpeed="1000" :nav="false" :items="sliderItems">
                  <div class="header__body-slider"
                       v-for="(slider, index) in sliders"
                       :key="'C'+index"
                  >
                    <div class="header__body-slider-circle">
                      <img :src="slider.src">
                    </div>
                    <div class="header__body-slider-description">
                      {{ slider.description }}
                    </div>
                  </div>
                </carousel>
                <div class="header__body-decision">
                    <div class="header__body-decision-content">
                        <router-link to="/step-1" class="header__body-protectMe">
                            <button type="button">{{ this.lang.data.protect_me }}</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import choiceLanguagesRu from '../lang/ru/lang'
import choiceLanguagesKz from '../lang/kz/lang'

export default {
    components: {
      carousel
    },
    data () {
        return {
            sliders: [
                { src: './images/megaphone-2.svg', description: 'Вас беспокоят звонками и угрозами?' },
                { src: './images/cctv-2.svg', description: 'Вас приследует у работы и дома коллекторы?' },
                { src: './images/morally-pressured.svg', description: 'На Вас оказывают моральное давление?' },
                { src: './images/credit-card.svg', description: 'Ваши счета заблокировали?' },
                { src: './images/accounts-blocked.svg', description: 'Вам выплачивают зп с удержаниями?' },
                { src: './images/history-credit.svg', description: 'Вам испортили кредитную историю?' },
            ],
            sliderItems: 6,
            autoplaySpeedSize: 1000,
            mobileVersion: false,
            mouseDown: { pressed: 0, lastPosLeft: 0, cursor: 'grab' },
            mouseMotion: 0,
            sliderMargin: { top: 'auto', left: 0, bottom: 'auto', right: 'auto' },
            oldSliderMargin: { top: 'auto', left: 0, bottom: 'auto', right: 'auto' },
            lang: {
                choice: 'ru',
                data: choiceLanguagesRu()
            },
            mobileNavBgLeft: '0px',
            mobileNavLeft: '0px'
        }
    },
    created () {
        this.desktop2MobileVersion();
        window.addEventListener('resize', this.desktop2MobileVersion);
    },
    methods: {
        desktop2MobileVersion() {
          if (window.innerWidth < 515) this.sliderItems = 1;
          else if (window.innerWidth < 765) this.sliderItems = 2;
          else if (window.innerWidth < 1015) this.sliderItems = 3;
          else if (window.innerWidth < 1160) this.sliderItems = 4;
          else if (window.innerWidth < 1250) this.sliderItems = 3;
          else if (window.innerWidth < 1550) this.sliderItems = 4;
          else if (window.innerWidth < 1825) this.sliderItems = 5;
          else this.sliderItems = 6;
          if (window.innerWidth < 1160) this.mobileVersion = true;
          else if (window.innerWidth > 1439) this.mobileVersion = false;
          else this.mobileVersion = false;
        },
        choiceLanguages() {
            if (this.lang.choice === 'ru') {
                this.lang.choice = 'kz';
                this.lang.data = choiceLanguagesKz();
            } else {
                this.lang.choice = 'ru';
                this.lang.data = choiceLanguagesRu();
            }
        },
    }
}
</script>

