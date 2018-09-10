import Vue from 'vue'
import Router from 'vue-router'
import AuthGuard from './auth-guard'
import AuthBase from '@/components/auth/Base'
import SignUpEmailPassword from '@/components/auth/SignUpEmailPassword'
import SignInEmailPassword from '@/components/auth/SignInEmailPassword'
import SignInEmail from '@/components/auth/SignInEmail'
import SignUpPhone from '@/components/auth/SignUpPhone'
// import SignUpPersonal from '@/components/auth/SignUpPersonal'
// import SetPassword from '@/components/auth/SetPassword'
// import ConfirmCode from '@/components/auth/ConfirmCode'
import App from '@/components/App'
import AccountFeed from '@/components/account/Feed'
import AccountToolbar from '@/components/account/Toolbar'
import AccountPublicProfile from '@/components/account/PublicProfile'
import MapToolbar from '@/components/map/Toolbar'
import MapBase from '@/components/map/Base'
import Map from '@/components/map/View'
import MapFeed from '@/components/map/Feed'
import MapAbout from '@/components/map/About'
import MapParticipants from '@/components/map/Participants'
import MapConsole from '@/components/map/Console'
import CreateMapFab from '@/components/maps/CreateMapFab'
import MapsList from '@/components/maps/List'
import MapsToolbar from '@/components/maps/Toolbar'
import LandingPage from '@/components/LandingPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/marketing',
      component: LandingPage
    },
    {
      path: '/auth',
      component: AuthBase,
      children: [
        // {
        //   path: '/auth/personal',
        //   name: 'SignUpPersonal',
        //   component: SignUpPersonal
        // },
        // {
        //   path: '/auth/confirm',
        //   name: 'ConfirmCode',
        //   component: ConfirmCode
        // },
        // {
        //   path: '/auth/password',
        //   name: 'SetPassword',
        //   component: SetPassword
        // },
        {
          path: '/auth/signup/phone',
          name: 'SignUpPhone',
          component: SignUpPhone
        },
        {
          path: '/auth/signup',
          name: 'SignUpEmailPassword',
          component: SignUpEmailPassword
        },
        {
          path: '/auth/signin',
          name: 'SignInEmailPassword',
          component: SignInEmailPassword
        },
        {
          path: '/auth/signin/email',
          name: 'SignUpEmail',
          component: SignInEmail,
          props: true
        }
      ]
    },
    {
      path: '/',
      component: App,
      beforeEnter: AuthGuard,
      children: [
        {
          path: '',
          name: 'Home',
          redirect: '/feed'
        },
        {
          path: '/feed',
          name: 'Feed',
          component: AccountFeed
        },
        {
          path: '/search',
          name: 'Search',
          components: {
            default: MapsList,
            toolbar: MapsToolbar,
            fab: CreateMapFab
          }
        },
        {
          path: '/maps/:mapId',
          props: { default: true, toolbar: true },
          components: {
            default: MapBase,
            toolbar: MapToolbar
          },
          children: [
            {
              path: '',
              name: 'MapView',
              component: Map
            },
            {
              path: 'about',
              name: 'MapAbout',
              component: MapAbout
            },
            {
              path: 'feed',
              name: 'MapFeed',
              component: MapFeed
            },
            {
              path: 'participants',
              name: 'MapParticipants',
              component: MapParticipants
            },
            {
              path: 'console',
              name: 'MapConsole',
              component: MapConsole
            }
          ]
        },
        {
          path: '/:userId',
          name: 'User',
          components: {
            default: AccountPublicProfile,
            toolbar: AccountToolbar
          },
          props: { default: true, toolbar: true }
        }
      ]
    }
  ]
})
