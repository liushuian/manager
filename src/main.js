import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//导入路由
import router from './lib/router'

//导入饿了么Ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
 
//导入axios抽取的插件
import http from './lib/http'
Vue.use(http);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
