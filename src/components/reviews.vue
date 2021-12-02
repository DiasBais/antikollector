<template>
  <div class="reviews">
    <div class="reviews__content">
      <div class="antiCollector__body-looper">
        <div class="antiCollector__body-looper-content">
          <img class="antiCollector__body-looper-image" src="/images/loopers/looper-reviews.svg">
        </div>
      </div>
      <div class="reviews__title">Отзывы</div>
      <carousel class="reviews__commentaries" :autoplay="true" :autoplayTimeout="10000" :autoplaySpeed="1000" :nav="false" :items="sliderItemsReviews">
        <div class="reviews__commentary" v-for="(commentary, index) in commentaries" :key="'I'+index">
          <div class="reviews__commentary-content">
            <div class="reviews__commentary-author-image">
              <img :src="commentary.image">
            </div>
            <div class="reviews__commentary-author">
              <div class="reviews__commentary-author-name">{{ commentary.name }}</div>
              <div class="reviews__commentary-author-city">{{ commentary.city }}</div>
              <div class="reviews__commentary-author-description">{{ commentary.description }}</div>
            </div>
          </div>
        </div>
    </carousel>

<!--      <carousel class="reviews__commentaries" :autoplay="true" :autoplayTimeout="10000" :autoplaySpeed="1000" :nav="false" :items="sliderItemsReviews">-->
<!--        <div class="reviews__commentary" v-for="(commentary, index) in commentaries" :key="'I'+index">-->
<!--          <div class="reviews__commentary-content">-->
<!--            <div class="reviews__commentary-author-image">-->
<!--              <img :src="commentary.image">-->
<!--            </div>-->
<!--            <div class="reviews__commentary-author">-->
<!--              <div class="reviews__commentary-author-name">{{ commentary.name }}</div>-->
<!--              <div class="reviews__commentary-author-city">{{ commentary.city }}</div>-->
<!--              <div class="reviews__commentary-author-description">{{ commentary.description }}</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </carousel>-->
      <!--
      <div class="reviews__commentaries"
           :style="'cursor: '+commentariesMouseDown.cursor+'; margin: '+(commentariesSliderMargin.top+' '+commentariesSliderMargin.left+' '+commentariesSliderMargin.bottom+' '+' '+commentariesSliderMargin.right+'px')"
           @mousemove="commentariesSliderMouseMotionMove($event)"
           @mouseleave="commentariesSliderMouseMotionLeave()"
           @mousedown="commentariesSliderMouseDown($event)"
           @mouseup="commentariesSliderMouseUp()"
           ref="infoCommentaries"
      >
        <div class="reviews__commentary" v-for="(commentary, index) in commentaries" :key="'I'+index">
          <div class="reviews__commentary-author-image">
            <img :src="commentary.image">
          </div>
          <div class="reviews__commentary-author">
            <div class="reviews__commentary-author-name">{{ commentary.name }}</div>
            <div class="reviews__commentary-author-city">{{ commentary.city }}</div>
            <div class="reviews__commentary-author-description">{{ commentary.description }}</div>
          </div>
        </div>
      </div>
      <div class="reviews__commentaries-movement">
        <img class="reviews__commentaries-movement-btn" v-for="(commentary, index) in commentaries" :key="'J'+index" src="/images/comment/radio.svg" v-on:click="clickCommentaryBtn(index)">
      </div>
      -->
    </div>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel'

export default {
  components: {
    carousel
  },
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
      sliderItemsReviews: 3,
      mobileVersion: false,
    }
  },
  created () {
    this.commentariesMobileVersion();
    window.addEventListener('resize', this.commentariesMobileVersion);
  },
  methods: {
    commentariesMobileVersion() {
      if (window.innerWidth < 2100) this.sliderItemsReviews = 1;
      else if (window.innerWidth < 2600) this.sliderItemsReviews = 2;
      else this.sliderItemsReviews = 3;
      if (window.innerWidth < 1160) this.mobileVersion = true;
      else this.mobileVersion = false;
    },
  },
}
</script>

<style>
@import url('/css/reviews.css');
@import url('/css/mobile/reviews.css');
</style>
