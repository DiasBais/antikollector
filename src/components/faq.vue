<template>
  <div>
    {{ lang }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  state () {
    return {
      lang: ['sdvsd']
    }
  },
  computed: {
    ...mapGetters({
      lang: 'getLang',
    })
  },
  methods: {
    // getLang() {
    //   mapGetters(['getLang']);
    // },
    addLang() {
      // this.$store.commit('SET_LANG', 'sgafedsgsdf');
    },
  },
}
</script>

