import VueNumberCounter from './VueNumberCounter.vue'
const numberCounter = {
  install(Vue) {
    Vue.component(VueNumberCounter.name, VueNumberCounter)
  }
}

// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(numberCounter)
}

// 导出模块
export default numberCounter;
export { VueNumberCounter };
