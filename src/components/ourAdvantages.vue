<template>
  <div class="ourAdvantages">
    <div class="ourAdvantages__content">
      <div class="antiCollector__body-looper">
        <div class="antiCollector__body-looper-content">
          <img class="antiCollector__body-looper-image" src="/images/loopers/looper-our-advantages.svg">
        </div>
      </div>
      <div class="ourAdvantages__title">Почему мы?</div>
      <div class="ourAdvantages__attainments">
        <div class="ourAdvantages__attainments-upper-part">
          <div class="ourAdvantages__attainment" v-for="(attainment, index) in attainments.slice(0, 2)" :key="'G'+index">
            <img class="ourAdvantages__attainments-image" :src="attainment.image">
            <p class="ourAdvantages__attainments-description">
              {{ attainment.description }}
            </p>
          </div>
        </div>
        <div class="antiCollector__body-looper">
          <div class="antiCollector__body-looper-content">
            <img class="antiCollector__body-looper-image" src="/images/loopers/looper-our-advantages-2.svg">
          </div>
        </div>
        <div class="ourAdvantages__attainments-bottom-part">
          <div class="ourAdvantages__attainment" v-for="(attainment, index) in attainments.slice(2, 5)" :key="'G'+index">
            <img class="ourAdvantages__attainments-image" :src="attainment.image">
            <p class="ourAdvantages__attainments-description">
              {{ attainment.description }}
            </p>
          </div>
        </div>
      </div>
      <div class="ourAdvantages__block-of-protection">
        <div class="ourAdvantages__block-of-protection-content">
          <div class="ourAdvantages__block-of-protection-title">Мы уже защитили</div>
          <div class="ourAdvantages__block-of-protection-block">
            <div class="ourAdvantages__block-of-protection-item">
              <div class="ourAdvantages__block-of-protection-num-block"
                   v-for="(num, index) in numPeople"
                   :key="'H'+index"
              ></div>
              <div class="ourAdvantages__block-of-protection-num"
                   v-for="(num, index) in numPeople"
                   :key="'HH'+index"
                   :style="'top: '+protectionNumbers.now[index].position.top+'px; left: '+protectionNumbers.now[index].position.left+'px; clip: rect('+protectionNumbers.now[index].clip.x+'px,auto,'+protectionNumbers.now[index].clip.y+'px,auto); transition: '+transition"
              >
                {{ num }}
              </div>
              <div class="ourAdvantages__block-of-protection-num-shadow"
                   v-for="(num, index) in numPeopleShadow"
                   :key="'HHH'+index"
                   :style="'top: '+protectionNumbers.new[index].position.top+'px; left: '+protectionNumbers.new[index].position.left+'px; clip: rect('+protectionNumbers.new[index].clip.x+'px,auto,'+protectionNumbers.new[index].clip.y+'px,auto); transition: '+transition"
              >
                {{ num }}
              </div>
            </div>
            <div class="ourAdvantages__block-of-protection-item-mobile">
              <div class="ourAdvantages__block-of-protection-num-block-mobile"
                   v-for="(num, index) in numPeople"
                   :key="'TT'+index"
              ></div>
              <div class="ourAdvantages__block-of-protection-num-mobile"
                   v-for="(num, index) in numPeople"
                   :key="'TTT'+index"
                   :style="'top: '+protectionNumbersMobile.now[index].position.top+'px; left: '+protectionNumbersMobile.now[index].position.left+'px; clip: rect('+protectionNumbersMobile.now[index].clip.x+'px,auto,'+protectionNumbersMobile.now[index].clip.y+'px,auto); transition: '+transition"
              >
                {{ num }}
              </div>
              <div class="ourAdvantages__block-of-protection-num-shadow-mobile"
                   v-for="(num, index) in numPeopleShadow"
                   :key="'TTTT'+index"
                   :style="'top: '+protectionNumbersMobile.new[index].position.top+'px; left: '+protectionNumbersMobile.new[index].position.left+'px; clip: rect('+protectionNumbersMobile.new[index].clip.x+'px,auto,'+protectionNumbersMobile.new[index].clip.y+'px,auto); transition: '+transition"
              >
                {{ num }}
              </div>
            </div>
          </div>
          <div class="ourAdvantages__block-of-protection-title-2">людей</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      protectionNumbers: {
        now: [
          { position: {top: 10,left:217.5}, clip: {x:0,y:70} },
          { position: {top: 10,left:255}, clip: {x:0,y:70} },
          { position: {top: 10,left:291.75}, clip: {x:0,y:70} },
          { position: {top: 10,left:328.75}, clip: {x:0,y:70} },
          { position: {top: 10,left:366.25}, clip: {x:0,y:70} },
          { position: {top: 10,left:403.25}, clip: {x:0,y:70} },
          { position: {top: 10,left:440}, clip: {x:0,y:70} }
        ],
        new: [
          { position: {top: -35,left:215.5}, clip: {x:0,y:0} },
          { position: {top: -35,left:253}, clip: {x:0,y:0} },
          { position: {top: -35,left:289.75}, clip: {x:0,y:0} },
          { position: {top: -35,left:326.75}, clip: {x:0,y:0} },
          { position: {top: -35,left:364.25}, clip: {x:0,y:0} },
          { position: {top: -35,left:401.25}, clip: {x:0,y:0} },
          { position: {top: -35,left:438}, clip: {x:0,y:0} }
        ]
      },
      protectionNumbersMobile: {
        now: [
          { position: {top: 39.25,left:48.5}, clip: {x:0,y:47.5} },
          { position: {top: 39.25,left:74.25}, clip: {x:0,y:47.5} },
          { position: {top: 39.25,left:100.75}, clip: {x:0,y:47.5} },
          { position: {top: 39.25,left:126.5}, clip: {x:0,y:47.5} },
          { position: {top: 39.25,left:152.5}, clip: {x:0,y:47.5} },
          { position: {top: 39.25,left:178.25}, clip: {x:0,y:47.5} },
          { position: {top: 39.25,left:204.75}, clip: {x:0,y:47.5} }
        ],
        new: [
          { position: {top: -17,left:48.5}, clip: {x:0,y:0} },
          { position: {top: -17,left:74.25}, clip: {x:0,y:0} },
          { position: {top: -17,left:100.75}, clip: {x:0,y:0} },
          { position: {top: -17,left:126.5}, clip: {x:0,y:0} },
          { position: {top: -17,left:152.5}, clip: {x:0,y:0} },
          { position: {top: -17,left:178.25}, clip: {x:0,y:0} },
          { position: {top: -17,left:204.75}, clip: {x:0,y:0} }
        ]
      },
      attainments: [
        { image: '/images/why-us/12-years.svg', description: '12 лет защищаем людей от коллекторов' },
        { image: '/images/why-us/95-percent.svg', description: '95% успешно выйгранных дел' },
        { image: '/images/why-us/kazakhstan.svg', description: 'Работаем по всему Казахстану' },
        { image: '/images/why-us/browser.svg', description: 'Все услуги онлайн' },
        { image: '/images/why-us/free-services.svg', description: 'Оказываем бесплатные слуги' },
      ],
      numPeople: '0',
      numPeopleOriginal: 0,
      numPeopleShadow: '0',
      numPeopleOriginalShadow: 0,
      transition: 'top 2s, clip 3s',
      mobileVersion: false,
    }
  },
  mounted() {
    this.counterStartValue();
  },
  methods: {
    counterStartValue() {
      let now = new Date();
      let definitionHours = this.definitionHourInDay(now.getHours(),now.getMinutes(),now.getSeconds());
      let nowDate = (parseInt(this.definitionDaysInYears(now.getFullYear(),(now.getMonth()+1),now.getDate())));
      let oldDate = (parseInt(this.definitionDaysInYears(2021,11,28)));
      let currentDate = (((((nowDate-oldDate)*8)*60)*60)+(definitionHours[0]));
      this.numPeopleOriginal = Math.floor(currentDate / 30);
      this.numPeopleOriginalShadow = Math.floor(currentDate / 30);
      this.addPeople();
      this.addPeopleShadow();
      this.animationChangeCounter();
      if (definitionHours[1]) setTimeout(this.timerAddPeople, (definitionHours[1] * 1000));
      else setTimeout(this.timerAddPeople, ((definitionHours[0] % 30) * 1000));
    },
    definitionDaysInYears(year, month, day) {
      day = (this.definitionDaysInMonth(year, month) + (day - 1));
      year -= 1;
      let year1 = ((year - Math.floor(year / 4)) * 365);
      let year2 = ((Math.floor(year / 4) * 366) - (Math.floor(year / 100)));
      year = year1 + year2;
      return ((year + day));
    },
    definitionDaysInMonth(year, month) {
      let listDays = [ 31, ((year % 4 === 0) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
      let sumDays = 0;
      for (let i = 0; i < month-1; i++) sumDays += listDays[i];
      return sumDays;
    },
    definitionHourInDay(hour, minute, second) {
      let accumulated = 0;
      let howLangTakeTurnOn = 0;
      let howLangTakeTurnOff = 0;
      let amount = 0;
      let fullTime = 28800;
      let halfTime = 14400;
      if (hour <= 7) {
        howLangTakeTurnOn = this.hoursToSecondsOn((7 - hour),minute,second);
        amount = fullTime;
      }
      else if (hour >= 8 && hour <= 12) {
        accumulated = this.hoursToSecondsOn((hour-8),minute,second);
        howLangTakeTurnOff = this.hoursToSecondsOff((12-hour),minute,second);
        amount = (fullTime-accumulated);
      }
      else if (hour === 13) {
        accumulated = halfTime;
        howLangTakeTurnOn = this.hoursToSecondsOn((13-hour),minute,second);
        amount = accumulated;
      }
      else if (hour >= 14 && hour <= 17) {
        accumulated = halfTime + this.hoursToSecondsOn((hour-14),minute,second);
        howLangTakeTurnOff = this.hoursToSecondsOff((17-hour),minute,second);
        amount = (fullTime-accumulated);
      }
      else {
        accumulated = fullTime;
        howLangTakeTurnOn = this.hoursToSecondsOn((18 - hour),minute,second);
      }
      return [accumulated, howLangTakeTurnOn, howLangTakeTurnOff, amount];
    },
    hoursToSecondsOn(hour, minute, second) {
      return ((hour * 3600) + (minute * 60) + second);
    },
    hoursToSecondsOff(hour, minute, second) {
      return ((hour * 3600) + (minute * 60) + second);
    },
    timerAddPeople() {
      this.animationChangeCounter();
      setTimeout(this.timerAddPeople, 30000);
    },
    addPeople() {
      let emptyLayers = (new Array((this.protectionNumbers.now.length+1)-this.numPeopleOriginal.toString().length).join(' '));
      this.numPeople = (emptyLayers+this.numPeopleOriginal.toString());
    },
    addPeopleShadow() {
      let emptyLayers = (new Array((this.protectionNumbers.new.length+1)-this.numPeopleOriginalShadow.toString().length).join(' '));
      this.numPeopleShadow = (emptyLayers+this.numPeopleOriginalShadow.toString());
    },
    thinkNumberChanged(oldNum) {
      let newNum = (oldNum+1).toString();
      oldNum = oldNum.toString();
      if (oldNum.length < newNum.length) {
        return newNum.length;
      }
      let changedNum = 1;
      for (let i = newNum.length-1; i >= 0; i--) {
        if (newNum[i] !== oldNum[i]) {
          changedNum = newNum.length-i;
        }
      }
      return changedNum;
    },
    animationChangeCounter() {
      let numChanged = this.thinkNumberChanged(this.numPeopleOriginal);
      this.numPeopleOriginalShadow += 1;
      this.addPeopleShadow();
      for (let i = 0; i < numChanged; i++) {
        this.protectionNumbers.now[(this.protectionNumbers.now.length-1)-i].position.top = -35;
        this.protectionNumbers.now[(this.protectionNumbers.now.length-1)-i].clip.x = 70;
        this.protectionNumbers.new[(this.protectionNumbers.new.length-1)-i].position.top = -81;
        this.protectionNumbers.new[(this.protectionNumbers.new.length-1)-i].clip.y = 70;
        this.protectionNumbersMobile.now[(this.protectionNumbersMobile.now.length-1)-i].position.top = 7.5;
        this.protectionNumbersMobile.now[(this.protectionNumbersMobile.now.length-1)-i].clip.x = 47.5;
        this.protectionNumbersMobile.new[(this.protectionNumbersMobile.new.length-1)-i].position.top = -51.5;
        this.protectionNumbersMobile.new[(this.protectionNumbersMobile.new.length-1)-i].clip.y = 47.5;
      }
      setTimeout(()=>{
        this.transition = 'all 0s ease 0s';
      },100);
      setTimeout(()=>{
        this.numPeopleOriginal += 1;
        this.addPeople();
        for (let i = 0; i < numChanged; i++) {
          this.protectionNumbers.now[(this.protectionNumbers.now.length-1)-i].position.top = 10;
          this.protectionNumbers.now[(this.protectionNumbers.now.length-1)-i].clip.x = 0;
          this.protectionNumbers.new[(this.protectionNumbers.new.length-1)-i].position.top = -35;
          this.protectionNumbers.new[(this.protectionNumbers.new.length-1)-i].clip.y = 0;
          this.protectionNumbersMobile.now[(this.protectionNumbersMobile.now.length-1)-i].position.top = 39.25;
          this.protectionNumbersMobile.now[(this.protectionNumbersMobile.now.length-1)-i].clip.x = 0;
          this.protectionNumbersMobile.new[(this.protectionNumbersMobile.new.length-1)-i].position.top = -17;
          this.protectionNumbersMobile.new[(this.protectionNumbersMobile.new.length-1)-i].clip.y = 0;
          setTimeout(()=>{
            this.transition = 'top 2s, clip 3s';
          },100);
        }
      },4000);
    }
  },
}
</script>

<style>
@import url('/css/ourAdvantages.css');
@import url('/css/mobile/ourAdvantages.css');
</style>
