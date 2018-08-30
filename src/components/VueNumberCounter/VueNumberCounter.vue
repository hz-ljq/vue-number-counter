<template>
<div class="vue-number-counter-wrapper">

  <div class="split-number" :style="{transition: `transform ${option.duration}ms`}" v-for="(item, index) in splitCharacterArr" :key="index">
    <div class="number-unit" :class="{'active-number': item==subItem}" :style="{width: `${option.characterWidth}px`}" v-for="(subItem, subIndex) in characterMap" :key="subIndex">
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
    'value': { // 需要执行翻牌动画的字符串或者数字；
      type: [String, Number],
      // required: true
      default: '0'
    },
    'option': {
      type: Object,
      default: () => {
        console.log('props');
        return {
          duration: 2000, // 字符或数字滚动的动画过渡时间；
          characterWidth: 16, // 每个字符所占的宽度；
          addCharacter: [], // 向默认的字符表里追加新的字符，必须是单字符数组，比如：['♪', '∮']；
          replaceCharacterMap: [], // 替换默认的字符表；
          decimals: 2, // 四舍五入小数位数（只在:value参数是Number类型时，才有效）；
          thousandsSeparatorFlag: false // 是否需要添加千位分隔符（只在:value参数是Number类型时，才有效）；
        }
      }
    }
  },
  data() {
    return {
      // 默认字符表；
      characterMap: [',', '+', '-', '.', '9', '8', '7', '6', '5', '4', '3', '2', '1', '0']
    }
  },
  computed: {

    // 分割传入的字符串；
    splitCharacterArr() {
      let val = this.value;

      // 只在:value参数是Number类型时，才进行【四舍五入】和【千位分隔符】的处理；
      if (typeof val === 'number') {
        if (this.option.decimals >= 0) {
          val = val.toFixed(this.option.decimals); // 四舍五入小数位数；
        }
        if (this.option.thousandsSeparatorFlag) {
          val = this.addThousandsSeparator(val); // 添加千位分隔符；
        }
      }

      return String(val).split('');
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
        let indexInCharacterMap = -1;
        this.characterMap.forEach((x, i) => {
          if (x === item) {
            indexInCharacterMap = i;
          }
        });
        if (indexInCharacterMap === -1) { // 该字符不存在的情况；
          console.warn(`There's no Character[${item}], please use :option.addCharacter to add!!`);
        } else {
          let offset = -indexInCharacterMap * numberUnitDoms[0].offsetHeight;
          splitNumberDoms[index].style.transform = `translateY(${offset}px)`;
        }
      });
    },

    // 对没有定义的option属性进行默认值赋值；
    optionValidateAndSetDefaultValue() {
      if (!this.option.hasOwnProperty('duration') || this.option.duration < 0) {
        this.option.duration = 2000;
      }
      if (!this.option.hasOwnProperty('characterWidth') || this.option.characterWidth < 0) {
        this.option.characterWidth = 16;
      }
      if (!this.option.hasOwnProperty('addCharacter')) {
        this.option.addCharacter = [];
      }
      if (!this.option.hasOwnProperty('replaceCharacterMap')) {
        this.option.replaceCharacterMap = [];
      }
      if (!this.option.hasOwnProperty('decimals')) {
        this.option.decimals = 2;
      }
      if (!this.option.hasOwnProperty('thousandsSeparatorFlag')) {
        this.option.thousandsSeparatorFlag = false;
      }

      // 扩充字符表（利用Set的元素唯一性进行去重处理）；
      if (this.option.addCharacter.length) this.characterMap = Array.from(new Set([...this.option.addCharacter, ...this.characterMap]));

      // 替换字符表（利用Set的元素唯一性进行去重处理）；
      if (this.option.replaceCharacterMap.length) this.characterMap = Array.from(new Set(this.option.replaceCharacterMap));
    },

    // 添加千位分隔符；
    addThousandsSeparator(strNum) {
      if (strNum.length <= 3) {
        return strNum;
      }
      if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
        return strNum;
      }
      let a = RegExp.$1;
      let b = RegExp.$2;
      let c = RegExp.$3;
      let re = new RegExp();
      re.compile('(\\d)(\\d{3})(,|$)');
      while (re.test(b)) {
        b = b.replace(re, '$1,$2$3');
      }
      return a + b + c;
    }
  },
  watch: {

    // 生命周期顺序为：beforeCreate -> props -> watch -> computed -> created，
    // 因此，对option属性的验证和赋初值放在watch里进行，这能保证computed里对option的依赖是正确的
    option: {
      handler(newVal, oldVal) {
        console.log('watch');
        this.optionValidateAndSetDefaultValue(); // 对没有定义的option属性进行默认值赋值；
      },
      deep: true,
      immediate: true // 该配置项必须为true，不然进入computed之前，option属性的值还没来得及验证和赋初值；
    },

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
  beforeCreate() {
    // console.log('beforeCreate');
  },
  created() {
    // console.log('created');
  },
  mounted() {
    this.$nextTick(() => {
      this.play(this.splitCharacterArr);
    });
  },
  components: {},
  beforeDestroy() {}
}
</script>
