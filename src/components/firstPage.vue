<template>
  <div>
    <Banner />
    <Desktop2 />
    <Desktop4 />
    <Desktop5 />
    <Desktop6 />
  </div>
</template>

<script>
import Banner from './Banner';
import Desktop2 from './Desktop2';
import Desktop4 from './Desktop4';
import Desktop5 from './Desktop5';
import Desktop6 from './Desktop6';

export default {
  components: {
    Banner,
    Desktop2,
    Desktop4,
    Desktop5,
    Desktop6,
  },
  mounted() {
    if (localStorage.getItem('logged')) {
      this.$router.push({path: '/notifications'});
    }
  }
}
</script>

