<template>
  <div class="desktop6">
    <div class="desktop6__content">
      <div class="desktop6__title">Отзывы</div>
      <div class="desktop6__commentaries"
           :style="'cursor: '+commentariesMouseDown.cursor+'; margin: '+(commentariesSliderMargin.top+' '+commentariesSliderMargin.left+' '+commentariesSliderMargin.bottom+' '+' '+commentariesSliderMargin.right+'px')"
           @mousemove="commentariesSliderMouseMotionMove($event)"
           @mouseleave="commentariesSliderMouseMotionLeave()"
           @mousedown="commentariesSliderMouseDown($event)"
           @mouseup="commentariesSliderMouseUp()"
           ref="infoCommentaries"
      >
        <div class="desktop6__commentary" v-for="(commentary, index) in commentaries" :key="'I'+index">
          <div class="desktop6__commentary-author-image">
            <img :src="commentary.image">
          </div>
          <div class="desktop6__commentary-author">
            <div class="desktop6__commentary-author-name">{{ commentary.name }}</div>
            <div class="desktop6__commentary-author-city">{{ commentary.city }}</div>
            <div class="desktop6__commentary-author-description">{{ commentary.description }}</div>
          </div>
        </div>
      </div>
      <div class="desktop6__commentaries-movement">
        <img class="desktop6__commentaries-movement-btn" v-for="(commentary, index) in commentaries" :key="'J'+index" src="/images/comment/radio.svg" v-on:click="clickCommentaryBtn(index)">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      commentaries: [
        {
          name: 'Жансая',
          city: 'г. Байконур',
          description: 'На меня мошенники оформили кредит в мфо. Об этом я узнала, когда ко мне пришли из суда с сообщением, что нужно вернуть долг. Моя кредитная история испортилась. Друзья посоветовали обратиться в антиколлектор, сказали помогут. Антиколлектор действительно помог, кредитную историю кстати очистили)).',
          image: '/images/comment/author-comment-1.svg',
        },
        {
          name: 'Ирина',
          city: 'г. Семипалатинск',
          description: 'Антиколлектор спасибо за помощь!!!! Я взяла кредит но не смогла расплатиться. Начали звонить коллекторы, в том числи и моим родственникам!!!! Со мной перестали общаться  а потом начали поступать угрозы. Терять было уже нечего поэтому решила обратиться в антиколлетор. Мою проблему быстро решили, а долг простили!)))',
          image: '/images/comment/author-comment-2.svg',
        },
        {
          name: 'Бекзат',
          city: 'г. Шымкент',
          description: 'Я взял кредит но сначал сказал что процент маленький будет смогу оплатить но когда нужно было платить не смог. Процент большой был. Больше чем обещали. За мной ходили люди говорили вернуть деньги даже страшно спать было. Потом антиколектор увидел в интернете решил обратиться. В итоге на тех людей как понял подали далобу в нацбанк а от меня отстали и я вернул только то что взял. Наконец могу свободно по городу ходить. Будто новая жизнь началась. Антиколектор конкретно помог! Обращайтесь не пожалаете',
          image: '/images/comment/author-comment-3.svg',
        },
      ],
      commentariesMouseDown: { pressed: 0, lastPosRight: 0, cursor: 'grab' },
      commentariesMouseMotion: 0,
      commentariesSliderMargin: { top: 'auto', left: 'auto', bottom: 'auto', right: 0 },
      commentariesOldSliderMargin: { top: 'auto', left: 'auto', bottom: 'auto', right: 0 },
      commentariesMobileNavBgLeft: '0px',
      commentariesMobileNavRight: '0px',
      widthCommentaries: 0,
    }
  },
  created () {
    this.commentariesMobileVersion();
    window.addEventListener('resize', this.commentariesMobileVersion);
  },
  mounted () {
    // this.commentariesSliderMargin.right = -(this.$refs.infoCommentaries.clientWidth/1.5);
    // this.commentariesOldSliderMargin.right = -(this.$refs.infoCommentaries.clientWidth/1.5);
  },
  methods: {
    clickCommentaryBtn(index) {
      console.log(index);
      // let CSMR = 0;
      // if (index == 0) CSMR = 115;
      // else if (index == 1) CSMR = -((this.commentariesSliderMargin.right+this.$refs.infoCommentaries.clientWidth)/1.5);
      // else CSMR = -2115;
      // this.commentariesSliderMargin = { top: 'auto', left: 'auto', bottom: 'auto', right: CSMR };
      // this.commentariesOldSliderMargin = this.commentariesSliderMargin;
    },
    commentariesMobileVersion() {
      if (window.innerWidth < 1160) {
        this.asd = '';
      }
      else {
        this.asd = '';
      }
    },
    commentariesSliderMouseDown(event) {
      this.commentariesMouseDown.pressed = 1;
      this.commentariesMouseDown.cursor = 'grabbing';
      this.commentariesMouseDown.lastPosRight = (event.clientX);
    },
    commentariesSliderMouseUp() {
      if (this.commentariesMouseDown.pressed === 1) {
        this.commentariesMouseDown.cursor = 'grab';
        this.commentariesOldSliderMargin = this.commentariesSliderMargin;
        this.commentariesMouseDown.pressed = 0;
      }
    },
    commentariesSliderMouseMotionMove(event) {
      if (this.commentariesMouseDown.pressed) {
        let lastPosRight = this.commentariesMouseDown.lastPosRight;
        let posX = event.clientX;
        let newValue = (this.commentariesOldSliderMargin.right + posX - lastPosRight);
        if (newValue > 1700) newValue = 1700;
        else if (newValue < -2115) newValue = -2115;
        this.commentariesSliderMargin = { top: 'auto', left: 'auto', bottom: 'auto', right: newValue };
      }
    },
    commentariesSliderMouseMotionLeave() {
      if (this.commentariesMouseDown.pressed === 1) {
        this.commentariesMouseDown.cursor = 'grab';
        this.commentariesOldSliderMargin = this.commentariesSliderMargin;
        this.commentariesMouseDown.pressed = 0;
      }
    },
  },
}
</script>

<style>
@import url('/css/desktop6.css');
@import url('/css/mobile/desktop6.css');
</style>
