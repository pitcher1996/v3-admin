import { type RouteRecordRaw, createRouter, createWebHashHistory, createWebHistory } from "vue-router"

const Layout = () => import("@/layout/index.vue")

/** 常驻路由 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  // 首页
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          svgIcon: "dashboard",
          affix: true,
          keepAlive: true
        }
      }
    ]
  },
  {
    path: "/meterinformation",
    component:Layout,
    name: "meterinformation",
    meta: {
      hidden: true
    },
    children:[
      {
        path: "detail",
        component: () => import("@/views/meterinformation/meterinformation.vue"),
        name: "detail",
        meta: {
          hidden: true,
          title:'详细信息',
          keepAlive:true,
        },
      }
    ]
  },
  // 系统配置
  {
    path: "/price",
    component: Layout,
    redirect: "/price/setprice",
    name: "setprice",
    meta: {
      title: "系统配置",
      elIcon: "Menu",
      alwaysShow: true
    },
    children: [
      {
        path: "unitprice",
        component: () => import("@/views/price/unitprice/unitprice.vue"),
        name: "unitprice",
        meta: {
          title: "单价设置"
        }
      },
      {
        path: "step",
        component: () => import("@/views/price/step/step.vue"),
        name: "step",
        meta: {
          title: "阶梯设置"
        }
      }
    ]
  },
  // 基础信息
  {
    path: "/basicInformation",
    component: Layout,
    redirect: "/basicInformation/setbasic",
    name: "setbasic",
    meta: {
      title: "基础信息",
      elIcon: "Menu",
      alwaysShow: true
    },
    children: [
      {
        path: "unitprice",
        component: () => import("@/views/price/unitprice/unitprice.vue"),
        name: "unitprice",
        meta: {
          title: "基本信息",
          keepAlive:true,
        }
      },
      {
        path: "regiona",
        component: () => import("@/views/base/regiona.vue"),
        name: "regiona",
        meta: {
          title: "区域信息"
        }
      },
      {
        path: "unit",
        component: () => import("@/views/unit/unit.vue"),
        name: "unit",
        meta: {
          // hidden: true,
          title:'小区楼栋信息',
          keepAlive:true,
        },
      },
      {
        path: "build",
        component: () => import("@/views/build/build.vue"),
        name: "build",
        meta: {
          hidden: true,
          title:'户表信息',
          keepAlive:true,
        },
      },
      {
        path: "step",
        component: () => import("@/views/price/step/step.vue"),
        name: "step",
        meta: {
          title: "采集器信息"
        }
      },
      {
        path: "step",
        component: () => import("@/views/price/step/step.vue"),
        name: "step",
        meta: {
          title: "大表信息"
        }
      },
      {
        path: "step",
        component: () => import("@/views/price/step/step.vue"),
        name: "step",
        meta: {
          title: "表阀信息"
        }
      },
      {
        path: "step",
        component: () => import("@/views/price/step/step.vue"),
        name: "step",
        meta: {
          title: "协议信息"
        }
      }
    ]
  },
  // 监控告警
  {
    path: "/monitoringAlarm",
    component: Layout,
    redirect: "/monitoringAlarm/alarm",
    name: "alarm1",
    meta: {
      title: "监控报警",
      elIcon: "Menu",
      alwaysShow: true
    },
    children: [
      {
        path: "timereading2",
        component: () => import("@/views/price/unitprice/unitprice.vue"),
        name: "timereading2",
        meta: {
          title: "实时抄表"
        }
      },
      {
        path: "controlCollector",
        component: () => import("@/views/price/step/step.vue"),
        name: "controlCollector",
        meta: {
          title: "控制采集器"
        }
      },
      {
        path: "faultalarm",
        component: () => import("@/views/faultalarm/faultalarm.vue"),
        name: "faultalarm",
        meta: {
          title: "故障报警"
        }
      }
    ]
  },
  // 报表图形
  {
    path: "/reportGraphics",
    component: Layout,
    redirect: "/reportGraphics/reportforms",
    name: "alarm",
    meta: {
      title: "报表图形",
      elIcon: "Menu",
      alwaysShow: true
    },
    children: [
      {
        path: "bigTabledata",
        component: () => import("@/views/price/unitprice/unitprice.vue"),
        name: "timereading",
        meta: {
          title: "大表数据报表"
        }
      },
      {
        path: "bigTableused",
        component: () => import("@/views/price/step/step.vue"),
        name: "controlCollector",
        meta: {
          title: "小表使用量报表"
        }
      },
      {
        path: "smallTabledata",
        component: () => import("@/views/price/step/step.vue"),
        name: "fault",
        meta: {
          title: "小表数据报表"
        }
      },
      {
        path: "smallTableused",
        component: () => import("@/views/price/step/step.vue"),
        name: "fault",
        meta: {
          title: "小表使用量报表"
        }
      },
      {
        path: "household",
        component: () => import("@/views/price/step/step.vue"),
        name: "fault",
        meta: {
          title: "住户费用报表"
        }
      },
      {
        path: "ladderFees",
        component: () => import("@/views/price/step/step.vue"),
        name: "fault",
        meta: {
          title: "阶梯费用报表"
        }
      }
    ]
  }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/page",
    name: "Permission",
    meta: {
      title: "权限管理",
      svgIcon: "lock",
      roles: ["admin", "editor"], // 可以在根路由中设置角色
      alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/permission/page.vue"),
        name: "PagePermission",
        meta: {
          title: "页面权限",
          roles: ["admin"] // 或者在子导航中设置角色
        }
      },
      {
        path: "directive",
        component: () => import("@/views/permission/directive.vue"),
        name: "DirectivePermission",
        meta: {
          title: "指令权限" // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
        }
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    redirect: "/404",
    name: "ErrorPage",
    meta: {
      hidden: true
    }
  }
]

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === "hash"
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}

export default router
