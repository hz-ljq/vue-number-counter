<template>
<div class="vue-number-counter-wrapper">

  <div class="split-number" :style="{transition: `transform ${option.duration}ms`}" v-for="(item, index) in splitCharacterArr" :key="index">
    <div class="number-unit" :class="{'active-number': item==subItem}" :style="{width: `${option.characterWidth}px`}" v-for="(subItem, subIndex) in range" :key="subIndex">
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
          duration: 2000, // 字符滚动的过渡时间；
          characterWidth: 16, // 每个字符的宽度；
          addCharacters: [] // 必须是单字符数组，比如：['♪', '∮']；
        }
      }
    }
  },
  data() {
    return {
      // 字符表范围，€：欧元，£：英镑，$：美元，￥：人民币
      range: ['€', '£', '$', '¥', ',', '+', '-', '.', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0'] // TODO:给出range自定义配置接口；
    }
  },
  computed: {
    splitCharacterArr() {
      return String(this.value).split('');
    }
  },
  methods: {
    // 执行动画；
    play(characterArr) {
      // console.log(characterArr);
      let splitNumberDoms = document.getElementsByClassName('split-number');
      let numberUnitDoms = document.getElementsByClassName('number-unit');

      // 找出要执行动画的每个字符在字符表中的索引index，然后根据该索引index来得到应该偏移的距离；
      characterArr.forEach((item, index) => {
        let indexInRange = -1;
        this.range.forEach((x, i) => {
          if (x === item) {
            indexInRange = i;
          }
        });
        if (indexInRange === -1) { // 该字符不存在的情况；
          console.warn(`Character [${item}] is not found in :option.addCharacters!!`);
        } else {
          let offset = -indexInRange * numberUnitDoms[0].offsetHeight;
          splitNumberDoms[index].style.transform = `translateY(${offset}px)`;
        }
      });
    }
  },
  watch: {
    splitCharacterArr(newVal, oldVal) {
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
    // 对没有定义的option属性进行默认值赋值；
    if (!this.option.hasOwnProperty('duration') || this.option.duration < 0) {
      this.option.duration = 2000;
    }
    if (!this.option.hasOwnProperty('characterWidth') || this.option.characterWidth < 0) {
      this.option.characterWidth = 16;
    }
    if (!this.option.hasOwnProperty('addCharacters')) {
      this.option.addCharacters = [];
    }

    // 扩充字符表（利用Set的元素唯一性进行去重处理）；
    if (this.option.addCharacters.length) this.range = Array.from(new Set([...this.range, ...this.option.addCharacters])); // TODO:增加替换字符表的对外接口；
  },
  mounted() {
    this.$nextTick(() => {
      // console.log(this.splitCharacterArr);
      this.play(this.splitCharacterArr);
    });
  },
  components: {},
  beforeDestroy() {
  }
}
</script>
