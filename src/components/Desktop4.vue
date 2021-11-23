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
            <div class="desktop4__block-of-protection-item">
              <div class="desktop4__block-of-protection-num-block"
                   v-for="(num, index) in numPeople"
                   :key="'H'+index"
              ></div>
              <div class="desktop4__block-of-protection-num"
                   v-for="(num, index) in numPeople"
                   :key="'HH'+index"
                   :style="'margin: '+protectionNumbers.now[index].position.top+'px '+protectionNumbers.now[index].position.right+'px 0px 2px; clip: rect('+protectionNumbers.now[index].clip.x+'px,auto,'+protectionNumbers.now[index].clip.y+'px,auto); transition: '+transition"
              >
                {{ num }}
              </div>
              <div class="desktop4__block-of-protection-num-shadow"
                   v-for="(num, index) in numPeopleShadow"
                   :key="'HHH'+index"
                   :style="'margin: '+protectionNumbers.new[index].position.top+'px '+protectionNumbers.new[index].position.right+'px 0px 2px; clip: rect('+protectionNumbers.new[index].clip.x+'px,auto,'+protectionNumbers.new[index].clip.y+'px,auto); transition: '+transition"
              >
                {{ num }}
              </div>
            </div>
            <div class="desktop4__block-of-protection-item-mobile">
              <div class="desktop4__block-of-protection-num-block-mobile"
                   v-for="(num, index) in numPeople"
                   :key="'TT'+index"
              ></div>
              <div class="desktop4__block-of-protection-num-mobile"
                   v-for="(num, index) in numPeople"
                   :key="'TTT'+index"
                   :style="'margin: '+protectionNumbersMobile.now[index].position.top+'px '+protectionNumbersMobile.now[index].position.right+'px 0px 2px; clip: rect('+protectionNumbersMobile.now[index].clip.x+'px,auto,'+protectionNumbersMobile.now[index].clip.y+'px,auto); transition: '+transition"
              >
                {{ num }}
              </div>
              <div class="desktop4__block-of-protection-num-shadow-mobile"
                   v-for="(num, index) in numPeopleShadow"
                   :key="'TTTT'+index"
                   :style="'margin: '+protectionNumbersMobile.new[index].position.top+'px '+protectionNumbersMobile.new[index].position.right+'px 0px 2px; clip: rect('+protectionNumbersMobile.new[index].clip.x+'px,auto,'+protectionNumbersMobile.new[index].clip.y+'px,auto); transition: '+transition"
              >
                {{ num }}
              </div>
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
      protectionNumbers: {
        now: [
          { position: {top: 0,right:222}, clip: {x:0,y:75} },
          { position: {top: 0,right:149}, clip: {x:0,y:75} },
          { position: {top: 0,right:75}, clip: {x:0,y:75} },
          { position: {top: 0,right:0}, clip: {x:0,y:75} },
          { position: {top: 0,right:-74}, clip: {x:0,y:75} },
          { position: {top: 0,right:-148}, clip: {x:0,y:75} },
          { position: {top: 0,right:-221}, clip: {x:0,y:75} }
        ],
        new: [
          { position: {top: 91,right:222}, clip: {x:0,y:0} },
          { position: {top: 91,right:149}, clip: {x:0,y:0} },
          { position: {top: 91,right:75}, clip: {x:0,y:0} },
          { position: {top: 91,right:0}, clip: {x:0,y:0} },
          { position: {top: 91,right:-74}, clip: {x:0,y:0} },
          { position: {top: 91,right:-148}, clip: {x:0,y:0} },
          { position: {top: 91,right:-221}, clip: {x:0,y:0} }
        ]
      },
      protectionNumbersMobile: {
        now: [
          { position: {top: 0,right:157.5}, clip: {x:0,y:50} },
          { position: {top: 0,right:103.75}, clip: {x:0,y:50} },
          { position: {top: 0,right:52.25}, clip: {x:0,y:50} },
          { position: {top: 0,right:2}, clip: {x:0,y:50} },
          { position: {top: 0,right:-51}, clip: {x:0,y:50} },
          { position: {top: 0,right:-101.75}, clip: {x:0,y:50} },
          { position: {top: 0,right:-155}, clip: {x:0,y:50} }
        ],
        new: [
          { position: {top: 0,right:157.5}, clip: {x:0,y:0} },
          { position: {top: 0,right:103.75}, clip: {x:0,y:0} },
          { position: {top: 0,right:52.25}, clip: {x:0,y:0} },
          { position: {top: 0,right:2}, clip: {x:0,y:0} },
          { position: {top: 0,right:-51}, clip: {x:0,y:0} },
          { position: {top: 0,right:-101.75}, clip: {x:0,y:0} },
          { position: {top: 0,right:-155}, clip: {x:0,y:0} }
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
      transition: 'margin 2s, clip 3s',
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
    setTimeout(this.timerAddPeople, ((parseInt((now-old)/1000%30))*1000));
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
        this.protectionNumbers.now[(this.protectionNumbers.now.length-1)-i].position.top = -90;
        this.protectionNumbers.now[(this.protectionNumbers.now.length-1)-i].clip.x = 75;
        this.protectionNumbers.new[(this.protectionNumbers.new.length-1)-i].position.top = 0;
        this.protectionNumbers.new[(this.protectionNumbers.new.length-1)-i].clip.y = 75;
        this.protectionNumbersMobile.now[(this.protectionNumbersMobile.now.length-1)-i].position.top = -65;
        this.protectionNumbersMobile.now[(this.protectionNumbersMobile.now.length-1)-i].clip.x = 50;
        this.protectionNumbersMobile.new[(this.protectionNumbersMobile.new.length-1)-i].position.top = 0;
        this.protectionNumbersMobile.new[(this.protectionNumbersMobile.new.length-1)-i].clip.y = 50;
      }
      setTimeout(()=>{
        this.transition = 'all 0s ease 0s';
      },100);
      setTimeout(()=>{
        this.numPeopleOriginal += 1;
        this.addPeople();
        for (let i = 0; i < numChanged; i++) {
          this.protectionNumbers.now[(this.protectionNumbers.now.length-1)-i].position.top = 0;
          this.protectionNumbers.now[(this.protectionNumbers.now.length-1)-i].clip.x = 0;
          this.protectionNumbers.new[(this.protectionNumbers.new.length-1)-i].position.top = 91;
          this.protectionNumbers.new[(this.protectionNumbers.new.length-1)-i].clip.y = 0;
          this.protectionNumbersMobile.now[(this.protectionNumbersMobile.now.length-1)-i].position.top = 0;
          this.protectionNumbersMobile.now[(this.protectionNumbersMobile.now.length-1)-i].clip.x = 0;
          this.protectionNumbersMobile.new[(this.protectionNumbersMobile.new.length-1)-i].position.top = 66;
          this.protectionNumbersMobile.new[(this.protectionNumbersMobile.new.length-1)-i].clip.y = 0;
          setTimeout(()=>{
            this.transition = 'margin 2s, clip 3s';
          },100);
        }
      },4000);
    }
  },
}
</script>

<style>
@import url('/css/desktop4.css');
@import url('/css/mobile/desktop4.css');
</style>
