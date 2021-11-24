<template>
  <div>
    <Banner />
    <protectionAgainstCollectors />
    <ourAdvantages />
    <stock />
    <reviews />
    <aboutCompany />
  </div>
</template>

<script>
import Banner from './Banner';
import protectionAgainstCollectors from './protectionAgainstCollectors';
import ourAdvantages from './ourAdvantages';
import stock from './stock';
import reviews from './reviews';
import aboutCompany from './aboutCompany';

export default {
  components: {
    Banner,
    protectionAgainstCollectors,
    ourAdvantages,
    stock,
    reviews,
    aboutCompany,
  },
  mounted() {
    if (localStorage.getItem('logged')) {
      this.$router.push({path: '/notifications'});
    }
  }
}
</script>

