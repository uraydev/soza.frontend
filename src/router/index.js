import Vue from 'vue'
import Router from 'vue-router'
import Feed from '@/components/Feed'
// import Console from '@/components/Console';
import UserProfile from '@/components/UserProfile'
import UserToolbar from '@/components/toolbars/UserToolbar'
// import UserConsole from '@/components/UserConsole';
// import UserOptions from '@/components/UserOptions';
import UserMenu from '@/components/UserMenu'
// import UserList from '@/components/UserList';
import Map from '@/components/Map'
import MapDescription from '@/components/MapDescription'
import MapToolbar from '@/components/toolbars/MapToolbar'
import MapAbout from '@/components/MapAbout'
import MapParticipants from '@/components/MapParticipants'
// import MapConsole from '@/components/MapConsole';
import MapManage from '@/components/MapManage'
import MapList from '@/components/MapList'
import MapFeed from '@/components/MapFeed'
// import Point from '@/components/Point';
// import PointConsole from '@/components/PointConsole';
// import PointManage from '@/components/PointManage';
// import PointList from '@/components/PointList';
// import User from '@/components/User';
// import Search from '@/components/Search';
// import Blog from '@/components/Blog';
// import BlogPost from '@/components/BlogPost';
// import Page from '@/components/Page';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/feed'
    },
    {
      path: '/feed',
      name: 'Feed',
      component: Feed
    },
    {
      path: '/maps',
      name: 'Maps',
      components: {
        'default': MapList,
        sidebar: UserMenu
      }
    },
    {
      path: '/maps/add',
      name: 'AddMap',
      component: MapManage,
      props: true
    },
    {
      path: '/maps/:id',
      name: 'Map',
      components: {
        'default': Map,
        sidebar: MapDescription,
        toolbar: MapToolbar
      },
      props: { 'default': true, sidebar: true }
    },
    {
      path: '/maps/:id/about',
      name: 'MapAbout',
      component: {
        'default': MapAbout,
        sidebar: MapDescription,
        toolbar: MapToolbar
      },
      props: { 'default': true, sidebar: true }
    },
    {
      path: '/maps/:id/feed',
      name: 'MapFeed',
      component: {
        'default': MapFeed,
        sidebar: MapDescription,
        toolbar: MapToolbar
      },
      props: { 'default': true, sidebar: true }
    },
    {
      path: '/maps/:id/participants',
      name: 'MapParticipants',
      component: MapParticipants,
      props: true
    },
    {
      path: '/:username',
      name: 'User',
      components: {
        'default': UserProfile,
        toolbar: UserToolbar
      },
      props: true
    }
    // {
    //   path: '/console',
    //   component: Console,
    //   children: [
    //     {
    //       path: '',
    //       name: 'UserConsole',
    //       component: UserConsole,
    //     },
    //     {
    //       path: 'manage',
    //       name: 'UserOptions',
    //       component: UserOptions,
    //     },
    //     {
    //       path: 'maps',
    //       name: 'UserMaps',
    //       component: MapList,
    //     },
    //     {
    //       path: 'add_map',
    //       name: 'UserAddMap',
    //       component: MapManage,
    //     },
    //     {
    //       path: 'following',
    //       name: 'UserFollowing',
    //       component: MapList,
    //     },
    //     {
    //       path: 'points',
    //       name: 'UserPoints',
    //       component: PointList,
    //       children: [
    //         {
    //           path: 'manage',
    //           name: 'UserPointsOptions',
    //           component: PointManage,
    //         },
    //       ],
    //     },
    //     /*{
    //       path: ':id',
    //       name: 'UserMap',
    //       component: Map,
    //       children: [
    //         {
    //           path: 'console',
    //           name: 'UserMapConsole',
    //           component: MapConsole,
    //         },
    //         {
    //           path: 'manage',
    //           name: 'UserMapOptions',
    //           component: MapManage,
    //         },
    //         {
    //           path: 'points',
    //           name: 'UserMapPoints',
    //           component: PointList,
    //           children: [
    //             {
    //               path: ':id',
    //               name: 'UserMapPoint',
    //               component: Point,
    //               children: [
    //                 {
    //                   path: 'console',
    //                   name: 'UserMapPointConsole',
    //                   component: PointConsole,
    //                 },
    //               ],
    //             },
    //           ],
    //         },
    //         {
    //           path: 'add_point',
    //           name: 'UserMapAddPoint',
    //           component: PointManage,
    //         },
    //         {
    //           path: 'followers',
    //           name: 'UserMapFollowers',
    //           component: UserList,
    //         },
    //       ],
    //     },*/
    //   ],
    // },
  ]
})
