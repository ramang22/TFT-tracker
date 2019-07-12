import Vue from 'vue'
import Router from 'vue-router'
import findSummoner from '@/components/FindSummoner'
import dpsstats from '@/components/Dpsstats'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'findSummoner',
      component: findSummoner
    },
    {
      path: '/dps',
      name: 'dpsstats',
      component: dpsstats
    }
  ]
})
