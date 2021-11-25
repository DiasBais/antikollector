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
                <div
                    class="header__body-sliders"
                    :style="((!mobileVersion)?('cursor: '+mouseDown.cursor+'; margin: '+(sliderMargin.top+' '+sliderMargin.left+'px '+' '+sliderMargin.bottom+' '+' '+sliderMargin.right)):'')"
                    @mousemove="sliderMouseMotionMove($event)"
                    @mouseleave="sliderMouseMotionLeave()"
                    @mousedown="sliderMouseDown($event)"
                    @mouseup="sliderMouseUp()"
                >
                    <div
                        class="header__body-slider"
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
                </div>
                <div class="header__body-slider-transitions">
                    <div class="header__body-slider-transition" v-for="(slider, index) in sliders" :key="'D'+index">
                        <img class="header__body-slider-transition-img" src="/images/ellipse.svg">
                    </div>
                </div>
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
import choiceLanguagesRu from '../lang/ru/lang'
import choiceLanguagesKz from '../lang/kz/lang'

export default {
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
        this.initialValueMobileNav();
        window.addEventListener('resize', this.initialValueMobileNav);
    },
    methods: {
        desktop2MobileVersion() {
          if (window.innerWidth < 1160) {
            this.mobileVersion = false;
            this.mouseDown = { pressed: 0, lastPosLeft: 0, cursor: 'grab' };
            this.mouseMotion = 0;
            this.sliderMargin = { top: 'auto', left: 0, bottom: 'auto', right: 'auto' };
            this.oldSliderMargin = { top: 'auto', left: 0, bottom: 'auto', right: 'auto' };
            this.mobileNavBgLeft = '0px';
            this.mobileNavLeft = '0px';
            this.mobileVersion = true;
          }
          else if (window.innerWidth > 1439) this.mobileVersion = false;
          else this.mobileVersion = false;
        },
        initialValueMobileNav() {
            this.mobileNavBgLeft = -(0.7786*window.innerWidth)+'px';
            this.mobileNavLeft = (-window.innerWidth)+'px';
        },
        openMobileNav() {
            this.mobileNavBgLeft = '0px';
            this.mobileNavLeft = '0px';
        },
        closeMobileNav() {
            this.mobileNavBgLeft = -(0.7786*window.innerWidth)+'px';
            this.mobileNavLeft = (-window.innerWidth)+'px';
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
        sliderMouseDown(event) {
            if (this.mobileVersion) return;
            this.mouseDown.pressed = 1;
            this.mouseDown.cursor = 'grabbing';
            this.mouseDown.lastPosLeft = (event.clientX);
        },
        sliderMouseUp() {
          if (this.mobileVersion) return;
            if (this.mouseDown.pressed === 1) {
                this.mouseDown.cursor = 'grab';
                this.oldSliderMargin = this.sliderMargin;
                this.mouseDown.pressed = 0;
            }
        },
        sliderMouseMotionMove(event) {
          if (this.mobileVersion) return;
            if (this.mouseDown.pressed) {
                let lastPosLeft = this.mouseDown.lastPosLeft;
                let posX = event.clientX;
                let newValue = (this.oldSliderMargin.left + lastPosLeft - posX);
                if (newValue < -500) newValue = -500;
                else if (newValue > 500) newValue = 500;
                this.sliderMargin = { top: 'auto', left: newValue, bottom: 'auto', right: 'auto' };
            }
        },
        sliderMouseMotionLeave() {
          if (this.mobileVersion) return;
            if (this.mouseDown.pressed === 1) {
                this.mouseDown.cursor = 'grab';
                this.oldSliderMargin = this.sliderMargin;
                this.mouseDown.pressed = 0;
            }
        }
    }
}
</script>

