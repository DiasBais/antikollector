<template>
  <div class="myDocuments">
    <div class="myDocuments__content">
      <div class="antiCollector__body-looper" style="position: absolute">
        <div class="antiCollector__body-looper-content">
          <img class="antiCollector__body-looper-image" src="/images/loopers/looper-my-documents.svg">
        </div>
      </div>
      <div class="antiCollector__body-looper-mobile">
        <div class="antiCollector__body-looper-content-mobile">
          <img class="antiCollector__body-looper-image-mobile" src="/images/loopers/looper-my-documents-mobile.svg">
        </div>
      </div>
      <div class="myDocuments__document">
        <a :href="document1" class="myDocuments__document-name">Документ 1</a>
        <div class="myDocuments__document-scan">
          <img class="myDocuments__document-image" alt="Сканы док-ов">
        </div>
      </div>
      <div class="myDocuments__document">
        <a :href="document2" class="myDocuments__document-name">Документ 2</a>
        <div class="myDocuments__document-scan">
          <img class="myDocuments__document-image" alt="Сканы док-ов">
        </div>
      </div>
      <div class="myDocuments__document">
        <a :href="document3" class="myDocuments__document-name">Документ 3</a>
        <div class="myDocuments__document-scan">
          <img class="myDocuments__document-image" alt="Сканы док-ов">
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
      token: '',
      error: '',
      document1: '',
      document2: '',
      document3: '',
    }
  },
  mounted() {
    this.token = localStorage.getItem('token');
    if (!this.token && !localStorage.getItem('logged')) {
      localStorage.setItem('token', '');
      this.$store.commit('SET_LOGGED','');
      this.$router.push({path: '/'});
    }
    this.getDocumentLink();
  },
  methods: {
    async getDocumentLink() {
      await axios.post('https://crediter.kz/api/getDocumentLink', {
        'token': this.token,
      })
          .then(response => {
            if (response.data.success) {
              this.document1 = response.data.doc1;
              this.document2 = response.data.doc2;
              this.document3 = response.data.doc3;
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
@import '/css/mydocuments.css';
@import '/css/mobile/mydocuments.css';
</style>

