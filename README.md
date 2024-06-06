# Nuxt-Admin-Template

一款Nuxt3管理模板，基于Vite、ElementPlus、Vue3和TypeScript。


## 使用

### 菜单meta定义

```ts
definePageMeta({
    title: '用户管理', // 菜单的标题
    icon: 'ep:user',  // 图标，使用 https://icones.js.org/
    hidden: true,     // 在菜单不展示，默认为false
    order: 2,         // 菜单的排序，越小越越靠前，默认为0
    // permission: ['admin']  // 该页面需要的权限，默认为[]，表示都通行
})
```

## 问题

- Nuxt3 keepalive存在问题 [27401](https://github.com/nuxt/nuxt/issues/27401)，嵌套路由导致实现选择性缓存很难


## 参考

- [nuxt3目录结构](https://nuxt.com.cn/docs/guide/directory-structure)
- [图标模块](https://nuxt.com.cn/modules/icon)
- [图标](https://icones.js.org/)
- [清新优雅、高颜值且功能强大的后台管理系统](https://soybeanjs.cn/)
- [bag-admin](https://vite.itnavs.com/admin/)
- [MineAdmin](https://github.com/mineadmin/MineAdmin-Vue)
- [element-plus-admin](https://element-plus-admin.cn/)
- [vue3-tabs-chrome](https://github.com/viewweiwu/vue3-tabs-chrome)
- [epic-astronomy/Waterfalls](https://github.com/epic-astronomy/Waterfalls)
- [zptime/nuxt-admin-template](https://github.com/zptime/nuxt-admin-template)
- [vampirefan/admin3](https://github.com/vampirefan/admin3)