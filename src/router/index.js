import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/table',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '用户列表',
        component: () => import('@/views/edu/teacher/list'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加用户',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: '添加用户', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: '修改用户',
        component: () => import('@/views/edu/teacher/save'),
        meta: { title: '修改用户', icon: 'tree' },
        hidden:true
      }
    ]
  },

  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: '商品分类管理',
    meta: { title: '商品分类管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '商品分类列表',
        component: () => import('@/views/edu/subject/list'),
        meta: { title: '商品分类列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加商品分类',
        component: () => import('@/views/edu/subject/save'),
        meta: { title: '添加商品分类', icon: 'tree' }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/list',
    name: '商品管理',
    meta: { title: '商品管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '商品列表',
        component: () => import('@/views/edu/goods/list'),
        meta: { title: '商品列表', icon: 'table' }
      },
      {
        path: 'info',
        name: '添加商品',
        component: () => import('@/views/edu/goods/info'),
        meta: { title: '添加商品', icon: 'tree' }
      },
      {
        path: 'info/:id',
        name: '添加商品',
        component: () => import('@/views/edu/goods/info'),
        meta: { title: '添加商品', icon: 'tree' },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: '添加商品',
        component: () => import('@/views/edu/goods/chapter'),
        meta: { title: '添加商品', icon: 'tree' },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: '添加商品',
        component: () => import('@/views/edu/goods/publish'),
        meta: { title: '添加商品', icon: 'tree' },
        hidden: true
      }
    ]
  },
  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'guide',
  //       name: 'guide',
  //       component: () => import('@/views/guide/index'),
  //       meta: { title: 'guide', icon: 'form' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})