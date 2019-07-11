import Vue from 'vue'
import Router from 'vue-router'
import findSummoner from '@/components/FindSummoner'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'findSummoner',
      component: findSummoner
    }
  ]
})
