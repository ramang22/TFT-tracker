import Vue from 'vue'
import Router from 'vue-router'
import findSummoner from '@/components/FindSummoner'
import summonerDetail from '@/components/summonerDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'findSummoner',
      component: findSummoner
    },
    {
      path: '/test',
      name: 'summonerDetail',
      component: summonerDetail
    }
  ]
})
