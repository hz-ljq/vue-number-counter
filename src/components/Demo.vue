<template>
<div id="demo">

  <div class='my-wrapper'>
    <div class='my-title'>My Number: </div>
    <!-- <vue-number-counter class='my-number' :value='myNumber' :option='myOption' /> -->
    <vue-number-counter class='my-number' :value="'♪1,273.89'" :option='myOption' />
  </div>

</div>
</template>

<script>
import './Demo.scss'

export default {
  name: 'Demo',
  data() {
    return {
      myNumber: 0,
      myOption: {
        duration: 2000,
        characterWidth: 18
        // addCharacters: ['♪', '♪']
      },

      timer: -1
    }
  },
  methods: {
    getNumber() {
      // this.myNumber = +(Math.random() * 100000).toFixed(0);
      let sign = Math.random() - 0.5 > 0 ? '+' : '-';
      this.myNumber = sign + (Math.random() * 50000).toFixed(2);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getNumber();

      this.timer = setInterval(() => {
        this.getNumber();
      }, 6000);
    });
  },
  components: {

  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
}
</script>
