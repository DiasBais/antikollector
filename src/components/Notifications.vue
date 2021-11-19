<template>
  <div class="Notifications">
    <div class="Notifications__content">
      <div class="Notifications__title">Состояние дела:</div>
      <div class="Notifications__body">
        <div :class="'Notifications__item '+ ((index===0)?'Notifications__item-current':'')" v-for="(request,index) in requests" :key="'N'+index">
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
  created () {
    window.addEventListener('load', () => {
      this.mobileVersion();
    })
    window.addEventListener('resize', this.mobileVersion);
  },
  mounted() {
    this.token = localStorage.getItem('token');
    if (!this.token && !localStorage.getItem('logged')) {
      localStorage.setItem('token', '');
      localStorage.setItem('logged', '');
      this.$router.push({path: '/'});
    }
    this.getPush();
  },
  methods: {
    async getPush() {
      await axios.post('https://crediter.kz/api/getPush', {
        'token': this.token,
      })
          .then(async response => {
            if (response.data.success) {
              console.log(response.data.data);
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
    mobileVersion() {
      if (window.innerWidth < 1160) {
        this.asd = '';
      }
      else {
        this.asd = '';
      }
    },
  }
}
</script>

<style>
@import '/css/notifications.css'
</style>

