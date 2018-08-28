import VueNumberCounter from './VueNumberCounter.vue'
const marquee = {
  install(Vue) {
    Vue.component(VueNumberCounter.name, VueNumberCounter)
  }
}

// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(marquee)
}

// 导出模块
export default marquee;
export { VueNumberCounter };
