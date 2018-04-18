import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import flowSales from '@/components/flowSales'
import flowExperience from '@/components/flowExperience'
import flowDetail from '@/components/flowDetail'
import details from '@/components/details'

Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      children:[
        {
          path: '/flowSales',
          component: flowSales
        },
        {
          path: '/flowExperience',
          component: flowExperience
        },
        {
          path:'/',
          redirect:'/flowSales'
        }
      ]
    },{
      path:'/flowDetail',
      component:flowDetail,
      meta:{
        isBack:false
      }
    },{
      path:'/details',
      component:details
    }
  ],
  linkActiveClass:'active'
})
