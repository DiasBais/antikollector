<template>
  <div class="Notifications">
    <div class="Notifications__content">
      <div class="antiCollector__body-looper">
        <div class="antiCollector__body-looper-content">
          <img class="antiCollector__body-looper-image" src="/images/loopers/looper-notifications.svg">
        </div>
      </div>
      <div class="antiCollector__body-looper-mobile">
        <img class="antiCollector__body-looper-image-mobile" src="/images/loopers/looper-notifications-mobile.svg">
      </div>
      <div class="Notifications__title">Состояние дела:</div>
      <div class="Notifications__body">
        <div :class="'Notifications__item '+ ((index===0)?'Notifications__item-current':'Notifications__item-default')" v-for="(request,index) in requests" :key="'N'+index">
          <div :class="'Notifications__condition '+ (!request.condition?'Notifications__condition-agree':'Notifications__condition-onProgress')"></div>
          <span class="Notifications__direction">{{ request.direction }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  data () {
    return {
      numRequests: 0,
      requests: [],
      iin: '',
      token: '',
      error: '',
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    if (!this.token && !localStorage.getItem('logged')) {
      localStorage.setItem('token', '');
      this.$store.commit('SET_LOGGED','');
      this.$router.push({path: '/'});
    }
    this.getPush();
    this.$store.commit('SET_FOOTER',true);
  },
  methods: {
    async getPush() {
      await axios.post('https://crediter.kz/api/getPush', {
        'token': this.token,
      })
          .then(async response => {
            if (response.data.success) {
              for (let i = 0; i < response.data.data.length; i++) {
                this.requests.push({
                  direction: response.data.data[i].message,
                  condition: response.data.data[i].status
                });
              }
            }
            else {
              this.error = response.data.message;
            }
          })
          .catch(error => {
            this.error = error;
          });
    },
  }
}
</script>

<style>
@import '/css/notifications.css';
@import '/css/mobile/notifications.css';
</style>

