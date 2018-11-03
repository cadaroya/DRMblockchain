import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Signup from '@/components/Signup'
import ViewAccount from '@/components/ViewAccount'
import RegisterProduct from '@/components/RegisterProduct'
import SignIn from '@/components/SignIn'
import ViewLicenses from '@/components/ViewLicenses'
import ViewProducts from '@/components/Products'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/account',
      name: 'viewAccount',
      component: ViewAccount
    },
    {
      path: '/registerProduct',
      name: 'registerProduct',
      component: RegisterProduct
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/licenses',
      name: 'viewLicenses',
      component: ViewLicenses
    },
    {
      path: '/products',
      name: 'viewProducts',
      component: ViewProducts
    }
  ]
})
