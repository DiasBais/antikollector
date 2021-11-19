<template>
  <div class="myDocuments">
    <div class="myDocuments__document">
      <a :href="documents[0].path" class="myDocuments__document-name">Документ 1</a>
      <div class="myDocuments__document-scan"></div>
      <img alt="Сканы док-ов">
    </div>
    <div class="myDocuments__document">
      <a :href="documents[1].path" class="myDocuments__document-name">Документ 2</a>
      <div class="myDocuments__document-scan"></div>
      <img alt="Сканы док-ов">
    </div>
    <div class="myDocuments__document">
      <a :href="documents[2].path" class="myDocuments__document-name">Документ 3</a>
      <div class="myDocuments__document-scan"></div>
      <img alt="Сканы док-ов">
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
      documents: []
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
    if (!this.token || !localStorage.getItem('logged')) {
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
              console.log(response.data);
              this.documents.push({path: response.data.doc1});
              this.documents.push({path: response.data.doc2});
              this.documents.push({path: response.data.doc3});
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
        if (this.$refs.infoBlockAlert.clientHeight >= window.innerHeight) {
          this.blockAlertMarginTop = (this.$refs.infoBlockAlert.clientHeight - window.innerHeight);
        }
      }
    },
  }
}
</script>

<style>
@import '/css/mydocuments.css'
</style>

