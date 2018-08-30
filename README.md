# vue-number-counter

> 基于vue2的数字滚动（翻牌）插件
```
特点1：传给插件的value类型，支持String和Number类型；
特点2：当传给插件的value是Number类型时，支持千位分隔符格式（用于金额、标价等），支持自定义小数位数；
特点3：支持自定义字符表，支持每个字符在激活状态下的样式控制；
```

### NPM
```
npm install vue-number-counter --save
```

### Mount
- mount with global
```js
import Vue from 'vue'
// require styles
import 'vue-number-counter/dist/vue-number-counter.css'
import VueNumberCounter from 'vue-number-counter'
Vue.use(VueNumberCounter)
```

- mount with component
```js
// require styles
import 'vue-number-counter/dist/vue-number-counter.css'
import { VueNumberCounter } from 'vue-number-counter'
export default {
  components: {
    VueNumberCounter
  }
}
```

### Usage
```js
<div class='my-wrapper'>
  <div class='my-title'>My Number: </div>

  <vue-number-counter class='my-number' :value="17842.7129" :option='myOption' />

</div>
```

### Demo演示:
![avatar](https://github.com/hz-ljq/vue-number-counter/blob/master/src/assets/images/demo.gif)

### Demo参考:
<https://github.com/hz-ljq/vue-number-counter/blob/master/src/components/Demo.vue>

### Props
| Name | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| :value | String/Number | "0" | <font size=2>要进行动画效果的数字或者字符串 |
| :option | Object | duration: 2000,<br/>characterWidth: 16,<br/>addCharacter: [],<br/>replaceCharacterMap: [],<br/>decimals: 2,<br/>thousandsSeparatorFlag: false | <font size=2>配置项 |

### :option（Detail explanation）
| Name | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| duration | Number | <font size=1>2000（单位：ms） | <font size=1>字符或数字滚动的动画过渡时间； |
| characterWidth | Number | <font size=1>16（单位：px）| <font size=1>每个字符所占的宽度； |
| addCharacter | Array | <font size=1>[] | <font size=1>向默认的字符表里追加新的字符，必须是单字符数组，比如：['♪', '∮']； |
| replaceCharacterMap | Array | <font size=1>[] | <font size=1>替换默认的字符表；|
| decimals | Number | <font size=1>2 | <font size=1>四舍五入小数位数（只在:value参数是Number类型时，才有效）；|
| thousandsSeparatorFlag | Boolean | <font size=1>false | <font size=1>是否需要添加千位分隔符（只在:value参数是Number类型时，才有效）；|

- - -

### addCharacter属性和replaceCharacterMap属性，区别：
默认的字符表：[",", "+", "-", ".", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0"]；
- addCharacter：在默认的字符表基础上新增字符；
- replaceCharacterMap：用新的字符表，替换默认的字符表；
- 区别：后者可以控制字符表内字符的顺序；

### 通过.active-number类名，可以控制每个字符在激活状态下的样式，比如：
```css
.active-number {
  color: white;
  text-shadow: 1px 1px red,2px 2px red;
}
```
效果如下：
![avatar](https://github.com/hz-ljq/vue-number-counter/blob/master/src/assets/images/demo1.png)
