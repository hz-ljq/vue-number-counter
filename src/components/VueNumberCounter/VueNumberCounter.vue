<template>
<div class="vue-number-counter-wrapper">

  <!-- <div class="vue-number-counter-number">{{valueTemp}}</div> -->

  <div class="split-number" :style="{transition: `transform ${option.duration}ms`}" v-for="(item, index) in splitNumberArr" :key="index">
    <div class="number-unit" :class="{'active-number': item==subItem}" v-for="(subItem, subIndex) in range" :key="subIndex">
      {{subItem}}
    </div>
  </div>

  <!-- <div class="vue-number-counter-mask"/> -->

</div>
</template>

<script>
import './VueNumberCounter.scss'
import anime from 'animejs'

export default {
  name: 'VueNumberCounter',
  props: {
    'value': { // 列表数据；
      type: [String, Number],
      // required: true
      default: 0
    },
    'option': {
      type: Object,
      default: () => {
        return {
          duration: 3000,
          letterSpacing: 16
          // moveTime: 1000, // 滚动一个条目高度的过渡时间；
          // needRestTime: false, // 每滚动一个条目，是否需要停顿；如果为false，restTime属性将无效；
          // restTime: 2000, // 每滚动一个条目后的停顿时间(尽量大于100，否则效果不好)，needRestTime为true时，才有效；
          // needHover: false // 当鼠标移入和移出时，是否需要暂停和继续滚动；
        }
      }
      // validator: (opt) => {
      //   return opt.moveTime >= 0 && opt.restTime >= 0;
      // }
    }
  },
  data() {
    return {
      range: ['€', '£', '$', '￥', ',', '+', '-', '.', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0'],
      valueTemp: 0
    }
  },
  computed: {
    splitNumberArr() {
      return String(this.value).split('');
    }
  },
  methods: {
    playOnSimpleMode(value) {
      // this.valueTemp = 0;
      anime({
        targets: this,
        valueTemp: value,
        duration: 2000,
        delay: 0,
        easing: 'easeOutCubic',
        round: true,
        update: () => {
          console.log(this.valueTemp);
        }
      });
    },
    playOnRegularMode(numberArr) {
      console.log(numberArr);
      let splitNumberDoms = document.getElementsByClassName('split-number');
      let numberUnitDoms = document.getElementsByClassName('number-unit');

      numberArr.forEach((item, index) => {
        let indexInRange;
        this.range.forEach((x, i) => {
          if (x === item) {
            indexInRange = i;
          }
        });
        let offset = -indexInRange * numberUnitDoms[0].offsetHeight;
        splitNumberDoms[index].style.transform = `translateY(${offset}px)`;
      });
    }
  },
  watch: {
    value(newVal, oldVal) {
      // this.playOnSimpleMode(newVal);
    },
    splitNumberArr(newVal, oldVal) {
      this.$nextTick(() => {
        this.playOnRegularMode(newVal);
        // let numberUnitDoms = document.getElementsByClassName('number-unit');
        // for (let x of numberUnitDoms) {
        //   x.style.left = `${Math.random() * 200 - 100}px`;
        //   x.style.top = `${Math.random() * 200 - 200}px`;
        //   // x.style.transform = `rotate(${Math.random() * 360}deg)`;
        // }
      });
    }
  },
  created() {
    // // 对没有定义的属性进行默认值赋值；
    // if (!this.option.hasOwnProperty('moveTime') || this.option.moveTime < 0) {
    //   this.option.moveTime = 1000;
    // }
    //
    // if (!this.option.hasOwnProperty('needRestTime')) this.option.needRestTime = false;
    //
    // if (this.option.needRestTime) {
    //   if (!this.option.hasOwnProperty('restTime') || this.option.restTime < 0) {
    //     this.option.restTime = 2000;
    //   }
    // }
    //
    // if (!this.option.hasOwnProperty('needHover')) this.option.needHover = true;
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.splitNumberArr);
      // this.playOnSimpleMode(this.value);
      this.playOnRegularMode(this.splitNumberArr);
    });
  },
  components: {},
  beforeDestroy() {
    clearInterval(this.loopTimer);
  }
}
</script>
