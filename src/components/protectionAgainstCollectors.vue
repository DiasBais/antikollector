<template>
  <div class="protectionAgainstCollectors">
    <div class="protectionAgainstCollectors__content">
      <div class="antiCollector__body-looper">
        <div class="antiCollector__body-looper-content">
          <img class="antiCollector__body-looper-image" src="/images/loopers/looper-protection-gainst-collectors.svg">
        </div>
      </div>
      <div class="protectionAgainstCollectors__title">Как мы защищаем от Коллекторов, ЧСИ, МФО?</div>
      <div class="protectionAgainstCollectors__body-decision-title">У НАС ЕСТЬ РЕШЕНИЕ!</div>
      <router-link to="step-1" class="protectionAgainstCollectors__btn-price">
        <button type="button">{{ price }}</button>
      </router-link>
      <div class="protectionAgainstCollectors__stages">
        <div class="protectionAgainstCollectors__stages-views">
          <div class="protectionAgainstCollectors__stage-view">
            <div class="protectionAgainstCollectors__stage-couple" v-for="(stage, index) in stages" :key="'E'+index">
              <div class="protectionAgainstCollectors__stage-left">
                <div class="protectionAgainstCollectors__stage-icon">{{ stage[0].num }}</div>
                <div class="protectionAgainstCollectors__stage-description">{{ stage[0].description }}</div>
                <img v-if="index !== (stages.length-1) && (index !== (stages.length-1) + stages.length !== 13) || stages.length === 2" class="protectionAgainstCollectors__stage-line protectionAgainstCollectors__stage-line-left" :src="lines.left">
              </div>
              <div class="protectionAgainstCollectors__stage-right" v-if="index !== (stages.length-1) && (index !== (stages.length-1) + stages.length !== 13) || stages.length === 2">
                <div class="protectionAgainstCollectors__stage-icon">{{ stage[1].num }}</div>
                <div class="protectionAgainstCollectors__stage-description">{{ stage[1].description }}</div>
                <img v-if="index !== (stages.length-1)" class="protectionAgainstCollectors__stage-line protectionAgainstCollectors__stage-line-right" :src="lines.right">
              </div>
            </div>
            <div class="antiCollector__body-looper">
              <div class="antiCollector__body-looper-content">
                <img class="antiCollector__body-looper-image"
                     :src="'/images/loopers/looper-protection-gainst-collectors-'+(!(hideBtnContinue)?'2':'3')+'.svg'"
                     :style="!(hideBtnContinue)?'margin-top:-375px':'margin-top:-450px'"
                >
              </div>
            </div>
          </div>
          <div class="protectionAgainstCollectors__stage-list-progress" :style="'margin: '+(hideBtnContinue ? marginListProgress : 0)+'px 0px'">
            <div class="protectionAgainstCollectors__stage-progress" v-for="(progress, index) in listProgress" :key="'F'+index">
              <img class="protectionAgainstCollectors__stage-progress-image" src="/images/success.svg">
              <span class="protectionAgainstCollectors__stage-progress-description">{{ progress.description }}</span>
            </div>
          </div>

        </div>
        <div class="protectionAgainstCollectors__stages-continue" v-if="!hideBtnContinue">
          <button type="button" @click="disHideStages">Далее</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      price: 'БЕСПЛАТНО',
      lines: {
        left: '/images/stages-line-left.svg',
        right: '/images/stages-line-right.svg'
      },
      marginListProgress: 200,
      stages: [
        [
          { num: 1, description: 'Вы оставляете заявку (анкету) на нашем сайте' },
          { num: 2, description: 'Мы ознакамливаемся с Вашей проблемой' },
        ],
        [
          { num: 3, description: 'Мы связываемся  с коллекторами и указывам им на незаконность их действий' },
          { num: 4, description: 'Мы связываемся  с МФО  и пытаемся урегулировать конфликт' },
        ],
      ],
      hideStages: [
        [
          { num: 5, description: 'мы связываемся с ЧСИ  и ведем переговоры о снятии арестов со счетов , удержании  с ЗП, о снятии ограничений на выезд' },
          { num: 6, description: 'Мы жалуемся на действие коллекторов  в НацБанк' },
        ],
        [
          { num: 7, description: 'НацБанк принимает меры  и отнимает лицензию у  неродивых коллекторов' },
          { num: 8, description: 'Мы связываемся  с МФО  и пытаемся урегулировать конфликт' },
        ],
        [
          { num: 9, description: 'НацБанк принимает меры  и сначала штрафуют МФО, а  потом отбирают лицензию' },
          { num: 10, description: 'Мы жалуемся  в Органы Юстиции на действия ЧСИ ' },
        ],
        [
          { num: 11, description: 'у ЧСИ отбирают лицензию' },
          { num: 12, description: 'Мы отменяем Нотариальную надпись' },
        ],
        [
          { num: 13, description: 'Мы жалуемся  в нотариальную палату на незаконные действия нотариуса' },
        ],
      ],
      listProgress: [],
      hideListProgress: [
        { description: 'У  нотариуса отбирают лицензию' },
        { description: 'Мы приходим   к согласию  с МФО, ЧСИ' },
        { description: 'Кредитная история клиента чиста' },
        { description: 'Задолженность улажена' },
        { description: 'Мы наказали нарушающих закон ЧСИ, Коллектора, МФО, Нотариуса' },
      ],
      hideBtnContinue: false,
    }
  },
  created () {
    this.protectionAgainstCollectorsMobileVersion();
    window.addEventListener('resize', this.protectionAgainstCollectorsMobileVersion);
  },
  methods: {
    protectionAgainstCollectorsMobileVersion() {
      if (window.innerWidth < 1160) {
        this.onScreenResize({
          progress: 40,
          free: 'Бесплатно',
          pay: 'Платно',
          linesLeft: '/images/stages-mobile-line.svg',
          linesRight: '/images/stages-mobile-line.svg',
        });
      }
      else if (window.innerWidth > 1439) {
        this.onScreenResize({
          progress: 200,
          free: 'БЕСПЛАТНО',
          pay: 'ПЛАТНО',
          linesLeft: '/images/stages-big-line.svg',
          linesRight: '/images/stages-big-line.svg',
        });
      }
      else {
        this.onScreenResize({
          progress: 200,
          free: 'БЕСПЛАТНО',
          pay: 'ПЛАТНО',
          linesLeft: '/images/stages-line-left.svg',
          linesRight: '/images/stages-line-right.svg',
        });
      }
    },
    onScreenResize (list) {
      this.marginListProgress = list.progress;
      if (!this.hideBtnContinue) {
        this.price = list.free;
      }
      else {
        this.price = list.pay;
      }
      this.lines = { left: list.linesLeft, right: list.linesRight };
    },
    disHideStages() {
      this.hideBtnContinue = true;
      this.listProgress = [...this.listProgress, ...this.hideListProgress];
      this.stages = [...this.stages, ...this.hideStages];
      this.mobileVersion();
    }
  }
}
</script>

<style>
@import url('/css/protectionAgainstCollectors.css');
@import url('/css/mobile/protectionAgainstCollectors.css');
</style>
