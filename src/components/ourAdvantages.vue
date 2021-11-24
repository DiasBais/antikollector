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
      numPeople: '1010',
      numPeopleOriginal: 1010,
      numPeopleShadow: '1010',
      numPeopleOriginalShadow: 1010,
      transition: 'top 2s, clip 3s',
      mobileVersion: false,
    }
  },
  mounted() {
    var now = new Date();
    var old = new Date('November 22, 2021 17:00:00');
    this.numPeopleOriginal = parseInt((now - old) / 1000 / 30);
    this.numPeopleOriginalShadow = parseInt((now - old) / 1000 / 30);
    this.addPeople();
    this.addPeopleShadow();
    this.animationChangeCounter();
    // setTimeout(this.timerAddPeople, ((parseInt((now-old)/1000%30))*1000));
    setTimeout(this.timerAddPeople, 8000);
  },
  methods: {
    timerAddPeople() {
      this.animationChangeCounter();
      setTimeout(this.timerAddPeople, 8000);
    },
    addPeople() {
      this.numPeople = ((new Array(((this.protectionNumbers.now.length+1)-this.numPeopleOriginal.toString().length)).join(' '))+(1010+this.numPeopleOriginal).toString());
    },
    addPeopleShadow() {
      this.numPeopleShadow = ((new Array(((this.protectionNumbers.new.length+1)-this.numPeopleOriginalShadow.toString().length)).join(' '))+(1010+this.numPeopleOriginalShadow).toString());
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
