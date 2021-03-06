import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/goods/Goods'
import Ratings from '@/components/ratings/Ratings'
import Seller from '@/components/seller/Seller'
import foodDetail from '@/components/foodDetail/foodDetail'

Vue.use(Router)

export default new Router({
  // 给router的class取别名
  linkActiveClass: 'el-active',
  mode:'history',
  routes: [
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    },
    {
      path: '/foodDetail',
      name: 'foodDetail',
      component: foodDetail
    },
  ]
})
