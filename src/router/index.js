import Vue from 'vue'
import Router from 'vue-router'
import nftList from '@/components/nftList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'nftList',
      component: nftList
    }
  ]
})
