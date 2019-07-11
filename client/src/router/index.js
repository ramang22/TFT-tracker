import Vue from 'vue'
import Router from 'vue-router'
import findSummoner from '@/components/FindSummoner'
import DPSstats from '@/components/DPSstats'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'findSummoner',
      component: findSummoner
    },
    {
        path: '/DPSstats',
        name: 'DPSstats',
        component: DPSstats
      }
  ]
})
