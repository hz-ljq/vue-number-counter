<template>
<div class="vue-number-counter-wrapper">

  <div class="split-number" :style="{transition: `transform ${option.duration}ms`}" v-for="(item, index) in splitNumberArr" :key="index">
    <div class="number-unit" :class="{'active-number': item==subItem}" :style="{width: `${option.numberWidth}px`}" v-for="(subItem, subIndex) in range" :key="subIndex">
      {{subItem}}
    </div>
  </div>

</div>
</template>

<script>
import './VueNumberCounter.scss'

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
          duration: 3000, // 字符滚动的过渡时间；
          numberWidth: 16 // 每个字符的宽度；
        }
      }
      // validator: (opt) => {
      //   return opt.moveTime >= 0 && opt.restTime >= 0;
      // }
    }
  },
  data() {
    return {
      // €：欧元，£：英镑，$：美元，￥：人民币
      range: ['€', '£', '$', '¥', ',', '+', '-', '.', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0']
    }
  },
  computed: {
    splitNumberArr() {
      return String(this.value).split('');
    }
  },
  methods: {
    play(numberArr) {
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
    splitNumberArr(newVal, oldVal) {
      this.$nextTick(() => {
        this.play(newVal);
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
      this.play(this.splitNumberArr);
    });
  },
  components: {},
  beforeDestroy() {
  }
}
</script>
